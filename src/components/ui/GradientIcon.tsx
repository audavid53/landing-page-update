import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Ramp } from "@/data/types";

/** Ramp endpoints, mirroring the [data-ramp] blocks in styles/index.css. */
const RAMPS: Record<Ramp, [string, string]> = {
  violet: ["#7b53f6", "#4c1fd6"],
  navy: ["#2a3a72", "#101a3d"],
  green: ["#35b765", "#1f8f45"],
  amber: ["#ffc046", "#ef9d16"],
  sky: ["#4aa3ef", "#1273d4"],
  rose: ["#f2698f", "#d63864"],
};

export const RAMP_NAMES = Object.keys(RAMPS) as Ramp[];

/**
 * Paints the gradient definitions every GradientGlyph references.
 *
 * Lucide renders its own <svg>, so a gradient cannot be defined inside the icon
 * itself. Instead the ramps live once in a hidden document-level <svg> and icons
 * point at them by id — a fill/stroke `url(#…)` resolves against the whole
 * document, so one set of defs serves every icon on the page.
 *
 * Rendered once, in AppShell.
 */
export function GradientDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute" }}
    >
      <defs>
        {RAMP_NAMES.map((ramp) => {
          const [from, to] = RAMPS[ramp];
          return (
            <linearGradient key={ramp} id={`ramp-${ramp}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={from} />
              <stop offset="100%" stopColor={to} />
            </linearGradient>
          );
        })}
      </defs>
    </svg>
  );
}

/**
 * A bold icon painted with a gradient rather than a flat colour. Used where an
 * icon sits directly on a light surface — inside a tile it would fight the
 * tile's own gradient, so use IconTile there instead.
 */
export function GradientGlyph({
  icon: Icon,
  ramp = "violet",
  filled = false,
  className,
}: {
  icon: LucideIcon;
  ramp?: Ramp;
  /** Fill the glyph as well as stroke it, for the heaviest weight. */
  filled?: boolean;
  className?: string;
}) {
  const paint = `url(#ramp-${ramp})`;
  return (
    <Icon
      aria-hidden="true"
      focusable="false"
      className={cn("size-5", className)}
      stroke={paint}
      strokeWidth={2.25}
      {...(filled ? { fill: paint, fillOpacity: 0.22 } : {})}
    />
  );
}

/**
 * The rounded-square gradient tile from the design reference: a saturated ramp
 * carrying a white icon. This is the workhorse — category chips, stat tiles and
 * list rows all use it.
 */
export function IconTile({
  icon: Icon,
  ramp = "violet",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  ramp?: Ramp;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const box = { sm: "size-8 rounded-[0.6rem]", md: "size-11 rounded-tile", lg: "size-14 rounded-[1.1rem]" }[size];
  const glyph = { sm: "size-4", md: "size-5", lg: "size-6" }[size];
  return (
    <span
      data-ramp={ramp}
      className={cn("ramp-fill grid shrink-0 place-items-center", box, className)}
    >
      <Icon aria-hidden="true" focusable="false" className={cn("text-white", glyph)} strokeWidth={2.4} />
    </span>
  );
}
