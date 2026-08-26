import { useId } from "react";
import { cn } from "@/lib/cn";

const clamp = (value: number) => Math.max(0, Math.min(100, value));

export type ProgressBarProps = {
  value: number;
  label: string;
  /** Any CSS colour — pillar accents are passed through as CSS variables. */
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Renders the label visually instead of only for assistive tech. */
  showLabel?: boolean;
  trackClassName?: string;
  /**
   * "onDark" inverts the track and fill for bars sitting on a saturated block,
   * where the default line-grey track disappears and the brand fill has no
   * contrast against the gradient behind it.
   */
  tone?: "default" | "onDark";
};

const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-3.5" } as const;

export function ProgressBar({
  value,
  label,
  color,
  size = "md",
  className,
  showLabel = false,
  trackClassName,
  tone = "default",
}: ProgressBarProps) {
  const pct = clamp(value);
  const onDark = tone === "onDark";

  return (
    <div className={cn("w-full", className)}>
      {showLabel ? (
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <span className={cn("text-sm font-medium", onDark ? "text-white/80" : "text-ink-soft")}>
            {label}
          </span>
          <span className={cn("text-sm font-bold tabular-nums", onDark ? "text-white" : "text-ink")}>
            {pct}%
          </span>
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-valuetext={`${pct} percent`}
        className={cn(
          "w-full overflow-hidden rounded-pill",
          onDark ? "bg-white/25" : "bg-line",
          heights[size],
          trackClassName,
        )}
      >
        <div
          className="h-full rounded-pill transition-[width] duration-700 ease-out"
          style={{
            width: `${pct}%`,
            backgroundColor: color ?? (onDark ? "#fff" : "var(--color-brand-500)"),
          }}
        />
      </div>
    </div>
  );
}

type ProgressRingProps = {
  value: number;
  label: string;
  size?: number;
  thickness?: number;
  color?: string;
  className?: string;
  children?: React.ReactNode;
};

/** Circular progress used for scores and level progression. */
export function ProgressRing({
  value,
  label,
  size = 120,
  thickness = 10,
  color,
  className,
  children,
}: ProgressRingProps) {
  const titleId = useId();
  const pct = clamp(value);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={cn("relative shrink-0", className)} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-labelledby={titleId}
        className="-rotate-90"
      >
        <title id={titleId}>{`${label}: ${pct}%`}</title>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color ?? "var(--color-brand-500)"}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct / 100)}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}
