import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { LivePulseTicker } from "@/components/landing/LivePulseTicker";
import { PillarsSection } from "@/components/landing/PillarsSection";
import { JourneyTimeline } from "@/components/landing/JourneyTimeline";
import { MentorsShowcase } from "@/components/landing/MentorsShowcase";
import { InteractiveAssessmentPreview } from "@/components/landing/InteractiveAssessmentPreview";
import { BadgesGamification } from "@/components/landing/BadgesGamification";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Landing() {
  return (
    <div className="min-h-dvh bg-canvas text-ink selection:bg-brand-500 selection:text-white">
      {/* Accessible Skip Link */}
      <a
        href="#content"
        className="skip-link rounded-pill bg-brand-500 px-4 py-2 text-sm font-bold text-white z-50 shadow-lg"
      >
        Skip to main content
      </a>

      {/* Floating Interactive Header */}
      <LandingHeader />

      {/* Main Page Content */}
      <main id="content" tabIndex={-1} className="outline-none">
        {/* 1. Hero Section with Interactive Readiness Simulator */}
        <HeroSection />

        {/* 2. Live Cohort Pulse / Activity Feed Ticker */}
        <LivePulseTicker />

        {/* 3. The 7 Pillars of Career Readiness */}
        <PillarsSection />

        {/* 4. The 4-Week Journey & Milestone Roadmap */}
        <JourneyTimeline />

        {/* 5. 14 Nigerian Industry Sectors & Real Working Mentors */}
        <MentorsShowcase />

        {/* 6. Instant 30-Second Clarity Mini-Assessment */}
        <InteractiveAssessmentPreview />

        {/* 7. Gamification & 13 Badge Progression */}
        <BadgesGamification />

        {/* 8. Verified Student Testimonials */}
        <TestimonialsSection />

        {/* 9. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Structured Footer */}
      <LandingFooter />
    </div>
  );
}
