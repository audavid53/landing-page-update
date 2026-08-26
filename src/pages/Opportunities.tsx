import { Lock, MapPin, Timer } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import { Card } from "@/components/ui/Card";
import { CircleArrow } from "@/components/ui/Block";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/Progress";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CURRENT_LEVEL, LEVELS, OPPORTUNITIES } from "@/data/programme";
import { useProgress } from "@/state/useProgress";
import { cn } from "@/lib/cn";

const KIND_LABEL = {
  internship: "Internship",
  placement: "Placement",
  fellowship: "Fellowship",
} as const;

/**
 * Job Opportunities and the Level 6 Treasure Chest (blueprint section 14).
 *
 * The brief is explicit that this should read as the outcome of progression
 * rather than another menu page, so locked opportunities are shown in full —
 * employer, role, what it takes — instead of being hidden behind the lock. The
 * learner can see exactly what they are working toward and why it is not open
 * yet.
 */
export default function Opportunities() {
  const { xp } = useProgress();
  const treasure = LEVELS[LEVELS.length - 1]!;
  const pct = Math.min(100, Math.round((xp / treasure.xpRequired) * 100));
  const remaining = Math.max(treasure.xpRequired - xp, 0);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-title text-ink">Job opportunities</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Internships and placements with partner organisations. They open at Level 6 — this is what
          the journey is for.
        </p>
      </header>

      {/* Status of the gate itself, before any of the roles behind it. */}
      <section
        data-ramp="navy"
        className="ramp-block relative overflow-hidden rounded-block p-6"
        aria-labelledby="chest-heading"
      >
        <Art3D
          name="gift"
          size="2xl"
          className="pointer-events-none absolute -top-3 -right-3 rotate-6 drop-shadow-lg"
        />
        <div className="relative max-w-md pr-20">
          <Pill tone="dark" size="sm">
            Level {CURRENT_LEVEL} of 6
          </Pill>
          <h2 id="chest-heading" className="mt-2 text-xl font-extrabold tracking-tight text-white">
            The Treasure Chest is still locked
          </h2>
          <p className="mt-2 text-sm on-block-muted">
            {remaining.toLocaleString("en-NG")} XP and three levels to go. Everything below stays
            visible so you know what you are working toward.
          </p>
        </div>
        <div className="relative mt-5 max-w-sm">
          <ProgressBar value={pct} label="Progress to Level 6" tone="onDark" showLabel />
        </div>
      </section>

      <section aria-labelledby="roles-heading">
        <SectionHeader
          id="roles-heading"
          title="What opens at Level 6"
          description="Live roles from partner organisations, refreshed as they come in."
        />

        <ul className="grid gap-4 sm:grid-cols-2">
          {OPPORTUNITIES.map((opportunity) => {
            const unlocked = CURRENT_LEVEL >= opportunity.unlocksAt;
            return (
              <li key={opportunity.id}>
                <Card
                  as="article"
                  className={cn(
                    "flex h-full flex-col rounded-block",
                    !unlocked && "border-dashed",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      data-ramp={opportunity.ramp}
                      className={cn(
                        "grid size-12 shrink-0 place-items-center rounded-tile",
                        unlocked ? "ramp-fill" : "bg-canvas",
                      )}
                    >
                      <Art3D name={opportunity.art} size="sm" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase">
                        {KIND_LABEL[opportunity.kind]} · {opportunity.sector}
                      </p>
                      <h3 className="mt-1 text-base font-extrabold tracking-tight text-ink">
                        {opportunity.title}
                      </h3>
                      <p className="mt-0.5 text-sm font-semibold text-muted">
                        {opportunity.organisation}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Pill size="sm" tone="neutral" icon={<MapPin />}>
                      {opportunity.location}
                    </Pill>
                    <Pill size="sm" tone="neutral" icon={<Timer />}>
                      {opportunity.closes}
                    </Pill>
                  </div>

                  <div className="mt-4 rounded-card bg-canvas p-3.5">
                    <p className="text-xs font-bold tracking-wide text-ink uppercase">
                      To be eligible
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {opportunity.eligibility.map((rule) => (
                        <li key={rule} className="text-sm text-muted">
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                    {unlocked ? (
                      <Pill tone="success">Open to you</Pill>
                    ) : (
                      <Pill tone="neutral" icon={<Lock />}>
                        Opens at Level {opportunity.unlocksAt}
                      </Pill>
                    )}
                    {unlocked ? <CircleArrow className="bg-brand-500 text-white" /> : null}
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
