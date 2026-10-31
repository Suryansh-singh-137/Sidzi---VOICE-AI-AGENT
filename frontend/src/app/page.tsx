"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import AcousticWaveRibbon from "@/components/AcousticWaveRibbon";
import CallModal from "@/components/CallModal";
import StaffConsoleModal from "@/components/StaffConsoleModal";
import CallHistoryModal from "@/components/CallHistoryModal";

export default function Home() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isStaffConsoleOpen, setIsStaffConsoleOpen] = useState(false);
  const [isCallHistoryOpen, setIsCallHistoryOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 flex flex-col justify-between overflow-x-hidden selection:bg-teal-100 selection:text-teal-900">
      {/* Top Navigation */}
      <Navbar
        onCallClick={() => setIsCallModalOpen(true)}
        onStaffConsoleClick={() => setIsStaffConsoleOpen(true)}
        onCallHistoryClick={() => setIsCallHistoryOpen(true)}
        isCalling={isCallModalOpen}
      />

      {/* Main Hero Section */}
      <main className="relative flex-1 flex flex-col items-center justify-start pt-12 sm:pt-16 md:pt-20 px-6 sm:px-8 text-center z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Editorial Display Headline */}
          <h1 className="font-serif text-[42px] sm:text-[54px] md:text-[66px] lg:text-[74px] font-normal tracking-[-0.03em] leading-[1.09] text-[#111111] text-balance">
            A receptionist that never
            <br />
            puts patients on hold
          </h1>

          {/* Subtitle */}
          <p className="mt-6 sm:mt-7 text-[17px] sm:text-[19px] text-[#222222] font-normal leading-relaxed max-w-xl mx-auto text-balance">
            Meet Sidzi, your clinic’s AI receptionist. Just call and ask.
          </p>

          {/* Primary Call-to-Action */}
          <div className="mt-7 sm:mt-8 flex flex-col items-center">
            <button
              onClick={() => setIsCallModalOpen(true)}
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-zinc-950 text-white font-medium text-[15px] shadow-xs hover:bg-black hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-950"
              aria-label="Call Sidzi AI Receptionist"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-[2.2] -rotate-12 transition-transform group-hover:-rotate-6"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call Sidzi</span>
            </button>

            {/* 3-Step Walkthrough Guide */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 sm:gap-x-9 gap-y-2 text-[14px] text-zinc-500 select-none">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-semibold flex items-center justify-center">
                  1
                </span>
                <span className="font-normal text-zinc-600">Press Call Sidzi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-semibold flex items-center justify-center">
                  2
                </span>
                <span className="font-normal text-zinc-600">Allow the mic</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-semibold flex items-center justify-center">
                  3
                </span>
                <span className="font-normal text-zinc-600">Start talking</span>
              </div>
            </div>

            {/* Secondary Link */}
            <button
              onClick={() => setIsCallModalOpen(true)}
              className="mt-5 text-[14px] text-zinc-500 hover:text-zinc-900 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 transition-colors cursor-pointer"
            >
              Watch a call
            </button>
          </div>
        </div>
      </main>

      {/* Sinuous 3D Acoustic Waveform Ribbon across bottom */}
      <div className="relative w-full mt-auto pt-6 pb-2 overflow-hidden">
        <AcousticWaveRibbon
          isCalling={isCallModalOpen}
          className="h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px] -mb-4"
        />
      </div>

      {/* Interactive Modals */}
      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />
      <StaffConsoleModal
        isOpen={isStaffConsoleOpen}
        onClose={() => setIsStaffConsoleOpen(false)}
      />
      <CallHistoryModal
        isOpen={isCallHistoryOpen}
        onClose={() => setIsCallHistoryOpen(false)}
      />
    </div>
  );
}
