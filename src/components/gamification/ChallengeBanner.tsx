import { Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { ProgressBar } from "@/components/ui/Progress";
import { Pill } from "@/components/ui/Pill";
import type { Challenge } from "@/data/types";
import { cn } from "@/lib/cn";

/**
 * Time-bound community activity. The progress bar tracks the whole cohort, not
 * the individual — the point is collective impact, not a race.
 */
export function ChallengeBanner({
  challenge,
  className,
  compact = false,
}: {
  challenge: Challenge;
  className?: string;
  compact?: boolean;
}) {
  const pct = Math.round((challenge.progress / challenge.goal) * 100);

  return (
    <section
      className={cn(
        "overflow-hidden rounded-panel bg-linear-to-br from-brand-600 to-brand-800 p-5 text-white sm:p-6",
        className,
      )}
      aria-labelledby={`challenge-${challenge.id}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone="dark" className="bg-white/15 text-white">
          Weekly challenge
        </Pill>
        <Pill tone="dark" className="bg-white/15 text-white" icon={<Clock />}>
          Ends in {challenge.endsIn}
        </Pill>
        <Pill tone="dark" className="bg-white/15 text-white" icon={<Users />}>
          {challenge.participants} taking part
        </Pill>
      </div>

      <h2 id={`challenge-${challenge.id}`} className="mt-3 text-xl font-extrabold sm:text-2xl">
        {challenge.title}
      </h2>
      {!compact ? (
        <p className="mt-2 max-w-2xl text-sm text-white/80">{challenge.description}</p>
      ) : null}

      <div className="mt-4 max-w-xl">
        <div className="mb-1.5 flex items-baseline justify-between text-sm">
          <span className="font-medium text-white/80">Cohort progress</span>
          <span className="font-bold tabular-nums">
            {challenge.progress.toLocaleString("en-NG")} / {challenge.goal.toLocaleString("en-NG")}
          </span>
        </div>
        <ProgressBar
          value={pct}
          label={`${challenge.title} cohort progress`}
          color="var(--color-xp)"
          trackClassName="bg-white/20"
        />
      </div>

      <Link
        to="/community"
        className="mt-4 inline-flex items-center gap-2 rounded-pill bg-white px-5 py-2.5 text-sm font-bold text-brand-700 transition-transform hover:scale-[1.02]"
      >
        Join the challenge
        <span aria-hidden="true">+{challenge.xp} XP</span>
      </Link>
    </section>
  );
}
