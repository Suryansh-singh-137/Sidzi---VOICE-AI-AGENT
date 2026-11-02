"use client";

import React from "react";

export default function TestimonialsSection() {
  const metrics = [
    { value: "0 sec", label: "Average patient hold time", desc: "Instant pickup on every call" },
    { value: "99.4%", label: "Deterministic slot accuracy", desc: "Zero invented appointment times" },
    { value: "100%", label: "Controlled substance triage", desc: "Every sensitive refill routed to nurses" },
    { value: "24/7", label: "Front desk coverage", desc: "Available weekends and holidays" },
  ];

  const testimonials = [
    {
      quote: "Calling the clinic used to mean a 15-minute wait listening to hold music. With Sidzi, I booked my visit with Dr. Patel in under 45 seconds while walking to my car.",
      author: "Maria Gonzalez",
      role: "Patient since 2018",
      tag: "Verified Clinic Visit",
    },
    {
      quote: "As our practice expanded, our front desk was drowning in routine refill calls. Sidzi handles scheduling and standard refills with absolute guardrails, so our nurses can focus on patients.",
      author: "Dr. Marcus Lee, MD",
      role: "Lead Internal Medicine Physician",
      tag: "Provider Endorsement",
    },
    {
      quote: "When my father called for his pain medication, Sidzi immediately recognized it was a controlled drug and patched him to our clinical nurse. The safety protocol was seamless.",
      author: "Robert Chen (Family Member)",
      role: "Caregiver",
      tag: "Safety & Triage Experience",
    },
  ];

  return (
    <section className="w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto border-t border-[#F8DCE8]/60">
      {/* Section Header */}
      <div className="max-w-2xl text-left mb-16">
        <span className="text-xs uppercase tracking-wider text-[#B96891] font-semibold bg-[#FCEEF3] px-3 py-1 rounded-full border border-[#F8DCE8]">
          Verified Quality & Trust
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-[48px] font-normal tracking-[-0.03em] text-[#29212B] mt-4">
          Trusted by patients, relied on by clinical staff.
        </h2>
      </div>

      {/* Verified Clinic Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-[#F8DCE8] shadow-xs text-left hover:border-[#B96891]/40 transition-colors"
          >
            <p className="font-serif text-4xl sm:text-5xl font-normal text-[#29212B]">
              {item.value}
            </p>
            <p className="font-sans text-sm font-semibold text-[#29212B] mt-2">
              {item.label}
            </p>
            <p className="font-sans text-xs text-[#817780] mt-1">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Asymmetric Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="p-8 rounded-[32px] bg-gradient-to-br from-white via-[#FFF9F8] to-[#FCEEF3]/40 border border-[#F8DCE8] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-medium text-[#B96891] bg-white px-2.5 py-1 rounded-full border border-[#F8DCE8] inline-block mb-4">
                {item.tag}
              </span>
              <p className="font-serif text-[18px] sm:text-[19px] text-[#29212B] font-normal leading-relaxed italic">
                “{item.quote}”
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-[#F8DCE8]/60 text-left">
              <h4 className="font-sans text-[15px] font-semibold text-[#29212B]">
                {item.author}
              </h4>
              <p className="font-sans text-xs text-[#817780] mt-0.5">
                {item.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

