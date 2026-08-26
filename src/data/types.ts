import type { Art3DName } from "./art-names";

export type { Art3DName };

export type PillarId =
  | "self-knowledge"
  | "financial-awareness"
  | "curiosity"
  | "social-skills"
  | "skill-stacking"
  | "physical-energy"
  | "adaptability";

export type PillarStatus = "strong" | "average" | "needs-work";

export type Pillar = {
  id: PillarId;
  name: string;
  shortName: string;
  /** One plain sentence a 19-year-old can act on. */
  summary: string;
  color: string;
  /** 3D illustration representing the pillar. */
  art: Art3DName;
  /** Gradient ramp used for this pillar's icon tiles and blocks. */
  ramp: Ramp;
  score: number;
  previousScore: number;
  lessons: Lesson[];
  project: Project;
};

/**
 * Blueprint section 8 separates two numbers that the product had previously
 * conflated:
 *
 *   units — the academic weight of the activity, on the 2/3/4-unit scale
 *           Nigerian universities use for course credit. Fixed by the
 *           curriculum; it says how substantial the work is.
 *   xp    — the engagement reward for actually doing it. Earned, not fixed.
 *
 * Every learning activity therefore carries both.
 */
export type Weighted = {
  /** Academic weight, 1-4. Constant per activity. */
  units: number;
  /** Engagement reward earned on completion. */
  xp: number;
};

export type Lesson = Weighted & {
  id: string;
  title: string;
  minutes: number;
  format: LessonFormat;
  /** Blueprint section 7 — the interactive beat this lesson node uses. */
  interaction: InteractionKind;
};

export type LessonFormat = "video" | "reading" | "practice";

/**
 * The learn -> interact -> decide -> feedback loop in section 7. Each kind is a
 * different player component, so it is modelled rather than left to prose.
 */
export type InteractionKind =
  | "checkpoint-quiz"
  | "decision-point"
  | "practical-exercise"
  | "peer-review"
  | "project-submission";

export type Project = Weighted & {
  id: string;
  title: string;
  description: string;
  deliverable: string;
};

export type Mission = Weighted & {
  id: string;
  title: string;
  description: string;
  pillar: PillarId;
  /** Where completing this mission takes the learner. */
  href: string;
  cta: string;
  /**
   * Which level this mission belongs to. Replaces the old `week` field: section
   * 9 has learners moving at different speeds through the same roadmap, so a
   * calendar week can no longer say where anyone is.
   */
  level: LevelNumber;
  art: Art3DName;
};

export type Mentor = {
  id: string;
  name: string;
  role: string;
  company: string;
  sector: Sector;
  avatar?: string;
  bio: string;
  sessionTitle: string;
  duration: string;
  xp: number;
  watched: boolean;
  takeaways: string[];
  quiz: QuizQuestion[];
  questionsAnswered: number;
};

export type Sector =
  | "Technology"
  | "Finance"
  | "Health"
  | "Creative & Media"
  | "Energy"
  | "Agriculture"
  | "Education"
  | "Law"
  | "Public Sector"
  | "Logistics"
  | "Retail & FMCG"
  | "Construction"
  | "Hospitality"
  | "Social Impact";

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  /** Shown after answering, right or wrong. */
  explanation: string;
};

export type BadgeTier = {
  level: number;
  name: string;
  glyph: string;
  from: string;
  to: string;
  xpRequired: number;
  perk: string;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  xp: number;
  endsIn: string;
  participants: number;
  progress: number;
  goal: number;
};

export type FeedItem = {
  id: string;
  person: string;
  avatar?: string;
  action: string;
  detail: string;
  timeAgo: string;
  xp?: number;
  kind: "mission" | "badge" | "project" | "question" | "challenge";
};

/** Blueprint section 6: six levels, ending in the Treasure Chest. */
export type LevelNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type LevelState = "done" | "current" | "locked";

export type Level = {
  level: LevelNumber;
  title: string;
  description: string;
  /** What reaching this level opens up. */
  perk: string;
  /** Total XP threshold to enter this level. */
  xpRequired: number;
  /** Sum of the academic weight carried by this level's activities. */
  units: number;
  art: Art3DName;
  ramp: Ramp;
  /**
   * Level 6 is the Treasure Chest: it unlocks real opportunities rather than
   * more learning, so it renders as a reward node, not a lesson node.
   */
  isTreasure?: boolean;
};

export type Assessment = {
  id: string;
  title: string;
  tagline: string;
  why: string;
  minutes: number;
  xp: number;
  questionCount: number;
  aiAssisted: boolean;
  aiExplainer?: string;
  questions: AssessmentQuestion[];
  outcome: AssessmentOutcome;
};

export type AssessmentQuestion = {
  id: string;
  prompt: string;
  options: string[];
};

export type AssessmentOutcome = {
  headline: string;
  summary: string;
  highlights: { label: string; value: string }[];
  nextActions: { label: string; href: string }[];
};


/* ==========================================================================
   Admissions (blueprint section 4)
   ========================================================================== */

/**
 * The pre-admission funnel, in order. Section 4.6 asks for a visible checklist
 * instead of a vague "Pending", so each step is a first-class object with its
 * own state rather than a boolean on the user.
 */
export type AdmissionStepId =
  | "assessments"
  | "interview"
  | "guardian"
  | "verification"
  | "admission"
  | "payment";

export type AdmissionStepState =
  | "completed"
  | "in-review"
  | "current"
  | "locked";

export type AdmissionStep = {
  id: AdmissionStepId;
  title: string;
  /** Why this step is required — section 4.4 asks for this to be explicit. */
  why: string;
  state: AdmissionStepState;
  /** Where the learner goes to act on it, when they can. */
  href: string;
  art: Art3DName;
  /** Shown on the checklist row when the step is waiting on the admin team. */
  note?: string;
};

/* ==========================================================================
   Opportunities (blueprint section 14)
   ========================================================================== */

export type OpportunityKind = "internship" | "placement" | "fellowship";

export type Opportunity = {
  id: string;
  title: string;
  organisation: string;
  sector: Sector;
  kind: OpportunityKind;
  location: string;
  closes: string;
  /** Level the learner must reach before this becomes claimable. */
  unlocksAt: LevelNumber;
  /** Plain-language eligibility, per section 16's transparency requirement. */
  eligibility: string[];
  art: Art3DName;
  ramp: Ramp;
};

/* ==========================================================================
   Cohorts (blueprint section 9)
   ========================================================================== */

/**
 * Cohorts re-form around the level a learner is currently on, so a cohort is
 * keyed by level rather than by start date.
 */
export type Cohort = {
  level: LevelNumber;
  name: string;
  members: { name: string; avatar?: string }[];
  activeProject: string;
  messagesToday: number;
};

/* ==========================================================================
   Presentation primitives
   ========================================================================== */

/** Named gradient ramps defined in styles/index.css. */
export type Ramp = "violet" | "navy" | "green" | "amber" | "sky" | "rose";
