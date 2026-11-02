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
      caller: "Maria Gonzalez",
      dob: "1985-03-14",
      action: "Annual physical booked with Dr. Anita Patel (Monday 9:00 AM)",
      duration: "1m 12s",
      time: "8 mins ago",
      status: "Completed",
    },
    {
      id: "call_e42c",
      caller: "Travis",
      dob: "1997-07-14",
      action: "Prescription Refill Approved (Lisinopril)",
      duration: "1m 45s",
      time: "45 mins ago",
      status: "Completed",
    },
    {
      id: "call_d88b",
      caller: "Robert Chen",
      dob: "1958-05-09",
      action: "Lorazepam Refill -> Clinical Nurse Transfer Escalated",
      duration: "2m 50s",
      time: "2 hours ago",
      status: "Escalated",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-[#FFF9F8] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#F8DCE8] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-5 bg-[#29212B] text-white flex items-center justify-between">
          <div>
            <h3 className="font-serif font-normal text-xl tracking-tight">Call History</h3>
            <p className="text-xs text-[#817780]">Recent patient calls handled by Sidzi AI Receptionist</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6 divide-y divide-[#F8DCE8]/60 overflow-y-auto">
          {history.map((item) => (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-[#29212B]">{item.caller}</span>
                  <span className="text-[11px] text-[#817780] font-mono">({item.id})</span>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      item.status === "Escalated"
                        ? "bg-[#FCEEF3] text-[#B96891] border border-[#F8DCE8]"
                        : "bg-[#D8EDEA] text-[#65B8B5]"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-[#817780] mt-1">{item.action}</p>
                <div className="flex items-center gap-4 text-[11px] text-[#817780] mt-1.5">
                  <span>DOB: {item.dob}</span>
                  <span>Duration: {item.duration}</span>
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 bg-white border-t border-[#F8DCE8] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#29212B] text-white text-xs font-medium hover:bg-black transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
