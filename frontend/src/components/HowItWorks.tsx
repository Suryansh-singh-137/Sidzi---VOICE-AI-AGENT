"use client";

import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Patient contacts the clinic",
      desc: "One click or phone call. No robotic numerical dial-menus, automated phone trees, or waiting on hold.",
      accent: "from-[#FCEEF3] to-[#F8DCE8]",
    },
    {
      number: "02",
      title: "Sidzi understands & verifies",
      desc: "Instant identity verification by name and date of birth. Direct access to open slots, refills, and provider schedules.",
      accent: "from-[#F8DCE8] to-[#EFA6C5]",
    },
    {
      number: "03",
      title: "Immediate care resolution",
      desc: "Appointments booked deterministically, standard refills routed to pharmacy, and clinical escalations handed to nurses.",
      accent: "from-[#EAE5FA] to-[#D8EDEA]",
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto border-t border-[#F8DCE8]/60">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-wider text-[#B96891] font-semibold bg-[#FCEEF3] px-3 py-1 rounded-full border border-[#F8DCE8]">
          The Patient Journey
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-[48px] font-normal tracking-[-0.03em] text-[#29212B] mt-4">
          How it works
        </h2>
        <p className="font-sans text-[16px] text-[#817780] mt-3">
          Designed to be effortless for patients of any age or comfort level.
        </p>
      </div>

      {/* 3 Horizontal Steps with connecting line */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        {/* Connecting Line across desktop */}
        <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[1.5px] bg-gradient-to-r from-[#F8DCE8] via-[#EFA6C5] to-[#D8EDEA] -z-10" />

        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center md:items-start text-center md:text-left p-6 sm:p-8 rounded-3xl bg-white/70 border border-[#F8DCE8]/60 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            {/* Number Pill */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.accent} text-[#29212B] font-mono text-base font-bold flex items-center justify-center shadow-xs border border-white mb-6`}>
              {step.number}
            </div>

            <h3 className="font-serif text-2xl text-[#29212B] font-normal tracking-tight">
              {step.title}
            </h3>

            <p className="font-sans text-[14.5px] text-[#817780] mt-3 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

