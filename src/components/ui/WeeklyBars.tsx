import { cn } from "@/lib/cn";
import type { Ramp } from "@/data/types";

export type DayBar = { day: string; value: number };

/**
 * The weekly activity chart from the design reference: quiet bars for ordinary
 * days, the best day lifted into full colour and labelled.
 *
 * Drawn with grid boxes rather than an SVG chart because there is one series and
 * seven points — a charting dependency would cost more than it explains. Each
 * bar exposes its own value to assistive tech, and the table-free markup keeps
 * the figures readable when styles fail to load.
 */
export function WeeklyBars({
  data,
  ramp = "green",
  unit = "lessons",
  className,
}: {
  data: DayBar[];
  ramp?: Ramp;
  unit?: string;
  className?: string;
}) {
  const peak = Math.max(...data.map((d) => d.value), 1);

  return (
    <ul className={cn("flex items-end justify-between gap-2", className)}>
      {data.map(({ day, value }) => {
        const best = value === peak;
        return (
          <li key={day} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <span
              className={cn(
                "text-sm font-extrabold",
                best ? "text-ink" : "text-muted",
              )}
            >
              {value}
            </span>
            <span
              data-ramp={ramp}
              className={cn(
                "w-full rounded-pill",
                best ? "ramp-fill" : "bg-block-green-soft",
              )}
              style={{ height: `${Math.max((value / peak) * 108, 10)}px` }}
            >
              <span className="sr-only">
                {day}: {value} {unit}
              </span>
            </span>
            <span aria-hidden="true" className="text-xs font-semibold text-muted">
              {day}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
