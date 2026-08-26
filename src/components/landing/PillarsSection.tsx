import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import { Card } from "@/components/ui/Card";
import { PILLARS } from "@/data/pillars";
import type { Pillar } from "@/data/types";
import { ButtonLink } from "@/components/ui/Button";

export function PillarsSection() {
  const [selectedPillarId, setSelectedPillarId] = useState<string>(PILLARS[0]?.id ?? "self-knowledge");
  const activePillar: Pillar = PILLARS.find((p) => p.id === selectedPillarId) ?? PILLARS[0]!;

  return (
    <section id="pillars" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
          <Sparkles className="size-3.5" />
          The Science of Career Readiness
        </div>
        <h2 className="mt-3 text-title text-ink font-extrabold tracking-tight">
          The 7 Pillars of Career Readiness
        </h2>
        <p className="mt-3 text-base text-muted leading-relaxed">
          Progression is not a guessing game. Every lesson, sector interview, and project in iPlace develops and measures one of these seven essential pillars.
        </p>
      </div>

      {/* Interactive Pillar Selector Grid */}
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr] items-start">
        {/* Left: Pillar Grid Cards */}
        <div className="grid gap-3 sm:grid-cols-2">
          {PILLARS.map((pillar) => {
            const isSelected = pillar.id === selectedPillarId;
            return (
              <button
                type="button"
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`group relative flex items-start gap-3.5 rounded-2xl p-4 text-left transition-all duration-200 border ${
                  isSelected
                    ? "bg-surface border-brand-500 shadow-raised ring-2 ring-brand-500/20"
                    : "bg-surface/80 border-line hover:border-line-strong hover:bg-surface"
                }`}
              >
                <div className="shrink-0 p-1 rounded-xl bg-surface-sunk border border-line/60 group-hover:scale-105 transition-transform">
                  <Art3D name={pillar.art} size="sm" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-ink group-hover:text-brand-600 transition-colors">
                      {pillar.name}
                    </h3>
                    <span className="text-xs font-bold text-muted tabular-nums">
                      {pillar.score}% target
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted line-clamp-2 leading-normal">
                    {pillar.summary}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Selected Pillar Deep-Dive Focus Panel */}
        <div className="relative sticky top-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 sm:p-7 bg-surface border border-line shadow-raised rounded-3xl" padded>
                <div className="flex items-center justify-between pb-4 border-b border-line">
                  <div className="flex items-center gap-3">
                    <div className="grid size-12 place-items-center rounded-2xl bg-brand-50 border border-brand-100">
                      <Art3D name={activePillar.art} size="md" />
                    </div>
                    <div>
                      <span className="text-[0.6875rem] font-extrabold uppercase tracking-wider text-brand-600">
                        Focus Pillar
                      </span>
                      <h3 className="text-lg font-black text-ink">{activePillar.name}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-muted">Baseline Benchmark</span>
                    <p className="text-sm font-black text-brand-700">{activePillar.score}% Mastery</p>
                  </div>
                </div>

                <p className="mt-5 text-sm text-ink-soft leading-relaxed">
                  {activePillar.summary}
                </p>

                {/* Practical Outcomes */}
                <div className="mt-5 space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">
                    What you build in this pillar:
                  </p>
                  {[
                    "Baseline self-assessment & structured strengths inventory",
                    "Practical project deliverable reviewed by sector mentors",
                    "Personal actionable roadmap with measurable XP outcomes",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-ink-soft">
                      <span className="grid size-4.5 place-items-center rounded-full bg-success-soft text-success shrink-0">
                        <Check className="size-3 stroke-[3]" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Next mission prompt */}
                <div className="mt-6 rounded-2xl bg-surface-sunk p-4 border border-line">
                  <p className="text-[0.6875rem] font-bold text-muted uppercase">Sample Cohort Mission</p>
                  <p className="mt-1 text-xs font-bold text-ink">
                    “{activePillar.project.description}”
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                  <span className="text-xs font-bold text-muted">Part of 4-Week Cohort</span>
                  <ButtonLink
                    to={`/learning/${activePillar.id}`}
                    size="sm"
                    className="bg-brand-500 text-white"
                  >
                    View Curriculum
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
