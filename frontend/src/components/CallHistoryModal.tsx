"use client";

import React from "react";

interface CallHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallHistoryModal({ isOpen, onClose }: CallHistoryModalProps) {
  if (!isOpen) return null;

  const history = [
    {
      id: "call_a91f",
      caller: "Travis",
      dob: "1997-07-14",
      action: "Appointment Booked (Thursday 9:00 AM - Dr. Miller)",
      duration: "1m 42s",
      time: "10 mins ago",
      status: "Completed",
    },
    {
      id: "call_e42c",
      caller: "Maria Gonzalez",
      dob: "1985-03-14",
      action: "Prescription Refill Approved (Amoxicillin)",
      duration: "2m 15s",
      time: "1 hour ago",
      status: "Completed",
    },
    {
      id: "call_d88b",
      caller: "Robert Chen",
      dob: "1958-05-09",
      action: "Lorazepam Refill -> Nurse Escalation Transferred",
      duration: "3m 05s",
      time: "3 hours ago",
      status: "Escalated",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-5 bg-zinc-950 text-white flex items-center justify-between">
          <div>
            <h3 className="font-sans font-semibold text-lg tracking-tight">Call History</h3>
            <p className="text-xs text-zinc-400">Recent calls handled by Sidzi AI Receptionist</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center text-sm transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6 divide-y divide-zinc-100 overflow-y-auto">
          {history.map((item) => (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-zinc-900">{item.caller}</span>
                  <span className="text-[11px] text-zinc-400 font-mono">({item.id})</span>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      item.status === "Escalated"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 mt-1">{item.action}</p>
                <div className="flex items-center gap-4 text-[11px] text-zinc-400 mt-1.5">
                  <span>DOB: {item.dob}</span>
                  <span>Duration: {item.duration}</span>
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-medium hover:bg-black transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

