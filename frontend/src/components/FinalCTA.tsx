"use client";

import React from "react";

interface FinalCTAProps {
  onCallClick: () => void;
}

export default function FinalCTA({ onCallClick }: FinalCTAProps) {
  return (
    <section className="w-full py-16 sm:py-24 px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto">
      <div className="relative rounded-[40px] p-10 sm:p-16 md:p-20 bg-gradient-to-br from-[#FCEEF3] via-[#EAE5FA]/50 to-[#D8EDEA]/40 border border-[#F8DCE8] text-center overflow-hidden shadow-sm">
        {/* Ambient floating blur light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[340px] bg-white/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <span className="text-xs uppercase tracking-wider text-[#B96891] font-semibold bg-white/80 px-3.5 py-1 rounded-full border border-[#F8DCE8] mb-6">
            Immediate Clinic Access
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-[62px] font-normal tracking-[-0.03em] leading-[1.08] text-[#29212B] text-balance">
            Healthcare without
            <br />
            <span className="italic text-[#B96891]">the hold music.</span>
          </h2>

          <p className="mt-6 text-[17px] sm:text-[19px] text-[#817780] font-normal leading-relaxed max-w-lg text-balance">
            Talk to Sidzi right now in your browser. Verify your patient record, schedule with your doctor, or request your refill in seconds.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onCallClick}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#29212B] text-white font-medium text-[15px] shadow-sm hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#29212B]"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-[2.2] -rotate-12"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call Sidzi now</span>
            </button>

            <span className="text-xs text-[#817780]">
              No app download required • Works on mobile and desktop
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

