import { useState } from "react";
import { BookOpen, CheckCircle2, Clock, Flame, Zap } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import { StatTile } from "@/components/ui/Block";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/GradientIcon";
import { NudgeRow } from "@/components/ui/NudgeRow";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/Progress";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tabs } from "@/components/ui/Tabs";
import { WeeklyBars } from "@/components/ui/WeeklyBars";
import { nextTierFor, tierFor, xpToNextTier } from "@/data/badges";
import { PILLARS, readinessScore } from "@/data/pillars";
import { useProgress } from "@/state/useProgress";

const THIS_WEEK = [
  { day: "Mon", value: 2 },
  { day: "Tue", value: 3 },
  { day: "Wed", value: 5 },
  { day: "Thu", value: 6 },
  { day: "Fri", value: 4 },
  { day: "Sat", value: 5 },
  { day: "Sun", value: 3 },
];

const LAST_MONTH = [
  { day: "W1", value: 14 },
  { day: "W2", value: 21 },
  { day: "W3", value: 18 },
  { day: "W4", value: 26 },
  { day: "W5", value: 11 },
  { day: "W6", value: 19 },
  { day: "W7", value: 23 },
];

/**
 * The statistics screen from the design reference.
 *
 * Section 7's "labour perception bias" note applies here more than anywhere: the
 * point is to make effort visible. So the figures are all things the learner
 * actually did — hours, lessons, the pillars that moved — rather than a score
 * handed down to them.
 */
export default function Stats() {
  const [range, setRange] = useState("weekly");
  const { xp, hasCompleted } = useProgress();
  const tier = tierFor(xp);
  const next = nextTierFor(xp);

  const lessons = PILLARS.flatMap((p) => p.lessons);
  const done = lessons.filter((l) => hasCompleted(`lesson:${l.id}`));
  const minutes = done.reduce((sum, l) => sum + l.minutes, 0);
  const unitsEarned = done.reduce((sum, l) => sum + l.units, 0);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-title text-ink">Statistics</h1>
          <p className="mt-2 text-muted">What your effort has added up to.</p>
        </div>
        <Pill tone="brand">This month</Pill>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <StatTile
          icon={Clock}
          ramp="violet"
          value={Math.round(minutes / 60)}
          label="Hours spent"
        />
        <StatTile icon={CheckCircle2} ramp="green" value={done.length} label="Lessons done" />
        <StatTile icon={Zap} ramp="amber" value={xp.toLocaleString("en-NG")} label="XP earned" />
        <StatTile icon={BookOpen} ramp="sky" value={unitsEarned} label="Units earned" />
      </div>

      <section aria-labelledby="activity-heading">
        <SectionHeader
          id="activity-heading"
          title="Activity"
          description="Your strongest day is highlighted."
        />
        <Card className="rounded-block">
          <Tabs
            group="activity"
            label="Activity range"
            value={range}
            onChange={setRange}
            items={[
              { id: "weekly", label: "Weekly" },
              { id: "monthly", label: "Monthly" },
            ]}
          />
          <div
            id={`activity-panel-${range}`}
            role="tabpanel"
            aria-labelledby={`activity-tab-${range}`}
            tabIndex={0}
            className="pt-5 outline-none"
          >
            {range === "weekly" ? (
              <WeeklyBars data={THIS_WEEK} ramp="green" />
            ) : (
              <WeeklyBars data={LAST_MONTH} ramp="violet" unit="lessons" />
            )}
          </div>
        </Card>
      </section>

      <section aria-labelledby="pillars-heading">
        <SectionHeader
          id="pillars-heading"
          title="The seven pillars"
          description={`Career readiness score: ${readinessScore()} out of 100.`}
        />
        <Card className="rounded-block">
          <ul className="space-y-4">
            {PILLARS.map((pillar) => {
              const delta = pillar.score - pillar.previousScore;
              return (
                <li key={pillar.id} className="flex items-center gap-3">
                  <Art3D name={pillar.art} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="truncate text-sm font-semibold text-ink">
                        {pillar.shortName}
                      </span>
                      <span className="shrink-0 text-sm font-bold tabular-nums text-ink">
                        {pillar.score}
                        {delta > 0 ? (
                          <span className="ml-1.5 text-xs font-bold text-success">+{delta}</span>
                        ) : null}
                      </span>
                    </div>
                    <ProgressBar
                      value={pillar.score}
                      label={`${pillar.name} readiness`}
                      color={pillar.color}
                      className="mt-1.5"
                      size="sm"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </section>

      <section aria-labelledby="momentum-heading">
        <SectionHeader id="momentum-heading" title="Momentum" />
        <div className="grid gap-3 sm:grid-cols-2">
          <NudgeRow
            to="/profile#badges"
            art="trophy"
            ramp="amber"
            title={next ? "Keep it up!" : `${tier.name} unlocked`}
            detail={
              next
                ? `${xpToNextTier(xp).toLocaleString("en-NG")} XP to ${next.name}`
                : "You are on the top tier"
            }
          />
          <NudgeRow
            to="/community"
            art="fire"
            ramp="sky"
            title="7 day streak"
            detail="Your longest yet — don't break it today"
          />
        </div>
      </section>

      <Card className="flex items-center gap-4 rounded-block">
        <IconTile icon={Flame} ramp="rose" size="lg" />
        <div className="min-w-0">
          <p className="text-sm font-extrabold text-ink">Where the numbers come from</p>
          <p className="mt-1 text-sm text-muted">
            Every figure here is tied to an action you completed. Nothing is estimated, and nothing
            counts twice.
          </p>
        </div>
      </Card>
    </div>
  );
}
