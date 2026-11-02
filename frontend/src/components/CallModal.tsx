"use client";

import React, { useState, useEffect } from "react";
import PreCallModal from "./PreCallModal";
import TalkingScreen from "./TalkingScreen";
import { DemoPatientScenario } from "./TryItNowSection";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedScenario?: DemoPatientScenario | null;
  onOpenStaffConsole?: () => void;
}

export default function CallModal({
  isOpen,
  onClose,
  selectedScenario,
  onOpenStaffConsole,
}: CallModalProps) {
  const [callPhase, setCallPhase] = useState<"idle" | "precall" | "talking">("idle");
  const [connectionStatus, setConnectionStatus] = useState<"requesting_mic" | "connecting" | "ready" | "failed">("requesting_mic");
  const [micGranted, setMicGranted] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<{
    room_name: string;
    token: string;
    livekit_url: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // When CallModal is opened, launch PreCall phase and start WebRTC connection to backend
  useEffect(() => {
    if (!isOpen) {
      setCallPhase("idle");
      setConnectionStatus("requesting_mic");
      setMicGranted(false);
      setSessionData(null);
      setErrorMessage(null);
      return;
    }

    setCallPhase("precall");
    setConnectionStatus("requesting_mic");

    // 1. Request microphone access
    if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          setMicGranted(true);
          setConnectionStatus("connecting");
          fetchCallSession();
        })
        .catch((err) => {
          console.warn("Microphone permission notice:", err);
          setMicGranted(false);
          setConnectionStatus("connecting");
          fetchCallSession();
        });
    } else {
      setConnectionStatus("connecting");
      fetchCallSession();
    }
  }, [isOpen]);

  // 2. Connect to backend /api/calls/session
  const fetchCallSession = async () => {
    try {
      // Try direct backend port 8000 first, fallback to relative proxy
      let res: Response | null = null;
      try {
        res = await fetch("http://127.0.0.1:8000/api/calls/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch {
        res = await fetch("/api/calls/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      }

      if (res && res.ok) {
        const data = await res.json();
        setSessionData(data);
        setConnectionStatus("ready");
      } else {
        throw new Error("Backend response status not 200");
      }
    } catch (err) {
      console.warn("Backend session call notice (running with simulated LiveKit session):", err);
      // Fallback: create mock session credentials so user can test the talking screen seamlessly even without running server.py
      const fallbackSession = {
        room_name: `call_${Math.random().toString(36).substring(2, 8)}`,
        token: "demo_webrtc_token",
        livekit_url: "wss://demo.livekit.cloud",
      };
      setSessionData(fallbackSession);
      setConnectionStatus("ready");
    }
  };

  const handleConfirmPreCall = () => {
    setCallPhase("talking");
  };

  const handleEndCall = () => {
    setCallPhase("idle");
    onClose();
  };

  if (!isOpen || callPhase === "idle") return null;

  return (
    <>
      {callPhase === "precall" && (
        <PreCallModal
          isOpen={true}
          onCancel={handleEndCall}
          onConfirm={handleConfirmPreCall}
          connectionStatus={connectionStatus}
          micGranted={micGranted}
          errorMessage={errorMessage}
        />
      )}

      {callPhase === "talking" && (
        <TalkingScreen
          isOpen={true}
          onEndCall={handleEndCall}
          sessionData={sessionData}
          selectedScenario={selectedScenario}
          onOpenStaffConsole={onOpenStaffConsole}
        />
      )}
    </>
  );
}
