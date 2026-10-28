import os
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

class ClinicAgent(Agent):
    def __init__(self):
        super().__init__(instructions=SYSTEM_PROMPT)
        self.verified_patient: dict[str, Any] | None = None

    @function_tool()
    async def verify_identity(
        self,
        context: RunContext,
        full_name: str,
        date_of_birth: str,
    ) -> str:
        """Verify the caller's identity against clinic records.

        Args:
            full_name: The patient's full name.
            date_of_birth: The patient's date of birth in YYYY-MM-DD or spoken format.
        """
        patient = find_patient(full_name, date_of_birth)
        if patient:
            self.verified_patient = patient
            return f"Identity verified for {patient['name']}."
        return "No record found with those details. Advise the caller you can create a temporary intake."

    @function_tool()
    async def list_available_slots(
        self,
        context: RunContext,
    ) -> str:
        """List open appointment slots with their slot handles (e.g., s1, s2)."""
        return get_open_slots()

    @function_tool()
    async def book_appointment(
        self,
        context: RunContext,
        slot_handle: str,
    ) -> str:
        """Book an appointment using a slot handle like s1 or s2.

        Args:
            slot_handle: The slot identifier chosen by the user (e.g., s1, s2).
        """
        patient_name = self.verified_patient["name"] if self.verified_patient else "Caller"
        return confirm_booking(slot_handle, patient_name)

    @function_tool()
    async def request_refill(
        self,
        context: RunContext,
        medication_name: str,
    ) -> str:
        """Request a prescription refill for a medication.

        Args:
            medication_name: The exact name of the medication to refill.
        """
        result = evaluate_refill(medication_name)
        return result["message"]


server = AgentServer()

@server.rtc_session()
async def entrypoint(ctx: JobContext):
    # Connect to room audio
    await ctx.connect(auto_subscribe=agents.AutoSubscribe.AUDIO_ONLY)

    session = AgentSession(
        vad=silero.VAD.load(),
        stt=deepgram.STT(model="nova-2-general"),
        llm=groq.LLM(model="llama-3.3-70b-versatile"),
        tts=deepgram.TTS(model="aura-asteria-en"),
    )

    clinic_agent = ClinicAgent()

    # Start the agent session in the room
    await session.start(agent=clinic_agent, room=ctx.room)

    # Spoken greeting on join
    await session.generate_reply(
        instructions="Greet the patient warmly, introduce yourself as Sidzi from Maple Grove Family Clinic, and ask for their full name and date of birth."
    )

if __name__ == "__main__":
    cli.run_app(server)