import { SECTORS } from "@/data/mentors";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { cn } from "@/lib/cn";

export function MentorsShowcase() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="sectors" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div
        ref={ref}
        className={cn("scroll-reveal", isVisible && "visible")}
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16 items-start">
          {/* Left column: Header + stat */}
          <div>
            <h2 className="text-title text-ink font-extrabold tracking-tight text-balance">
              Hear what the industry
              <br />
              actually looks like.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
              Real stories from professionals working across Nigeria — so career
              paths feel tangible, not abstract.
            </p>

            {/* Stat block */}
            <div className="mt-8 rounded-2xl bg-surface p-6 border border-line shadow-card">
              <p className="text-4xl sm:text-5xl font-black text-brand-600">14</p>
              <p className="mt-1 text-sm font-semibold text-muted">
                industries · interviews · practical career stories
              </p>
            </div>
          </div>

          {/* Right column: Industry tag grid */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 content-start pt-2 lg:pt-4">
            {SECTORS.map((sector, idx) => (
              <span
                key={sector}
                className={cn(
                  "inline-flex items-center rounded-xl bg-surface px-4 py-3 sm:px-5 sm:py-3.5 text-sm font-bold text-ink border border-line shadow-card hover-lift cursor-default",
                  "scroll-reveal",
                  isVisible && "visible",
                )}
                style={{ "--reveal-delay": `${idx * 50}ms` } as React.CSSProperties}
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
