import { useCallback, useEffect, useMemo, useState } from "react";
import { tierFor } from "@/data/badges";
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

function readStored(): ProgressState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    if (typeof parsed.xp !== "number" || typeof parsed.completed !== "object") return EMPTY;
    return { xp: parsed.xp, completed: parsed.completed ?? {} };
  } catch {
    // Corrupted or unavailable storage should never break the app.
    return EMPTY;
  }
}

/**
 * Holds everything the learner has earned. There is no backend, so progress is
 * persisted to localStorage — the shape is versioned so a future API can adopt
 * it without a migration.
 */
export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(readStored);
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Private-mode or quota errors are non-fatal; the session still works.
    }
  }, [state]);

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
    setState(EMPTY);
    setRewards([]);
  }, []);

  const value = useMemo(
    () => ({ ...state, hasCompleted, complete, reset, rewards, dismissReward }),
    [state, hasCompleted, complete, reset, rewards, dismissReward],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}
