"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import HowItWorks from "@/components/HowItWorks";
import ServicesSection from "@/components/ServicesSection";
import CareTeamSection from "@/components/CareTeamSection";
import ConversationDemo from "@/components/ConversationDemo";
import TestimonialsSection from "@/components/TestimonialsSection";
import TryItNowSection, { DemoPatientScenario } from "@/components/TryItNowSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import CallModal from "@/components/CallModal";
import StaffConsoleModal from "@/components/StaffConsoleModal";
import CallHistoryModal from "@/components/CallHistoryModal";

export default function Home() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isStaffConsoleOpen, setIsStaffConsoleOpen] = useState(false);
  const [isCallHistoryOpen, setIsCallHistoryOpen] = useState(false);
  const [activeScenario, setActiveScenario] = useState<DemoPatientScenario | null>(null);

  const handleStartCall = (scenario?: DemoPatientScenario) => {
    setActiveScenario(scenario || null);
    setIsCallModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FFF9F8] text-[#29212B] flex flex-col justify-between overflow-x-hidden selection:bg-[#F8DCE8] selection:text-[#29212B]">
      {/* Section 1: Navigation Bar */}
      <Navbar
        onCallClick={() => handleStartCall()}
        onStaffConsoleClick={() => setIsStaffConsoleOpen(true)}
        onCallHistoryClick={() => setIsCallHistoryOpen(true)}
        isCalling={isCallModalOpen}
      />

      {/* Section 2: Hero Section with Fluid Organic Wave Graphic */}
      <HeroSection
        onCallClick={() => handleStartCall()}
        isCalling={isCallModalOpen}
      />

      {/* Section 3: Product Showcase — Asymmetric Bento Grid */}
      <ProductShowcase />

      {/* Section 4: How It Works — 3-Step Patient Journey */}
      <HowItWorks />

      {/* Section 5: Clinical Services */}
      <ServicesSection />

      {/* Section 6: Care Team */}
      <CareTeamSection />

      {/* Section 7: Patient Conversation Experience (Interactive & Animated) */}
      <ConversationDemo onCallClick={() => handleStartCall()} />

      {/* Section 8: Testimonials & Verified Metrics */}
      <TestimonialsSection />

      {/* Interactive Demo Patient Persona Console */}
      <TryItNowSection
        onSelectScenario={(scenario) => handleStartCall(scenario)}
        onCallClick={() => handleStartCall()}
      />

      {/* Section 9: Final Welcoming CTA */}
      <FinalCTA onCallClick={() => handleStartCall()} />

      {/* Section 10: Clinic Footer */}
      <Footer
        onCallClick={() => handleStartCall()}
        onStaffConsoleClick={() => setIsStaffConsoleOpen(true)}
        onCallHistoryClick={() => setIsCallHistoryOpen(true)}
      />

      {/* Modals for Live Voice Interactivity & Clinic Management */}
      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => {
          setIsCallModalOpen(false);
          setActiveScenario(null);
        }}
        selectedScenario={activeScenario}
      />
      <StaffConsoleModal
        isOpen={isStaffConsoleOpen}
        onClose={() => setIsStaffConsoleOpen(false)}
      />
      <CallHistoryModal
        isOpen={isCallHistoryOpen}
        onClose={() => setIsCallHistoryOpen(false)}
      />
    </div>
  );
}
