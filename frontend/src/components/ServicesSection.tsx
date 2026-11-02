"use client";

import React from "react";

export default function ServicesSection() {
  const services = [
    {
      title: "Family & Primary Care",
      desc: "Routine wellness exams, chronic condition management, and whole-family healthcare with our board-certified physicians.",
      tag: "Same-week appointments",
      isBlush: true,
      icon: (
        <svg className="w-5 h-5 text-[#B96891]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: "Prescription Refills",
      desc: "Direct coordination with your local pharmacy. Standard maintenance medications approved within minutes.",
      tag: "Pharmacy direct",
      isBlush: false,
      icon: (
        <svg className="w-5 h-5 text-[#65B8B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.5 8.5 7 7" />
        </svg>
      ),
    },
    {
      title: "Preventative Checkups",
      desc: "Comprehensive annual exams, biometric panels, cancer screenings, and age-appropriate clinical assessments.",
      tag: "Covered by most plans",
      isBlush: false,
      icon: (
        <svg className="w-5 h-5 text-[#B96891]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Insurance & Copay Guidance",
      desc: "Clear breakdown of in-network benefits, specialist deductibles, and out-of-pocket costs before your appointment.",
      tag: "Transparent pricing",
      isBlush: true,
      icon: (
        <svg className="w-5 h-5 text-[#65B8B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      ),
    },
    {
      title: "Specialty Referrals",
      desc: "Fast-track administrative coordination for cardiology, dermatology, radiology, and endocrinology consults.",
      tag: "Chart transfer ready",
      isBlush: false,
      icon: (
        <svg className="w-5 h-5 text-[#B96891]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      ),
    },
    {
      title: "Nurse Triage & Telehealth",
      desc: "When clinical symptoms need expert nursing evaluation, Sidzi transfers your call directly with transcribed notes.",
      tag: "Live nurse line",
      isBlush: true,
      icon: (
        <svg className="w-5 h-5 text-[#65B8B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto border-t border-[#F8DCE8]/60">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#B96891] font-semibold bg-[#FCEEF3] px-3 py-1 rounded-full border border-[#F8DCE8]">
            Comprehensive Clinical Practice
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[48px] font-normal tracking-[-0.03em] text-[#29212B] mt-4">
            Clinical services
          </h2>
        </div>
        <p className="font-sans text-[15px] sm:text-[16px] text-[#817780] max-w-md">
          Maple Grove Family Clinic combines personalized outpatient medicine with intelligent modern administrative coordination.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div
            key={idx}
            className={`rounded-[28px] p-8 border transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between ${
              service.isBlush
                ? "bg-[#FCEEF3]/50 border-[#F8DCE8]"
                : "bg-white border-[#F8DCE8]/70"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#F8DCE8] flex items-center justify-center shadow-xs">
                  {service.icon}
                </div>
                <span className="text-[11px] font-medium text-[#B96891] bg-white px-2.5 py-1 rounded-full border border-[#F8DCE8]">
                  {service.tag}
                </span>
              </div>

              <h3 className="font-serif text-2xl text-[#29212B] font-normal tracking-tight">
                {service.title}
              </h3>

              <p className="font-sans text-[14px] text-[#817780] mt-3 leading-relaxed">
                {service.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F8DCE8]/50 flex items-center text-xs text-[#B96891] font-medium">
              <span>Book via Sidzi →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

