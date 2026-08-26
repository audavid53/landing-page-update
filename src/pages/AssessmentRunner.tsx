import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles, Wand2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CompassArt } from "@/components/art/Illustration";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/Progress";
import { ASSESSMENT_BY_ID } from "@/data/assessments";
import { useProgress } from "@/state/useProgress";
import { cn } from "@/lib/cn";

type Stage = "intro" | "questions" | "result";

export default function AssessmentRunner() {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const assessment = assessmentId ? ASSESSMENT_BY_ID[assessmentId] : undefined;
  const { complete } = useProgress();

  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  if (!assessment) return <Navigate to="/assessments" replace />;

  const total = assessment.questions.length;
  const question = assessment.questions[index]!;
  const chosen = answers[question.id];

  const finish = () => {
    setStage("result");
    complete({
      key: `assessment:${assessment.id}`,
      xp: assessment.xp,
      label: `Assessment completed: ${assessment.title}`,
      effect: assessment.outcome.headline,
    });
  };

  /* -- Intro: explain why before asking for effort ------------------------ */
  if (stage === "intro") {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Link
          to="/assessments"
          className="inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-ink"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          All assessments
        </Link>

        <Card className="text-center">
          <div className="flex justify-center">
            <CompassArt size={104} />
          </div>
          <h1 className="mt-4 text-title text-ink">{assessment.title}</h1>
          <p className="mx-auto mt-3 max-w-lg text-muted">{assessment.why}</p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Pill tone="neutral">{total} questions</Pill>
            <Pill tone="neutral">about {assessment.minutes} minutes</Pill>
            <Pill tone="xp" icon={<Sparkles />}>
              +{assessment.xp} XP
            </Pill>
          </div>

          {assessment.aiAssisted && assessment.aiExplainer ? (
            <p className="mt-5 rounded-xl bg-info-soft px-4 py-3 text-left text-sm text-ink-soft">
              <span className="inline-flex items-center gap-1.5 font-semibold text-info">
                <Wand2 aria-hidden="true" className="size-4" />
                How AI is used here:
              </span>{" "}
              {assessment.aiExplainer}
            </p>
          ) : null}

          <Button size="lg" className="mt-6" onClick={() => setStage("questions")}>
            Begin
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </Card>
      </div>
    );
  }

  /* -- Questions: always show where you are ------------------------------- */
  if (stage === "questions") {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <p className="text-sm font-semibold text-muted">
              Question {index + 1} of {total}
            </p>
            <p className="text-sm font-bold text-brand-600">
              {Math.round((index / total) * 100)}% complete
            </p>
          </div>
          <ProgressBar
            value={(index / total) * 100}
            label={`${assessment.title} progress`}
            color="var(--color-brand-500)"
          />
        </div>

        <Card>
          <fieldset>
            <legend className="text-lg font-bold text-ink text-balance">{question.prompt}</legend>
            <div className="mt-4 space-y-2.5">
              {question.options.map((option, optionIndex) => (
                <label
                  key={option}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-sm transition-colors",
                    chosen === optionIndex
                      ? "border-brand-400 bg-brand-50 font-semibold text-brand-700"
                      : "border-line hover:border-brand-300 hover:bg-brand-50/50",
                  )}
                >
                  <input
                    type="radio"
                    name={question.id}
                    className="size-4 accent-[var(--color-brand-500)]"
                    checked={chosen === optionIndex}
                    onChange={() =>
                      setAnswers((previous) => ({ ...previous, [question.id]: optionIndex }))
                    }
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </Card>

        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={() => (index === 0 ? setStage("intro") : setIndex(index - 1))}
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back
          </Button>
          <Button
            disabled={chosen === undefined}
            onClick={() => (index + 1 === total ? finish() : setIndex(index + 1))}
          >
            {index + 1 === total ? "See my results" : "Next"}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </div>
    );
  }

  /* -- Result: clear outcome, then the actions it points to ---------------- */
  const { outcome } = assessment;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card className="text-center">
        <Pill tone="success" icon={<Check />}>
          Assessment complete
        </Pill>
        <h1 className="mt-4 text-title text-ink text-balance">{outcome.headline}</h1>
        <p className="mx-auto mt-3 max-w-lg text-muted">{outcome.summary}</p>

        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {outcome.highlights.map((highlight) => (
            <div key={highlight.label} className="rounded-xl bg-canvas px-3 py-3">
              <dt className="text-xs font-semibold tracking-wide text-muted uppercase">
                {highlight.label}
              </dt>
              <dd className="mt-1 text-sm font-bold text-ink">{highlight.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 inline-flex items-center gap-1.5 rounded-pill bg-xp-soft px-3 py-1.5 text-sm font-bold text-warn">
          <Sparkles aria-hidden="true" className="size-4" />+{assessment.xp} XP earned
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-bold text-ink">What to do with this</h2>
        <p className="mt-1 text-sm text-muted">
          A result is only useful if it changes what you do next. Start with one of these.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {outcome.nextActions.map((action, actionIndex) => (
            <ButtonLink
              key={action.href}
              to={action.href}
              variant={actionIndex === 0 ? "primary" : "secondary"}
            >
              {action.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          ))}
        </div>
      </Card>

      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink to="/assessments" variant="ghost">
          Back to assessments
        </ButtonLink>
        <Button
          variant="ghost"
          onClick={() => {
            setAnswers({});
            setIndex(0);
            setStage("intro");
          }}
        >
          Retake
        </Button>
      </div>
    </div>
  );
}
