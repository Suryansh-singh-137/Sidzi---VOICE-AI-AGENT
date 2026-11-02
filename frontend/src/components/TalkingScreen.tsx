"use client";

import React, { useState, useEffect, useRef } from "react";
import { Room, RoomEvent, Track } from "livekit-client";
import { DemoPatientScenario } from "./TryItNowSection";

interface TalkingScreenProps {
  isOpen: boolean;
  onEndCall: () => void;
  sessionData?: {
    room_name: string;
    token: string;
    livekit_url: string;
  } | null;
  selectedScenario?: DemoPatientScenario | null;
  onOpenStaffConsole?: () => void;
}

interface ChatMessage {
  id: string;
  speaker: "Sidzi" | "Caller";
  text: string;
  time: string;
  badge?: string;
  badgeType?: "success" | "warning";
}

export default function TalkingScreen({
  isOpen,
  onEndCall,
  sessionData,
  selectedScenario,
  onOpenStaffConsole,
}: TalkingScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [timerSeconds, setTimerSeconds] = useState<number>(8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [agentStatus, setAgentStatus] = useState<"Listening" | "Speaking" | "Processing">("Listening");
  const [audioLevel, setAudioLevel] = useState<number>(1);

  const roomRef = useRef<Room | null>(null);
  const sseRef = useRef<EventSource | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const addMessage = (
    speaker: "Sidzi" | "Caller",
    text: string,
    badge?: string,
    badgeType?: "success" | "warning"
  ) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        speaker,
        text,
        time,
        badge,
        badgeType,
      },
    ]);
  };

  // Timer Tick
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // WebRTC / LiveKit & Audio Visualizer Setup
  useEffect(() => {
    if (!isOpen) {
      if (roomRef.current) {
        roomRef.current.disconnect();
        roomRef.current = null;
      }
      if (sseRef.current) {
        sseRef.current.close();
        sseRef.current = null;
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
        micStreamRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      return;
    }

    // Set initial greeting
    setMessages([]);
    setTimerSeconds(0);

    // Setup real Web Audio API Analyzer to react to microphone
    navigator.mediaDevices
      ?.getUserMedia({ audio: true })
      .then((stream) => {
        micStreamRef.current = stream;
        try {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioContextClass();
          audioContextRef.current = ctx;
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 64;
          analyserRef.current = analyser;

          const source = ctx.createMediaStreamSource(stream);
          source.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          const updateAudioVisualizer = () => {
            if (!analyserRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const avg = sum / dataArray.length;
            const normalized = 1 + (avg / 255) * 0.45;
            setAudioLevel(normalized);

            if (avg > 30) {
              setAgentStatus("Listening");
            }

            animFrameRef.current = requestAnimationFrame(updateAudioVisualizer);
          };
          updateAudioVisualizer();
        } catch (e) {
          console.warn("Web Audio API visualizer warning:", e);
        }
      })
      .catch((err) => {
        console.warn("Microphone not available:", err);
      });

    // If sessionData provided from backend, connect via LiveKit WebRTC!
    if (sessionData && sessionData.token && sessionData.livekit_url) {
      try {
        const room = new Room({
          adaptiveStream: true,
          dynacast: true,
        });
        roomRef.current = room;

        room.on(RoomEvent.TrackSubscribed, (track: Track) => {
          if (track.kind === Track.Kind.Audio) {
            const el = track.attach();
            document.body.appendChild(el);
            setAgentStatus("Speaking");
          }
        });

        room.connect(sessionData.livekit_url, sessionData.token).then(() => {
          room.localParticipant.setMicrophoneEnabled(true);
        }).catch((err) => {
          console.warn("LiveKit Room connect error (running locally):", err);
        });

        // Listen to SSE events stream from backend
        const sseUrl = `/api/calls/${sessionData.room_name}/events/stream`;
        const sse = new EventSource(sseUrl);
        sseRef.current = sse;

        sse.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "transcript") {
              addMessage(data.speaker === "Sidzi" ? "Sidzi" : "Caller", data.text);
              if (data.speaker === "Sidzi") setAgentStatus("Speaking");
              else setAgentStatus("Listening");
            } else if (data.type === "identity_verified") {
              addMessage("Sidzi", `Identity verified for ${data.patient}.`, `Verified: ${data.patient}`, "success");
            } else if (data.type === "slot_booked") {
              addMessage("Sidzi", `Appointment confirmed for ${data.patient} on slot ${data.slot}.`, `Booked: ${data.slot}`, "success");
            }
          } catch (e) {
            console.error("SSE parse error:", e);
          }
        };
      } catch (err) {
        console.warn("LiveKit initialization note:", err);
      }
    }

    // Initial greeting if scenario was pre-selected
    if (selectedScenario) {
      setTimeout(() => {
        handleActionClick(selectedScenario.title, `I'm ${selectedScenario.name}, born ${selectedScenario.dob}.`);
      }, 1000);
    }

    return () => {
      if (roomRef.current) {
        roomRef.current.disconnect();
        roomRef.current = null;
      }
      if (sseRef.current) {
        sseRef.current.close();
        sseRef.current = null;
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
        micStreamRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isOpen, sessionData]);

  // Handle user clicking any of the 4 prompt cards
  const handleActionClick = (actionName: string, speechText: string) => {
    addMessage("Caller", speechText);
    setAgentStatus("Processing");

    setTimeout(() => {
      setAgentStatus("Speaking");
      if (actionName.includes("Book a visit")) {
        addMessage(
          "Sidzi",
          "Thank you, Maria. I found your clinic chart. Dr. Anita Patel has Monday at 9:00 AM open for your visit. Does that work for you?",
          "Chart Matched",
          "success"
        );
      } else if (actionName.includes("Move or cancel")) {
        addMessage(
          "Sidzi",
          "Hello James. I see your upcoming checkup. I can move your slot to Friday at 11:00 AM with Dr. Sharma. Would you like me to confirm that change?",
          "Appointment Found",
          "success"
        );
      } else if (actionName.includes("Check insurance")) {
        addMessage(
          "Sidzi",
          "Hi Priya. Your policy on file has an in-network primary care copay of $20 with a $500 deductible.",
          "Verified Copay: $20",
          "success"
        );
      } else if (actionName.includes("Refill")) {
        addMessage(
          "Sidzi",
          "Hello Robert. Lorazepam is a controlled substance and requires clinical nurse authorization. I am putting you in line for a nurse transfer right now.",
          "Nurse Triage Escalated",
          "warning"
        );
      } else {
        addMessage("Sidzi", `Understood. Processing your request: "${speechText}".`);
      }
    }, 1200);
  };

  const toggleMute = () => {
    if (micStreamRef.current) {
      micStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = isMuted;
      });
    }
    if (roomRef.current) {
      roomRef.current.localParticipant.setMicrophoneEnabled(isMuted);
    }
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? `0${s}` : s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FFF9F8] flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <header className="w-full bg-[#FFF9F8] border-b border-[#F8DCE8] px-6 sm:px-12 h-20 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          {/* 4-bar soundwave icon */}
          <div className="flex items-center gap-[3px] h-5" aria-hidden="true">
            <span className="w-[2.5px] h-3 bg-[#29212B] rounded-full"></span>
            <span className="w-[2.5px] h-5 bg-[#29212B] rounded-full"></span>
            <span className="w-[2.5px] h-3.5 bg-[#29212B] rounded-full"></span>
            <span className="w-[2.5px] h-2 bg-[#29212B] rounded-full"></span>
          </div>

          <span className="font-sans text-[20px] font-semibold tracking-tight text-[#29212B]">
            Sidzi
          </span>

          <span className="text-xs sm:text-[13px] text-zinc-500 font-normal ml-3 border-l border-[#F8DCE8] pl-3.5">
            On call with Sidzi · Maple Grove Family Clinic
          </span>
        </div>

        {/* End Call and Go Home button */}
        <button
          onClick={onEndCall}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200/90 hover:bg-zinc-100 text-xs font-medium text-zinc-700 transition-colors cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>End call and go home</span>
        </button>
      </header>

      {/* Main Conversation Body */}
      <main className="max-w-3xl w-full mx-auto px-6 pt-10 pb-36 flex-1 flex flex-col justify-start">
        {/* Sidzi's Main Speech Card */}
        <div className="mb-8">
          <span className="text-xs font-semibold text-zinc-500 block mb-2">
            Sidzi
          </span>
          <div className="bg-[#F5F5F4] p-5 sm:p-6 rounded-2xl text-[15px] sm:text-[16px] leading-relaxed text-[#29212B] shadow-xs border border-zinc-200/50">
            Thanks for calling Maple Grove Family Clinic, this is Sidzi. To book or check an appointment, what’s your full name and date of birth?
          </div>
        </div>

        {/* Dynamic Chat Messages Stream */}
        {messages.length > 0 && (
          <div className="space-y-4 mb-8">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.speaker === "Caller" ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-zinc-500">
                    {msg.speaker}
                  </span>
                  <span className="text-[10px] text-zinc-400">{msg.time}</span>
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-[14.5px] leading-relaxed shadow-xs ${
                    msg.speaker === "Caller"
                      ? "bg-[#29212B] text-white"
                      : "bg-[#F5F5F4] text-[#29212B] border border-zinc-200/50"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.badge && (
                  <span
                    className={`mt-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
                      msg.badgeType === "warning"
                        ? "bg-[#FCEEF3] text-[#B96891] border-[#F8DCE8]"
                        : "bg-[#D8EDEA] text-[#65B8B5] border-[#c2e5e1]"
                    }`}
                  >
                    {msg.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* "Try one of these:" Quick Action Cards */}
        <div className="mt-2">
          <span className="text-xs font-semibold text-zinc-500 block mb-3">
            Try one of these:
          </span>

          <div className="space-y-3">
            {/* Card 1 */}
            <button
              onClick={() =>
                handleActionClick(
                  "Book a visit",
                  "I'm Maria Gonzalez, born March 14, 1985."
                )
              }
              className="w-full bg-[#F5F5F4] hover:bg-[#EAEAEA] active:scale-[0.99] border border-transparent hover:border-zinc-300/60 p-4 rounded-2xl transition-all text-left flex flex-col cursor-pointer"
            >
              <span className="font-sans text-[14.5px] font-semibold text-[#29212B]">
                Book a visit
              </span>
              <span className="font-sans text-[13.5px] text-zinc-600 mt-0.5">
                “I’m Maria Gonzalez, born March 14, 1985.”
              </span>
            </button>

            {/* Card 2 */}
            <button
              onClick={() =>
                handleActionClick(
                  "Move or cancel",
                  "I'm James Carter, born November 2, 1972."
                )
              }
              className="w-full bg-[#F5F5F4] hover:bg-[#EAEAEA] active:scale-[0.99] border border-transparent hover:border-zinc-300/60 p-4 rounded-2xl transition-all text-left flex flex-col cursor-pointer"
            >
              <span className="font-sans text-[14.5px] font-semibold text-[#29212B]">
                Move or cancel
              </span>
              <span className="font-sans text-[13.5px] text-zinc-600 mt-0.5">
                “I’m James Carter, born November 2, 1972.”
              </span>
            </button>

            {/* Card 3 */}
            <button
              onClick={() =>
                handleActionClick(
                  "Check insurance",
                  "I'm Priya Shah, born July 21, 1990."
                )
              }
              className="w-full bg-[#F5F5F4] hover:bg-[#EAEAEA] active:scale-[0.99] border border-transparent hover:border-zinc-300/60 p-4 rounded-2xl transition-all text-left flex flex-col cursor-pointer"
            >
              <span className="font-sans text-[14.5px] font-semibold text-[#29212B]">
                Check insurance
              </span>
              <span className="font-sans text-[13.5px] text-zinc-600 mt-0.5">
                “I’m Priya Shah, born July 21, 1990.”
              </span>
            </button>

            {/* Card 4 */}
            <div className="w-full bg-[#F5F5F4] hover:bg-[#EAEAEA] border border-transparent hover:border-zinc-300/60 p-4 rounded-2xl transition-all text-left flex flex-col">
              <button
                onClick={() =>
                  handleActionClick(
                    "Refill + talk to a nurse",
                    "I'm Robert Chen, born May 9, 1958."
                  )
                }
                className="w-full text-left cursor-pointer"
              >
                <span className="font-sans text-[14.5px] font-semibold text-[#29212B]">
                  Refill + talk to a nurse
                </span>
                <span className="font-sans text-[13.5px] text-zinc-600 mt-0.5 block">
                  “I’m Robert Chen, born May 9, 1958.”
                </span>
              </button>

              {onOpenStaffConsole && (
                <button
                  onClick={onOpenStaffConsole}
                  className="mt-2 text-xs font-medium text-[#B96891] hover:underline cursor-pointer inline-flex items-center gap-1 self-start"
                >
                  <span>Open staff console →</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Central Animated Floating 3D Orb Graphic */}
        <div className="mt-12 mb-6 flex flex-col items-center justify-center">
          <div
            className="w-20 h-20 rounded-full shadow-lg ring-2 ring-white/90 transition-transform duration-75"
            style={{
              transform: `scale(${audioLevel})`,
              background:
                "radial-gradient(circle at 35% 28%, #FFFFFF 0%, #D8EDEA 25%, #EFA6C5 60%, #65B8B5 90%, #B96891 100%)",
              boxShadow:
                "inset -2px -2px 6px rgba(185, 104, 145, 0.35), 0 8px 24px rgba(239, 166, 197, 0.4)",
            }}
          />
          <span className="text-xs font-medium text-zinc-500 mt-3">
            {isMuted ? "Microphone muted" : agentStatus}
          </span>
        </div>
      </main>

      {/* Docked Floating Bottom Call Control Bar */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-xl border border-zinc-200/90 rounded-full px-5 py-2.5 flex items-center gap-4 z-50">
        {/* On call indicator and timer */}
        <div className="flex items-center gap-2 pr-2 border-r border-zinc-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-zinc-800">
            On call with Sidzi
          </span>
          <span className="font-mono text-xs text-zinc-500 ml-1">
            {formatTimer(timerSeconds)}
          </span>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-zinc-100 text-xs font-medium text-zinc-700 transition-colors cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          <span>{isFullscreen ? "Exit full" : "Full screen"}</span>
        </button>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            isMuted
              ? "bg-[#FCEEF3] text-[#B96891] border border-[#F8DCE8]"
              : "hover:bg-zinc-100 text-zinc-700"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            {isMuted ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
            )}
          </svg>
          <span>{isMuted ? "Unmute" : "Mute"}</span>
        </button>

        {/* Red End Call Button */}
        <button
          onClick={onEndCall}
          className="flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-[#B91C1C] hover:bg-red-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.2] -rotate-12" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>End call</span>
        </button>
      </footer>
    </div>
  );
}

