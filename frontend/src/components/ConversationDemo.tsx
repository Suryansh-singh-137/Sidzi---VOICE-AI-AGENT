"use client";

import React, { useState, useEffect, useRef } from "react";

interface ConversationDemoProps {
  onCallClick: () => void;
}

export default function ConversationDemo({ onCallClick }: ConversationDemoProps) {
  // Current playback step: 0 to 7
  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [timerSeconds, setTimerSeconds] = useState<number>(12);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Live timer tick
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimerSeconds((prev) => (prev >= 59 ? 0 : prev + 1));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Sequential animation player
  useEffect(() => {
    if (!isPlaying) return;

    let timeout: NodeJS.Timeout;

    if (step === 0) {
      // Patient message 1
      timeout = setTimeout(() => setStep(1), 800);
    } else if (step === 1) {
      // Show typing indicator
      timeout = setTimeout(() => setStep(2), 1600);
    } else if (step === 2) {
      // Sidzi response 1
      timeout = setTimeout(() => setStep(3), 1400);
    } else if (step === 3) {
      // Patient message 2
      timeout = setTimeout(() => setStep(4), 1800);
    } else if (step === 4) {
      // Audio lookup note
      timeout = setTimeout(() => setStep(5), 1600);
    } else if (step === 5) {
      // Sidzi response 2 (Dr. Patel offer)
      timeout = setTimeout(() => setStep(6), 1800);
    } else if (step === 6) {
      // Patient confirmation ("Perfect.")
      timeout = setTimeout(() => setStep(7), 1600);
    } else if (step === 7) {
      // Confirmation card appears, then pause before restarting
      timeout = setTimeout(() => {
        setStep(8);
      }, 1200);
    } else if (step === 8) {
      // Rest at completed state, then loop
      timeout = setTimeout(() => {
        setStep(0);
      }, 7000);
    }

    return () => clearTimeout(timeout);
  }, [step, isPlaying]);

  const restart = () => {
    setStep(0);
    setIsPlaying(true);
  };

  return (
    <section className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Editorial Headline & CTA */}
        <div className="lg:col-span-5 text-left">
          <span className="text-xs uppercase tracking-wider text-[#B96891] font-semibold bg-[#FCEEF3] px-3 py-1 rounded-full border border-[#F8DCE8]">
            Patient Conversation Experience
          </span>

          <h2 className="font-serif text-[42px] sm:text-[52px] md:text-[60px] font-normal tracking-[-0.03em] leading-[1.08] text-[#29212B] mt-5">
            Say it once.
            <br />
            <span className="italic text-[#B96891]">Sidzi handles the rest.</span>
          </h2>

          <p className="mt-6 text-[17px] sm:text-[18px] text-[#817780] font-normal leading-relaxed max-w-md">
            No menus. No hold music. Just a natural, caring conversation that schedules appointments and coordinates care in seconds.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={onCallClick}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#29212B] text-white font-medium text-[14.5px] shadow-sm hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#29212B]"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-[2.2] -rotate-12"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call Sidzi</span>
            </button>

            <button
              onClick={restart}
              className="px-4 py-3 text-xs font-medium text-[#817780] hover:text-[#29212B] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>↺</span>
              <span>Replay demo</span>
            </button>
          </div>
        </div>

        {/* Right Column: Animated Interactive Chat Container */}
        <div className="lg:col-span-7">
          <div className="relative rounded-[32px] p-6 sm:p-9 bg-gradient-to-br from-[#FCEEF3] via-[#FFF9F8] to-[#D8EDEA]/35 border border-[#F8DCE8] shadow-xl shadow-[#B96891]/[0.05] transition-all">
            {/* Subtle ambient light glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#EFA6C5]/20 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Conversation Header */}
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#F8DCE8]">
              <div className="flex items-center gap-3">
                {/* 3D Iridescent Orb Avatar */}
                <div
                  className="w-8 h-8 rounded-full shadow-inner ring-2 ring-white/90 animate-pulse"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, #FFFFFF 0%, #F8DCE8 30%, #EFA6C5 60%, #65B8B5 100%)",
                    boxShadow: "inset -2px -2px 4px rgba(185, 104, 145, 0.35), 0 2px 8px rgba(239, 166, 197, 0.3)",
                  }}
                  aria-hidden="true"
                />
                <span className="font-sans text-[14.5px] font-medium text-[#29212B]">
                  Sidzi <span className="text-[#817780] font-normal">· on the line</span>
                </span>
              </div>

              {/* Status and Timer */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-[11px] text-[#817780] hover:text-[#29212B] px-2 py-0.5 rounded-md hover:bg-white/80 transition-colors cursor-pointer"
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <span className="font-mono text-xs text-[#817780] font-medium bg-white/80 px-2.5 py-1 rounded-full border border-[#F8DCE8]">
                  0:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                </span>
              </div>
            </div>

            {/* Live Message Thread with Sequential Animations */}
            <div className="space-y-3.5 min-h-[380px] flex flex-col justify-start">
              {/* Message 1: Patient */}
              {step >= 1 && (
                <div className="flex justify-end transition-all duration-300 transform translate-y-0 opacity-100">
                  <div className="bg-[#29212B] text-white px-5 py-3 rounded-2xl rounded-tr-xs text-[14.5px] leading-relaxed max-w-[85%] shadow-xs">
                    Hi, I’d like to book my annual physical.
                  </div>
                </div>
              )}

              {/* Typing Indicator for Sidzi */}
              {step === 2 && (
                <div className="flex justify-start transition-opacity duration-200">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-xs border border-[#F8DCE8] flex items-center gap-1.5 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B96891] animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B96891] animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B96891] animate-bounce delay-200"></span>
                  </div>
                </div>
              )}

              {/* Message 2: Sidzi */}
              {step >= 3 && (
                <div className="flex justify-start transition-all duration-300 transform translate-y-0 opacity-100">
                  <div className="bg-white text-[#29212B] px-5 py-3 rounded-2xl rounded-tl-xs text-[14.5px] leading-relaxed max-w-[85%] shadow-sm border border-[#F8DCE8]/80">
                    Happy to help. What’s your name and date of birth?
                  </div>
                </div>
              )}

              {/* Message 3: Patient */}
              {step >= 4 && (
                <div className="flex justify-end transition-all duration-300 transform translate-y-0 opacity-100">
                  <div className="bg-[#29212B] text-white px-5 py-3 rounded-2xl rounded-tr-xs text-[14.5px] leading-relaxed max-w-[85%] shadow-xs">
                    Maria Gonzalez, March 14th, 1985.
                  </div>
                </div>
              )}

              {/* Audio Status Note */}
              {step >= 5 && (
                <div className="flex items-center gap-2 py-1 px-1 transition-all duration-300">
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 h-2 bg-[#65B8B5] rounded-full animate-pulse"></span>
                    <span className="w-0.5 h-3.5 bg-[#65B8B5] rounded-full animate-pulse delay-75"></span>
                    <span className="w-0.5 h-1.5 bg-[#65B8B5] rounded-full animate-pulse delay-150"></span>
                  </div>
                  <span className="text-xs text-[#65B8B5] italic font-medium">
                    Thanks, let me pull up your chart.
                  </span>
                </div>
              )}

              {/* Message 4: Sidzi */}
              {step >= 6 && (
                <div className="flex justify-start transition-all duration-300 transform translate-y-0 opacity-100">
                  <div className="bg-white text-[#29212B] px-5 py-3 rounded-2xl rounded-tl-xs text-[14.5px] leading-relaxed max-w-[88%] shadow-sm border border-[#F8DCE8]/80">
                    Dr. Patel has Monday at 9 AM. Does that work?
                  </div>
                </div>
              )}

              {/* Message 5: Patient ("Perfect.") */}
              {step >= 7 && (
                <div className="flex justify-end transition-all duration-300 transform translate-y-0 opacity-100">
                  <div className="bg-[#29212B] text-white px-5 py-2.5 rounded-2xl rounded-tr-xs text-[14.5px] leading-relaxed shadow-xs">
                    Perfect.
                  </div>
                </div>
              )}

              {/* Final Confirmation Card */}
              {step >= 8 && (
                <div className="mt-2 p-4 bg-white/95 rounded-2xl border border-[#D8EDEA] shadow-md shadow-[#65B8B5]/10 flex items-center gap-3.5 transition-all duration-400 transform translate-y-0 opacity-100">
                  <div className="w-8 h-8 rounded-full bg-[#D8EDEA] text-[#65B8B5] flex items-center justify-center font-bold text-sm shrink-0">
                    ✓
                  </div>
                  <div className="text-left">
                    <h4 className="font-sans text-[14.5px] font-semibold text-[#29212B]">
                      Booked
                    </h4>
                    <p className="font-sans text-xs text-[#817780] mt-0.5">
                      Annual physical · Mon 9:00 AM · Dr. Anita Patel
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Stepper Progress Bar */}
            <div className="mt-6 pt-4 border-t border-[#F8DCE8] flex items-center justify-between text-xs text-[#817780]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B96891] animate-ping" />
                Live AI Conversation Simulation
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 3, 4, 6, 7, 8].map((sNum, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setStep(sNum);
                      setIsPlaying(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      step >= sNum ? "bg-[#B96891] w-4" : "bg-[#F8DCE8]"
                    }`}
                    title={`Jump to step ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

