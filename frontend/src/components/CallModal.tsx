"use client";

import React, { useState, useEffect } from "react";
import { DemoPatientScenario } from "./TryItNowSection";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedScenario?: DemoPatientScenario | null;
}

interface TranscriptEntry {
  speaker: "Sidzi" | "Caller";
  text: string;
  time: string;
}

export default function CallModal({
  isOpen,
  onClose,
  selectedScenario,
}: CallModalProps) {
  const [callState, setCallState] = useState<"connecting" | "active" | "ended">("connecting");
  const [patientName, setPatientName] = useState<string>("Travis");
  const [dob, setDob] = useState<string>("1997-07-14");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [appointmentBooked, setAppointmentBooked] = useState<string | null>(null);
  const [refillStatus, setRefillStatus] = useState<string | null>(null);
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const [micMuted, setMicMuted] = useState<boolean>(false);

  const addTranscript = (speaker: "Sidzi" | "Caller", text: string) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setTranscripts((prev) => [...prev, { speaker, text, time }]);
  };

  useEffect(() => {
    if (!isOpen) {
      setCallState("connecting");
      setTranscripts([]);
      setIsVerified(false);
      setAppointmentBooked(null);
      setRefillStatus(null);
      return;
    }

    const activeName = selectedScenario?.name || "Travis";
    const activeDob = selectedScenario?.dob || "1997-07-14";
    setPatientName(activeName);
    setDob(activeDob);

    // Initial connection simulation
    const t1 = setTimeout(() => {
      setCallState("active");
      addTranscript(
        "Sidzi",
        "Hello! Thank you for calling Maple Grove Family Clinic. My name is Sidzi. May I have your full name and date of birth, please?"
      );

      // If a scenario was clicked, automatically queue the persona's opening turn
      if (selectedScenario) {
        setTimeout(() => {
          addTranscript("Caller", `Hi, I'm ${activeName}, born ${activeDob}.`);
          setTimeout(() => {
            setIsVerified(true);
            addTranscript(
              "Sidzi",
              `Thank you, ${activeName}. I have verified your clinic chart. How can I assist you today?`
            );

            // Contextual request based on scenario
            setTimeout(() => {
              if (selectedScenario.actionType === "book") {
                addTranscript("Caller", "I'd like to book an appointment with Dr. Patel or Dr. Miller.");
                setTimeout(() => {
                  setAppointmentBooked("Monday at 9:00 AM with Dr. Anita Patel");
                  addTranscript(
                    "Sidzi",
                    "Dr. Anita Patel has Monday at 9:00 AM available. I have reserved that slot for you!"
                  );
                }, 1000);
              } else if (selectedScenario.actionType === "reschedule") {
                addTranscript("Caller", "I need to move my appointment to Friday morning.");
                setTimeout(() => {
                  setAppointmentBooked("Friday at 11:00 AM with Dr. Sharma");
                  addTranscript(
                    "Sidzi",
                    "I have updated your appointment to Friday at 11:00 AM with Dr. Sharma."
                  );
                }, 1000);
              } else if (selectedScenario.actionType === "insurance") {
                addTranscript("Caller", "Can you check my insurance copay for my visit?");
                setTimeout(() => {
                  addTranscript(
                    "Sidzi",
                    "Your insurance on file shows an in-network primary care copay of $20 with a $500 deductible."
                  );
                }, 1000);
              } else if (selectedScenario.actionType === "refill_nurse") {
                addTranscript("Caller", "I need a refill on my Lorazepam prescription.");
                setTimeout(() => {
                  setRefillStatus("Escalated to Clinical Nurse (Controlled Substance)");
                  addTranscript(
                    "Sidzi",
                    "Lorazepam is a controlled substance and requires clinical nurse authorization. I am putting you in line for a nurse transfer."
                  );
                }, 1000);
              }
            }, 1000);
          }, 1000);
        }, 1200);
      }
    }, 1200);

    return () => clearTimeout(t1);
  }, [isOpen, selectedScenario]);

  // Manual interactive scenario helpers
  const handleVerify = (name: string, dateOfBirth: string) => {
    setPatientName(name);
    setDob(dateOfBirth);
    addTranscript("Caller", `My name is ${name}, born ${dateOfBirth}.`);

    setTimeout(() => {
      setIsVerified(true);
      addTranscript("Sidzi", `Thank you, ${name}. I have verified your record. How can I assist you today?`);
    }, 900);
  };

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
      <div className="bg-[#FFF9F8] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#F8DCE8] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#29212B] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-[#EFA6C5] animate-ping absolute"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#EFA6C5] relative"></span>
            </div>
            <div>
              <h3 className="font-sans font-semibold text-[15px] tracking-tight">
                Sidzi — Live Voice Call
              </h3>
              <p className="text-xs text-[#817780]">Maple Grove Family Clinic</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
            aria-label="End call"
          >
            ✕
          </button>
        </div>

        {/* Live Audio Visualizer Banner */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#FCEEF3] via-white to-[#D8EDEA]/30 border-b border-[#F8DCE8] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F8DCE8] text-[#B96891] flex items-center justify-center font-serif text-xl border border-[#EFA6C5]/50">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-[#29212B]">
                  {callState === "connecting" ? "Connecting to receptionist..." : "Sidzi is on the line"}
                </span>
                {isVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#D8EDEA] text-[#65B8B5] px-2.5 py-0.5 rounded-full border border-[#c2e4e0]">
                    ✓ {patientName} Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-[#817780] mt-0.5">
                Deterministic clinical guardrails enabled • Low-latency voice
              </p>
            </div>
          </div>

          {/* Animated sound bars */}
          <div className="flex items-center gap-1 h-8 px-3 py-1 bg-white rounded-full border border-[#F8DCE8] shadow-xs">
            <span className="w-1 bg-[#B96891] rounded-full h-3 animate-pulse"></span>
            <span className="w-1 bg-[#EFA6C5] rounded-full h-5 animate-pulse delay-75"></span>
            <span className="w-1 bg-[#65B8B5] rounded-full h-2 animate-pulse delay-150"></span>
            <span className="w-1 bg-[#B96891] rounded-full h-6 animate-pulse delay-200"></span>
            <span className="w-1 bg-[#EFA6C5] rounded-full h-3.5 animate-pulse delay-100"></span>
          </div>
        </div>

        {/* Real-time Live Transcript Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 min-h-[220px] max-h-[340px] bg-white/60">
          {transcripts.map((t, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                t.speaker === "Sidzi" ? "items-start" : "items-end"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-[#817780]">
                  {t.speaker === "Sidzi" ? "Sidzi (Receptionist)" : t.speaker}
                </span>
                <span className="text-[10px] text-[#817780]">{t.time}</span>
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed shadow-xs ${
                  t.speaker === "Sidzi"
                    ? "bg-white text-[#29212B] border border-[#F8DCE8]"
                    : "bg-[#29212B] text-white"
                }`}
              >
                {t.text}
              </div>
            </div>
          ))}

          {/* Live Action Badges */}
          {appointmentBooked && (
            <div className="p-3 bg-[#D8EDEA]/40 rounded-xl border border-[#c2e4e0] text-xs text-[#29212B] flex items-center gap-2 animate-in fade-in">
              <span className="font-semibold text-[#65B8B5]">📅 Appointment Confirmed:</span>
              <span>{appointmentBooked}</span>
            </div>
          )}

          {refillStatus && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 animate-in fade-in ${
                refillStatus.includes("Nurse")
                  ? "bg-[#FCEEF3] border-[#F8DCE8] text-[#B96891]"
                  : "bg-[#D8EDEA]/50 border-[#c2e4e0] text-[#65B8B5]"
              }`}
            >
              <span className="font-semibold">💊 Prescription Status:</span>
              <span>{refillStatus}</span>
            </div>
          )}
        </div>

        {/* Quick Demo Actions */}
        <div className="p-4 bg-white border-t border-[#F8DCE8]">
          <p className="text-[11px] uppercase tracking-wider text-[#817780] font-semibold mb-2">
            Try asking Sidzi (Click to test dialogue):
          </p>
          <div className="flex flex-wrap gap-2">
            {!isVerified ? (
              <>
                <button
                  onClick={() => handleVerify("Travis", "1997-07-14")}
                  className="px-3 py-1.5 rounded-lg bg-[#FCEEF3] hover:bg-[#F8DCE8] text-[#29212B] text-xs font-medium transition-colors cursor-pointer border border-[#F8DCE8]"
                >
                  "I'm Travis, born July 14, 1997"
                </button>
                <button
                  onClick={() => handleVerify("Maria Gonzalez", "1985-03-14")}
                  className="px-3 py-1.5 rounded-lg bg-[#FCEEF3] hover:bg-[#F8DCE8] text-[#29212B] text-xs font-medium transition-colors cursor-pointer border border-[#F8DCE8]"
                >
                  "Maria Gonzalez, March 14, 1985"
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleBookSlot("Monday at 9:00 AM", "Dr. Anita Patel")}
                  className="px-3 py-1.5 rounded-lg bg-[#FCEEF3] hover:bg-[#F8DCE8] text-[#B96891] text-xs font-medium border border-[#F8DCE8] transition-colors cursor-pointer"
                >
                  "Book Dr. Patel for Monday 9 AM"
                </button>
                <button
                  onClick={() => handleBookSlot("Thursday at 9:00 AM", "Dr. Marcus Lee")}
                  className="px-3 py-1.5 rounded-lg bg-[#FCEEF3] hover:bg-[#F8DCE8] text-[#B96891] text-xs font-medium border border-[#F8DCE8] transition-colors cursor-pointer"
                >
                  "Book Dr. Lee for Thursday 9 AM"
                </button>
                <button
                  onClick={() => handleRefill("Amoxicillin", false)}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#FCEEF3] text-[#29212B] text-xs font-medium border border-[#F8DCE8] transition-colors cursor-pointer"
                >
                  "Refill Amoxicillin" (Standard)
                </button>
                <button
                  onClick={() => handleRefill("Lorazepam", true)}
                  className="px-3 py-1.5 rounded-lg bg-[#FCEEF3] hover:bg-[#F8DCE8] text-[#B96891] text-xs font-medium border border-[#F8DCE8] transition-colors cursor-pointer"
                >
                  "Refill Lorazepam" (Controlled Nurse Check)
                </button>
              </>
            )}
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="px-6 py-4 bg-[#FFF9F8] border-t border-[#F8DCE8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMicMuted(!micMuted)}
              className={`p-2.5 rounded-full border text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                micMuted
                  ? "bg-[#FCEEF3] text-[#B96891] border-[#F8DCE8]"
                  : "bg-white text-[#29212B] border-[#F8DCE8] hover:bg-[#FCEEF3]"
              }`}
            >
              <span>{micMuted ? "🔇 Mic Muted" : "🎙️ Mic Active"}</span>
            </button>
            <span className="text-xs text-[#817780]">
              LiveKit audio stream ready
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#B96891] hover:bg-[#a2557d] text-white font-medium text-xs shadow-xs transition-colors cursor-pointer"
          >
            End Call
          </button>
        </div>
      </div>
    </div>
  );
}
