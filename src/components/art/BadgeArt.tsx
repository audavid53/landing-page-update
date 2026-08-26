import { useId } from "react";
import { cn } from "@/lib/cn";

type BadgeArtProps = {
  /** Two-colour gradient defining the tier's identity. */
  from: string;
  to: string;
  /** Short glyph rendered inside the medal — a numeral or 1–2 letters. */
  glyph: string;
  size?: number;
  locked?: boolean;
  className?: string;
};

/**
 * Illustrated medal used for badge tiers. Rendered as SVG rather than a line
 * icon so progression states read as collectible artwork — and so a locked
 * badge can be desaturated without shipping a second asset.
 *
 * Decorative by default: the badge name is always rendered as adjacent text.
 */
export function BadgeArt({
  from,
  to,
  glyph,
  size = 64,
  locked = false,
  className,
}: BadgeArtProps) {
  const id = useId();
  const gradient = `grad-${id}`;
  const shine = `shine-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className={cn(locked && "opacity-45 grayscale", className)}
    >
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <linearGradient id={shine} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ribbons */}
      <path d="M20 40 L12 62 L22 57 L28 62 L32 44 Z" fill={to} opacity="0.9" />
      <path d="M44 40 L52 62 L42 57 L36 62 L32 44 Z" fill={from} opacity="0.9" />

      {/* medal body */}
      <circle cx="32" cy="26" r="22" fill={`url(#${gradient})`} />
      <circle cx="32" cy="26" r="22" fill={`url(#${shine})`} />
      <circle
        cx="32"
        cy="26"
        r="17"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />

      {/* sparkle */}
      <path
        d="M49 9 l1.4 3.4 3.4 1.4 -3.4 1.4 -1.4 3.4 -1.4 -3.4 -3.4 -1.4 3.4 -1.4 Z"
        fill="#fff"
        opacity="0.85"
      />

      <text
        x="32"
        y="26"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={glyph.length > 2 ? 12 : 16}
        fontWeight="800"
        fill="#fff"
        fontFamily="inherit"
      >
        {glyph}
      </text>
    </svg>
  );
}
