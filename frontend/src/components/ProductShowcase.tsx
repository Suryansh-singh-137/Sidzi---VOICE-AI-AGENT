"use client";

import React from "react";

export default function ProductShowcase() {
  return (
    <section className="w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-2xl text-left mb-14">
        <span className="text-xs uppercase tracking-wider text-[#B96891] font-semibold bg-[#FCEEF3] px-3 py-1 rounded-full border border-[#F8DCE8]">
          Capabilities & Platform
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-[50px] font-normal tracking-[-0.03em] leading-[1.1] text-[#29212B] mt-4">
          Clinical intelligence built for patients, trusted by doctors.
        </h2>
        <p className="font-sans text-[16px] sm:text-[18px] text-[#817780] mt-4 leading-relaxed">
          Sidzi handles repetitive clinic front-desk tasks with absolute clinical safety, leaving nurses and physicians focused on care.
        </p>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Bento Card 1: Large Span (md:col-span-8) - AI Voice Receptionist */}
        <div className="md:col-span-8 rounded-[32px] p-8 sm:p-10 bg-gradient-to-br from-[#FCEEF3]/70 via-white to-[#EAE5FA]/30 border border-[#F8DCE8] shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-white text-[#B96891] flex items-center justify-center border border-[#F8DCE8] shadow-xs mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#29212B] font-normal tracking-tight">
              AI Voice Receptionist with Verified Chart Matching
            </h3>
            <p className="font-sans text-[15px] text-[#817780] mt-3 leading-relaxed max-w-xl">
              Callers speak naturally to book appointments, ask clinic questions, or check copays. Every caller is authenticated against clinic records before any personal medical data is accessed.
            </p>
          </div>

          {/* Visual Mini Interface inside card */}
          <div className="mt-8 pt-6 border-t border-[#F8DCE8]/70 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium text-[#29212B]">
                LiveKit Sub-500ms Audio Pipeline
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-white border border-[#F8DCE8] text-[#817780]">
                Deepgram Nova-2 STT
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#F8DCE8] text-[#817780]">
                Llama 3.3 70B Groq
              </span>
            </div>
          </div>
        </div>

        {/* Bento Card 2: Small Span (md:col-span-4) - Deterministic Scheduling */}
        <div className="md:col-span-4 rounded-[32px] p-8 bg-white border border-[#F8DCE8] shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-[#FCEEF3] text-[#B96891] flex items-center justify-center border border-[#F8DCE8] shadow-xs mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-[#29212B] font-normal tracking-tight">
              Deterministic Scheduling
            </h3>
            <p className="font-sans text-[14px] text-[#817780] mt-2.5 leading-relaxed">
              Opaque slot handles eliminate invented times. Every confirmation locks real physician calendars with concurrency protection.
            </p>
          </div>

          <div className="mt-6 p-3 rounded-2xl bg-[#FFF9F8] border border-[#F8DCE8] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#29212B]">Dr. Anita Patel</span>
              <span className="text-[#65B8B5] font-semibold">Mon 9:00 AM</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#29212B]">Dr. Marcus Lee</span>
              <span className="text-[#B96891] font-semibold">Thu 2:30 PM</span>
            </div>
          </div>
        </div>

        {/* Bento Card 3: Span 4 (md:col-span-4) - Safety & Triage */}
        <div className="md:col-span-4 rounded-[32px] p-8 bg-white border border-[#F8DCE8] shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-[#D8EDEA] text-[#65B8B5] flex items-center justify-center border border-[#c1e5e1] shadow-xs mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-[#29212B] font-normal tracking-tight">
              Clinical Safety Guardrails
            </h3>
            <p className="font-sans text-[14px] text-[#817780] mt-2.5 leading-relaxed">
              Standard medications route straight to the pharmacy. Controlled drugs automatically escalate to clinical triage nurses.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
              Amoxicillin ✓ Approved
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#FCEEF3] text-[#B96891] border border-[#F8DCE8] font-medium">
              Lorazepam ⚠️ Nurse Hand-off
            </span>
          </div>
        </div>

        {/* Bento Card 4: Span 8 (md:col-span-8) - Automated Follow-ups & Coordination */}
        <div className="md:col-span-8 rounded-[32px] p-8 sm:p-10 bg-gradient-to-br from-[#EAE5FA]/40 via-white to-[#FCEEF3]/50 border border-[#F8DCE8] shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-white text-[#B96891] flex items-center justify-center border border-[#F8DCE8] shadow-xs mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#29212B] font-normal tracking-tight">
              Automated Follow-ups & Real-time Staff Handoff
            </h3>
            <p className="font-sans text-[15px] text-[#817780] mt-3 leading-relaxed max-w-xl">
              Patients receive instant SMS booking summaries and intake forms. When human receptionists or nurses take over, the entire transcribed context is already on their screen.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-[#817780]">
            <span className="flex items-center gap-1.5 font-medium text-[#29212B]">
              <span className="text-emerald-500">✓</span> Instant SMS confirmation
            </span>
            <span className="flex items-center gap-1.5 font-medium text-[#29212B]">
              <span className="text-emerald-500">✓</span> Live Redis staff broadcasting
            </span>
            <span className="flex items-center gap-1.5 font-medium text-[#29212B]">
              <span className="text-emerald-500">✓</span> Zero patient repetition
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

