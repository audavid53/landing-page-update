import { Check, Lock, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Art3D } from "@/components/art/Art3D";
import { AvatarGroup } from "@/components/ui/Avatar";
import { CircleArrow } from "@/components/ui/Block";
import { Pill } from "@/components/ui/Pill";
import { PILLAR_BY_ID } from "@/data/pillars";
import type { Mission } from "@/data/types";
import { useProgress } from "@/state/useProgress";
import { cn } from "@/lib/cn";

type MissionCardProps = {
  mission: Mission;
  locked?: boolean;
  /** The single most important thing to do next gets the saturated treatment. */
  featured?: boolean;
  /** Peers working on the same mission, shown as a stacked avatar row. */
  peers?: { name: string; src?: string }[];
};

/**
 * A mission, drawn the way the reference draws a course card: a saturated block
 * with a category eyebrow, a bold title, the people also working on it, and one
 * circular arrow.
 *
 * Featured missions take the pillar's own gradient; the rest stay on white so a
 * screen of missions has exactly one loud card.
 */
export function MissionCard({ mission, locked = false, featured = false, peers }: MissionCardProps) {
  const { hasCompleted } = useProgress();
  const pillar = PILLAR_BY_ID[mission.pillar];
  const done = hasCompleted(`mission:${mission.id}`);
  const loud = featured && !locked;

  const body = (
    <>
      <Art3D
        name={mission.art}
        size={loud ? "xl" : "lg"}
        className={cn(
          "pointer-events-none absolute -top-1 -right-2 rotate-6 drop-shadow-lg",
          locked && "opacity-40 grayscale",
        )}
      />

      <div className={cn("relative", loud ? "pr-20" : "pr-16")}>
        <p
          className={cn(
            "text-[0.6875rem] font-bold tracking-[0.14em] uppercase",
            loud ? "on-block-muted" : "text-muted",
          )}
        >
          {pillar.shortName}
        </p>

        <h3
          className={cn(
            "mt-1.5 font-extrabold tracking-tight text-balance",
            loud ? "text-xl leading-tight text-white" : "text-base text-ink",
          )}
        >
          {mission.title}
        </h3>

        <p className={cn("mt-2 text-sm leading-relaxed", loud ? "on-block-muted" : "text-muted")}>
          {mission.description}
        </p>
      </div>

      <div className="relative mt-4 flex flex-wrap items-center gap-1.5">
        <Pill size="sm" tone={loud ? "dark" : "xp"} icon={<Zap />}>
          +{mission.xp} XP
        </Pill>
        <Pill size="sm" tone={loud ? "dark" : "neutral"}>
          {mission.units} {mission.units === 1 ? "unit" : "units"}
        </Pill>
        {done ? (
          <Pill size="sm" tone="success" icon={<Check />}>
            Completed
          </Pill>
        ) : null}
        {locked ? (
          <Pill size="sm" tone="neutral" icon={<Lock />}>
            Opens at Level {mission.level}
          </Pill>
        ) : null}
      </div>

      <div className="relative mt-5 flex items-end justify-between gap-4">
        {peers?.length ? (
          <AvatarGroup people={peers} max={3} label={`${peers.length} learners on this mission`} />
        ) : (
          <span aria-hidden="true" />
        )}
        {locked ? (
          <span
            aria-hidden="true"
            className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-dashed border-line-strong"
          >
            <Lock className="size-4 text-muted" strokeWidth={2.5} />
          </span>
        ) : (
          <CircleArrow className={loud ? undefined : "bg-brand-500 text-white"} />
        )}
      </div>
    </>
  );

  const shell = cn(
    "group relative flex flex-col overflow-hidden rounded-block p-5",
    loud
      ? "ramp-block"
      : "border border-line bg-surface shadow-card",
    locked && "border-dashed border-line-strong bg-canvas/60 shadow-none",
    !locked && "transition-transform duration-200 ease-out hover:-translate-y-0.5",
  );

  if (locked) {
    return (
      <div className={shell} data-ramp={pillar.ramp} aria-disabled="true">
        {body}
      </div>
    );
  }

  return (
    <Link to={mission.href} className={shell} data-ramp={pillar.ramp}>
      {body}
    </Link>
  );
}
