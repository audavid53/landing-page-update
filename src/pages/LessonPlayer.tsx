import { useState } from "react";
import { ArrowLeft, Check, Play, RotateCcw, Zap } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Art3D } from "@/components/art/Art3D";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/Progress";
import { PILLAR_BY_ID } from "@/data/pillars";
import type { InteractionKind, Lesson, PillarId } from "@/data/types";
import { useProgress } from "@/state/useProgress";
import { cn } from "@/lib/cn";
import NotFound from "./NotFound";

/**
 * The interactive class experience (blueprint section 7).
 *
 * The brief is explicit that this must not feel like passive e-learning, so the
 * lesson is a sequence of stages rather than a video with a Next button:
 *
 *   watch -> interact -> feedback -> complete
 *
 * The interact stage differs by the lesson's own `interaction` kind, which is
 * why that is modelled on the data rather than assumed. Section 7's "make
 * meaningful effort visible" note drives the feedback stage: it names what the
 * learner did, what changed, and what it was worth, instead of a bare tick.
 */
type Stage = "watch" | "interact" | "feedback" | "done";

const INTERACTION_COPY: Record<InteractionKind, { label: string; prompt: string }> = {
  "checkpoint-quiz": {
    label: "Checkpoint",
    prompt: "Answer this before moving on.",
  },
  "decision-point": {
    label: "Decision point",
    prompt: "There is no single right answer. Choose what you would actually do.",
  },
  "practical-exercise": {
    label: "Practical exercise",
    prompt: "Write your answer. You will reuse this later in the programme.",
  },
  "peer-review": {
    label: "Peer review",
    prompt: "Read a peer's work and give one specific piece of feedback.",
  },
  "project-submission": {
    label: "Project",
    prompt: "Submit the deliverable. A mentor reviews it within a week.",
  },
};

const CHOICES = [
  "Take the role that pays more now",
  "Take the role that teaches me more",
  "Keep looking for one that does both",
];

