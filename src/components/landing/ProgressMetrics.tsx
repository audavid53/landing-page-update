import { BarChart3, Zap, TrendingUp, Award, Briefcase } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { cn } from "@/lib/cn";

interface Metric {
  icon: React.ElementType;
  label: string;
  description: string;
  color: string;
  bg: string;
}

const METRICS: Metric[] = [
  {
    icon: BarChart3,
    label: "UNITS",
    description: "The weight of your learning.",
    color: "text-brand-600",
    bg: "bg-brand-50",
  },
  {
    icon: Zap,
    label: "XP",
    description: "The effort you've earned.",
    color: "text-xp",
    bg: "bg-xp-soft",
  },
  {
    icon: TrendingUp,
    label: "LEVELS",
    description: "How far you've travelled.",
    color: "text-info",
    bg: "bg-info-soft",
  },
  {
    icon: Award,
    label: "BADGES",
    description: "Milestones you've reached.",
    color: "text-success",
    bg: "bg-success-soft",
  },
  {
    icon: Briefcase,
    label: "OPPORTUNITIES",
    description: "What progress can unlock.",
    color: "text-brand-700",
    bg: "bg-brand-100",
  },
];

export function ProgressMetrics() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div
        ref={ref}
        className={cn("scroll-reveal", isVisible && "visible")}
      >
        {/* Header */}
        <div className="max-w-xl">
          <h2 className="text-title text-ink font-extrabold tracking-tight">
            Your effort shouldn't disappear.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
            Every lesson, challenge, project and contribution becomes part of
            your journey.
          </p>
        </div>

        {/* Metrics grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="flex items-start gap-4 rounded-2xl bg-surface p-5 border border-line shadow-card hover-lift"
                style={{ "--reveal-delay": `${idx * 80}ms` } as React.CSSProperties}
              >
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-xl",
                    metric.bg,
                    metric.color,
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-ink">
                    {metric.label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
