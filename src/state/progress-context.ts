import { createContext } from "react";
import type { BadgeTier } from "@/data/types";

/** A completed action, keyed as `<kind>:<id>` so it is stable across releases. */
export type ActionKey = string;

export type Reward = {
  key: string;
  xp: number;
  /** What the learner actually did, in their own terms. */
  label: string;
  /** What changed as a result — the "visible effort" half of the feedback. */
  effect: string;
  tierUnlocked?: BadgeTier;
};

export type ProgressState = {
  xp: number;
  completed: Record<ActionKey, number>;
};

export type ProgressContextValue = ProgressState & {
  /** True once this exact action has been completed. */
  hasCompleted: (key: ActionKey) => boolean;
  /**
   * Award xp for a concrete action. Repeating the same action never awards
   * twice, so the total always reflects real work.
   */
  complete: (input: { key: ActionKey; xp: number; label: string; effect: string }) => void;
  reset: () => void;
  rewards: Reward[];
  dismissReward: (key: string) => void;
};

export const ProgressContext = createContext<ProgressContextValue | null>(null);

/** XP carried in from the pre-admission assessments and scholarship interview. */
export const STARTING_XP = 2450;

/**
 * Actions this demo learner has already completed.
 *
 * Without a backend the app would otherwise open on a learner who has 2,450 XP
 * but zero finished lessons, which makes every "completed" figure read as 0 and
 * misrepresents what the screens look like in use. Seeding the same actions the
 * XP was awarded for keeps the two numbers consistent.
 */
export const SEED_COMPLETED: ActionKey[] = [
  "lesson:sk-1",
  "lesson:sk-2",
  "lesson:sk-3",
  "lesson:fa-1",
  "lesson:fa-2",
  "lesson:cu-1",
  "lesson:cu-2",
  "lesson:cu-3",
  "lesson:ss-1",
  "mission:m-1",
  "mentor:ifeoma-balogun",
  "assessment:career-clarity",
];

/**
 * v2 renamed the earned currency from "units" to "xp". Blueprint section 8 gives
 * "Units" a different meaning — the academic weight of a learning activity, like
 * a 2/3/4-unit university course — so the old key is deliberately abandoned
 * rather than migrated; a stale v1 payload would read as a wildly inflated
 * Unit count.
 */
export const STORAGE_KEY = "iplace:progress:v2";
