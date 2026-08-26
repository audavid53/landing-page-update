import { ArrowRight, Check, Clock, Sparkles, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ASSESSMENTS } from "@/data/assessments";
import { useProgress } from "@/state/useProgress";

export default function Assessments() {
  const { hasCompleted } = useProgress();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-title text-ink">Assessments</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Three short assessments that turn “I’m not sure” into something specific. Nothing here is
          a test you can fail — the results only exist to point you at your next action.
        </p>
      </header>

      <SectionHeader title="Start where you are" className="sr-only" />

      <ul className="space-y-4">
        {ASSESSMENTS.map((assessment) => {
          const done = hasCompleted(`assessment:${assessment.id}`);

          return (
            <li key={assessment.id}>
              <Card interactive className="flex flex-wrap items-start gap-5">
                <div className="min-w-[16rem] flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Pill tone="brand" size="sm">
                      {assessment.tagline}
                    </Pill>
                    <Pill tone="neutral" size="sm" icon={<Clock />}>
                      {assessment.minutes} min
                    </Pill>
                    <Pill tone="xp" size="sm" icon={<Sparkles />}>
                      +{assessment.xp} XP
                    </Pill>
                    {assessment.aiAssisted ? (
                      <Pill tone="info" size="sm" icon={<Wand2 />}>
                        AI-assisted
                      </Pill>
                    ) : null}
                    {done ? (
                      <Pill tone="success" size="sm" icon={<Check />}>
                        Completed
                      </Pill>
                    ) : null}
                  </div>

                  <h2 className="mt-3 text-lg font-bold text-ink">{assessment.title}</h2>
                  {/* Say why it matters before asking for effort. */}
                  <p className="mt-1.5 text-sm text-muted">{assessment.why}</p>

                  {assessment.aiAssisted && assessment.aiExplainer ? (
                    <p className="mt-3 rounded-xl bg-info-soft px-3 py-2.5 text-sm text-ink-soft">
                      <span className="font-semibold text-info">What the AI does: </span>
                      {assessment.aiExplainer}
                    </p>
                  ) : null}

                  <Link
                    to={`/assessments/${assessment.id}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-pill bg-brand-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-600"
                  >
                    {done ? "Retake assessment" : "Start assessment"}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>

      <Card>
        <h2 className="text-base font-bold text-ink">What happens to your answers</h2>
        <p className="mt-2 text-sm text-muted">
          Your responses stay on this device and are used only to produce your own results and
          recommendations. Nothing is shared with other learners, and you can retake any assessment
          whenever you want a fresh picture.
        </p>
      </Card>
    </div>
  );
}
