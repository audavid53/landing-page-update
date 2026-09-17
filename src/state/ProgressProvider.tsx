import { useCallback, useEffect, useMemo, useState } from "react";
import { tierFor } from "@/data/badges";
import { useSession } from "@/state/SessionProvider";
import {
  ProgressContext,
  SEED_COMPLETED,
  STARTING_XP,
  STORAGE_KEY,
  type ProgressState,
  type Reward,
} from "./progress-context";

const EMPTY: ProgressState = {
  xp: STARTING_XP,
  completed: Object.fromEntries(SEED_COMPLETED.map((key) => [key, 0])),
};

function readStored(key: string, initial: ProgressState): ProgressState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return initial;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    if (typeof parsed.xp !== "number" || typeof parsed.completed !== "object") return initial;
    return { xp: parsed.xp, completed: parsed.completed ?? {} };
  } catch {
    // Corrupted or unavailable storage should never break the app.
    return initial;
  }
}

/**
 * Holds everything the learner has earned. There is no backend, so progress is
 * persisted to localStorage — the shape is versioned so a future API can adopt
 * it without a migration.
 */
export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { account } = useSession();
  const storageKey = account ? `${STORAGE_KEY}:${account.email}` : STORAGE_KEY;
  const initial = useMemo<ProgressState>(() => account ? { xp: 0, completed: {} } : EMPTY, [account]);
  const [state, setState] = useState<ProgressState>(() => readStored(storageKey, initial));
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // Private-mode or quota errors are non-fatal; the session still works.
    }
  }, [state, storageKey]);

  const complete = useCallback(
    ({
      key,
      xp,
      label,
      effect,
    }: {
      key: string;
      xp: number;
      label: string;
      effect: string;
    }) => {
      setState((previous) => {
        if (previous.completed[key]) return previous;

        const nextXp = previous.xp + xp;
        const before = tierFor(previous.xp);
        const after = tierFor(nextXp);

        setRewards((queue) => [
          ...queue,
          {
            key: `${key}:${Date.now()}`,
            xp,
            label,
            effect,
            ...(after.level > before.level ? { tierUnlocked: after } : {}),
          },
        ]);

        return {
          xp: nextXp,
          completed: { ...previous.completed, [key]: Date.now() },
        };
      });
    },
    [],
  );

  const hasCompleted = useCallback((key: string) => Boolean(state.completed[key]), [state.completed]);

  const dismissReward = useCallback((key: string) => {
    setRewards((queue) => queue.filter((reward) => reward.key !== key));
  }, []);

  const reset = useCallback(() => {
    setState(initial);
    setRewards([]);
  }, [initial]);

  const value = useMemo(
    () => ({ ...state, hasCompleted, complete, reset, rewards, dismissReward }),
    [state, hasCompleted, complete, reset, rewards, dismissReward],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}
