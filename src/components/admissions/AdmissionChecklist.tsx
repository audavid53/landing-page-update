import { Check, ChevronRight, Clock, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Art3D } from "@/components/art/Art3D";
import { Pill, type PillTone } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import type { AdmissionStep, AdmissionStepState } from "@/data/types";

const STATUS: Record<AdmissionStepState, { label: string; tone: PillTone }> = {
  completed: { label: "Completed", tone: "success" },
  "in-review": { label: "In review", tone: "info" },
  current: { label: "Your turn", tone: "brand" },
  locked: { label: "Not yet open", tone: "neutral" },
};

/**
 * Blueprint section 4.6.
 *
 * The brief singles out the bare "Pending" label as the thing to replace, so
 * every requirement is a row that says three things: where it stands, why it is
 * required, and — when the wait is ours rather than the applicant's — who is
 * holding it. Rows the learner cannot act on are not links, so nothing invites
 * a tap that goes nowhere.
 */
export function AdmissionChecklist({
  steps,
  className,
}: {
  steps: AdmissionStep[];
  className?: string;
}) {
  const done = steps.filter((s) => s.state === "completed").length;

  return (
    <section
      className={cn("rounded-block border border-line bg-surface p-5 shadow-card sm:p-6", className)}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold tracking-tight text-ink">Your application</h2>
          <p className="mt-1 text-sm text-muted">
            {done} of {steps.length} steps complete. We will tell you the moment anything changes.
          </p>
        </div>
        <Pill tone="brand">
          {done}/{steps.length}
        </Pill>
      </div>

      <ol className="mt-5 space-y-2">
        {steps.map((step) => {
          const status = STATUS[step.state];
          const actionable = step.state === "current";

          const inner = (
            <>
              <Art3D
                name={step.art}
                size="md"
                className={cn(step.state === "locked" && "opacity-40 grayscale")}
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-ink">{step.title}</h3>
                  <Pill size="sm" tone={status.tone}>
                    {status.label}
                  </Pill>
                </div>
                <p className="mt-1 text-sm text-muted">{step.why}</p>
                {step.note ? (
                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-info">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {step.note}
                  </p>
                ) : null}
              </div>

              <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center">
                {step.state === "completed" ? (
                  <Check className="size-5 text-success" strokeWidth={3} />
                ) : step.state === "locked" ? (
                  <Lock className="size-4 text-muted" strokeWidth={2.5} />
                ) : actionable ? (
                  <ChevronRight className="size-5 text-brand-600" strokeWidth={2.5} />
                ) : null}
              </span>
            </>
          );

          const shell = cn(
            "flex items-start gap-3 rounded-card border p-3.5",
            step.state === "completed" && "border-success-soft bg-success-soft/50",
            step.state === "in-review" && "border-info-soft bg-info-soft/60",
            actionable && "border-brand-200 bg-brand-50",
            step.state === "locked" && "border-dashed border-line bg-canvas/60",
          );

          return (
            <li key={step.id}>
              {actionable ? (
                <Link to={step.href} className={cn(shell, "transition-colors hover:bg-brand-100")}>
                  {inner}
                </Link>
              ) : (
                <div className={shell}>{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
