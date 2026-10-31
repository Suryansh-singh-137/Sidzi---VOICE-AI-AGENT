"use client";

import React, { useState, useEffect } from "react";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TranscriptEntry {
  speaker: "Sidzi" | "Caller";
  text: string;
  time: string;
}

export default function CallModal({ isOpen, onClose }: CallModalProps) {
  const [callState, setCallState] = useState<"connecting" | "active" | "ended">("connecting");
  const [patientName, setPatientName] = useState<string>("Travis");
  const [dob, setDob] = useState<string>("1997-07-14");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [appointmentBooked, setAppointmentBooked] = useState<string | null>(null);
  const [refillStatus, setRefillStatus] = useState<string | null>(null);
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const [micMuted, setMicMuted] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setCallState("connecting");
      setTranscripts([]);
      setIsVerified(false);
      setAppointmentBooked(null);
      setRefillStatus(null);
      return;
    }

    // Simulate connection delay then Sidzi's natural greeting
    const t1 = setTimeout(() => {
      setCallState("active");
      addTranscript(
        "Sidzi",
        "Hello! Thank you for calling Maple Grove Family Clinic. My name is Sidzi. May I have your full name and date of birth, please?"
      );
    }, 1200);

    return () => clearTimeout(t1);
  }, [isOpen]);

  const addTranscript = (speaker: "Sidzi" | "Caller", text: string) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setTranscripts((prev) => [...prev, { speaker, text, time }]);
  };

  // Scenario 1: Verify identity
  const handleVerify = (name: string, dateOfBirth: string) => {
    setPatientName(name);
    setDob(dateOfBirth);
    addTranscript("Caller", `My name is ${name}, born ${dateOfBirth}.`);

    setTimeout(() => {
      setIsVerified(true);
      addTranscript("Sidzi", `Thank you, ${name}. I have verified your record. How can I assist you today?`);
    }, 900);
  };

  // Scenario 2: Book appointment slot
  const handleBookSlot = (slotLabel: string, doctor: string) => {
    addTranscript("Caller", `I would like to book an appointment with ${doctor}.`);

    setTimeout(() => {
      setAppointmentBooked(`${slotLabel} with ${doctor}`);
      addTranscript(
        "Sidzi",
        `You are all set for ${slotLabel} with ${doctor}. We look forward to seeing you!`
      );
    }, 1000);
  };

  // Scenario 3: Request refill (test controlled substance safety check)
  const handleRefill = (medication: string, isControlled = false) => {
    addTranscript("Caller", `I need a refill for my ${medication}.`);

    setTimeout(() => {
      if (isControlled) {
        setRefillStatus("Escalated to Clinical Nurse (Controlled Substance)");
        addTranscript(
          "Sidzi",
          `${medication} is a controlled substance and requires clinical nurse authorization. I am putting you in line for a nurse transfer.`
        );
      } else {
        setRefillStatus("Submitted to Clinic Pharmacy");
        addTranscript(
          "Sidzi",
          `Your refill for ${medication} has been submitted to your clinic pharmacy.`
        );
      }
    }, 1100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-zinc-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 relative"></span>
            </div>
            <div>
              <h3 className="font-sans font-semibold text-[15px] tracking-tight">
                Sidzi — Live Voice Call
              </h3>
              <p className="text-xs text-zinc-400">Maple Grove Family Clinic</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center text-sm transition-colors cursor-pointer"
            aria-label="End call"
          >
            ✕
          </button>
        </div>

        {/* Live Audio Visualizer Banner */}
        <div className="px-6 py-5 bg-gradient-to-r from-teal-900/10 via-cyan-900/10 to-teal-900/10 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-600/10 text-teal-700 flex items-center justify-center font-semibold text-lg border border-teal-500/20">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-zinc-900">
                  {callState === "connecting" ? "Connecting to receptionist..." : "Sidzi is listening..."}
                </span>
                {isVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                    ✓ {patientName} Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                Deterministic clinical guardrails enabled • Low-latency voice
              </p>
            </div>
          </div>

          {/* Animated sound bars */}
          <div className="flex items-center gap-1 h-8 px-3 py-1 bg-white rounded-full border border-zinc-200/80 shadow-xs">
            <span className="w-1 bg-teal-500 rounded-full h-3 animate-pulse"></span>
            <span className="w-1 bg-teal-600 rounded-full h-5 animate-pulse delay-75"></span>
            <span className="w-1 bg-teal-400 rounded-full h-2 animate-pulse delay-150"></span>
            <span className="w-1 bg-teal-600 rounded-full h-6 animate-pulse delay-200"></span>
            <span className="w-1 bg-teal-500 rounded-full h-3.5 animate-pulse delay-100"></span>
          </div>
        </div>

        {/* Real-time Live Transcript Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 min-h-[220px] max-h-[340px] bg-zinc-50/50">
          {transcripts.map((t, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                t.speaker === "Sidzi" ? "items-start" : "items-end"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-zinc-600">
                  {t.speaker === "Sidzi" ? "Sidzi (Receptionist)" : t.speaker}
                </span>
                <span className="text-[10px] text-zinc-400">{t.time}</span>
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed shadow-xs ${
                  t.speaker === "Sidzi"
                    ? "bg-white text-zinc-900 border border-zinc-200/70"
                    : "bg-zinc-900 text-white"
                }`}
              >
                {t.text}
              </div>
            </div>
          ))}

          {/* Live Action Badges */}
          {appointmentBooked && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <span className="font-semibold">📅 Appointment Confirmed:</span>
              <span>{appointmentBooked}</span>
            </div>
          )}

          {refillStatus && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                refillStatus.includes("Nurse")
                  ? "bg-amber-50 border-amber-200 text-amber-900"
                  : "bg-teal-50 border-teal-200 text-teal-900"
              }`}
            >
              <span className="font-semibold">💊 Prescription Status:</span>
              <span>{refillStatus}</span>
            </div>
          )}
        </div>

        {/* Quick Demo Actions (Simulate voice interactions) */}
        <div className="p-4 bg-white border-t border-zinc-100">
          <p className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-2">
            Try asking Sidzi (Click to test dialogue):
          </p>
          <div className="flex flex-wrap gap-2">
            {!isVerified ? (
              <>
                <button
                  onClick={() => handleVerify("Travis", "1997-07-14")}
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-medium transition-colors cursor-pointer"
                >
                  "I'm Travis, born July 14, 1997"
                </button>
                <button
                  onClick={() => handleVerify("Maria Gonzalez", "1985-03-14")}
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-medium transition-colors cursor-pointer"
                >
                  "Maria Gonzalez, March 14, 1985"
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleBookSlot("Thursday at 9:00 AM", "Dr. Miller")}
                  className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-medium border border-teal-200 transition-colors cursor-pointer"
                >
                  "Book Dr. Miller for Thursday 9 AM"
                </button>
                <button
                  onClick={() => handleBookSlot("Friday at 11:00 AM", "Dr. Sharma")}
                  className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-medium border border-teal-200 transition-colors cursor-pointer"
                >
                  "Book Dr. Sharma for Friday 11 AM"
                </button>
                <button
                  onClick={() => handleRefill("Amoxicillin", false)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-medium transition-colors cursor-pointer"
                >
                  "Refill Amoxicillin" (Standard)
                </button>
                <button
                  onClick={() => handleRefill("Lorazepam", true)}
                  className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-medium border border-amber-200 transition-colors cursor-pointer"
                >
                  "Refill Lorazepam" (Controlled Nurse Check)
                </button>
              </>
            )}
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMicMuted(!micMuted)}
              className={`p-2.5 rounded-full border text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                micMuted
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100"
              }`}
            >
              <span>{micMuted ? "🔇 Mic Muted" : "🎙️ Mic Active"}</span>
            </button>
            <span className="text-xs text-zinc-400">
              LiveKit audio stream ready
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium text-xs shadow-xs transition-colors cursor-pointer"
          >
            End Call
          </button>
        </div>
      </div>
    </div>
  );
}

