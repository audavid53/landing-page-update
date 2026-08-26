import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BadgeArt } from "@/components/art/BadgeArt";
import { Avatar } from "@/components/ui/Avatar";
import { ProgressBar } from "@/components/ui/Progress";
import { nextTierFor, tierFor, tierProgress, xpToNextTier } from "@/data/badges";
import { useProgress } from "@/state/useProgress";
import { cn } from "@/lib/cn";

const LEARNER = { name: "Mary Sokoh", role: "Aspiring Product Designer" };

/**
 * The progression summary that lives at the bottom of the dark sidebar:
 * who you are, the badge you hold, what you have earned, how far the next
 * tier is, and one concrete next action.
 */
export function ProfileStatusCard({ className }: { className?: string }) {
  const { xp } = useProgress();
  const tier = tierFor(xp);
  const next = nextTierFor(xp);

  return (
    <div
      className={cn(
        "rounded-card border border-shell-line bg-shell-raised p-4 text-white",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar name={LEARNER.name} size="md" ring online />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{LEARNER.name}</p>
          <p className="truncate text-xs text-shell-muted">{LEARNER.role}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <BadgeArt from={tier.from} to={tier.to} glyph={tier.glyph} size={40} />
        <div className="min-w-0">
          <p className="text-xs text-shell-muted">Level {tier.level}</p>
          <p className="truncate text-sm font-bold">{tier.name}</p>
        </div>
        <p className="ml-auto text-right">
          <span className="block text-base font-extrabold tabular-nums">
            {xp.toLocaleString("en-NG")}
          </span>
          <span className="block text-[0.625rem] font-semibold tracking-wide text-shell-muted uppercase">
            XP
          </span>
        </p>
      </div>

      <ProgressBar
        className="mt-3"
        size="sm"
        value={tierProgress(xp)}
        label={next ? `Progress to ${next.name}` : "Highest tier reached"}
        color="var(--color-xp)"
        trackClassName="bg-shell-line"
      />

      {next ? (
        <Link
          to="/profile"
          className="mt-3 flex items-center gap-3 rounded-xl border border-shell-line bg-shell px-3 py-2.5 transition-colors hover:bg-shell-line"
        >
          <BadgeArt from={next.from} to={next.to} glyph={next.glyph} size={28} locked />
          <span className="min-w-0 flex-1 text-left">
            <span className="block truncate text-xs font-semibold">Next: {next.name}</span>
            <span className="block truncate text-[0.6875rem] text-shell-muted">
              {xpToNextTier(xp).toLocaleString("en-NG")} XP away — {next.perk}
            </span>
          </span>
          <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-shell-muted" />
        </Link>
      ) : (
        <p className="mt-3 rounded-xl border border-shell-line bg-shell px-3 py-2.5 text-xs text-shell-muted">
          Every badge unlocked. Mentor a newcomer to keep earning.
        </p>
      )}
    </div>
  );
}
