import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { cn } from "@/lib/cn";

export function ProblemSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div
        ref={ref}
        className={cn("scroll-reveal", isVisible && "visible")}
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-center">
          {/* Left column — header */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted mb-3">
              THE PROBLEM
            </p>
            <h2 className="text-title text-ink font-extrabold tracking-tight text-balance">
              Not knowing what to do next is normal.
            </h2>
          </div>

          {/* Right column — explanation + CTA */}
          <div className="space-y-5">
            <h3 className="text-xl sm:text-2xl font-extrabold text-ink">
              iPlace gives you a place to start.
            </h3>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Instead of figuring everything out at once, you move through a
              structured journey — one level, one skill and one real experience
              at a time.
            </p>
            <ButtonLink
              to="/apply"
              size="md"
              className="group shadow-xs hover:shadow-md transition-all duration-300"
            >
              Start your career journey
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
