"use client";

import React from "react";

interface PreCallModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  connectionStatus: "requesting_mic" | "connecting" | "ready" | "failed";
  micGranted: boolean;
  errorMessage?: string | null;
}

export default function PreCallModal({
  isOpen,
  onCancel,
  onConfirm,
  connectionStatus,
  micGranted,
  errorMessage,
}: PreCallModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/45 backdrop-blur-md transition-all animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-[420px] rounded-[36px] shadow-2xl border border-zinc-100 p-8 sm:p-10 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
        {/* Large 3D Iridescent Orb Graphic */}
        <div className="relative mb-6">
          <div
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full shadow-inner ring-4 ring-white/90 animate-float-slow"
            style={{
              background:
                "radial-gradient(circle at 35% 28%, #FFFFFF 0%, #D8EDEA 22%, #EFA6C5 55%, #65B8B5 85%, #B96891 100%)",
              boxShadow:
                "inset -4px -4px 8px rgba(185, 104, 145, 0.35), 0 12px 36px rgba(239, 166, 197, 0.4)",
            }}
          />
          {/* Ambient glow behind orb */}
          <div className="absolute inset-0 rounded-full bg-[#EFA6C5]/25 blur-xl -z-10" />
        </div>

        {/* 3 Status Pills Row */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100/80 rounded-full mb-6">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              micGranted
                ? "bg-white text-zinc-900 shadow-xs"
                : "text-zinc-500"
            }`}
          >
            Microphone
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${
              connectionStatus === "connecting"
                ? "bg-white text-zinc-900 shadow-xs"
                : connectionStatus === "ready"
                ? "bg-white text-zinc-700 shadow-xs"
                : "text-zinc-500"
            }`}
          >
            {connectionStatus === "connecting" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#B96891] animate-ping" />
            )}
            Connect
          </span>

          <span
            className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
              connectionStatus === "ready"
                ? "bg-[#29212B] text-white shadow-xs"
                : "text-zinc-400"
            }`}
          >
            Talk
          </span>
        </div>

        {/* Headline */}
        <h3 className="font-serif text-[28px] sm:text-[32px] font-normal tracking-tight text-[#29212B]">
          {connectionStatus === "connecting" || connectionStatus === "requesting_mic"
            ? "Connecting to Sidzi..."
            : connectionStatus === "failed"
            ? "Connection Notice"
            : "Sidzi is ready"}
        </h3>

        {/* Subhead */}
        <p className="font-sans text-[15px] text-zinc-600 mt-2">
          {connectionStatus === "connecting" || connectionStatus === "requesting_mic"
            ? "Establishing secure WebRTC audio session..."
            : connectionStatus === "failed"
            ? errorMessage || "Unable to reach backend session. You can continue in interactive preview mode."
            : "Press OK to start talking."}
        </p>

        {/* Disclaimer Note */}
        <p className="font-sans text-[12px] text-zinc-400 mt-2">
          Demo only. Please don’t share real health info.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-center gap-3 w-full">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[14px] font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-6 rounded-full bg-[#29212B] hover:bg-black text-white text-[14px] font-medium shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

