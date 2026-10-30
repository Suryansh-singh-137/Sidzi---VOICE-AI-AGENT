import os
import json
import asyncio
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from livekit import api
import redis.asyncio as aioredis

load_dotenv()

app = FastAPI(title="Sidzi Voice API")

# Allow the frontend (running on port 3000) to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LIVEKIT_URL = os.getenv("LIVEKIT_URL")
LIVEKIT_API_KEY = os.getenv("LIVEKIT_API_KEY")
LIVEKIT_API_SECRET = os.getenv("LIVEKIT_API_SECRET")
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

# Connect to our local Docker Redis instance
redis_client = aioredis.from_url(REDIS_URL, decode_responses=True)


@app.post("/api/calls/session")
async def create_call_session():
    """Generates a room ID and a signed LiveKit access token for the caller."""
    # Generate a unique room name for each new call
    room_name = f"call_{os.urandom(4).hex()}"

    # Sign a token with permission to join this specific room
    token = (
        api.AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET)
        .with_identity(f"patient_{os.urandom(2).hex()}")
        .with_name("Caller")
        .with_grants(api.VideoGrants(room_join=True, room=room_name))
        .to_jwt()
    )

    return {
        "room_name": room_name,
        "token": token,
        "livekit_url": LIVEKIT_URL,
    }


@app.get("/api/calls/{room_name}/events/stream")
async def stream_call_events(room_name: str):
    """SSE endpoint: Listens to the Redis channel for this room and pushes

    transcript words down to the frontend in real time.
    """
    async def event_generator():
        pubsub = redis_client.pubsub()
        channel = f"call:{room_name}"
        await pubsub.subscribe(channel)

        try:
            while True:
                # Poll Redis for new messages published by agent.py
                message = await pubsub.get_message(
                    ignore_subscribe_messages=True, timeout=1.0
                )
                if message and message.get("data"):
                    # Format as SSE event: "data: <payload>\n\n"
                    yield f"data: {message['data']}\n\n"
                await asyncio.sleep(0.05)
        except asyncio.CancelledError:
            # Client disconnected, clean up subscription
            await pubsub.unsubscribe(channel)
            await pubsub.close()

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)