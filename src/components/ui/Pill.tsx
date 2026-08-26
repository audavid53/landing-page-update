import { cn } from "@/lib/cn";

export type PillTone =
  | "neutral"
  | "brand"
  | "success"
  | "warn"
  | "danger"
  | "info"
  | "xp"
  | "dark";

const tones: Record<PillTone, string> = {
  neutral: "bg-canvas text-muted",
  brand: "bg-brand-50 text-brand-700",
  success: "bg-success-soft text-success",
  warn: "bg-warn-soft text-warn",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  xp: "bg-xp-soft text-warn",
  dark: "bg-shell-raised text-white",
};

type PillProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: PillTone;
  icon?: React.ReactNode;
  size?: "sm" | "md";
};

/**
 * Capsule used for all secondary metadata: status, duration, sector, reward.
 * Metadata lives in pills so the primary content of a card stays readable.
 */
export function Pill({
  tone = "neutral",
  icon,
  size = "md",
  className,
  children,
  ...props
}: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-pill font-semibold",
        size === "sm" ? "px-2 py-0.5 text-[0.6875rem]" : "px-2.5 py-1 text-xs",
        tones[tone],
        className,
      )}
      {...props}
    >
      {icon ? (
        <span aria-hidden="true" className="grid place-items-center [&>svg]:size-3.5">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  );
}
