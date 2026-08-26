import { useId } from "react";

/**
 * Compass mascot used on empty states, the landing hero and reward moments.
 * A small amount of illustrated character keeps the product youth-oriented
 * without drifting into childish clip art.
 */
export function CompassArt({ size = 120 }: { size?: number }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-400)" />
          <stop offset="100%" stopColor="var(--color-brand-600)" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="52" fill={`url(#sky-${id})`} />
      <circle cx="60" cy="60" r="41" fill="#fff" opacity="0.14" />
      <circle cx="60" cy="60" r="41" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
      {[0, 90, 180, 270].map((deg) => (
        <rect
          key={deg}
          x="59"
          y="19"
          width="2"
          height="8"
          rx="1"
          fill="#fff"
          opacity="0.8"
          transform={`rotate(${deg} 60 60)`}
        />
      ))}
      <path d="M60 30 L72 60 L60 54 Z" fill="var(--color-xp)" />
      <path d="M60 90 L48 60 L60 66 Z" fill="#fff" />
      <circle cx="60" cy="60" r="5" fill="#fff" />
      <circle cx="60" cy="60" r="2" fill="var(--color-brand-600)" />
    </svg>
  );
}

/** Celebratory burst shown behind reward feedback. */
export function SparkArt({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" aria-hidden="true" focusable="false">
      {[
        ["#f0a202", 48, 10],
        ["#5525e8", 82, 34],
        ["#0e8f4d", 70, 78],
        ["#c22d59", 24, 78],
        ["#0f6ed4", 14, 34],
      ].map(([fill, cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx as number} cy={cy as number} r="6" fill={fill as string} />
      ))}
      <circle cx="48" cy="48" r="22" fill="var(--color-xp)" />
      <path
        d="M48 33 l4.6 10.4 11.4 1.2 -8.5 7.7 2.4 11.2 -9.9 -5.8 -9.9 5.8 2.4 -11.2 -8.5 -7.7 11.4 -1.2 Z"
        fill="#fff"
      />
    </svg>
  );
}
