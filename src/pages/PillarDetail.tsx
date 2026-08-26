import { BookOpen, Check, ChevronLeft, Dumbbell, PlayCircle, Sparkles } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import { Link, Navigate, useParams } from "react-router-dom";
import { MissionCard } from "@/components/gamification/MissionCard";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/Progress";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PILLAR_BY_ID, STATUS_LABEL, STATUS_TONE, statusOf } from "@/data/pillars";
import { MISSIONS } from "@/data/programme";
import type { Lesson, PillarId } from "@/data/types";
import { useProgress } from "@/state/useProgress";

const FORMAT_ICON = {
  video: PlayCircle,
  reading: BookOpen,
  practice: Dumbbell,
} as const;

const FORMAT_LABEL = {
  video: "Video lesson",
  reading: "Reading",
  practice: "Practice",
} as const;

function LessonRow({ lesson, pillarName }: { lesson: Lesson; pillarName: string }) {
  const { complete, hasCompleted } = useProgress();
  const key = `lesson:${lesson.id}`;
  const done = hasCompleted(key);
  const Icon = FORMAT_ICON[lesson.format];

  return (
    <li className="flex flex-wrap items-center gap-3 rounded-card border border-line bg-surface p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <div className="min-w-[10rem] flex-1">
        <p className="text-sm font-bold text-ink">{lesson.title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <Pill tone="neutral" size="sm">
            {FORMAT_LABEL[lesson.format]}
          </Pill>
          <Pill tone="neutral" size="sm">
            {lesson.minutes} min
          </Pill>
          <Pill tone="xp" size="sm" icon={<Sparkles />}>
            +{lesson.xp} XP
          </Pill>
        </div>
      </div>
      {done ? (
        <Pill tone="success" icon={<Check />}>
          Completed
        </Pill>
      ) : (
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            complete({
              key,
              xp: lesson.xp,
              label: `Lesson completed: ${lesson.title}`,
              effect: `${pillarName} progress moved forward`,
            })
          }
        >
          Mark complete
        </Button>
      )}
    </li>
  );
}

export default function PillarDetail() {
  const { pillarId } = useParams<{ pillarId: PillarId }>();
  const pillar = pillarId ? PILLAR_BY_ID[pillarId] : undefined;
  const { complete, hasCompleted } = useProgress();

  if (!pillar) return <Navigate to="/learning" replace />;

  const status = statusOf(pillar.score);
  const change = pillar.score - pillar.previousScore;
  const mission = MISSIONS.find((item) => item.pillar === pillar.id);
  const projectKey = `project:${pillar.project.id}`;
  const projectDone = hasCompleted(projectKey);

  return (
    <div className="space-y-8">
      <Link
        to="/learning"
        className="inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-ink"
      >
        <ChevronLeft aria-hidden="true" className="size-4" />
        Learning Centre
      </Link>

      <header className="flex flex-wrap items-start gap-4">
        <Art3D name={pillar.art} size="lg" />
        <div className="min-w-[14rem] flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-title text-ink">{pillar.name}</h1>
            <Pill tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Pill>
          </div>
          <p className="mt-2 max-w-2xl text-muted">{pillar.summary}</p>
        </div>
      </header>

      <Card>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-base font-bold text-ink">Your score</h2>
          <p className="text-3xl font-extrabold tabular-nums" style={{ color: pillar.color }}>
            {pillar.score}%
          </p>
        </div>
        <ProgressBar
          className="mt-3"
          value={pillar.score}
          label={`${pillar.name} score`}
          color={pillar.color}
          size="lg"
        />
        <p className="mt-3 text-sm text-muted">
          {change === 0
            ? "No change since your last assessment — the lessons below are the fastest way to move it."
            : `${change > 0 ? "Up" : "Down"} ${Math.abs(change)} points since your last assessment.`}
        </p>
      </Card>

      {mission ? (
        <section aria-labelledby="pillar-mission">
          <SectionHeader id="pillar-mission" title="Mission linked to this pillar" />
          <MissionCard mission={mission} />
        </section>
      ) : null}

      <section aria-labelledby="lessons">
        <SectionHeader
          id="lessons"
          title="Lessons"
          description="Short and practical. Each one is worth XP the moment you finish it."
        />
        <ul className="space-y-3">
          {pillar.lessons.map((lesson) => (
            <LessonRow key={lesson.id} lesson={lesson} pillarName={pillar.name} />
          ))}
        </ul>
      </section>

      <section aria-labelledby="project">
        <SectionHeader
          id="project"
          title="Real-world project"
          description="Evidence of work, not just content consumed."
        />
        <Card>
          <CardHeader
            title={pillar.project.title}
            description={pillar.project.description}
            action={
              <Pill tone="xp" icon={<Sparkles />}>
                +{pillar.project.xp} XP
              </Pill>
            }
          />
          <p className="rounded-xl bg-canvas px-3 py-2.5 text-sm text-ink-soft">
            <span className="font-semibold text-ink">You will finish with:</span>{" "}
            {pillar.project.deliverable}
          </p>
          {projectDone ? (
            <Pill tone="success" icon={<Check />} className="mt-4">
              Submitted — added to your profile
            </Pill>
          ) : (
            <Button
              className="mt-4"
              onClick={() =>
                complete({
                  key: projectKey,
                  xp: pillar.project.xp,
                  label: `Project submitted: ${pillar.project.title}`,
                  effect: `${pillar.project.deliverable} added to your profile`,
                })
              }
            >
              Submit project
            </Button>
          )}
        </Card>
      </section>
    </div>
  );
}
