"use client";

import React from "react";

interface FooterProps {
  onCallClick: () => void;
  onStaffConsoleClick: () => void;
  onCallHistoryClick: () => void;
}

export default function Footer({
  onCallClick,
  onStaffConsoleClick,
  onCallHistoryClick,
}: FooterProps) {
  return (
    <footer className="w-full bg-[#FFF9F8] border-t border-[#F8DCE8] pt-16 pb-12 px-6 sm:px-10 lg:px-14 text-[#817780] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#F8DCE8]/80">
          {/* Brand Info */}
          <div className="md:col-span-5 text-left">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center gap-[3px] h-5" aria-hidden="true">
                <span className="w-[2.5px] h-2.5 bg-[#29212B] rounded-full"></span>
                <span className="w-[2.5px] h-4 bg-[#29212B] rounded-full"></span>
                <span className="w-[2.5px] h-3 bg-[#29212B] rounded-full"></span>
                <span className="w-[2.5px] h-2 bg-[#29212B] rounded-full"></span>
              </div>
              <span className="font-sans text-[20px] font-semibold tracking-[-0.03em] text-[#29212B]">
                Sidzi
              </span>
              <span className="text-xs text-[#817780] font-normal">
                · Maple Grove Family Clinic
              </span>
            </div>

            <p className="text-[14px] text-[#817780] leading-relaxed max-w-sm mb-6">
              A voice-first clinic receptionist with an editorial commitment to warmth, simplicity, and clinical excellence. Zero hold times, deterministic scheduling, and immediate pharmacy triage.
            </p>

            {/* Emergency Notice */}
            <div className="p-4 rounded-2xl bg-[#FCEEF3] border border-[#F8DCE8] text-[12px] text-[#29212B] leading-normal max-w-sm">
              <strong className="font-semibold text-[#B96891]">Emergency medical notice:</strong> If you are experiencing a life-threatening medical emergency, please hang up and dial 911 immediately.
            </div>
          </div>

          {/* Navigation Column 1: Patients */}
          <div className="md:col-span-2 md:col-start-7 text-left">
            <h4 className="text-xs font-semibold text-[#29212B] uppercase tracking-wider mb-4">
              Patients
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <button
                  onClick={onCallClick}
                  className="hover:text-[#29212B] transition-colors text-left cursor-pointer"
                >
                  Call Sidzi now
                </button>
              </li>
              <li>
                <button
                  onClick={onCallClick}
                  className="hover:text-[#29212B] transition-colors text-left cursor-pointer"
                >
                  Book appointment
                </button>
              </li>
              <li>
                <button
                  onClick={onCallClick}
                  className="hover:text-[#29212B] transition-colors text-left cursor-pointer"
                >
                  Prescription refills
                </button>
              </li>
              <li>
                <a href="#services" className="hover:text-[#29212B] transition-colors">
                  Clinical services
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Clinic Team */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-semibold text-[#29212B] uppercase tracking-wider mb-4">
              Clinic Team
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <button
                  onClick={onStaffConsoleClick}
                  className="hover:text-[#29212B] transition-colors text-left cursor-pointer"
                >
                  Staff console
                </button>
              </li>
              <li>
                <button
                  onClick={onCallHistoryClick}
                  className="hover:text-[#29212B] transition-colors text-left cursor-pointer"
                >
                  Call history
                </button>
              </li>
              <li>
                <a href="#care-team" className="hover:text-[#29212B] transition-colors">
                  Provider schedules
                </a>
              </li>
              <li>
                <span className="text-[#817780]/60 cursor-not-allowed">Nurse triage desk</span>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Trust & Compliance */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-semibold text-[#29212B] uppercase tracking-wider mb-4">
              Trust & Safety
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              <li className="flex items-center gap-1.5 text-[#65B8B5] font-medium">
                <span>✓</span>
                <span>HIPAA Compliant</span>
              </li>
              <li className="text-[#817780]">Encrypted TLS Audio</li>
              <li className="text-[#817780]">Patient Auth Check</li>
              <li className="text-[#817780]">Nurse Guardrails</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#817780]">
          <p>© 2026 Maple Grove Family Clinic. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#29212B] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#29212B] cursor-pointer">Notice of Privacy Practices</span>
            <span className="hover:text-[#29212B] cursor-pointer">Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
