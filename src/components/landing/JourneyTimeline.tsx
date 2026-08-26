import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Calendar, CheckCircle2, Lock, Sparkles, Trophy, Users, Zap } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import type { Art3DName } from "@/data/art-names";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface WeekItem {
  weekNumber: number;
  title: string;
  badgeArt: Art3DName;
  badgeName: string;
  xp: number;
  cumulativeXp: number;
  summary: string;
  deliverables: string[];
  highlight: string;
  milestoneTitle: string;
}

const WEEKS_DATA: WeekItem[] = [
  {
    weekNumber: 1,
    title: "Know Yourself & Set Baseline",
    badgeArt: "compass",
    badgeName: "Explorer Badge",
    xp: 350,
    cumulativeXp: 350,
    milestoneTitle: "Baseline Readiness Mapped",
    summary:
      "Complete the three diagnostic assessments to map your readiness baseline across all 7 pillars, identify blindspots, and draft your Career Identity Statement with your Dream Team of 5 peers.",
    deliverables: [
      "Career Clarity Diagnostic Assessment",
      "Draft 100-word Career Identity Statement",
      "Form Level 1 Dream Team of 5 cohort peers",
    ],
    highlight: "100% clarity on where you stand today versus industry requirements.",
  },
  {
    weekNumber: 2,
    title: "Explore 14 Sectors & Connect",
    badgeArt: "telescope",
    badgeName: "Pathfinder Badge",
    xp: 420,
    cumulativeXp: 770,
    milestoneTitle: "Industry Mentorship Unlocked",
    summary:
      "Direct video sessions with senior professionals across Nigerian tech, fintech, agribusiness, health, and creative media, plus executing the structured Five Conversations Challenge.",
    deliverables: [
      "Attend 2 live sector breakdown sessions",
      "Outreach to 5 professionals with structured templates",
      "Log key hiring findings into your Sector Matrix",
    ],
    highlight: "Demystify unadvertised roles and learn how hiring actually works in Lagos, Abuja & remote teams.",
  },
  {
    weekNumber: 3,
    title: "Build & Ship Proof-of-Skill",
    badgeArt: "tools",
    badgeName: "Skill Stacker Badge",
    xp: 500,
    cumulativeXp: 1270,
    milestoneTitle: "Portfolio Deliverable Shipped",
    summary:
      "A stack of certificates won't impress modern recruiters. In Week 3, you create a tangible portfolio piece (case study, code repo, analysis deck) reviewed by a mentor.",
    deliverables: [
      "Ship one proof-of-skill deliverable for a real prompt",
      "Peer review session with your Dream Team",
      "Receive 1-on-1 written mentor critique",
    ],
    highlight: "Graduate with work you can immediately attach to your job applications.",
  },
  {
    weekNumber: 4,
    title: "Launch, Mock Interview & Placement",
    badgeArt: "target",
    badgeName: "Navigator Badge",
    xp: 600,
    cumulativeXp: 1870,
    milestoneTitle: "Exit Re-Assessment Passed",
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
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const weekRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const currentWeekData: WeekItem = WEEKS_DATA.find((w) => w.weekNumber === activeWeek) ?? WEEKS_DATA[0]!;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const weekStr = entry.target.getAttribute("data-week");
            if (weekStr) {
              setActiveWeek(parseInt(weekStr, 10));
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-25% 0px -40% 0px",
        threshold: 0.2,
      },
    );

    Object.values(weekRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToWeek = (weekNum: number) => {
    setActiveWeek(weekNum);
    const el = weekRefs.current[weekNum];
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const progressPercentage = Math.round((currentWeekData.cumulativeXp / 2500) * 100);

  return (
    <section id="journey" className="relative bg-surface-sunk/70 py-16 sm:py-24 border-y border-line">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-700 shadow-2xs">
            <Calendar className="size-3.5 text-brand-600" />
            Structured 4-Week Roadmap
          </div>
          <h2 className="mt-3 text-display sm:text-title text-ink font-extrabold tracking-tight">
            Four Weeks. One Direction.
          </h2>
          <p className="mt-3 text-base text-muted leading-relaxed">
            Move from uncertainty to verified evidence. Scroll down to follow the weekly progression from baseline assessment to final placement readiness.
          </p>
        </div>

        {/* Week Selector Chips */}
        <div className="mt-8 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {WEEKS_DATA.map((w) => {
            const isCurrent = w.weekNumber === activeWeek;
            return (
              <button
                type="button"
                key={w.weekNumber}
                onClick={() => scrollToWeek(w.weekNumber)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 border",
                  isCurrent
                    ? "bg-brand-500 text-white border-brand-500 shadow-xs"
                    : "bg-surface text-muted border-line hover:border-brand-200 hover:text-ink",
                )}
              >
                <span
                  className={cn(
                    "grid size-5 place-items-center rounded-full text-xs font-extrabold",
                    isCurrent ? "bg-white/20 text-white" : "bg-line text-muted",
                  )}
                >
                  {w.weekNumber}
                </span>
                <span>Week {w.weekNumber}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollytelling Layout: Left Narrative Week Blocks + Right Viewport-Pinned Milestone HUD */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_1fr] items-start">
          {/* Left Column: Weekly Narrative Cards */}
          <div className="space-y-6 sm:space-y-8">
            {WEEKS_DATA.map((week) => {
              const isCurrent = week.weekNumber === activeWeek;
              return (
                <div
                  key={week.weekNumber}
                  ref={(el) => {
                    weekRefs.current[week.weekNumber] = el;
                  }}
                  data-week={week.weekNumber}
                  onClick={() => setActiveWeek(week.weekNumber)}
                  className={cn(
                    "group relative cursor-pointer rounded-3xl p-6 sm:p-7 transition-all duration-300 border",
                    isCurrent
                      ? "bg-surface border-brand-500 shadow-raised ring-2 ring-brand-500/20 scale-[1.01]"
                      : "bg-surface/80 border-line hover:border-line-strong hover:bg-surface opacity-75 hover:opacity-100",
                  )}
                >
                  {/* Step Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "grid size-8 place-items-center rounded-2xl text-xs font-black transition-colors",
                          isCurrent ? "bg-brand-500 text-white shadow-xs" : "bg-line text-muted",
                        )}
                      >
                        W{week.weekNumber}
                      </span>
                      <div>
                        <span className="text-[0.6875rem] font-extrabold uppercase tracking-wider text-brand-600 block">
                          Phase {week.weekNumber} of 4
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-ink group-hover:text-brand-600 transition-colors">
                          {week.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full bg-xp-soft px-2.5 py-1 text-xs font-bold text-xp border border-amber-200/60">
                      <Zap className="size-3.5 fill-current" />
                      +{week.xp} XP
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-ink-soft leading-relaxed">
                    {week.summary}
                  </p>

                  {/* Checklist of Deliverables */}
                  <div className="mt-5 space-y-2">
                    <p className="text-[0.6875rem] font-extrabold uppercase tracking-wider text-muted">
                      Weekly Action Milestones:
                    </p>
                    {week.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-xl bg-surface-sunk p-2.5 border border-line/70 text-xs font-semibold text-ink"
                      >
                        <CheckCircle2 className="size-4 text-brand-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Highlight pill */}
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-brand-700 bg-brand-50 p-2.5 rounded-xl border border-brand-100">
                    <Sparkles className="size-3.5 text-brand-600 shrink-0" />
                    <span>{week.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Scrollytelling Progression Console */}
          <div className="sticky top-24 z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWeek}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="rounded-3xl border border-line bg-surface p-6 sm:p-7 shadow-raised" padded>
                  {/* Badge & Milestone Header */}
                  <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-brand-900 via-shell to-brand-950 p-6 text-white text-center">
                    <div className="mx-auto grid size-20 place-items-center rounded-3xl bg-brand-500/30 border border-brand-400/40 shadow-inner">
                      <Art3D name={currentWeekData.badgeArt} size="lg" />
                    </div>

                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[0.6875rem] font-black uppercase tracking-wider text-amber-300">
                        <Trophy className="size-3" />
                        {currentWeekData.badgeName}
                      </span>
                      <h3 className="mt-1 text-xl font-black text-white">
                        Week {currentWeekData.weekNumber} Milestone
                      </h3>
                      <p className="mt-1 text-xs text-shell-muted">{currentWeekData.milestoneTitle}</p>
                    </div>

                    {/* Live XP Progress Bar */}
                    <div className="mt-5 text-left bg-shell-raised/70 rounded-xl p-3 border border-shell-line">
                      <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                        <span className="text-shell-muted">Cohort Cumulative XP</span>
                        <span className="text-amber-300 font-mono">
                          {currentWeekData.cumulativeXp} / 2,500 XP
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-shell-line">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="h-full bg-linear-to-r from-brand-400 to-amber-400 rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dream Team Accountability Status */}
                  <div className="mt-6 rounded-2xl bg-surface-sunk p-4 border border-line">
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-8 place-items-center rounded-xl bg-brand-50 text-brand-600 shrink-0">
                        <Users className="size-4" />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-ink">Dream Team Accountability</p>
                        <p className="text-[0.6875rem] text-muted">
                          5 peers reviewing deliverables every Sunday 6PM
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Level 6 Reward Unlocked Status */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-muted">Upcoming Unlock:</span>
                      <span className="font-extrabold text-brand-700">
                        {activeWeek === 4 ? "Level 6 Treasure Chest Ready!" : `Level ${activeWeek + 1} Access`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-ink-soft bg-surface-sunk p-2.5 rounded-xl border border-line">
                      <Lock className="size-3.5 text-brand-600 shrink-0" />
                      <span className="text-[0.6875rem]">
                        Complete Week {activeWeek} missions to advance your passport ranking.
                      </span>
                    </div>
                  </div>

                  {/* Footer CTAs */}
                  <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                    <span className="text-xs font-bold text-muted">Curriculum Verified</span>
                    <ButtonLink
                      to="/journey"
                      size="sm"
                      className="bg-brand-500 hover:bg-brand-600 text-white font-bold"
                    >
                      <span>Explore Roadmap</span>
                      <ArrowRight className="size-3.5" />
                    </ButtonLink>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Level 6 Treasure Chest Banner */}
        <div className="mt-14 max-w-4xl mx-auto rounded-3xl bg-linear-to-br from-brand-900 via-shell to-brand-950 p-6 sm:p-8 text-white shadow-raised border border-brand-800/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-2xl bg-brand-500/30 border border-brand-400/30 shrink-0">
              <Art3D name="gift" size="lg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[0.6875rem] font-bold text-amber-300">
                  Level 6 Culmination
                </span>
                <span className="text-xs font-semibold text-shell-muted">Direct Placement Access</span>
              </div>
              <h3 className="mt-1 text-lg sm:text-xl font-black text-white">The Treasure Chest</h3>
              <p className="text-xs text-shell-muted mt-1 max-w-md">
                Graduates who clear the 4-week roadmap unlock direct internship and entry-level pipelines with partner Nigerian tech, finance & agribusiness firms.
              </p>
            </div>
          </div>

          <ButtonLink
            to="/opportunities"
            size="md"
            className="bg-white text-ink hover:bg-brand-50 shrink-0 font-extrabold shadow-md"
          >
            <span>Preview Placements</span>
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
