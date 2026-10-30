import os
import json
import asyncio
from dotenv import load_dotenv
from typing import Any

from livekit import agents
from livekit.agents import (
    Agent,
    AgentServer,
    AgentSession,
    JobContext,
    RunContext,
    cli,
    function_tool,
)
from livekit.plugins import deepgram, groq, silero
import redis.asyncio as aioredis

from clinic_logic import find_patient, get_open_slots, confirm_booking, evaluate_refill

load_dotenv()

SYSTEM_PROMPT = """You are Sidzi, an AI clinic receptionist for Maple Grove Family Clinic.
Your objective:
1. Greet callers and ask for their full name and date of birth.
2. Call `verify_identity` to verify their record.
3. If booking: call `list_available_slots`, tell the caller the options, and use `book_appointment` with the slot handle (e.g. s1, s2).
4. If asking for a medication refill: call `request_refill`.
5. Keep spoken responses concise (1 to 2 short sentences). Never recite markdown bullets or formatting.
"""

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")


class ClinicAgent(Agent):
    def __init__(self, redis_conn: aioredis.Redis, room_name: str):
        super().__init__(instructions=SYSTEM_PROMPT)
        self.redis = redis_conn
        self.room_name = room_name
        self.verified_patient: dict[str, Any] | None = None

    async def publish_event(self, event_type: str, data: dict[str, Any]):
        """Helper to broadcast events to the room's Redis channel."""
        payload = json.dumps({"type": event_type, **data})
        await self.redis.publish(f"call:{self.room_name}", payload)

    @function_tool()
    async def verify_identity(
        self,
        context: RunContext,
        full_name: str,
        date_of_birth: str,
    ) -> str:
        """Verify the caller's identity against clinic records."""
        patient = find_patient(full_name, date_of_birth)
        if patient:
            self.verified_patient = patient
            await self.publish_event("identity_verified", {"patient": patient["name"]})
            return f"Identity verified for {patient['name']}."
        return "No record found with those details."

    @function_tool()
    async def list_available_slots(self, context: RunContext) -> str:
        """List open appointment slots with their slot handles (e.g., s1, s2)."""
        return get_open_slots()

    @function_tool()
    async def book_appointment(self, context: RunContext, slot_handle: str) -> str:
        """Book an appointment using a slot handle like s1 or s2."""
        patient_name = self.verified_patient["name"] if self.verified_patient else "Caller"
        result = confirm_booking(slot_handle, patient_name)
        await self.publish_event("slot_booked", {"slot": slot_handle, "patient": patient_name})
        return result

    @function_tool()
    async def request_refill(self, context: RunContext, medication_name: str) -> str:
        """Request a prescription refill for a medication."""
        result = evaluate_refill(medication_name)
        return result["message"]


server = AgentServer()


@server.rtc_session()
async def entrypoint(ctx: JobContext):
    await ctx.connect(auto_subscribe=agents.AutoSubscribe.AUDIO_ONLY)

    redis_conn = aioredis.from_url(REDIS_URL, decode_responses=True)
    room_name = ctx.room.name

    session = AgentSession(
        vad=silero.VAD.load(),
        stt=deepgram.STT(model="nova-2-general"),
        llm=groq.LLM(model="llama-3.3-70b-versatile"),
        tts=deepgram.TTS(model="aura-asteria-en"),
    )

    clinic_agent = ClinicAgent(redis_conn=redis_conn, room_name=room_name)

    # Listen for final transcribed user speech and publish to Redis
    @session.on("user_speech_committed")
    def on_user_speech(msg):
        asyncio.create_task(
            clinic_agent.publish_event("transcript", {
                "speaker": "Caller",
                "text": msg.content
            })
        )

    # Listen for agent spoken response and publish to Redis
    @session.on("agent_speech_committed")
    def on_agent_speech(msg):
        asyncio.create_task(
            clinic_agent.publish_event("transcript", {
                "speaker": "Sidzi",
                "text": msg.content
            })
        )

    await session.start(agent=clinic_agent, room=ctx.room)

    await session.generate_reply(
        instructions="Greet the patient warmly, introduce yourself as Sidzi from Maple Grove Family Clinic, and ask for their full name and date of birth."
    )


if __name__ == "__main__":
    cli.run_app(server)