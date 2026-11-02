"use client";

import React from "react";

interface StaffConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StaffConsoleModal({ isOpen, onClose }: StaffConsoleModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-[#FFF9F8] w-full max-w-3xl rounded-3xl shadow-2xl border border-[#F8DCE8] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 bg-[#29212B] text-white flex items-center justify-between">
          <div>
            <h3 className="font-serif font-normal text-xl tracking-tight">
              Maple Grove Clinic — Staff Console
            </h3>
            <p className="text-xs text-[#817780]">
              Live receptionist monitoring & clinical safety triaging
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-[#F8DCE8]">
              <span className="text-xs text-[#817780] font-medium">Active Calls</span>
              <p className="text-2xl font-serif text-[#29212B] mt-1">1 Live</p>
              <span className="text-[11px] text-[#65B8B5] font-medium">Sidzi handling hold queue</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#F8DCE8]">
              <span className="text-xs text-[#817780] font-medium">Appointments Booked Today</span>
              <p className="text-2xl font-serif text-[#29212B] mt-1">18 Slots</p>
              <span className="text-[11px] text-[#817780]">Dr. Patel, Dr. Lee, Dr. Miller</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#F8DCE8]">
              <span className="text-xs text-[#817780] font-medium">Nurse Refill Escalations</span>
              <p className="text-2xl font-serif text-[#B96891] mt-1">2 Flagged</p>
              <span className="text-[11px] text-[#B96891] font-medium">Controlled substances routed</span>
            </div>
          </div>

          {/* Synthetic Patient Database Overview */}
          <div>
            <h4 className="text-sm font-semibold text-[#29212B] mb-3">
              Verified Patient Directory (Demo Fixtures)
            </h4>
            <div className="border border-[#F8DCE8] rounded-2xl overflow-hidden bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FCEEF3] text-[#29212B] border-b border-[#F8DCE8]">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Patient Name</th>
                    <th className="py-2.5 px-4 font-semibold">DOB</th>
                    <th className="py-2.5 px-4 font-semibold">Insurance Copay</th>
                    <th className="py-2.5 px-4 font-semibold">Active Rx</th>
                    <th className="py-2.5 px-4 font-semibold">Safety Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8DCE8]/50 text-[#817780]">
                  <tr className="hover:bg-[#FFF9F8]">
                    <td className="py-3 px-4 font-medium text-[#29212B]">Maria Gonzalez</td>
                    <td className="py-3 px-4">1985-03-14</td>
                    <td className="py-3 px-4">$20 copay ($500 ded)</td>
                    <td className="py-3 px-4">Amoxicillin</td>
                    <td className="py-3 px-4 text-[#65B8B5] font-medium">Standard</td>
                  </tr>
                  <tr className="hover:bg-[#FFF9F8]">
                    <td className="py-3 px-4 font-medium text-[#29212B]">Travis</td>
                    <td className="py-3 px-4">1997-07-14</td>
                    <td className="py-3 px-4">$15 copay ($250 ded)</td>
                    <td className="py-3 px-4">Lisinopril</td>
                    <td className="py-3 px-4 text-[#65B8B5] font-medium">Standard</td>
                  </tr>
                  <tr className="hover:bg-[#FFF9F8]">
                    <td className="py-3 px-4 font-medium text-[#29212B]">Robert Chen</td>
                    <td className="py-3 px-4">1958-05-09</td>
                    <td className="py-3 px-4">$10 copay ($0 ded)</td>
                    <td className="py-3 px-4">Lisinopril, Lorazepam</td>
                    <td className="py-3 px-4 text-[#B96891] font-medium">⚠️ Controlled Drug</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-white border-t border-[#F8DCE8] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#29212B] text-white text-xs font-medium hover:bg-black transition-colors cursor-pointer"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
}
