import { useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { cn } from "@/lib/cn";

const SCENARIO_OPTIONS = [
  { label: "A", text: "Take over the work yourself" },
  { label: "B", text: "Ask what is blocking them", correct: true },
  { label: "C", text: "Escalate immediately" },
];

export function InteractiveLearning() {
  const { ref, isVisible } = useScrollReveal();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="bg-surface-sunk/60 py-16 sm:py-24 border-y border-line">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            {/* Left column: Header + learning loop */}
            <div>
              <h2 className="text-title text-ink font-extrabold tracking-tight text-balance">
                Don't just watch.
                <br />
                Figure it out.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed max-w-lg">
                Real careers aren't multiple-choice questions. iPlace turns
                learning into practical situations where you think, decide,
                respond and apply.
              </p>

              {/* Learning loop indicator */}
              <div className="mt-8 rounded-2xl bg-surface p-5 border border-line shadow-card">
                <p className="text-sm font-bold text-ink">
                  Learn → Interact → Decide → Feedback → Progress
                </p>
                <p className="mt-2 text-xs text-muted leading-relaxed">
                  The lesson responds to what the learner does — so effort
                  becomes visible and meaningful.
                </p>
              </div>
            </div>

            {/* Right column: Interactive scenario card */}
            <div className="rounded-3xl bg-surface border border-line shadow-raised p-6 sm:p-8">
              <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 mb-4">
                WORKPLACE SCENARIO
              </div>
              <h3 className="text-lg font-extrabold text-ink leading-snug">
                Your teammate has missed two deadlines. What do you do?
              </h3>
              <p className="mt-2 text-sm text-muted font-medium">
                You're leading a project.
              </p>

              {/* Answer options */}
              <div className="mt-6 space-y-3">
                {SCENARIO_OPTIONS.map((opt) => {
                  const isSelected = selected === opt.label;
                  const isCorrect = opt.correct && isSelected;
                  const isWrong = !opt.correct && isSelected;

                  return (
                    <button
                      type="button"
                      key={opt.label}
                      onClick={() => setSelected(opt.label)}
                      className={cn(
                        "w-full flex items-center gap-3.5 rounded-xl p-4 text-left transition-all duration-200 border",
                        isCorrect
                          ? "bg-success-soft border-success/40 shadow-xs"
                          : isWrong
                            ? "bg-danger-soft/40 border-danger/30"
                            : selected && !isSelected
                              ? "bg-surface border-line opacity-60"
                              : "bg-surface-sunk border-line hover:border-brand-300 hover:shadow-xs",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-lg text-xs font-extrabold",
                          isCorrect
                            ? "bg-success text-white"
                            : isWrong
                              ? "bg-danger/80 text-white"
                              : "bg-line text-ink-soft",
                        )}
                      >
                        {opt.label}
                      </span>
                      <span className="text-sm font-semibold text-ink">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback message */}
              {selected && (
                <div
                  className={cn(
                    "mt-5 rounded-xl p-4 text-xs font-semibold leading-relaxed border",
                    selected === "B"
                      ? "bg-success-soft border-success/30 text-success"
                      : "bg-warn-soft border-warn/30 text-warn",
                  )}
                >
                  {selected === "B"
                    ? "✓ Great choice. Understanding blockers before reacting builds trust and leads to better outcomes."
                    : "That's a common instinct, but it doesn't address the root cause. Try asking what's blocking them first."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
