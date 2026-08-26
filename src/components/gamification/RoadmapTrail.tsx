import { Check, Lock } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import type { Level, LevelNumber, LevelState } from "@/data/types";

function stateOf(level: Level, current: LevelNumber): LevelState {
  if (level.level < current) return "done";
  if (level.level === current) return "current";
  return "locked";
}

const COPY: Record<LevelState, string> = {
  done: "Completed",
  current: "You are here",
  locked: "Locked",
};

/**
 * The career journey map from blueprint section 6.
 *
 * Nodes alternate left and right down a single spine, so the eye follows one
 * path rather than scanning a list — the "where am I / what is next / what am I
 * working toward" question the brief opens with. Level 6 is drawn as a reward
 * node rather than another step, because it is the only one that unlocks
 * something outside the product.
 */
export function RoadmapTrail({
  levels,
  currentLevel,
  className,
}: {
  levels: Level[];
  currentLevel: LevelNumber;
  className?: string;
}) {
  return (
    <ol className={cn("relative", className)}>
      {/*
        The spine. Decorative — the ordered list already conveys sequence.
        It runs down the left edge on a phone, where there is no room to
        alternate, and moves to the centre once there is.
      */}
      <span
        aria-hidden="true"
        className="absolute inset-y-6 left-8 w-1 -translate-x-1/2 rounded-full bg-line sm:left-1/2"
      />

      {levels.map((level, index) => {
        const state = stateOf(level, currentLevel);
        const left = index % 2 === 0;

        return (
          <li
            key={level.level}
            className={cn(
              "relative flex items-center gap-4 py-4",
              // Phone: node first, card fills the rest. Wider: alternate sides.
              "flex-row-reverse justify-end",
              left ? "sm:flex-row" : "sm:flex-row-reverse",
            )}
          >
            {/* Card half */}
            <div className={cn("min-w-0 flex-1", left ? "sm:text-right" : "sm:text-left")}>
              <div
                data-ramp={level.ramp}
                className={cn(
                  "inline-block w-full max-w-sm rounded-card p-4 text-left",
                  state === "current"
                    ? "ramp-block"
                    : "border border-line bg-surface shadow-card",
                  state === "locked" && "border-dashed",
                )}
              >
                <div className="flex items-center gap-2">
                  <Pill
                    size="sm"
                    tone={
                      state === "current" ? "dark" : state === "done" ? "success" : "neutral"
                    }
                  >
                    Level {level.level}
                  </Pill>
                  <span
                    className={cn(
                      "text-[0.6875rem] font-bold tracking-wide uppercase",
                      state === "current" ? "on-block-muted" : "text-muted",
                    )}
                  >
                    {COPY[state]}
                  </span>
                </div>

                <h3
                  className={cn(
                    "mt-2 text-base font-extrabold tracking-tight",
                    state === "current" ? "text-white" : "text-ink",
                  )}
                >
                  {level.title}
                </h3>
                <p
                  className={cn(
                    "mt-1 text-sm leading-relaxed",
                    state === "current" ? "on-block-muted" : "text-muted",
                  )}
                >
                  {level.description}
                </p>

                <p
                  className={cn(
                    "mt-3 text-xs font-semibold",
                    state === "current" ? "on-block-muted" : "text-brand-700",
                  )}
                >
                  Unlocks: {level.perk}
                  {level.units > 0 ? ` · ${level.units} units` : ""}
                </p>
              </div>
            </div>

            {/* Node half */}
            <div
              data-ramp={level.ramp}
              className={cn(
                "relative z-1 grid size-16 shrink-0 place-items-center rounded-full",
                state === "locked"
                  ? "border-2 border-dashed border-line-strong bg-surface"
                  : "ramp-fill ring-4 ring-canvas",
                state === "current" && "ring-6 ring-brand-100",
              )}
            >
              {state === "locked" ? (
                <Lock className="size-5 text-muted" strokeWidth={2.5} aria-hidden="true" />
              ) : level.isTreasure ? (
                <Art3D name={level.art} size="md" />
              ) : state === "done" ? (
                <Check className="size-7 text-white" strokeWidth={3} aria-hidden="true" />
              ) : (
                <Art3D name={level.art} size="md" />
              )}
            </div>

            {/* Keeps the two halves symmetrical around the centred spine. */}
            <div className="hidden flex-1 sm:block" aria-hidden="true" />
          </li>
        );
      })}
    </ol>
  );
}
