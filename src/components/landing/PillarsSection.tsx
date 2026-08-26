import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Award, Check, ChevronRight, Layers, Sparkles, Target, Zap } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import { Card } from "@/components/ui/Card";
import { PILLARS } from "@/data/pillars";
import type { Pillar } from "@/data/types";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function PillarsSection() {
  const [selectedPillarId, setSelectedPillarId] = useState<string>(PILLARS[0]?.id ?? "self-knowledge");
  const activePillar: Pillar = PILLARS.find((p) => p.id === selectedPillarId) ?? PILLARS[0]!;
  const pillarRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-pillar-id");
            if (id) {
              setSelectedPillarId(id);
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

    Object.values(pillarRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToPillar = (id: string) => {
    setSelectedPillarId(id);
    const el = pillarRefs.current[id];
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="pillars" className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-700 shadow-2xs">
          <Sparkles className="size-3.5 text-brand-600" />
          The Science of Career Readiness
        </div>
        <h2 className="mt-3 text-display sm:text-title text-ink font-extrabold tracking-tight">
          The 7 Pillars of Career Readiness
        </h2>
        <p className="mt-3 text-base text-muted leading-relaxed">
          Progression is not random. Every lesson, sector interview, and project in iPlace is engineered around these seven measurable pillars. Scroll through each to see the transformation.
        </p>
      </div>

      {/* Quick Pillar Jump Navigation Bar */}
      <div className="mt-8 flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-1.5 pb-2">
        {PILLARS.map((p, idx) => {
          const isActive = p.id === selectedPillarId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => scrollToPillar(p.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all duration-200 border",
                isActive
                  ? "bg-brand-500 text-white border-brand-500 shadow-xs"
                  : "bg-surface text-muted border-line hover:border-brand-200 hover:text-ink",
              )}
            >
              <span
                className={cn(
                  "grid size-4 place-items-center rounded-full text-[0.625rem]",
                  isActive ? "bg-white/20 text-white" : "bg-surface-sunk text-muted",
                )}
              >
                {idx + 1}
              </span>
              <span>{p.shortName}</span>
            </button>
          );
        })}
      </div>

      {/* Scrollytelling Layout: Left Narrative Steps + Right Viewport-Pinned Visual Console */}
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr] items-start">
        {/* Left Column: Narrative Scrolling Cards */}
        <div className="space-y-6 sm:space-y-8">
          {PILLARS.map((pillar, index) => {
            const isCurrent = pillar.id === selectedPillarId;
            return (
              <div
                key={pillar.id}
                ref={(el) => {
                  pillarRefs.current[pillar.id] = el;
                }}
                data-pillar-id={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={cn(
                  "group relative cursor-pointer rounded-3xl p-6 sm:p-7 transition-all duration-300 border",
                  isCurrent
                    ? "bg-surface border-brand-500 shadow-raised ring-2 ring-brand-500/20 scale-[1.01]"
                    : "bg-surface/70 border-line hover:border-line-strong hover:bg-surface opacity-75 hover:opacity-100",
                )}
              >
                {/* Pillar Step Header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "grid size-7 place-items-center rounded-full text-xs font-black transition-colors",
                        isCurrent ? "bg-brand-500 text-white" : "bg-line text-muted",
                      )}
                    >
                      0{index + 1}
                    </span>
                    <span className="text-[0.6875rem] font-extrabold uppercase tracking-wider text-brand-600">
                      Pillar {index + 1} of 7
                    </span>
                  </div>

                  <span className="flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700">
                    <Target className="size-3" />
                    {pillar.score}% Target
                  </span>
                </div>

                {/* Pillar Title and Summary */}
                <div className="mt-4 flex items-start gap-4">
                  <div className="shrink-0 p-2 rounded-2xl bg-surface-sunk border border-line group-hover:scale-105 transition-transform">
                    <Art3D name={pillar.art} size="sm" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg sm:text-xl font-black text-ink group-hover:text-brand-600 transition-colors">
                      {pillar.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
                      {pillar.summary}
                    </p>
                  </div>
                </div>

                {/* Core Deliverable Badge */}
                <div className="mt-5 rounded-2xl bg-surface-sunk p-3.5 border border-line/70">
                  <p className="text-[0.6875rem] font-bold text-muted uppercase tracking-wider">
                    Core Action Deliverable
                  </p>
                  <p className="mt-1 text-xs font-bold text-ink flex items-center gap-1.5">
                    <Check className="size-3.5 text-brand-600 shrink-0" />
                    {pillar.project.title}: {pillar.project.deliverable}
                  </p>
                </div>

                {/* Expanded details when active */}
                {isCurrent && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-5 pt-4 border-t border-line/60 flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-brand-600 flex items-center gap-1">
                      <Zap className="size-3.5 text-amber-500 fill-amber-500" />
                      +{pillar.project.xp} XP Milestone
                    </span>
                    <span className="font-bold text-ink-soft flex items-center gap-1">
                      Active Scrollytelling Focus
                      <ChevronRight className="size-3.5 text-brand-600" />
                    </span>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Sticky Scrollytelling Viewport Console */}
        <div className="sticky top-24 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card
                className="overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-7 shadow-raised backdrop-blur-sm"
                padded
              >
                {/* Visual Header with Dynamic 3D Art & Radiant Glow */}
                <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-surface-sunk via-brand-50/40 to-surface p-6 border border-line text-center">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,var(--color-brand-100),transparent_70%)] opacity-70"
                  />
                  <div className="mx-auto grid size-20 place-items-center rounded-3xl bg-surface shadow-card border border-brand-100">
                    <Art3D name={activePillar.art} size="lg" />
                  </div>

                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-100/70 px-2.5 py-0.5 text-[0.6875rem] font-black uppercase tracking-wider text-brand-700">
                      <Layers className="size-3" />
                      Pillar Console · {activePillar.shortName}
                    </span>
                    <h3 className="mt-1.5 text-xl font-black text-ink">{activePillar.name}</h3>
                  </div>

                  {/* Score & Benchmark Meter */}
                  <div className="mt-4 grid grid-cols-2 gap-3 pt-3 border-t border-line/60 text-left">
                    <div className="rounded-xl bg-surface/80 p-2.5 border border-line/60">
                      <span className="text-[0.6875rem] font-bold text-muted">Baseline Target</span>
                      <p className="text-lg font-black text-brand-700">{activePillar.score}%</p>
                    </div>
                    <div className="rounded-xl bg-surface/80 p-2.5 border border-line/60">
                      <span className="text-[0.6875rem] font-bold text-muted">Curriculum XP</span>
                      <p className="text-lg font-black text-xp flex items-center gap-1">
                        <Zap className="size-4 fill-current" />
                        +{activePillar.project.xp} XP
                      </p>
                    </div>
                  </div>
                </div>

                {/* Practical Outcomes Checklist */}
                <div className="mt-6 space-y-2.5">
                  <p className="text-[0.6875rem] font-extrabold uppercase tracking-wider text-muted">
                    What this pillar unlocks in your career:
                  </p>
                  {[
                    "Baseline diagnostic & objective readiness rating",
                    "Real project deliverable reviewed by sector mentors",
                    "Measurable credential added to your student passport",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-ink-soft">
                      <span className="grid size-4.5 place-items-center rounded-full bg-success-soft text-success shrink-0">
                        <Check className="size-3 stroke-[3]" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Sample Cohort Mission */}
                <div className="mt-6 rounded-2xl bg-surface-sunk p-4 border border-line">
                  <div className="flex items-center justify-between text-[0.6875rem] font-bold text-muted">
                    <span className="flex items-center gap-1 text-brand-700 uppercase">
                      <Award className="size-3.5 text-brand-600" />
                      Cohort Project Mission
                    </span>
                    <span>{activePillar.lessons.length} Lessons</span>
                  </div>
                  <p className="mt-2 text-xs font-bold text-ink leading-relaxed">
                    “{activePillar.project.description}”
                  </p>
                </div>

                {/* Action CTA */}
                <div className="mt-6 pt-4 border-t border-line flex items-center justify-between gap-3">
                  <div className="text-xs">
                    <span className="font-bold text-ink">Ready to level up?</span>
                    <p className="text-muted text-[0.6875rem]">Included in 4-Week Cohort</p>
                  </div>
                  <ButtonLink
                    to={`/learning/${activePillar.id}`}
                    size="sm"
                    className="bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-xs hover:shadow-md"
                  >
                    <span>View Curriculum</span>
                    <ArrowRight className="size-3.5" />
                  </ButtonLink>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
