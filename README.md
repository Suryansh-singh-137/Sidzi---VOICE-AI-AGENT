# 🩺 Sidzi

### A real-time AI voice receptionist for clinics

*Talk to it like a phone call. It verifies who you are, books your appointment, and handles refill requests, with a live transcript on screen.*

[![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/) [![LiveKit](https://img.shields.io/badge/LiveKit-Agents-1F2937?style=flat-square)](https://livekit.io/) [![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/) [![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io/) [![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## ✨ What is Sidzi?

Sidzi is a voice agent that plays the role of a front-desk receptionist for **Maple Grove Family Clinic**. A caller opens the web app, clicks call, and speaks. Sidzi listens, thinks, and answers out loud, in real time.

It can:

- 🪪 **Verify identity** with full name and date of birth
- 📅 **Book appointments** from a list of open slots
- 💊 **Handle refill requests**, and send controlled medicines to a nurse instead of approving them
- 📝 **Show a live transcript** and call events (identity verified, slot booked) on a dashboard

> ⚠️ **Demo only.** Sidzi uses fake patient data. It is a learning and portfolio project. It is not a medical device and must not be used with real patient information.

---

## 🏗️ Architecture

The following diagram illustrates Sidzi's end-to-end architecture, including the frontend, backend, real-time voice infrastructure, agent pipeline, and Redis-based event communication.

<div align="center">
  <img src="https://github.com/user-attachments/assets/f8fa98ea-a435-4575-bf24-8fc63d96eea1" alt="Sidzi System Architecture" width="100%" />
</div>

### How the pieces fit together

| Piece | Role |
|---|---|
| **Browser (Next.js)** | The caller's side. Joins the call, plays Sidzi's voice, shows the live transcript. |
| **`server.py` (FastAPI)** | The front desk. Creates a room and a signed token, and streams live events to the browser. |
| **LiveKit Cloud** | Carries the audio between the browser and the agent, and starts the agent when a call begins. |
| **`agent.py` (LiveKit worker)** | Sidzi herself. Runs the voice pipeline and the tools. |
| **`clinic_logic.py`** | The clinic rules in plain code: patients, slots, refill safety. |
| **Redis** | A message bus between the agent and the server, so transcripts reach the screen. |

### Life of one call

1. The user clicks call. The browser asks `server.py` for a room and a token.
2. The browser joins the LiveKit room and opens the live event stream.
3. LiveKit sees a new room and sends a job to the agent worker.
4. The agent joins and greets the caller.
5. Each turn runs through the voice pipeline (below). Transcripts and events go to Redis, then through the server to the screen.
6. When the caller hangs up, the session closes and the Redis connection is cleaned up.

### The voice pipeline

```text
 caller's voice
       │
       ▼
 ┌───────────┐   ┌───────────────┐   ┌─────────────┐   ┌───────────────┐   ┌───────────┐
 │ VAD       │ → │ Speech-to-text│ → │ LLM + tools │ → │ Text-to-speech│ → │ Sidzi's   │
 │ (Silero)  │   │ (Deepgram)    │   │ (Groq)      │   │ (Deepgram)    │   │ voice     │
 └───────────┘   └───────────────┘   └─────────────┘   └───────────────┘   └───────────┘
        turn detection · interruption handling · preemptive generation
```

---

## 🛡️ Design choices worth knowing

**Important rules live in code, not only in the prompt.**

- **Fixed slot IDs.** The model can only pick from slot IDs like `s1`, `s2`, `s3`. It cannot invent a date or time.
- **Controlled medicines go to a nurse.** A plain-code check flags drugs like Lorazepam, so the language model never decides this on its own.
- **Strict identity matching.** Name and date of birth are matched in code against the records, after the date is normalised.

**Voice-first prompting.** The system prompt tells Sidzi to speak in short plain sentences, spell out dates and times, and never read out internal IDs or tool names.

---

## 🧰 Tech stack

| Area | Tools |
|---|---|
| Real-time audio | LiveKit Cloud, LiveKit Agents |
| Speech | Deepgram (speech-to-text and text-to-speech), Silero VAD |
| LLM | Groq |
| Backend | Python, FastAPI, Server-Sent Events |
| Messaging | Redis (pub/sub) |
| Frontend | Next.js, React, TypeScript |

---

## 🚀 Getting started

### Prerequisites

- Python 3.10 or newer
- Node.js 18 or newer
- Docker (for Redis)
- Accounts and API keys for **LiveKit Cloud**, **Deepgram** and **Groq**

### 1. Clone and install

```bash
git clone https://github.com/Suryansh-singh-137/sidzi.git
cd sidzi

python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Set your environment variables

Create a `.env` file in the project root:

```env
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_livekit_key
LIVEKIT_API_SECRET=your_livekit_secret

DEEPGRAM_API_KEY=your_deepgram_key
GROQ_API_KEY=your_groq_key

REDIS_URL=redis://localhost:6379

# Optional: choose another Groq model
# GROQ_MODEL=openai/gpt-oss-120b
```

> 🔒 Never commit your `.env` file. Add it to `.gitignore`.

### 3. Start Redis

```bash
docker run -d --name sidzi-redis -p 6379:6379 redis:7
```

### 4. Download the voice models (first time only)

```bash
python agent.py download-files
```

### 5. Run the three services

Open three terminals.

```bash
# Terminal 1: the API server
python server.py

# Terminal 2: the voice agent worker
python agent.py dev

# Terminal 3: the web app
cd frontend
npm install
npm run dev
```

Open [**http://localhost:3000**](http://localhost:3000) and click call.

> 💡 **Tip:** Use headphones while testing. Sidzi's voice can leak into your microphone and make her interrupt herself.

---

## 🧪 Try it: demo patients

| Name | Date of birth | Notes |
|---|---|---|
| Maria Gonzalez | March 14, 1985 | Has an Amoxicillin prescription |
| Travis | July 14, 1997 | Has a Lisinopril prescription |
| Robert Chen | May 9, 1958 | Has Lisinopril and **Lorazepam** (a controlled medicine) |

**Things to say:**

- *"My name is Maria Gonzalez, born March fourteenth, nineteen eighty-five."*
- *"I'd like to book an appointment."*
- *"Can I get a refill for Lorazepam?"* (as Robert Chen, to see the nurse transfer)

---

## 📊 Performance

Sidzi measures the delay of each turn: end-of-turn wait, LLM first token, and text-to-speech first byte. Detailed traces are available in the **Agent insights** tab of LiveKit Cloud.

| Metric (agent-side, median) | Before tuning | After tuning |
|---|---|---|
| Time to first audio | *to be measured* | *to be measured* |
| End-of-turn delay | *to be measured* | *to be measured* |
| LLM first token | *to be measured* | *to be measured* |
| Text-to-speech first byte | *to be measured* | *to be measured* |

*These numbers exclude the browser and network leg, so they are not full end-to-end latency. Method: a fixed scripted conversation, run several times, reporting the median and the 95th percentile.*

---

## 📁 Project structure

```text
sidzi/
├── agent.py          # Voice agent: pipeline, tools, event publishing
├── server.py         # FastAPI: token endpoint and live event stream (SSE)
├── clinic_logic.py   # Patients, slots and refill rules
├── frontend/         # Next.js web app (call modal, transcript, consoles)
├── .env              # Your secrets (not committed)
└── README.md
```

---

## 🗺️ Roadmap

- [ ] Block booking and refills until the caller is verified (enforced in code)
- [ ] Move patients, slots and bookings from in-memory data to **PostgreSQL**, with atomic booking to prevent double booking
- [ ] Real date and time slots, so "tomorrow" and "next Friday" work
- [ ] Redis Streams for the event feed, so no message is lost on a late connection
- [ ] Saved call history and transcripts
- [ ] Latency benchmark script with before and after results
- [ ] Automated tests for the clinic logic and for scripted conversations
- [ ] Docker Compose setup for the whole stack
- [ ] Optional: calendar integration for real doctor availability

---

## 👤 Author

**Suryansh Singh**  
B.Tech Computer Science, BPIT Delhi

[LinkedIn](https://www.linkedin.com/in/suryansh-singh-35987a328/) · [GitHub](https://github.com/Suryansh-singh-137)

---

<div align="center">

*Built to learn how real-time voice AI systems work, end to end.*

</div>
