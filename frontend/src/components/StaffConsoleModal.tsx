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
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 bg-zinc-950 text-white flex items-center justify-between">
          <div>
            <h3 className="font-sans font-semibold text-lg tracking-tight">
              Maple Grove Clinic — Staff Console
            </h3>
            <p className="text-xs text-zinc-400">
              Live receptionist monitoring & clinical safety triaging
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center text-sm transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <span className="text-xs text-zinc-500 font-medium">Active Calls</span>
              <p className="text-2xl font-bold text-zinc-900 mt-1">1 Live</p>
              <span className="text-[11px] text-emerald-600 font-medium">Sidzi handling hold queue</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <span className="text-xs text-zinc-500 font-medium">Appointments Booked Today</span>
              <p className="text-2xl font-bold text-zinc-900 mt-1">18 Slots</p>
              <span className="text-[11px] text-zinc-500">Dr. Miller & Dr. Sharma</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <span className="text-xs text-zinc-500 font-medium">Nurse Refill Escalations</span>
              <p className="text-2xl font-bold text-amber-600 mt-1">2 Flagged</p>
              <span className="text-[11px] text-amber-700 font-medium">Controlled substances routed</span>
            </div>
          </div>

          {/* Synthetic Patient Database Overview */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 mb-3">
              Verified Patient Directory (Demo Fixtures)
            </h4>
            <div className="border border-zinc-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-100 text-zinc-700 border-b border-zinc-200">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Patient Name</th>
                    <th className="py-2.5 px-4 font-semibold">DOB</th>
                    <th className="py-2.5 px-4 font-semibold">Insurance Copay</th>
                    <th className="py-2.5 px-4 font-semibold">Active Rx</th>
                    <th className="py-2.5 px-4 font-semibold">Safety Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-700">
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3 px-4 font-medium text-zinc-900">Maria Gonzalez</td>
                    <td className="py-3 px-4">1985-03-14</td>
                    <td className="py-3 px-4">$20 copay ($500 ded)</td>
                    <td className="py-3 px-4">Amoxicillin</td>
                    <td className="py-3 px-4 text-emerald-600 font-medium">Standard</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3 px-4 font-medium text-zinc-900">Travis</td>
                    <td className="py-3 px-4">1997-07-14</td>
                    <td className="py-3 px-4">$15 copay ($250 ded)</td>
                    <td className="py-3 px-4">Lisinopril</td>
                    <td className="py-3 px-4 text-emerald-600 font-medium">Standard</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3 px-4 font-medium text-zinc-900">Robert Chen</td>
                    <td className="py-3 px-4">1958-05-09</td>
                    <td className="py-3 px-4">$10 copay ($0 ded)</td>
                    <td className="py-3 px-4">Lisinopril, Lorazepam</td>
                    <td className="py-3 px-4 text-amber-600 font-medium">⚠️ Controlled Drug</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-medium hover:bg-black transition-colors cursor-pointer"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
}

