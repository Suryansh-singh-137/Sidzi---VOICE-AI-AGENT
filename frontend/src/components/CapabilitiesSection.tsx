"use client";

import React from "react";

export default function CapabilitiesSection() {
  const capabilities = [
    {
      id: "01",
      title: "Book a visit",
      desc: "Real open times, booked in seconds.",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="12" y1="14" x2="12" y2="18" />
          <line x1="10" y1="16" x2="14" y2="16" />
        </svg>
      ),
    },
    {
      id: "02",
      title: "Move or cancel",
      desc: "Change plans with one call.",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
      ),
    },
    {
      id: "03",
      title: "Insurance questions",
      desc: "Coverage and costs, in plain words.",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
    },
    {
      id: "04",
      title: "Prescription refills",
      desc: "Sent straight to your pharmacy.",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
          <path d="m8.5 8.5 7 7" />
        </svg>
      ),
    },
    {
      id: "05",
      title: "A real person",
      desc: "Staff join the call, already briefed.",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      ),
    },
    {
      id: "06",
      title: "Private",
      desc: "Checks it's you before anything personal.",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <circle cx="9" cy="10" r="2" />
          <line x1="15" y1="8" x2="17" y2="8" />
          <line x1="15" y1="12" x2="17" y2="12" />
          <path d="M7 16h4" />
        </svg>
      ),
    },
    {
      id: "07",
      title: "Safe",
      desc: "No medical advice. Emergencies: call 911.",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M2 12h20" />
        </svg>
      ),
    },
    {
      id: "08",
      title: "Never on hold",
      desc: "Answers right away, every time.",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto border-t border-zinc-100">
      <div className="mb-14 text-left">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] font-normal tracking-[-0.03em] text-zinc-950">
          What Sidzi can do
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 lg:gap-x-20">
        {capabilities.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 sm:gap-6 py-6 border-b border-zinc-100 hover:border-teal-200/60 transition-colors group"
          >
            {/* Row Number */}
            <span className="font-mono text-xs text-zinc-400 group-hover:text-teal-700 transition-colors w-6">
              {item.id}
            </span>

            {/* Icon Squircle */}
            <div className="w-11 h-11 rounded-xl bg-cyan-50/70 text-teal-700 flex items-center justify-center border border-cyan-100/70 group-hover:bg-teal-50 group-hover:border-teal-200 group-hover:scale-105 transition-all shadow-xs shrink-0">
              {item.icon}
            </div>

            {/* Content */}
            <div className="text-left">
              <h3 className="font-sans text-[15.5px] font-semibold text-zinc-900 group-hover:text-black transition-colors">
                {item.title}
              </h3>
              <p className="font-sans text-[13.5px] text-zinc-500 mt-0.5 leading-normal">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

