"use client";

import React from "react";

interface SayItOnceSectionProps {
  onCallClick: () => void;
}

export default function SayItOnceSection({ onCallClick }: SayItOnceSectionProps) {
  return (
    <section className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Editorial Copy & CTA */}
        <div className="lg:col-span-5 text-left">
          <h2 className="font-serif text-[40px] sm:text-[50px] md:text-[58px] font-normal tracking-[-0.03em] leading-[1.08] text-zinc-950">
            Say it once.
            <br />
            <span className="italic text-[#0D9488]">Sidzi handles the rest.</span>
          </h2>

          <p className="mt-6 text-[17px] sm:text-[18px] text-zinc-600 font-normal leading-relaxed max-w-md">
            No menus. No hold music. Just a conversation.
          </p>

          <div className="mt-8">
            <button
              onClick={onCallClick}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-zinc-950 text-white font-medium text-[14.5px] shadow-xs hover:bg-black hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-950"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-[2.2] -rotate-12"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call Sidzi</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Conversation Card */}
        <div className="lg:col-span-7">
          <div className="relative rounded-[32px] p-6 sm:p-9 bg-gradient-to-br from-teal-50/70 via-cyan-50/40 to-emerald-50/25 border border-teal-100/70 shadow-xl shadow-teal-950/[0.03] backdrop-blur-sm transition-all hover:shadow-2xl hover:shadow-teal-950/[0.05]">
            {/* Ambient subtle decorative light */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Conversation Header */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-teal-100/60">
              <div className="flex items-center gap-3">
                {/* 3D Iridescent Orb Avatar */}
                <div
                  className="w-8 h-8 rounded-full shadow-inner ring-1 ring-white/80"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, #E0F2FE 0%, #A5F3FC 30%, #5EEAD4 60%, #0D9488 100%)",
                    boxShadow: "inset -2px -2px 4px rgba(13, 148, 136, 0.4), 0 2px 6px rgba(13, 148, 136, 0.2)",
                  }}
                  aria-hidden="true"
                />
                <span className="font-sans text-[14.5px] font-medium text-zinc-800">
                  Sidzi <span className="text-zinc-400 font-normal">· on the line</span>
                </span>
              </div>

              {/* Call Timer */}
              <span className="font-mono text-xs text-zinc-500 font-medium tracking-tight bg-white/60 px-2.5 py-1 rounded-full border border-teal-100/60">
                0:42
              </span>
            </div>

            {/* Dialogue Bubble Thread */}
            <div className="space-y-4">
              {/* Message 1: Caller */}
              <div className="flex justify-end">
                <div className="bg-[#111111] text-white px-5 py-3 rounded-2xl rounded-tr-xs text-[14.5px] leading-relaxed max-w-[85%] shadow-xs">
                  Hi, I’d like to book my annual physical.
                </div>
              </div>

              {/* Message 2: Sidzi */}
              <div className="flex justify-start">
                <div className="bg-white text-zinc-900 px-5 py-3 rounded-2xl rounded-tl-xs text-[14.5px] leading-relaxed max-w-[85%] shadow-sm border border-zinc-200/70">
                  Happy to help. What’s your name and date of birth?
                </div>
              </div>

              {/* Message 3: Caller */}
              <div className="flex justify-end">
                <div className="bg-[#111111] text-white px-5 py-3 rounded-2xl rounded-tr-xs text-[14.5px] leading-relaxed max-w-[85%] shadow-xs">
                  Maria Gonzalez, March 14th, 1985.
                </div>
              </div>

              {/* Status Note: Audio lookup */}
              <div className="flex items-center gap-2 py-1 px-1">
                <svg
                  className="w-3.5 h-3.5 text-teal-600 animate-pulse"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
                <span className="text-xs text-teal-700 italic font-medium">
                  Thanks, let me pull up your chart.
                </span>
              </div>

              {/* Message 4: Sidzi */}
              <div className="flex justify-start">
                <div className="bg-white text-zinc-900 px-5 py-3 rounded-2xl rounded-tl-xs text-[14.5px] leading-relaxed max-w-[88%] shadow-sm border border-zinc-200/70">
                  Dr. Patel has Monday at 9 AM. Does that work?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

