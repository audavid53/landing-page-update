import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import confetti from "canvas-confetti";
import { Art3D } from "@/components/art/Art3D";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PILLARS } from "@/data/pillars";

export function HeroSection() {
  const [interactiveScore, setInteractiveScore] = useState(65);
  const [activeTab, setActiveTab] = useState<"readiness" | "xp">("readiness");

  const fireConfetti = () => {
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#5525e8", "#f0a202", "#1f8f45", "#1273d4", "#d63864"],
    });
  };

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 pt-6 pb-16 sm:px-6 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Background ambient decorative orbs with subtle float */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/4 -z-10 size-72 rounded-full bg-brand-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 right-10 -z-10 size-80 rounded-full bg-xp-soft/60 blur-3xl"
      />

      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        {/* Left Column: Value Proposition & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Cohort Status Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/90 px-3.5 py-1.5 text-xs font-bold text-brand-700 shadow-2xs">
            <span className="flex size-2 rounded-full bg-brand-500 animate-ping" />
            <span className="size-2 rounded-full bg-brand-500 -ml-3" />
            <span>Four weeks · Cohort 5 Applications Open · Built in Nigeria</span>
          </div>

          <h1 className="mt-5 text-display text-ink text-balance tracking-tight leading-[1.08]">
            From career confusion to a{" "}
            <span className="relative inline-block text-brand-600">
              plan you can act on.
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-1 left-0 h-1.5 bg-brand-300/60 rounded-full -z-10"
              />
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base sm:text-lg text-muted leading-relaxed">
            iPlace moves young Nigerians from <span className="font-semibold text-ink">“I don’t know where to start”</span> to clear direction — through baseline assessments, live sessions with working industry leads, portfolio proof, and a cohort that holds you accountable.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <ButtonLink
              to="/apply/assessments/career-clarity"
              size="lg"
              onClick={fireConfetti}
              className="group relative shadow-raised hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Sparkles className="size-4 text-amber-300" />
              Take the free clarity assessment
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </ButtonLink>

            <ButtonLink
              to="/apply/interview"
              size="lg"
              variant="secondary"
              className="border-line-strong hover:bg-surface-sunk"
            >
              Apply for a scholarship
            </ButtonLink>
          </div>

          {/* Key Value Points */}
          <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-muted">
            <div className="flex items-center gap-2">
              <span className="grid size-5 place-items-center rounded-full bg-success-soft text-success">
                <Check className="size-3.5 stroke-[3]" />
              </span>
              <span>100% Free Baseline Assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="grid size-5 place-items-center rounded-full bg-success-soft text-success">
                <Check className="size-3.5 stroke-[3]" />
              </span>
              <span>11 Minutes to Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="grid size-5 place-items-center rounded-full bg-success-soft text-success">
                <Check className="size-3.5 stroke-[3]" />
              </span>
              <span>14 Verified Sectors</span>
            </div>
          </div>

          {/* Live Learner Proof Avatar Stack */}
          <div className="mt-8 flex items-center gap-3.5 pt-6 border-t border-line/80">
            <div className="flex -space-x-2.5 overflow-hidden">
              {["Mary S.", "Chidinma O.", "Tunde A.", "Amara N.", "Segun B."].map((name, i) => (
                <div
                  key={name}
                  className="inline-flex size-9 items-center justify-center rounded-full border-2 border-surface bg-brand-100 text-xs font-extrabold text-brand-800 shadow-2xs"
                  style={{
                    backgroundColor: ["#e5dbff", "#e3f6e9", "#fff2da", "#ffe7ee", "#e4f0fe"][i % 5],
                    color: ["#4c1fd6", "#1f8f45", "#ef9d16", "#d63864", "#1273d4"][i % 5],
                  }}
                >
                  {name.charAt(0)}
                </div>
              ))}
            </div>
            <div className="text-xs">
              <p className="font-bold text-ink flex items-center gap-1.5">
                <Users className="size-3.5 text-brand-600" />
                Joined by 1,420+ Nigerian learners
              </p>
              <p className="text-muted">Across Lagos, Abuja, Ibadan, Enugu, Port Harcourt & more</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive Live Readiness Simulation Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Floating Orbiting 3D Elements */}
          <div className="pointer-events-none absolute -top-8 -right-4 z-20 animate-bounce duration-1000 hidden sm:block">
            <div className="rounded-2xl bg-surface/90 p-2.5 shadow-raised border border-line backdrop-blur-xs flex items-center gap-2">
              <Art3D name="crown" size="sm" />
              <div className="text-left pr-1">
                <p className="text-[0.65rem] font-bold text-muted uppercase tracking-wider">Level 6</p>
                <p className="text-xs font-extrabold text-ink">Treasure Chest</p>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-6 -left-6 z-20 hidden sm:block">
            <div className="rounded-2xl bg-surface/95 p-3 shadow-raised border border-line backdrop-blur-xs flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-xl bg-xp-soft text-xp">
                <Zap className="size-4 fill-current" />
              </span>
              <div className="text-left">
                <p className="text-[0.65rem] font-bold text-muted">Weekly Goal</p>
                <p className="text-xs font-extrabold text-ink">+240 XP Earned</p>
              </div>
            </div>
          </div>

          {/* Interactive Card */}
          <Card className="relative z-10 mx-auto w-full max-w-md bg-surface/95 backdrop-blur-md border border-line/90 shadow-raised" padded>
            {/* Card Header & Tab Switcher */}
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted">Live Simulator</p>
                <h3 className="text-base font-extrabold text-ink">Career Readiness Score</h3>
              </div>
              <div className="flex rounded-lg bg-surface-sunk p-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab("readiness")}
                  className={`rounded-md px-2.5 py-1 transition-colors ${
                    activeTab === "readiness"
                      ? "bg-surface text-brand-600 shadow-2xs"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  Pillars
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("xp")}
                  className={`rounded-md px-2.5 py-1 transition-colors ${
                    activeTab === "xp"
                      ? "bg-surface text-brand-600 shadow-2xs"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  Milestones
                </button>
              </div>
            </div>

            {/* Dial & Score Metric */}
            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-brand-50/60 p-4 border border-brand-100">
              <div className="relative flex items-center justify-center">
                <svg className="size-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#e5dbff"
                    strokeWidth="7"
                    fill="transparent"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#5525e8"
                    strokeWidth="7"
                    strokeDasharray={201}
                    strokeDashoffset={201 - (201 * interactiveScore) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-black text-brand-700">{interactiveScore}%</span>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-success">
                  <TrendingUp className="size-3.5" />
                  <span>+18% average growth in 4 weeks</span>
                </div>
                <p className="mt-1 text-xs text-ink font-semibold">
                  {interactiveScore < 50
                    ? "Baseline Stage: Need clarity across skills & networking."
                    : interactiveScore < 75
                      ? "Active Growth: On track for partner employer reviews."
                      : "High Readiness: Ready for Level 6 Internship Chest!"}
                </p>
              </div>
            </div>

            {/* Slider to interact */}
            <div className="mt-4 px-1">
              <div className="flex items-center justify-between text-xs font-bold text-muted">
                <span>Drag to preview readiness level</span>
                <span className="text-brand-600">{interactiveScore}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="95"
                value={interactiveScore}
                onChange={(e) => setInteractiveScore(Number(e.target.value))}
                className="mt-2 w-full accent-brand-500 cursor-pointer"
                aria-label="Adjust interactive readiness score"
              />
            </div>

            {/* Pillar breakdown */}
            <div className="mt-4 space-y-2.5">
              {PILLARS.slice(0, 3).map((pillar, i) => {
                const calculatedPillarScore = Math.min(
                  98,
                  Math.max(25, Math.round((interactiveScore * (0.85 + i * 0.15)))),
                );
                return (
                  <div
                    key={pillar.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-surface-sunk px-3 py-2 border border-line/60"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Art3D name={pillar.art} size="xs" />
                      <span className="truncate text-xs font-bold text-ink">
                        {pillar.shortName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-line overflow-hidden hidden sm:block">
                        <div
                          className="h-full bg-brand-500 rounded-full transition-all duration-300"
                          style={{ width: `${calculatedPillarScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-ink">
                        {calculatedPillarScore}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Card Action footer */}
            <div className="mt-5 pt-4 border-t border-line flex items-center justify-between">
              <span className="text-xs font-bold text-brand-600 flex items-center gap-1">
                <Zap className="size-3.5 fill-current" />
                Free Diagnostic
              </span>
              <ButtonLink
                to="/apply/assessments/career-clarity"
                size="sm"
                className="bg-brand-500 text-white"
              >
                Start Assessment
                <ArrowRight className="size-3" />
              </ButtonLink>
            </div>
          </Card>

          {/* Glow backdrop behind card */}
          <div
            aria-hidden="true"
            className="absolute -inset-4 -z-10 rounded-[32px] bg-linear-to-br from-brand-200/50 via-brand-100/20 to-transparent blur-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
