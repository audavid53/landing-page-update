import { Bookmark, Check, Lock, Sparkles } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import { BadgeArt } from "@/components/art/BadgeArt";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/Feedback";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/Progress";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  BADGE_TIERS,
  nextTierFor,
  tierFor,
  tierProgress,
  xpToNextTier,
} from "@/data/badges";
import { PILLARS, readinessScore } from "@/data/pillars";
import { useProgress } from "@/state/useProgress";

const LEARNER = {
  name: "Mary Sokoh",
  role: "Aspiring Product Designer",
  location: "Lagos, Nigeria",
};

export default function Profile() {
  const { xp, completed, reset } = useProgress();
  const tier = tierFor(xp);
  const next = nextTierFor(xp);
  const actionsCompleted = Object.keys(completed).length;

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center gap-5">
        <Avatar name={LEARNER.name} size="xl" ring online />
        <div className="min-w-[12rem] flex-1">
          <h1 className="text-title text-ink">{LEARNER.name}</h1>
          <p className="text-muted">
            {LEARNER.role} · {LEARNER.location}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <Pill tone="brand">
              Level {tier.level} · {tier.name}
            </Pill>
            <Pill tone="xp" icon={<Sparkles />}>
              {xp.toLocaleString("en-NG")} XP
            </Pill>
            <Pill tone="neutral">{actionsCompleted} actions completed</Pill>
          </div>
        </div>
      </header>

      {/* Progression --------------------------------------------------- */}
      <section aria-labelledby="progress" id="progress">
        <SectionHeader id="progress" title="Your progression" />
        <Card className="flex flex-wrap items-center gap-6">
          <BadgeArt from={tier.from} to={tier.to} glyph={tier.glyph} size={88} />
          <div className="min-w-[14rem] flex-1">
            <p className="text-sm font-semibold text-muted">Current badge</p>
            <p className="text-lg font-bold text-ink">{tier.name}</p>
            <p className="mt-0.5 text-sm text-muted">Unlocked: {tier.perk}</p>
            <ProgressBar
              className="mt-3"
              value={tierProgress(xp)}
              label={next ? `Progress to ${next.name}` : "Highest badge reached"}
              color="var(--color-xp)"
              size="lg"
            />
            <p className="mt-2 text-sm text-muted">
              {next
                ? `${xpToNextTier(xp).toLocaleString("en-NG")} XP to ${next.name}. Keep going — you are closer than you think.`
                : "Every badge unlocked. Mentor a newcomer to keep earning."}
            </p>
          </div>
          {next ? (
            <div className="flex items-center gap-3 rounded-card bg-canvas px-4 py-3">
              <BadgeArt from={next.from} to={next.to} glyph={next.glyph} size={44} locked />
              <div>
                <p className="text-xs font-semibold text-muted">Next badge</p>
                <p className="text-sm font-bold text-ink">{next.name}</p>
                <p className="text-xs text-muted">{next.perk}</p>
              </div>
            </div>
          ) : null}
        </Card>
      </section>

      {/* Readiness ------------------------------------------------------ */}
      <section aria-labelledby="readiness-summary">
        <SectionHeader
          id="readiness-summary"
          title="Career readiness"
          description={`Overall score ${readinessScore()}% across the seven pillars.`}
        />
        <Card>
          <ul className="space-y-3">
            {PILLARS.map((pillar) => (
              <li key={pillar.id} className="flex items-center gap-3">
                <Art3D name={pillar.art} size="sm" />
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink-soft">
                  {pillar.shortName}
                </span>
                <ProgressBar
                  className="max-w-48 flex-1"
                  size="sm"
                  value={pillar.score}
                  label={`${pillar.name} score`}
                  color={pillar.color}
                />
                <span className="w-10 text-right text-sm font-bold tabular-nums text-ink">
                  {pillar.score}%
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Badges --------------------------------------------------------- */}
      <section aria-labelledby="badges" id="badges">
        <SectionHeader
          id="badges"
          title="Achievements"
          description="Thirteen badges. Each one unlocks something you can use."
        />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {BADGE_TIERS.map((item) => {
            const unlocked = xp >= item.xpRequired;
            return (
              <li
                key={item.level}
                className="flex flex-col items-center gap-2 rounded-card border border-line bg-surface p-4 text-center"
              >
                <BadgeArt
                  from={item.from}
                  to={item.to}
                  glyph={item.glyph}
                  size={56}
                  locked={!unlocked}
                />
                <p className="text-sm font-bold text-ink">{item.name}</p>
                <p className="text-xs text-muted">{item.perk}</p>
                {unlocked ? (
                  <Pill tone="success" size="sm" icon={<Check />}>
                    Unlocked
                  </Pill>
                ) : (
                  <Pill tone="neutral" size="sm" icon={<Lock />}>
                    {item.xpRequired.toLocaleString("en-NG")} XP
                  </Pill>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Saved ---------------------------------------------------------- */}
      <section aria-labelledby="saved" id="saved">
        <SectionHeader id="saved" title="Saved" />
        <EmptyState
          title="Nothing saved yet"
          description="Save a mentor session or a lesson and it will wait for you here."
          art={<Bookmark aria-hidden="true" className="size-8 text-muted" />}
        />
      </section>

      {/* Reset ---------------------------------------------------------- */}
      <Card>
        <CardHeader
          title="Demo controls"
          description="This build has no backend — progress lives in your browser. Reset it to walk through the journey again."
        />
        <Button variant="danger" size="sm" onClick={reset}>
          Reset my progress
        </Button>
      </Card>
    </div>
  );
}
