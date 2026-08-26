import { useState } from "react";
import { Check, Circle, Mic, Video } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/GradientIcon";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/Progress";
import { cn } from "@/lib/cn";

/**
 * The Scholarship Interview (blueprint section 4.3).
 *
 * ASSUMPTION — the brief asks for "a professional, credible interaction rather
 * than a generic form" but does not say what it is. This builds it as three
 * asynchronous recorded answers with a written fallback: it reads as an
 * interview rather than a form, it does not require scheduling against an
 * admissions calendar, and it gives the panel the applicant's own voice. If the
 * process turns out to be a live scheduled call, the screen becomes a booking
 * flow and the question list survives unchanged.
 *
 * The recorder is presentational for this UI pass — no capture is wired up.
 */
const QUESTIONS = [
  {
    id: "q1",
    prompt: "Tell us where you are right now, and what you want work to look like in three years.",
    hint: "Two minutes is plenty. We are listening for direction, not polish.",
    minutes: 2,
  },
  {
    id: "q2",
    prompt: "Describe something you taught yourself. What made you keep going?",
    hint: "It does not have to be academic.",
    minutes: 2,
  },
  {
    id: "q3",
    prompt: "What would a scholarship place change for you?",
    hint: "Be specific. This is the answer the panel spends the most time on.",
    minutes: 3,
  },
];

type AnswerState = "todo" | "recorded";

export default function Interview() {
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({
    q1: "recorded",
    q2: "todo",
    q3: "todo",
  });
  const [submitted, setSubmitted] = useState(false);

  const doneCount = Object.values(answers).filter((a) => a === "recorded").length;
  const complete = doneCount === QUESTIONS.length;
  const pct = Math.round((doneCount / QUESTIONS.length) * 100);

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg space-y-6 py-8 text-center">
        <Art3D name="check" size="hero" alt="" className="mx-auto" />
        <h1 className="text-title text-ink">Interview submitted</h1>
        <p className="text-muted">
          The admissions panel reviews interviews twice a week. You will hear from us within five
          working days, and your application checklist updates the moment anything changes.
        </p>
        <Card className="rounded-block text-left">
          <p className="text-sm font-bold text-ink">What happens next</p>
          <ol className="mt-3 space-y-2 text-sm text-muted">
            <li>1. The panel watches all three answers.</li>
            <li>2. Your assessment results are read alongside them.</li>
            <li>3. A decision is published to your application checklist.</li>
          </ol>
        </Card>
        <Button onClick={() => setSubmitted(false)} variant="secondary">
          Back to the interview
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <Pill tone="brand">Step 2 of 6</Pill>
        <h1 className="mt-3 text-title text-ink">Scholarship interview</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Three questions, answered in your own time. Record each one when you are ready — you can
          re-record as often as you like before submitting.
        </p>
      </header>

      <Card className="rounded-block">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-bold text-ink">
            {doneCount} of {QUESTIONS.length} answered
          </p>
          <Pill tone={complete ? "success" : "neutral"}>{complete ? "Ready to submit" : "In progress"}</Pill>
        </div>
        <ProgressBar value={pct} label="Interview progress" className="mt-3" />
      </Card>

      <ol className="space-y-4">
        {QUESTIONS.map((question, index) => {
          const state = answers[question.id] ?? "todo";
          const recorded = state === "recorded";

          return (
            <li key={question.id}>
              <Card
                as="article"
                className={cn("rounded-block", recorded && "border-success-soft bg-success-soft/40")}
              >
                <div className="flex items-start gap-3.5">
                  <IconTile icon={recorded ? Check : Circle} ramp={recorded ? "green" : "violet"} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase">
                      Question {index + 1} · up to {question.minutes} minutes
                    </p>
                    <h2 className="mt-1.5 text-base font-extrabold tracking-tight text-ink text-balance">
                      {question.prompt}
                    </h2>
                    <p className="mt-1.5 text-sm text-muted">{question.hint}</p>
                  </div>
                </div>

                {/* Presentational recorder — capture is not wired up in this pass. */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Button
                    variant={recorded ? "secondary" : "primary"}
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        [question.id]: recorded ? "todo" : "recorded",
                      }))
                    }
                  >
                    <Video aria-hidden="true" className="size-4" />
                    {recorded ? "Re-record" : "Record answer"}
                  </Button>
                  <Button variant="ghost">
                    <Mic aria-hidden="true" className="size-4" />
                    Audio only
                  </Button>
                  <Button variant="ghost">Write instead</Button>
                  {recorded ? (
                    <Pill tone="success" icon={<Check />}>
                      Recorded
                    </Pill>
                  ) : null}
                </div>
              </Card>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg" disabled={!complete} onClick={() => setSubmitted(true)}>
          Submit interview
        </Button>
        {!complete ? (
          <p className="text-sm text-muted">
            Answer all three questions before submitting.
          </p>
        ) : null}
      </div>
    </div>
  );
}
