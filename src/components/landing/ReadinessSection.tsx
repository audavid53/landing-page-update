import { useScrollReveal } from "@/lib/useScrollReveal";
import { cn } from "@/lib/cn";

const READINESS_SKILLS = [
  { label: "Self-Knowledge", position: "top-0 left-[5%]" },
  { label: "Financial Awareness", position: "top-0 right-[10%]" },
  { label: "Curiosity to Explore", position: "top-14 left-[20%]" },
  { label: "Social Skills & Networks", position: "top-14 right-[5%]" },
  { label: "Skill Stacking", position: "top-28 left-[8%]" },
  { label: "Physical & Energy Capital", position: "top-28 right-[15%]" },
  { label: "Adaptability & Resilience", position: "top-[10.5rem] left-[25%]" },
];

const PILL_COLORS = [
  "bg-brand-50 text-brand-700 border-brand-200",
  "bg-success-soft text-success border-success/20",
  "bg-info-soft text-info border-info/20",
  "bg-xp-soft text-amber-800 border-amber-200",
  "bg-block-rose-soft text-block-rose border-block-rose/20",
  "bg-block-sky-soft text-block-sky border-block-sky/20",
  "bg-brand-100 text-brand-800 border-brand-300",
];

export function ReadinessSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div
        ref={ref}
        className={cn("scroll-reveal", isVisible && "visible")}
      >
        {/* Floating pills — hidden on mobile, visible as grid instead */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-10">
          {READINESS_SKILLS.map((skill, idx) => (
            <span
              key={skill.label}
              className={cn(
                "inline-flex items-center rounded-full px-4 py-2 text-xs sm:text-sm font-bold border transition-transform duration-300 hover:scale-105 cursor-default",
                PILL_COLORS[idx % PILL_COLORS.length],
              )}
              style={{ "--reveal-delay": `${idx * 60}ms` } as React.CSSProperties}
            >
              {skill.label}
            </span>
          ))}
        </div>

        {/* Center messaging */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-title text-ink font-extrabold tracking-tight text-balance">
            Know where you stand.
            <br />
            Know what to work on next.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
            Your journey is measured across seven areas of career readiness.
            Your score isn't a label. It's a starting point.
          </p>

          {/* Score message card */}
          <div className="mt-8 inline-block rounded-2xl bg-surface-sunk p-5 sm:p-6 border border-line shadow-card">
            <p className="text-xs font-extrabold uppercase tracking-widest text-brand-600 mb-1">
              YOUR SCORE IS A STARTING POINT
            </p>
            <p className="text-sm font-bold text-ink">
              Grow it through the journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
