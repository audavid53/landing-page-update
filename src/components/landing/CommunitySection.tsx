import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { cn } from "@/lib/cn";

const COHORT_MEMBERS = [
  { name: "Mary", track: "Product Design" },
  { name: "Oreva", track: "Marketing" },
  { name: "Oboz", track: "Data" },
  { name: "Daniel", track: "Finance" },
  { name: "Adaeze", track: "Product" },
];

const MEMBER_COLORS = [
  { bg: "bg-brand-100", text: "text-brand-800" },
  { bg: "bg-block-green-soft", text: "text-block-green" },
  { bg: "bg-xp-soft", text: "text-amber-800" },
  { bg: "bg-block-rose-soft", text: "text-block-rose" },
  { bg: "bg-block-sky-soft", text: "text-block-sky" },
];

export function CommunitySection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-surface-sunk/60 py-16 sm:py-24 border-y border-line">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          {/* Header */}
          <div className="max-w-xl mx-auto text-center lg:text-left lg:mx-0">
            <h2 className="text-title text-ink font-extrabold tracking-tight text-balance">
              You shouldn't have to figure it out alone.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
              You're not just joining a course. You're joining people moving
              forward with you.
            </p>
          </div>

          {/* Two-column cards */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* Cohort Card */}
            <div className="rounded-3xl bg-surface p-6 sm:p-8 border border-line shadow-card hover-lift">
              <div className="flex items-center gap-3 text-xs font-bold text-muted uppercase tracking-wider mb-2">
                <span>LEVEL 03</span>
                <span className="text-line-strong">·</span>
                <span>THIS WEEK</span>
              </div>
              <h3 className="text-xl font-extrabold text-ink mb-5">
                Your cohort
              </h3>

              <div className="space-y-3">
                {COHORT_MEMBERS.map((member, idx) => (
                  <div
                    key={member.name}
                    className="flex items-center gap-3 rounded-xl bg-surface-sunk p-3 border border-line/60"
                  >
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full text-xs font-extrabold",
                        MEMBER_COLORS[idx % MEMBER_COLORS.length]?.bg,
                        MEMBER_COLORS[idx % MEMBER_COLORS.length]?.text,
                      )}
                    >
                      {member.name.charAt(0)}
                    </span>
                    <span className="text-sm font-semibold text-ink">
                      {member.name}{" "}
                      <span className="text-muted font-medium">
                        · {member.track}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenge Card */}
            <div className="rounded-3xl bg-surface p-6 sm:p-8 border border-line shadow-card hover-lift">
              <p className="text-xs font-bold text-muted uppercase tracking-wider mb-4">
                THIS WEEK'S CHALLENGE
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-ink leading-snug">
                  Solve a real workplace
                  <br />
                  communication problem.
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Discuss with your cohort on WhatsApp, then submit your work on
                  iPlace.
                </p>

                <button
                  type="button"
                  className="group inline-flex items-center gap-2 rounded-xl bg-success-soft px-5 py-3 text-sm font-bold text-success hover:bg-success hover:text-white transition-colors duration-200"
                >
                  Discuss on WhatsApp
                  <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
