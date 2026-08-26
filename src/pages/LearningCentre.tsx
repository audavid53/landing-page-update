import { useMemo, useState } from "react";
import { Art3D } from "@/components/art/Art3D";
import { ChevronRight, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { MissionCard } from "@/components/gamification/MissionCard";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar, ProgressRing } from "@/components/ui/Progress";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/Feedback";
import { FilterChips } from "@/components/ui/FilterChips";
import {
  PILLARS,
  STATUS_LABEL,
  STATUS_TONE,
  previousReadinessScore,
  priorityPillar,
  readinessScore,
  statusOf,
} from "@/data/pillars";
import { MISSIONS } from "@/data/programme";
import type { PillarStatus } from "@/data/types";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "strong", label: "Strong" },
  { id: "average", label: "Average" },
  { id: "needs-work", label: "Needs work" },
];

export default function LearningCentre() {
  const [filter, setFilter] = useState("all");

  const score = readinessScore();
  const delta = score - previousReadinessScore();
  const priority = priorityPillar();
  const priorityMission = MISSIONS.find((mission) => mission.pillar === priority.id);

  const visible = useMemo(
    () => (filter === "all" ? PILLARS : PILLARS.filter((pillar) => statusOf(pillar.score) === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const tally: Record<PillarStatus, number> = { strong: 0, average: 0, "needs-work": 0 };
    for (const pillar of PILLARS) tally[statusOf(pillar.score)] += 1;
    return tally;
  }, []);

  const filterOptions = FILTERS.map((item) => ({
    ...item,
    count: item.id === "all" ? PILLARS.length : counts[item.id as PillarStatus],
  }));

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-title text-ink">Learning Centre</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Your career readiness across the seven pillars. Every score here links to a lesson and a
          project that will move it.
        </p>
      </header>

      {/* Score → evidence → action -------------------------------------- */}
      <Card className="flex flex-wrap items-center gap-6">
        <ProgressRing value={score} label="Overall career readiness score" size={140}>
          <span>
            <span className="block text-4xl font-extrabold text-brand-500">{score}%</span>
            <span className="block text-xs font-semibold text-muted">ready</span>
          </span>
        </ProgressRing>

        <div className="min-w-[15rem] flex-1">
          <h2 className="text-lg font-bold text-ink">Your career readiness score</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <Pill tone={delta >= 0 ? "success" : "danger"}>
              {delta >= 0 ? "↑" : "↓"} {Math.abs(delta)}% from last assessment
            </Pill>
            <Pill tone="neutral">{counts.strong} pillars strong</Pill>
          </div>
          <p className="mt-3 text-sm text-muted">
            Good movement. Your score is held back most by{" "}
            <strong className="font-semibold text-ink">{priority.name}</strong> — the fastest single
            way to raise it.
          </p>
          <Link
            to={`/learning/${priority.id}`}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Work on {priority.shortName}
            <ChevronRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </Card>

      {/* The mission tied to the priority pillar -------------------------- */}
      {priorityMission ? (
        <section aria-labelledby="priority-mission">
          <SectionHeader
            id="priority-mission"
            title="Mission for your priority pillar"
            description="Chosen because this pillar is where your effort changes the score most."
          />
          <MissionCard mission={priorityMission} featured />
        </section>
      ) : null}

      {/* The seven pillars ------------------------------------------------ */}
      <section aria-labelledby="pillars-heading">
        <SectionHeader
          id="pillars-heading"
          title="Your 7 pillars"
          action={
            <Link
              to="/assessments/career-readiness"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              <Info aria-hidden="true" className="size-4" />
              How scoring works
            </Link>
          }
        />

        <FilterChips
          options={filterOptions}
          value={filter}
          onChange={setFilter}
          label="Filter pillars by status"
          className="mb-4"
        />

        {visible.length === 0 ? (
          <EmptyState
            title="Nothing in this group yet"
            description="No pillar currently sits in this band. Try another filter to see where you stand."
          />
        ) : (
          <ul className="space-y-3">
            {visible.map((pillar) => {
              const status = statusOf(pillar.score);
              const change = pillar.score - pillar.previousScore;

              return (
                <li key={pillar.id}>
                  <Link
                    to={`/learning/${pillar.id}`}
                    className="flex items-center gap-4 rounded-card border border-line bg-surface p-4 shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-raised"
                  >
                    <Art3D name={pillar.art} size="md" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-ink">{pillar.name}</h3>
                        <Pill tone={STATUS_TONE[status]} size="sm">
                          {STATUS_LABEL[status]}
                        </Pill>
                        {change !== 0 ? (
                          <Pill tone={change > 0 ? "success" : "danger"} size="sm">
                            {change > 0 ? "+" : ""}
                            {change}
                          </Pill>
                        ) : null}
                      </div>
                      <p className="mt-0.5 hidden text-sm text-muted sm:block">{pillar.summary}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <ProgressBar
                          value={pillar.score}
                          label={`${pillar.name} score`}
                          color={pillar.color}
                          size="sm"
                        />
                        <span className="w-10 shrink-0 text-right text-sm font-bold tabular-nums text-ink">
                          {pillar.score}%
                        </span>
                      </div>
                    </div>
                    <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-muted" />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
