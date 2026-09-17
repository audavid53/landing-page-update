import { MotionConfig } from "framer-motion";
import { useState } from "react";
import "@/icompass/index.css";
import "@/icompass/landing-refinement.css";
import { Navbar } from "@/icompass/components/Navbar";
import { ScrollHero } from "@/icompass/components/ScrollHero/ScrollHero";
import { FeaturesCTASection } from "@/icompass/components/FeaturesSection";
import { StatsSection } from "@/icompass/components/StatsSection";
import { JourneySection } from "@/icompass/components/HowItWorks";
import { MentorshipSection } from "@/icompass/components/MentorshipSection";
import { TestimonialsSection } from "@/icompass/components/TestimonialsSection";
import { FinalCTASection } from "@/icompass/components/CtaSection";
import { JourneyDialog } from "@/icompass/components/JourneyDialog";

export default function App() {
  const [journeyOpen, setJourneyOpen] = useState(false);
  return <MotionConfig reducedMotion="user">
    <div className="icompass-landing" onClickCapture={(event) => {
      if ((event.target as HTMLElement).closest("[data-journey-signup]")) {
        event.preventDefault();
        setJourneyOpen(true);
      }
    }}>
    <Navbar />
    <main>
      <ScrollHero />
      <FeaturesCTASection />
      <StatsSection />
      <JourneySection />
      <MentorshipSection />
      <TestimonialsSection />
      <FinalCTASection />
    </main>
    </div>
    {journeyOpen && <JourneyDialog onClose={() => setJourneyOpen(false)} />}
  </MotionConfig>;
}
