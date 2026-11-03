"use client";

import React, { useState } from "react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#FFF9F8]/90 backdrop-blur-md sticky top-0 z-40 transition-colors border-b border-[#F8DCE8]/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96891] rounded-lg p-1 -m-1"
            aria-label="Sidzi Home"
          >
            {/* Minimalist 4-bar soundwave mark in Deep Plum */}
            <div className="flex items-center gap-[3.5px] h-6 px-0.5" aria-hidden="true">
              <span className="w-[2.75px] h-3 bg-[#29212B] rounded-full transition-all group-hover:h-4 group-hover:bg-[#B96891]"></span>
              <span className="w-[2.75px] h-5 bg-[#29212B] rounded-full transition-all group-hover:h-6 group-hover:bg-[#B96891]"></span>
              <span className="w-[2.75px] h-3.5 bg-[#29212B] rounded-full transition-all group-hover:h-5 group-hover:bg-[#B96891]"></span>
              <span className="w-[2.75px] h-2.5 bg-[#29212B] rounded-full transition-all group-hover:h-3.5 group-hover:bg-[#B96891]"></span>
            </div>
            <span className="font-sans text-[21px] font-semibold tracking-[-0.03em] text-[#29212B] group-hover:text-[#B96891] transition-colors">
              Sidzi
            </span>
          </button>
        </div>

        {/* Desktop Navigation Items */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          <a
            href="#services"
            className="text-[14.5px] font-normal text-[#817780] hover:text-[#29212B] transition-colors"
          >
            Services
          </a>
          <a
            href="#how-it-works"
            className="text-[14.5px] font-normal text-[#817780] hover:text-[#29212B] transition-colors"
          >
            How it works
          </a>
          <a
            href="#care-team"
            className="text-[14.5px] font-normal text-[#817780] hover:text-[#29212B] transition-colors"
          >
            Care team
          </a>
          <button
            onClick={onStaffConsoleClick}
            className="text-[14.5px] font-normal text-[#817780] hover:text-[#29212B] transition-colors cursor-pointer"
          >
            Staff console
          </button>
          <button
            onClick={onCallHistoryClick}
            className="text-[14.5px] font-normal text-[#817780] hover:text-[#29212B] transition-colors cursor-pointer"
          >
            Call history
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={onCallClick}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-medium transition-all duration-200 cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#29212B] ${
              isCalling
                ? "bg-[#B96891] text-white hover:bg-[#a2557d] animate-pulse"
                : "bg-[#29212B] text-white hover:bg-black hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            <svg
              className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.2] -rotate-12"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>{isCalling ? "In Call..." : "Call Sidzi"}</span>
          </button>

          {/* User Avatar Circle */}
          <div
            className="w-9 h-9 rounded-full bg-[#B96891] text-white font-medium text-[14px] flex items-center justify-center select-none shadow-xs border border-white/40 ring-1 ring-[#F8DCE8]"
            title="Patient Profile: Travis"
            aria-label="User profile Travis"
          >
            T
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onCallClick}
            className="px-4 py-2 rounded-full bg-[#29212B] text-white text-xs font-medium"
          >
            Call Sidzi
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#29212B] hover:bg-[#FCEEF3] transition-colors"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-5 bg-[#FFF9F8] border-b border-[#F8DCE8] space-y-4">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#29212B]"
          >
            Services
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#29212B]"
          >
            How it works
          </a>
          <a
            href="#care-team"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#29212B]"
          >
            Care team
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onStaffConsoleClick();
            }}
            className="block w-full text-left text-sm font-medium text-[#29212B]"
          >
            Staff console
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onCallHistoryClick();
            }}
            className="block w-full text-left text-sm font-medium text-[#29212B]"
          >
            Call history
          </button>
        </div>
      )}
    </header>
  );
}
