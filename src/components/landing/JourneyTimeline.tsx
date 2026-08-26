import { useScrollReveal } from "@/lib/useScrollReveal";
import { cn } from "@/lib/cn";

interface JourneyStep {
  number: string;
  title: string;
  description: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: "01",
    title: "KNOW YOURSELF",
    description:
      "Discover your strengths, interests and personality — and understand what they might mean for your career.",
  },
  {
    number: "02",
    title: "EXPLORE",
    description:
      "Explore industries, career paths and real stories from professionals working across Nigeria.",
  },
  {
    number: "03",
    title: "BUILD",
    description:
      "Develop practical skills through interactive lessons, challenges and real-world projects.",
  },
  {
    number: "04",
    title: "CONNECT",
    description:
      "Learn alongside people on a similar journey, collaborate on challenges and build meaningful professional relationships.",
  },
  {
    number: "05",
    title: "PROVE",
    description:
      "Put what you've learned into practice. Complete projects, build evidence of your ability and strengthen your career readiness.",
  },
  {
    number: "06",
    title: "UNLOCK",
    description:
      "Reach the final stage and unlock access to selected career opportunities, including internships and job-placement opportunities.",
  },
];

export function JourneyTimeline() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="journey" className="bg-surface-sunk/70 py-16 sm:py-24 border-y border-line">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-muted mb-3">
              THE JOURNEY
            </p>
            <h2 className="text-title text-ink font-extrabold tracking-tight">
              Six levels. One direction.
            </h2>
            <p className="mt-3 text-base text-muted leading-relaxed">
              Your career journey is designed to move you from self-discovery to
              real-world opportunity.
            </p>
          </div>

          {/* 6-Step Card Grid */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {JOURNEY_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className={cn(
                  "group rounded-2xl bg-surface p-6 border border-line shadow-card hover-lift",
                  "scroll-reveal",
                  isVisible && "visible",
                )}
                style={{ "--reveal-delay": `${idx * 100}ms` } as React.CSSProperties}
              >
                {/* Step number badge */}
                <div className="mb-4">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-50 border border-brand-100 text-lg font-black text-brand-700 group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-colors duration-300">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-ink mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
