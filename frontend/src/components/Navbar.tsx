"use client";

import React from "react";

interface NavbarProps {
  onCallClick: () => void;
  onStaffConsoleClick: () => void;
  onCallHistoryClick: () => void;
  isCalling?: boolean;
}

export default function Navbar({
  onCallClick,
  onStaffConsoleClick,
  onCallHistoryClick,
  isCalling = false,
}: NavbarProps) {
  return (
    <header className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg p-1 -m-1"
            aria-label="Sidzi Home"
          >
            {/* Minimalist 4-bar soundwave mark */}
            <div className="flex items-center gap-[3.5px] h-6 px-0.5" aria-hidden="true">
              <span className="w-[2.75px] h-3 bg-zinc-950 rounded-full transition-all group-hover:h-4 group-hover:bg-teal-600"></span>
              <span className="w-[2.75px] h-5 bg-zinc-950 rounded-full transition-all group-hover:h-6 group-hover:bg-teal-600"></span>
              <span className="w-[2.75px] h-3.5 bg-zinc-950 rounded-full transition-all group-hover:h-5 group-hover:bg-teal-600"></span>
              <span className="w-[2.75px] h-2.5 bg-zinc-950 rounded-full transition-all group-hover:h-3.5 group-hover:bg-teal-600"></span>
            </div>
            <span className="font-sans text-[21px] font-semibold tracking-[-0.03em] text-zinc-950 group-hover:text-black transition-colors">
              Sidzi
            </span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center gap-5 sm:gap-7" aria-label="Main Navigation">
          <button
            onClick={onStaffConsoleClick}
            className="text-[14.5px] font-normal text-zinc-600 hover:text-zinc-950 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-md py-1 px-1 cursor-pointer"
          >
            Staff console
          </button>

          <button
            onClick={onCallHistoryClick}
            className="text-[14.5px] font-normal text-zinc-600 hover:text-zinc-950 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-md py-1 px-1 cursor-pointer"
          >
            Call history
          </button>

          {/* Header Action Button */}
          <button
            onClick={onCallClick}
            className={`flex items-center gap-2 px-4.5 py-2 rounded-full text-[14px] font-medium transition-all duration-200 cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-950 ${
              isCalling
                ? "bg-teal-700 text-white hover:bg-teal-800 ring-2 ring-teal-500/40 animate-pulse"
                : "bg-zinc-950 text-white hover:bg-black hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {/* Phone outline icon */}
            <svg
              className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.2] -rotate-12"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>{isCalling ? "In Call..." : "Call Sidzi"}</span>
          </button>

          {/* User Avatar Circle */}
          <div
            className="w-9 h-9 rounded-full bg-[#2c4046] text-white font-medium text-[14px] flex items-center justify-center select-none shadow-xs border border-white/40 ring-1 ring-zinc-200"
            title="Logged in as Travis (Patient)"
            aria-label="User profile Travis"
          >
            T
          </div>
        </nav>
      </div>
    </header>
  );
}