export default function LessonPlayer() {
  const { pillarId, lessonId } = useParams<{ pillarId: PillarId; lessonId: string }>();
  const [stage, setStage] = useState<Stage>("watch");
  const [choice, setChoice] = useState<number | null>(null);
  const { complete, hasCompleted } = useProgress();

  const pillar = pillarId ? PILLAR_BY_ID[pillarId] : undefined;
  const lesson: Lesson | undefined = pillar?.lessons.find((l) => l.id === lessonId);

  if (!pillar || !lesson) return <NotFound />;

  const interaction = INTERACTION_COPY[lesson.interaction];
  const alreadyDone = hasCompleted(`lesson:${lesson.id}`);

  const STAGES: Stage[] = ["watch", "interact", "feedback", "done"];
  const stageIndex = STAGES.indexOf(stage);
  const pct = Math.round((stageIndex / (STAGES.length - 1)) * 100);

  const finish = () => {
    complete({
      key: `lesson:${lesson.id}`,
      xp: lesson.xp,
      label: `Finished “${lesson.title}”`,
      effect: `${pillar.shortName} readiness moves up, and ${lesson.units} units are added to your record.`,
    });
    setStage("done");
  };

  return (
    <div className="space-y-6">
      <Link
        to={`/learning/${pillar.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {pillar.shortName}
      </Link>

      <header>
        <div className="flex flex-wrap items-center gap-1.5">
          <Pill size="sm" tone="brand">
            {pillar.shortName}
          </Pill>
          <Pill size="sm" tone="xp" icon={<Zap />}>
            +{lesson.xp} XP
          </Pill>
          <Pill size="sm" tone="neutral">
            {lesson.units} {lesson.units === 1 ? "unit" : "units"}
          </Pill>
          <Pill size="sm" tone="neutral">
            {lesson.minutes} min
          </Pill>
        </div>
        <h1 className="mt-3 text-title text-ink">{lesson.title}</h1>
      </header>

      <ProgressBar value={pct} label="Lesson progress" showLabel />

      {/* 1 — Watch --------------------------------------------------------- */}
      {stage === "watch" ? (
        <Card className="rounded-block">
          <div
            data-ramp={pillar.ramp}
            className="ramp-block grid aspect-video place-items-center rounded-card"
          >
            <span className="grid size-16 place-items-center rounded-full bg-white/95 shadow-fab">
              <Play className="size-7 translate-x-0.5 text-ink" fill="currentColor" aria-hidden="true" />
            </span>
            <span className="sr-only">Lesson video placeholder — no player is wired up yet</span>
          </div>
          <p className="mt-4 text-sm text-muted">
            {lesson.minutes} minutes. It stops once for a {interaction.label.toLowerCase()} — that
            part is the lesson, not an interruption.
          </p>
          <Button size="lg" className="mt-4" onClick={() => setStage("interact")}>
            Start the lesson
          </Button>
        </Card>
      ) : null}

      {/* 2 — Interact ------------------------------------------------------ */}
      {stage === "interact" ? (
        <Card className="rounded-block">
          <div className="flex items-start gap-3.5">
            <Art3D name="bulb" size="lg" />
            <div className="min-w-0">
              <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase">
                {interaction.label}
              </p>
              <h2 className="mt-1 text-lg font-extrabold tracking-tight text-ink text-balance">
                You are offered two roles. One pays 40% more. The other puts you next to people
                doing the work you want in five years.
              </h2>
              <p className="mt-1.5 text-sm text-muted">{interaction.prompt}</p>
            </div>
          </div>

          <ul className="mt-5 space-y-2">
            {CHOICES.map((option, index) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => setChoice(index)}
                  aria-pressed={choice === index}
                  className={cn(
                    "w-full rounded-card border-2 p-4 text-left text-sm font-semibold transition-colors",
                    choice === index
                      ? "border-brand-500 bg-brand-50 text-brand-800"
                      : "border-line bg-surface text-ink hover:border-brand-200",
                  )}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>

          <Button
            size="lg"
            className="mt-5"
            disabled={choice === null}
            onClick={() => setStage("feedback")}
          >
            Submit answer
          </Button>
        </Card>
      ) : null}

      {/* 3 — Feedback: what you did, what changed, what it was worth -------- */}
      {stage === "feedback" ? (
        <Card className="rounded-block border-info-soft bg-info-soft/50">
          <div className="flex items-start gap-3.5">
            <Art3D name="target" size="lg" />
            <div className="min-w-0">
              <h2 className="text-lg font-extrabold tracking-tight text-ink">
                Most learners pick the money. You picked{" "}
                {choice === 0 ? "the money too" : choice === 1 ? "the learning" : "neither"}.
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                Neither answer is wrong — but the trade-off you just made is the one this pillar
                teaches you to make on purpose rather than by default. Financial Situational
                Awareness is knowing what a role costs you as well as what it pays.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button size="lg" onClick={finish}>
              Complete lesson
            </Button>
            <Button variant="ghost" onClick={() => setStage("interact")}>
              <RotateCcw className="size-4" aria-hidden="true" />
              Change my answer
            </Button>
          </div>
        </Card>
      ) : null}

      {/* 4 — Complete ------------------------------------------------------ */}
      {stage === "done" ? (
        <Card className="rounded-block text-center">
          <Art3D name="party" size="hero" className="mx-auto" />
          <h2 className="mt-4 text-title text-ink">Lesson complete</h2>
          <p className="mt-2 text-muted">
            {alreadyDone
              ? "You had already finished this one, so no XP was awarded twice."
              : `+${lesson.xp} XP and ${lesson.units} units added to your record.`}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button onClick={() => setStage("watch")} variant="secondary">
              <RotateCcw className="size-4" aria-hidden="true" />
              Watch again
            </Button>
            <Link
              to={`/learning/${pillar.id}`}
              className="inline-flex h-11 items-center gap-2 rounded-pill bg-brand-500 px-5 text-sm font-semibold text-white hover:bg-brand-600"
            >
              <Check className="size-4" aria-hidden="true" />
              Back to {pillar.shortName}
            </Link>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
