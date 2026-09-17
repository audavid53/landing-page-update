/**
 * Scene Timeline Configuration
 *
 * Single source of truth for all 10 scenes in the scroll-driven hero.
 * Edit copy, timing, or positioning here — never in the scroll engine or components.
 */

export interface ScenePlacement {
  /** Percentages of the visible video frame, measured from the reference stills. */
  left: number;
  top: number;
  width: number;
  textAlign: "left" | "center" | "right";
  /** Target headline size at the reference image width (1920 desktop, 1080 mobile). */
  headlineSize: number;
  /** Explicit reference line breaks, independent of available viewport width. */
  headlineLines: string[];
}

export interface Scene {
  id: number;
  kicker: string;
  headline: string;
  /** Decimal seconds — when this scene's text enters */
  enterTime: number;
  /** Decimal seconds — when this scene's text holds (exit starts here) */
  holdTime: number;
  placement: { desktop: ScenePlacement; mobile: ScenePlacement };
  /** Scene 1 is shown on initial load */
  isStatic: boolean;
}

export const scenes: Scene[] = [
  {
    id: 1,
    kicker: "Whether you're choosing your",
    headline: "university course",
    enterTime: 0.0,
    holdTime: 0.75,
    placement: {
      desktop: { left: 28.2, top: 33.6, width: 45.7, textAlign: "center", headlineSize: 70, headlineLines: ["university course"] },
      mobile: { left: 13.2, top: 40.9, width: 76.6, textAlign: "center", headlineSize: 88, headlineLines: ["university course"] },
    },
    isStatic: true,
  },
  {
    id: 2,
    kicker: "or searching for the right",
    headline: "skill to learn.",
    enterTime: 0.85,
    holdTime: 1.65,
    placement: {
      desktop: { left: 42, top: 27.8, width: 32.8, textAlign: "center", headlineSize: 66, headlineLines: ["skill to learn."] },
      mobile: { left: 20.7, top: 35.2, width: 58.1, textAlign: "center", headlineSize: 88, headlineLines: ["skill to learn."] },
    },
    isStatic: false,
  },
  {
    id: 3,
    kicker: "Advanced economies don't leave",
    headline: "career choices to chance",
    enterTime: 1.9,
    holdTime: 2.7,
    placement: {
      desktop: { left: 12.9, top: 14.4, width: 33.4, textAlign: "left", headlineSize: 76, headlineLines: ["career choices", "to chance"] },
      mobile: { left: 10.1, top: 27.5, width: 65.5, textAlign: "left", headlineSize: 91, headlineLines: ["career choices to", "chance"] },
    },
    isStatic: false,
  },
  {
    id: 4,
    kicker: "They have systems that point their",
    headline: "talent directly to market demand",
    enterTime: 3.3,
    holdTime: 4.1,
    placement: {
      desktop: { left: 51.4, top: 23.1, width: 37.3, textAlign: "center", headlineSize: 74, headlineLines: ["talent directly to", "market demand"] },
      mobile: { left: 22.6, top: 16.6, width: 68.8, textAlign: "right", headlineSize: 88, headlineLines: ["talent directly", "to market demand"] },
    },
    isStatic: false,
  },
  {
    id: 5,
    kicker: "Without a national",
    headline: "job trend database",
    enterTime: 4.8,
    holdTime: 5.5,
    placement: {
      desktop: { left: 14.5, top: 33.8, width: 25.7, textAlign: "left", headlineSize: 103, headlineLines: ["job trend", "database"] },
      mobile: { left: 7.9, top: 61.4, width: 81.8, textAlign: "left", headlineSize: 92, headlineLines: ["job trend database"] },
    },
    isStatic: false,
  },
  {
    id: 6,
    kicker: "Millions of Nigerians.",
    headline: "pick courses blindly",
    enterTime: 5.85,
    holdTime: 6.55,
    placement: {
      desktop: { left: 19.1, top: 48.9, width: 30.1, textAlign: "left", headlineSize: 103, headlineLines: ["pick courses", "blindly"] },
      mobile: { left: 25.1, top: 26.6, width: 54.7, textAlign: "center", headlineSize: 94, headlineLines: ["pick courses", "blindly"] },
    },
    isStatic: false,
  },
  {
    id: 7,
    kicker: "ICompass brings",
    headline: "to Nigeria",
    enterTime: 7.1,
    holdTime: 7.8,
    placement: {
      desktop: { left: 9.8, top: 12.4, width: 27.6, textAlign: "left", headlineSize: 104, headlineLines: ["to Nigeria"] },
      mobile: { left: 8, top: 66.5, width: 54.9, textAlign: "left", headlineSize: 92, headlineLines: ["to Nigeria"] },
    },
    isStatic: false,
  },
  {
    id: 8,
    kicker: "global-standard",
    headline: "career infrastructure",
    enterTime: 8.2,
    holdTime: 9.0,
    placement: {
      desktop: { left: 57.8, top: 63, width: 31.7, textAlign: "left", headlineSize: 88, headlineLines: ["career", "infrastructure"] },
      mobile: { left: 6.8, top: 18.2, width: 63.8, textAlign: "left", headlineSize: 92, headlineLines: ["career", "infrastructure"] },
    },
    isStatic: false,
  },
  {
    id: 9,
    kicker: "matching",
    headline: "Nigerian Youths",
    enterTime: 9.7,
    holdTime: 10.3,
    placement: {
      desktop: { left: 15.4, top: 20.2, width: 24.1, textAlign: "left", headlineSize: 112, headlineLines: ["Nigerian", "Youths"] },
      mobile: { left: 41.1, top: 19.6, width: 48.6, textAlign: "right", headlineSize: 112, headlineLines: ["Nigerian", "Youths"] },
    },
    isStatic: false,
  },
  {
    id: 10,
    kicker: "with what our",
    headline: "economy needs today",
    enterTime: 10.9,
    holdTime: 11.4,
    placement: {
      desktop: { left: 29.4, top: 31.3, width: 40.7, textAlign: "center", headlineSize: 94, headlineLines: ["economy needs", "today"] },
      mobile: { left: 13.3, top: 27.1, width: 68.8, textAlign: "center", headlineSize: 96, headlineLines: ["economy needs", "today"] },
    },
    isStatic: false,
  },
];

/**
 * Duration of entrance animation in ms.
 */
export const ENTER_DURATION = 500;

/**
 * Duration of exit animation in ms.
 */
export const EXIT_DURATION = 300;

/**
 * How many viewports of scroll height the hero section should pin for.
 */
// Six viewports scrub the video; the seventh animates the final frame into its card.
export const PIN_SCROLL_MULTIPLIER = 8;
export const VIDEO_SCROLL_FRACTION = 6 / 7;
export const SCRUB_FOLLOW_MS = 135;
export const SNAP_IDLE_MS = 180;
