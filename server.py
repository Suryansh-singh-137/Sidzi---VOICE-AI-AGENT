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

# Allow the frontend (running on port 3000) to communicate with this API.
# NOTE: browsers reject allow_origins=["*"] combined with allow_credentials=True,
# so we list the real origins instead.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
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
    """Generates a room ID and a signed LiveKit access token for the caller.

    We do NOT dispatch the agent here. The worker in agent.py has no agent_name,
    so LiveKit dispatches it automatically as soon as a participant joins a new
    room. Dispatching explicitly as well created two agents in the same room.
    """
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
    transcript lines and call events down to the frontend in real time.
    """
    async def event_generator():
        # Keep this first line as it is
        yield f"data: {json.dumps({'type': 'connected', 'room': room_name})}\n\n"

        key = f"call:{room_name}"   # the notebook for this call
        last_id = "0"               # "0" means: start from the very first line

        try:
            while True:
                # Wait up to 1 second for lines newer than last_id
                result = await redis_client.xread({key: last_id}, block=1000)

                if result:
                    for _stream_name, messages in result:
                        for msg_id, fields in messages:
                            last_id = msg_id   # move the bookmark forward
                            yield f"id: {msg_id}\ndata: {fields['data']}\n\n"
                else:
                    yield ": keepalive\n\n"   # nothing new, keep the connection alive
        except asyncio.CancelledError:
            pass
        except Exception as e:
            print(f"[Sidzi] SSE Redis error for {room_name}: {e!r}")
            try:
                while True:
                    await asyncio.sleep(15)
                    yield ": heartbeat\n\n"
            except asyncio.CancelledError:
                pass

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