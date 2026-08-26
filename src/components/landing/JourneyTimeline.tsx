import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Calendar, CheckCircle2, Sparkles, Trophy, Zap } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import type { Art3DName } from "@/data/art-names";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";

interface WeekItem {
  weekNumber: number;
  title: string;
  badgeArt: Art3DName;
  badgeName: string;
  xp: string;
  summary: string;
  deliverables: string[];
  highlight: string;
}

const WEEKS_DATA: WeekItem[] = [
  {
    weekNumber: 1,
    title: "Know Yourself & Set Baseline",
    badgeArt: "compass",
    badgeName: "Explorer Badge",
    xp: "+350 XP",
    summary:
      "Complete the three diagnostic assessments to map your readiness baseline across all 7 pillars, identify blindspots, and draft your Career Identity Statement.",
    deliverables: [
      "Career Clarity Diagnostic Assessment",
      "Draft Career Identity Statement",
      "Join Level 1 Cohort Dream Team of 5 peers",
    ],
    highlight: "100% clarity on where you stand today versus industry requirements.",
  },
  {
    weekNumber: 2,
    title: "Explore 14 Sectors & Connect",
    badgeArt: "telescope",
    badgeName: "Pathfinder Badge",
    xp: "+420 XP",
    summary:
      "Direct video sessions with senior professionals across Nigerian tech, fintech, agribusiness, health, and creative media, plus the Five Conversations Challenge.",
    deliverables: [
      "Attend 2 live sector breakdown sessions",
      "Reach out to 5 professionals with structured outreach templates",
      "Log key findings into your Sector Matrix",
    ],
    highlight: "Demystify unadvertised roles and learn how hiring truly happens.",
  },
  {
    weekNumber: 3,
    title: "Build & Ship Proof-of-Skill",
    badgeArt: "tools",
    badgeName: "Skill Stacker Badge",
    xp: "+500 XP",
    summary:
      "A stack of certificates won't impress modern recruiters. In Week 3, you create a tangible portfolio piece (case study, code repo, analysis deck) reviewed by a mentor.",
    deliverables: [
      "Ship one proof-of-skill deliverable for a real-world prompt",
      "Peer review session with your Dream Team",
      "Receive 1-on-1 written mentor critique",
    ],
    highlight: "Graduate with work you can immediately attach to your applications.",
  },
  {
    weekNumber: 4,
    title: "Launch, Mock Interview & Placement",
    badgeArt: "target",
    badgeName: "Navigator Badge",
    xp: "+600 XP",
    summary:
      "Execute simulated mock interviews, take your exit readiness reassessment to measure exact percentage gains, and unlock Level 6 Treasure Chest opportunities.",
    deliverables: [
      "Full simulated sector mock interview with feedback",
      "Post-cohort readiness re-assessment & verified report",
      "90-day post-programme action strategy",
    ],
    highlight: "Unlocks the Level 6 Treasure Chest with Paystack, Andela & partner roles.",
  },
];

export function JourneyTimeline() {
  const [activeWeek, setActiveWeek] = useState(1);
  const currentWeekData: WeekItem = WEEKS_DATA.find((w) => w.weekNumber === activeWeek) ?? WEEKS_DATA[0]!;

  return (
    <section id="journey" className="bg-surface-sunk/70 py-16 sm:py-24 border-y border-line">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            <Calendar className="size-3.5" />
            Structured 4-Week Roadmap
          </div>
          <h2 className="mt-3 text-title text-ink font-extrabold tracking-tight">
            Four Weeks. One Direction.
          </h2>
          <p className="mt-3 text-base text-muted leading-relaxed">
            Move from uncertainty to concrete evidence. Each week builds on the last with structured exercises, cohort accountability, and verifiable milestones.
          </p>
        </div>

        {/* Week Selector Tabs */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-surface p-1.5 shadow-xs border border-line">
            {WEEKS_DATA.map((w) => {
              const isCurrent = w.weekNumber === activeWeek;
              return (
                <button
                  type="button"
                  key={w.weekNumber}
                  onClick={() => setActiveWeek(w.weekNumber)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                    isCurrent
                      ? "bg-brand-500 text-white shadow-xs"
                      : "text-muted hover:text-ink hover:bg-surface-sunk"
                  }`}
                >
                  <span
                    className={`grid size-5.5 place-items-center rounded-full text-xs font-extrabold ${
                      isCurrent ? "bg-white text-brand-700" : "bg-line text-muted"
                    }`}
                  >
                    {w.weekNumber}
                  </span>
                  <span>Week {w.weekNumber}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Week Showcase Card with Animation */}
        <div className="mt-10 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWeek}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="bg-surface border border-line shadow-raised rounded-3xl p-6 sm:p-8" padded>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-line">
                  <div className="flex items-center gap-3.5">
                    <div className="grid size-14 place-items-center rounded-2xl bg-brand-50 border border-brand-100 shrink-0">
                      <Art3D name={currentWeekData.badgeArt} size="md" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-brand-600">
                        Week {currentWeekData.weekNumber} Focus
                      </span>
                      <h3 className="text-xl font-black text-ink">{currentWeekData.title}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 rounded-full bg-xp-soft px-3 py-1.5 text-xs font-bold text-xp border border-amber-200">
                      <Zap className="size-3.5 fill-current" />
                      {currentWeekData.xp}
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 border border-brand-200">
                      <Trophy className="size-3.5" />
                      {currentWeekData.badgeName}
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-sm sm:text-base text-ink-soft leading-relaxed">
                  {currentWeekData.summary}
                </p>

                {/* Key Deliverables */}
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
                    Weekly Action Checklist:
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-3">
                    {currentWeekData.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 rounded-2xl bg-surface-sunk p-3.5 border border-line text-xs font-semibold text-ink"
                      >
                        <CheckCircle2 className="size-4 text-brand-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Week Highlight Box */}
                <div className="mt-6 rounded-2xl bg-linear-to-r from-brand-50 via-surface-sunk to-brand-50/40 p-4 border border-brand-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="size-5 text-brand-600 shrink-0" />
                    <p className="text-xs font-bold text-ink-soft">{currentWeekData.highlight}</p>
                  </div>
                  <ButtonLink
                    to="/journey"
                    size="sm"
                    className="shrink-0 bg-brand-500 text-white hidden sm:inline-flex"
                  >
                    Explore Journey
                    <ArrowRight className="size-3.5" />
                  </ButtonLink>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Level 6 Treasure Chest Teaser */}
        <div className="mt-12 max-w-4xl mx-auto rounded-3xl bg-linear-to-br from-brand-900 via-shell to-brand-950 p-6 sm:p-8 text-white shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-2xl bg-brand-500/30 border border-brand-400/30 shrink-0">
              <Art3D name="gift" size="lg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[0.6875rem] font-bold text-amber-300">
                  Level 6 Unlocked
                </span>
                <span className="text-xs font-semibold text-shell-muted">Post-Cohort Placement</span>
              </div>
              <h3 className="mt-1 text-lg font-black text-white">The Treasure Chest</h3>
              <p className="text-xs text-shell-muted mt-1 max-w-md">
                Complete your readiness milestones to unlock direct placement applications with partner employers like Paystack, Andela, and leading African institutions.
              </p>
            </div>
          </div>

          <ButtonLink
            to="/opportunities"
            size="md"
            className="bg-white text-ink hover:bg-brand-50 shrink-0 font-extrabold"
          >
            Preview Opportunities
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
