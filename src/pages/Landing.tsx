import { TopBanner } from "@/components/landing/TopBanner";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { JourneyTimeline } from "@/components/landing/JourneyTimeline";
import { InteractiveLearning } from "@/components/landing/InteractiveLearning";
import { ProgressMetrics } from "@/components/landing/ProgressMetrics";
import { CommunitySection } from "@/components/landing/CommunitySection";
import { MentorsShowcase } from "@/components/landing/MentorsShowcase";
import { ReadinessSection } from "@/components/landing/ReadinessSection";
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

      {/* Top announcement banner */}
      <TopBanner />

      {/* Floating Interactive Header */}
      <LandingHeader />

      {/* Main Page Content */}
      <main id="content" tabIndex={-1} className="outline-none">
        {/* 1. Hero: Value proposition with illustration + CTAs */}
        <HeroSection />

        {/* 2. Problem: Emotional hook — "Not knowing is normal" */}
        <section id="problem">
          <ProblemSection />
        </section>

        {/* 3. The Journey: 6-step card grid */}
        <JourneyTimeline />

        {/* 4. Interactive Learning: Workplace scenario demo */}
        <section id="learn">
          <InteractiveLearning />
        </section>

        {/* 5. Progress Metrics: Units/XP/Levels/Badges */}
        <ProgressMetrics />

        {/* 6. Community: Cohort + weekly challenge */}
        <section id="community">
          <CommunitySection />
        </section>

        {/* 7. Industry Mentors: 14 sector tags + stat */}
        <MentorsShowcase />

        {/* 8. Career Readiness: Skill pills + score messaging */}
        <section id="readiness">
          <ReadinessSection />
        </section>

        {/* 9. FAQ */}
        <FaqSection />
      </main>

      {/* Structured Footer with CTA */}
      <LandingFooter />
    </div>
  );
}
