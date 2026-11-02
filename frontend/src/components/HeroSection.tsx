"use client";

import React from "react";
import AcousticWaveRibbon from "./AcousticWaveRibbon";

interface HeroSectionProps {
  onCallClick: () => void;
  isCalling?: boolean;
}

export default function HeroSection({ onCallClick, isCalling = false }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-between items-center pt-10 sm:pt-14 md:pt-18 overflow-hidden bg-gradient-to-b from-[#FFF9F8] via-[#FFF9F8] to-[#FCEEF3]/40">
      {/* Background ambient blush/lavender gradients */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-r from-[#FCEEF3] via-[#EAE5FA]/40 to-[#D8EDEA]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Centered Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Subtle pill kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCEEF3] border border-[#F8DCE8] text-xs font-medium text-[#B96891] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B96891] animate-ping" />
          <span>Next-generation clinic reception</span>
        </div>

        {/* Editorial Display Headline */}
        <h1 className="font-serif text-[46px] sm:text-[62px] md:text-[74px] lg:text-[84px] font-normal tracking-[-0.035em] leading-[1.06] text-[#29212B] text-balance">
          A receptionist that never
          <br />
          <span className="italic text-[#B96891] font-normal">puts patients on hold.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 sm:mt-7 text-[17px] sm:text-[20px] text-[#817780] font-normal leading-relaxed max-w-xl mx-auto text-balance">
          Meet Sidzi, your clinic’s AI receptionist. Natural voice scheduling, verified charts, and safe pharmacy coordination.
        </p>

        {/* Primary Call-to-Action */}
        <div className="mt-8 flex flex-col items-center">
          <button
            onClick={onCallClick}
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#29212B] text-white font-medium text-[15px] shadow-sm hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#29212B]"
            aria-label="Call Sidzi AI Receptionist"
          >
            <svg
              className="w-4 h-4 fill-none stroke-current stroke-[2.2] -rotate-12 transition-transform group-hover:-rotate-6"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Call Sidzi</span>
          </button>

          {/* 3-Step Walkthrough Guide */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 sm:gap-x-9 gap-y-2 text-[14px] text-[#817780] select-none">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#FCEEF3] text-[#B96891] border border-[#F8DCE8] text-[11px] font-semibold flex items-center justify-center">
                1
              </span>
              <span className="font-normal text-[#29212B]">Press Call Sidzi</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#FCEEF3] text-[#B96891] border border-[#F8DCE8] text-[11px] font-semibold flex items-center justify-center">
                2
              </span>
              <span className="font-normal text-[#29212B]">Allow the mic</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#FCEEF3] text-[#B96891] border border-[#F8DCE8] text-[11px] font-semibold flex items-center justify-center">
                3
              </span>
              <span className="font-normal text-[#29212B]">Start talking</span>
            </div>
          </div>

          {/* Secondary Link */}
          <button
            onClick={onCallClick}
            className="mt-5 text-[14px] text-[#817780] hover:text-[#29212B] underline underline-offset-4 decoration-[#F8DCE8] hover:decoration-[#B96891] transition-colors cursor-pointer"
          >
            Watch a call
          </button>
        </div>
      </div>

      {/* Sinuous Flowing Wave Graphic pinned to bottom of viewport */}
      <div className="relative w-full mt-auto pt-6 overflow-hidden">
        <AcousticWaveRibbon
          isCalling={isCalling}
          className="h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px] -mb-2"
        />
      </div>
    </section>
  );
}

