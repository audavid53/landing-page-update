import { useEffect } from "react";
import { X } from "lucide-react";
import { BadgeArt } from "@/components/art/BadgeArt";
import { SparkArt } from "@/components/art/Illustration";
import { useProgress } from "@/state/useProgress";
import type { Reward } from "@/state/progress-context";

const VISIBLE_MS = 7000;

function RewardCard({ reward, onDismiss }: { reward: Reward; onDismiss: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="animate-pop-in pointer-events-auto w-[min(22rem,calc(100vw-2rem))] rounded-card border border-line bg-surface p-4 shadow-raised">
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          {reward.tierUnlocked ? (
            <BadgeArt
              from={reward.tierUnlocked.from}
              to={reward.tierUnlocked.to}
              glyph={reward.tierUnlocked.glyph}
              size={48}
            />
          ) : (
            <SparkArt size={44} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-ink">
            {reward.tierUnlocked ? `New badge: ${reward.tierUnlocked.name}` : reward.label}
          </p>
          <p className="mt-0.5 text-sm text-muted">
            {reward.tierUnlocked ? reward.tierUnlocked.perk : reward.effect}
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-pill bg-xp-soft px-2.5 py-1 text-xs font-bold text-warn">
            +{reward.xp} XP earned
          </p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="-m-1 shrink-0 rounded-full p-1 text-muted transition-colors hover:bg-canvas hover:text-ink"
        >
          <X aria-hidden="true" className="size-4" />
          <span className="sr-only">Dismiss</span>
        </button>
      </div>
    </div>
  );
}

/**
 * Makes effort visible. Every awarded action names what the learner did, what
 * changed because of it, and what it was worth — so XP never read as an
 * arbitrary number.
 */
export function RewardFeedback() {
  const { rewards, dismissReward } = useProgress();

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed right-4 bottom-24 z-50 flex flex-col items-end gap-3 lg:bottom-6"
    >
      {rewards.slice(-3).map((reward) => (
        <RewardCard
          key={reward.key}
          reward={reward}
          onDismiss={() => dismissReward(reward.key)}
        />
      ))}
    </div>
  );
}
