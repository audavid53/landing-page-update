import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Art3D } from "@/components/art/Art3D";
import { cn } from "@/lib/cn";
import type { Art3DName, Ramp } from "@/data/types";

const WASH: Record<Ramp, string> = {
  violet: "bg-block-violet-soft",
  navy: "bg-block-navy-soft",
  green: "bg-block-green-soft",
  amber: "bg-block-amber-soft",
  sky: "bg-block-sky-soft",
  rose: "bg-block-rose-soft",
};

/**
 * The soft encouragement rows from the reference — "Keep it up!", "7 days in a
 * row". A quiet tinted band with its own artwork and a single forward action.
 */
export function NudgeRow({
  to,
  art,
  ramp = "amber",
  title,
  detail,
  className,
}: {
  to: string;
  art: Art3DName;
  ramp?: Ramp;
  title: string;
  detail: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group flex items-center gap-3.5 rounded-card p-4 transition-colors",
        WASH[ramp],
        className,
      )}
    >
      <Art3D name={art} size="md" />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-extrabold text-ink">{title}</span>
        <span className="mt-0.5 block text-sm text-muted">{detail}</span>
      </span>
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-ink shadow-card transition-transform group-hover:translate-x-0.5"
      >
        <ChevronRight className="size-4.5" strokeWidth={2.75} />
      </span>
    </Link>
  );
}
