"use client";

import React from "react";

export interface DemoPatientScenario {
  title: string;
  name: string;
  dob: string;
  actionType: "book" | "reschedule" | "insurance" | "refill_nurse";
  description: string;
}

interface TryItNowSectionProps {
  onSelectScenario: (scenario: DemoPatientScenario) => void;
  onCallClick: () => void;
}

export default function TryItNowSection({
  onSelectScenario,
  onCallClick,
}: TryItNowSectionProps) {
  const scenarios: DemoPatientScenario[] = [
    {
      title: "Book a visit",
      name: "Maria Gonzalez",
      dob: "1985-03-14",
      actionType: "book",
      description: "Maria Gonzalez, born March 14, 1985",
    },
    {
      title: "Move or cancel",
      name: "James Carter",
      dob: "1972-11-02",
      actionType: "reschedule",
      description: "James Carter, born November 2, 1972",
    },
    {
      title: "Check insurance",
      name: "Priya Shah",
      dob: "1990-07-21",
      actionType: "insurance",
      description: "Priya Shah, born July 21, 1990",
    },
    {
      title: "Refill + talk to a nurse",
      name: "Robert Chen",
      dob: "1958-05-09",
      actionType: "refill_nurse",
      description: "Robert Chen, born May 9, 1958",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto border-t border-[#F8DCE8]/60">
      <div className="relative rounded-[36px] p-8 sm:p-12 md:p-16 bg-gradient-to-b from-[#FCEEF3] via-[#FFF9F8] to-[#EAE5FA]/40 border border-[#F8DCE8] text-center overflow-hidden shadow-xs">
        {/* Subtle ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[300px] bg-white/60 rounded-full blur-3xl pointer-events-none" />

        {/* Section Title */}
        <div className="relative z-10 mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] font-normal tracking-[-0.03em] text-[#29212B]">
            Try it now
          </h2>
          <p className="text-[14.5px] text-[#817780] font-normal mt-2">
            Call as a demo patient:
          </p>
        </div>

        {/* 4 Interactive Patient Cards */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {scenarios.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSelectScenario(item)}
              className="group bg-white rounded-2xl p-5 border border-[#F8DCE8] shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-left flex flex-col justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96891]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-[15px] font-semibold text-[#29212B] group-hover:text-[#B96891] transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[#817780] group-hover:text-[#B96891] transition-colors text-xs font-mono">
                    →
                  </span>
                </div>
                <p className="font-sans text-[12.5px] text-[#817780] mt-1 leading-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F8DCE8]/60 flex items-center justify-between text-[11px] text-[#B96891] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Start demo call</span>
                <span>🎙️</span>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="relative z-10 mt-10">
          <button
            onClick={onCallClick}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#29212B] text-white font-medium text-[14px] shadow-xs hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#29212B]"
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
            <span>Call Sidzi</span>
          </button>
        </div>
      </div>
    </section>
  );
}
