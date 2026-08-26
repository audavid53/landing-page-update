import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Art3D, type Art3DSize } from "@/components/art/Art3D";
import { IconTile } from "@/components/ui/GradientIcon";
import { cn } from "@/lib/cn";
import type { Art3DName, Ramp } from "@/data/types";

/**
 * The circular white call-to-action that sits in the corner of every saturated
 * block in the design reference.
 *
 * Purely decorative: the whole block is the link, so this must not be a second
 * focusable control announcing the same destination twice.
 */
export function CircleArrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full bg-white text-ink shadow-fab",
        "transition-transform duration-200 ease-out group-hover:translate-x-0.5",
        className,
      )}
    >
      <ArrowRight className="size-5" strokeWidth={2.5} />
    </span>
  );
}

type BlockCardProps = {
  to: string;
  ramp?: Ramp;
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  art?: Art3DName;
  artSize?: Art3DSize;
  /** Rendered between the description and the footer — pills, avatars, progress. */
  children?: React.ReactNode;
  className?: string;
};

/**
 * A full-bleed saturated card: gradient ground, 3D artwork, and a circular
 * arrow. The entire card is one link, so the title carries the accessible name
 * and the arrow stays decorative.
 */
export function BlockCard({
  to,
  ramp = "violet",
  eyebrow,
  title,
  description,
  art,
  artSize = "xl",
  children,
  className,
}: BlockCardProps) {
  return (
    <Link
      to={to}
      data-ramp={ramp}
      className={cn(
        "ramp-block group relative flex flex-col overflow-hidden rounded-block p-6",
        "transition-transform duration-200 ease-out hover:-translate-y-0.5",
        className,
      )}
    >
      {art ? (
        <Art3D
          name={art}
          size={artSize}
          className="pointer-events-none absolute -top-2 -right-3 rotate-6 opacity-95 drop-shadow-lg"
        />
      ) : null}

      <div className={cn("relative", art && "pr-20")}>
        {eyebrow ? (
          <p className="text-[0.6875rem] font-bold tracking-[0.14em] uppercase on-block-muted">
            {eyebrow}
          </p>
        ) : null}
        <h3 className="mt-1.5 text-xl leading-tight font-extrabold tracking-tight text-balance">
          {title}
        </h3>
        {description ? (
          <p className="mt-2 max-w-[34ch] text-sm leading-relaxed on-block-muted">{description}</p>
        ) : null}
      </div>

      {children ? <div className="relative mt-4">{children}</div> : null}

      <div className="relative mt-5 flex items-end justify-between gap-4">
        <span className="sr-only">Open</span>
        <span aria-hidden="true" />
        <CircleArrow />
      </div>
    </Link>
  );
}

/**
 * Icon tile above a large figure and a quiet label — the "32 Courses /
 * 18 Completed" pattern from the reference. The tint is a soft wash of the same
 * hue as the tile so the pair reads as one object.
 */
export function StatTile({
  icon,
  ramp = "violet",
  value,
  label,
  tint = true,
  className,
}: {
  icon: LucideIcon;
  ramp?: Ramp;
  value: React.ReactNode;
  label: string;
  tint?: boolean;
  className?: string;
}) {
  const wash: Record<Ramp, string> = {
    violet: "bg-block-violet-soft",
    navy: "bg-block-navy-soft",
    green: "bg-block-green-soft",
    amber: "bg-block-amber-soft",
    sky: "bg-block-sky-soft",
    rose: "bg-block-rose-soft",
  };
  return (
    <div
      className={cn(
        "rounded-card p-4",
        tint ? wash[ramp] : "border border-line bg-surface shadow-card",
        className,
      )}
    >
      <IconTile icon={icon} ramp={ramp} />
      <p className="mt-3 text-3xl leading-none font-extrabold tracking-tight text-ink">{value}</p>
      <p className="mt-1.5 text-sm font-semibold text-muted">{label}</p>
    </div>
  );
}
