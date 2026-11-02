"use client";

import React from "react";

export default function CareTeamSection() {
  const clinicians = [
    {
      initials: "AP",
      name: "Dr. Anita Patel",
      role: "Family Medicine",
      badgeColor: "bg-[#B96891]",
      days: [
        { label: "M", active: true },
        { label: "T", active: true },
        { label: "W", active: true },
        { label: "T", active: true },
        { label: "F", active: true },
      ],
    },
    {
      initials: "ML",
      name: "Dr. Marcus Lee",
      role: "Internal Medicine",
      badgeColor: "bg-[#65B8B5]",
      days: [
        { label: "M", active: true },
        { label: "T", active: false },
        { label: "W", active: true },
        { label: "T", active: false },
        { label: "F", active: true },
      ],
    },
    {
      initials: "SK",
      name: "Sarah Kim, NP",
      role: "Family Nurse Practitioner",
      badgeColor: "bg-[#D98BAE]",
      days: [
        { label: "M", active: false },
        { label: "T", active: true },
        { label: "W", active: false },
        { label: "T", active: true },
        { label: "F", active: false },
      ],
    },
  ];

  return (
    <section id="care-team" className="w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto border-t border-[#F8DCE8]/60">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#B96891] font-semibold bg-[#FCEEF3] px-3 py-1 rounded-full border border-[#F8DCE8]">
            Clinicians & Providers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[48px] font-normal tracking-[-0.03em] text-[#29212B] mt-4">
            Your care team
          </h2>
        </div>
        <p className="font-sans text-[15px] sm:text-[16px] text-[#817780] max-w-md">
          Dedicated practitioners with live calendar integration. Ask Sidzi to book your appointment with your preferred provider.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clinicians.map((doctor, idx) => (
          <div
            key={idx}
            className="rounded-[28px] p-7 bg-white hover:bg-[#FCEEF3]/40 transition-all duration-300 border border-[#F8DCE8] shadow-xs hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              {/* Doctor Avatar Badge */}
              <div
                className={`w-13 h-13 rounded-2xl ${doctor.badgeColor} text-white font-semibold text-[15px] flex items-center justify-center shadow-xs shrink-0 select-none`}
              >
                {doctor.initials}
              </div>

              {/* Doctor Info */}
              <div className="text-left">
                <h3 className="font-serif text-2xl text-[#29212B] font-normal leading-snug">
                  {doctor.name}
                </h3>
                <p className="font-sans text-[13.5px] text-[#817780] mt-0.5">
                  {doctor.role}
                </p>
              </div>
            </div>

            {/* Schedule Weekdays */}
            <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#F8DCE8]/60">
              <span className="text-xs text-[#817780] font-medium">Weekly schedule:</span>
              <div className="flex items-center gap-1.5">
                {doctor.days.map((day, dIdx) => (
                  <span
                    key={dIdx}
                    className={`w-5.5 h-5.5 rounded-full text-[10.5px] font-semibold flex items-center justify-center select-none transition-colors ${
                      day.active
                        ? "bg-[#B96891] text-white shadow-xs"
                        : "bg-[#FFF9F8] text-[#817780] border border-[#F8DCE8]"
                    }`}
                    title={`${day.label}: ${day.active ? "Available" : "Off"}`}
                  >
                    {day.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
