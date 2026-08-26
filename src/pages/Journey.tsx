import { Gift, Lock } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import { RoadmapTrail } from "@/components/gamification/RoadmapTrail";
import { BlockCard } from "@/components/ui/Block";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/Progress";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CURRENT_LEVEL, LEVELS, OPPORTUNITIES } from "@/data/programme";
import { useProgress } from "@/state/useProgress";

/**
 * The full career journey map (blueprint section 6).
 *
 * The dashboard shows where the learner stands; this screen shows the whole
 * shape of the programme, including the levels they have not reached. Section 6
 * asks for future levels to create aspiration "without overwhelming" — so
 * locked levels keep their title and their reward but drop the detail.
 */
export default function Journey() {
  const { xp } = useProgress();

  const treasure = LEVELS[LEVELS.length - 1]!;
  const remaining = Math.max(treasure.xpRequired - xp, 0);
  const pct = Math.min(100, Math.round((xp / treasure.xpRequired) * 100));
  const totalUnits = LEVELS.reduce((sum, level) => sum + level.units, 0);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-title text-ink">Your career journey</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Six levels, {totalUnits} units of work, ending in the Treasure Chest. You move at your own
          pace — the level you are on is yours, not your cohort's.
        </p>
      </header>

      {/* The long-term reward, made visible from the start (section 14). */}
      <BlockCard
        to="/opportunities"
        ramp="navy"
        eyebrow="Level 6"
        title="The Treasure Chest"
        description={`${OPPORTUNITIES.length} internships and placements open here. ${remaining.toLocaleString("en-NG")} XP to go.`}
        art="gift"
        artSize="2xl"
      >
        <div className="max-w-sm">
          <ProgressBar
            value={pct}
            label="Progress to the Treasure Chest"
            tone="onDark"
            showLabel
          />
        </div>
      </BlockCard>

      <section aria-labelledby="trail-heading">
        <SectionHeader
          id="trail-heading"
          title="The six levels"
          description="Completed levels stay visible so progress is something you can look back at."
          action={
            <Pill tone="brand">
              Level {CURRENT_LEVEL} of {LEVELS.length}
            </Pill>
          }
        />
        <RoadmapTrail levels={LEVELS} currentLevel={CURRENT_LEVEL} />
      </section>

      {/* What Level 6 actually opens, stated plainly (section 16). */}
      <section
        aria-labelledby="eligibility-heading"
        className="rounded-block border border-line bg-surface p-5 shadow-card sm:p-6"
      >
        <div className="flex items-start gap-4">
          <Art3D name="key" size="lg" />
          <div className="min-w-0">
            <h2 id="eligibility-heading" className="text-lg font-extrabold tracking-tight text-ink">
              How the Treasure Chest opens
            </h2>
            <p className="mt-1 text-sm text-muted">
              Eligibility is published up front rather than decided case by case.
            </p>
          </div>
        </div>

        <ul className="mt-5 space-y-2.5">
          {[
            "Reach Level 6 by completing the missions at Levels 1 to 5.",
            "Ship at least two proof-of-skill projects that a mentor has reviewed.",
            "Hold a career-readiness score of 70 or above across the seven pillars.",
            "Keep your profile and guardian details current.",
          ].map((rule) => (
            <li key={rule} className="flex items-start gap-3 text-sm text-ink-soft">
              <span
                aria-hidden="true"
                className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-50"
              >
                <Lock className="size-3 text-brand-600" strokeWidth={2.75} />
              </span>
              {rule}
            </li>
          ))}
        </ul>

        <p className="mt-5 inline-flex items-center gap-2 rounded-card bg-canvas px-3.5 py-2.5 text-xs font-semibold text-muted">
          <Gift className="size-4 text-brand-600" aria-hidden="true" />
          Final eligibility rules are still being confirmed with partner employers.
        </p>
      </section>
    </div>
  );
}
