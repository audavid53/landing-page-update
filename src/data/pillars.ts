import type { Pillar, PillarId, PillarStatus } from "./types";

export const PILLARS: Pillar[] = [
  {
    id: "self-knowledge",
    name: "Self-Knowledge",
    shortName: "Self-Knowledge",
    summary: "Knowing your strengths, values and what work actually suits you.",
    color: "var(--color-pillar-self)",
    art: "brain",
    ramp: "violet",
    score: 78,
    previousScore: 64,
    lessons: [
      { id: "sk-1", title: "Name your top five strengths", minutes: 8, xp: 20, format: "video" , units: 2, interaction: "checkpoint-quiz" },
      { id: "sk-2", title: "Values vs. salary: making the trade-off", minutes: 11, xp: 25, format: "video" , units: 2, interaction: "checkpoint-quiz" },
      { id: "sk-3", title: "Write your one-line professional identity", minutes: 15, xp: 30, format: "practice" , units: 3, interaction: "practical-exercise" },
    ],
    project: {
      id: "sk-p",
      title: "Your Career Identity Statement",
      description: "Draft a 100-word statement that says who you are professionally and the problems you want to solve.",
      units: 4,
      xp: 60,
      deliverable: "A written statement added to your profile",
    },
  },
  {
    id: "financial-awareness",
    name: "Financial Situational Awareness",
    shortName: "Financial Awareness",
    summary: "Understanding what roles pay, what they cost you, and how to plan around it.",
    color: "var(--color-pillar-finance)",
    art: "money-bag",
    ramp: "green",
    score: 52,
    previousScore: 48,
    lessons: [
      { id: "fa-1", title: "What entry roles really pay in Nigeria", minutes: 12, xp: 25, format: "video" , units: 2, interaction: "checkpoint-quiz" },
      { id: "fa-2", title: "Budgeting on a first salary", minutes: 9, xp: 20, format: "reading" , units: 2, interaction: "decision-point" },
      { id: "fa-3", title: "Negotiating your first offer", minutes: 14, xp: 30, format: "video" , units: 3, interaction: "checkpoint-quiz" },
    ],
    project: {
      id: "fa-p",
      title: "12-Month Money Map",
      description: "Build a simple plan covering income, learning costs and savings for your first year of work.",
      units: 4,
      xp: 60,
      deliverable: "A completed money map worksheet",
    },
  },
  {
    id: "curiosity",
    name: "Curiosity to Explore",
    shortName: "Curiosity",
    summary: "Actively investigating industries instead of guessing from the outside.",
    color: "var(--color-pillar-curiosity)",
    art: "telescope",
    ramp: "sky",
    score: 71,
    previousScore: 55,
    lessons: [
      { id: "cu-1", title: "How to research an industry in 30 minutes", minutes: 10, xp: 20, format: "video" , units: 2, interaction: "checkpoint-quiz" },
      { id: "cu-2", title: "Reading a job advert like an insider", minutes: 7, xp: 20, format: "reading" , units: 2, interaction: "decision-point" },
      { id: "cu-3", title: "Run your first informational interview", minutes: 16, xp: 35, format: "practice" , units: 3, interaction: "practical-exercise" },
    ],
    project: {
      id: "cu-p",
      title: "Sector Deep-Dive",
      description: "Pick one of the 14 sectors and produce a one-page brief on how people actually enter it.",
      units: 4,
      xp: 60,
      deliverable: "A one-page sector brief",
    },
  },
  {
    id: "social-skills",
    name: "Social Skills & Networks",
    shortName: "Social & Networks",
    summary: "Building relationships that open doors, and knowing how to ask well.",
    color: "var(--color-pillar-social)",
    art: "handshake",
    ramp: "amber",
    score: 44,
    previousScore: 44,
    lessons: [
      { id: "ss-1", title: "The follow-up message that gets replies", minutes: 6, xp: 20, format: "video" , units: 2, interaction: "checkpoint-quiz" },
      { id: "ss-2", title: "Introducing yourself in 30 seconds", minutes: 9, xp: 20, format: "practice" , units: 2, interaction: "practical-exercise" },
      { id: "ss-3", title: "Keeping a relationship warm without being pushy", minutes: 11, xp: 25, format: "video" , units: 2, interaction: "checkpoint-quiz" },
    ],
    project: {
      id: "ss-p",
      title: "Five Real Conversations",
      description: "Reach out to five professionals in your target sector and log what you learned from each.",
      units: 4,
      xp: 70,
      deliverable: "Five logged conversations",
    },
  },
  {
    id: "skill-stacking",
    name: "Skill Stacking",
    shortName: "Skill Stacking",
    summary: "Combining ordinary skills into a combination that is hard to replace.",
    color: "var(--color-pillar-skills)",
    art: "tools",
    ramp: "navy",
    score: 66,
    previousScore: 58,
    lessons: [
      { id: "st-1", title: "Why specialists stall and stackers grow", minutes: 12, xp: 25, format: "video" , units: 2, interaction: "checkpoint-quiz" },
      { id: "st-2", title: "Choosing your second skill", minutes: 10, xp: 20, format: "practice" , units: 2, interaction: "practical-exercise" },
      { id: "st-3", title: "Turning coursework into proof", minutes: 13, xp: 30, format: "video" , units: 3, interaction: "checkpoint-quiz" },
    ],
    project: {
      id: "st-p",
      title: "Proof-of-Skill Portfolio Piece",
      description: "Ship one small piece of real work that demonstrates your stack to an employer.",
      units: 4,
      xp: 80,
      deliverable: "A published portfolio piece",
    },
  },
  {
    id: "physical-energy",
    name: "Physical & Energy Capital",
    shortName: "Energy Capital",
    summary: "Protecting the health and routine that your career runs on.",
    color: "var(--color-pillar-energy)",
    art: "energy",
    ramp: "rose",
    score: 61,
    previousScore: 67,
    lessons: [
      { id: "pe-1", title: "Designing a workday you can sustain", minutes: 8, xp: 20, format: "video" , units: 2, interaction: "checkpoint-quiz" },
      { id: "pe-2", title: "Sleep, focus and interview performance", minutes: 7, xp: 20, format: "reading" , units: 2, interaction: "decision-point" },
      { id: "pe-3", title: "Building a 20-minute daily reset", minutes: 10, xp: 25, format: "practice" , units: 2, interaction: "practical-exercise" },
    ],
    project: {
      id: "pe-p",
      title: "Two-Week Energy Log",
      description: "Track energy against output for two weeks and identify your two highest-value hours each day.",
      units: 4,
      xp: 50,
      deliverable: "A completed energy log",
    },
  },
  {
    id: "adaptability",
    name: "Adaptability & Resilience",
    shortName: "Adaptability",
    summary: "Recovering quickly from rejection and changing plans without losing direction.",
    color: "var(--color-pillar-resilience)",
    art: "seedling",
    ramp: "green",
    score: 83,
    previousScore: 75,
    lessons: [
      { id: "ad-1", title: "What to do after a rejection email", minutes: 6, xp: 20, format: "video" , units: 2, interaction: "checkpoint-quiz" },
      { id: "ad-2", title: "Changing direction without starting over", minutes: 12, xp: 25, format: "video" , units: 2, interaction: "checkpoint-quiz" },
      { id: "ad-3", title: "Building a personal setback protocol", minutes: 9, xp: 25, format: "practice" , units: 2, interaction: "practical-exercise" },
    ],
    project: {
      id: "ad-p",
      title: "Setback Playbook",
      description: "Write the three steps you will take the next time a plan falls through, before it happens.",
      units: 4,
      xp: 50,
      deliverable: "A written personal playbook",
    },
  },
];

export const PILLAR_BY_ID = Object.fromEntries(
  PILLARS.map((pillar) => [pillar.id, pillar]),
) as Record<PillarId, Pillar>;

export function statusOf(score: number): PillarStatus {
  if (score >= 70) return "strong";
  if (score >= 50) return "average";
  return "needs-work";
}

export const STATUS_LABEL: Record<PillarStatus, string> = {
  strong: "Strong",
  average: "Average",
  "needs-work": "Needs work",
};

export const STATUS_TONE = {
  strong: "success",
  average: "warn",
  "needs-work": "danger",
} as const;

/** Overall readiness is the mean of the seven pillar scores. */
export function readinessScore(pillars: Pillar[] = PILLARS) {
  const total = pillars.reduce((sum, pillar) => sum + pillar.score, 0);
  return Math.round(total / pillars.length);
}

export function previousReadinessScore(pillars: Pillar[] = PILLARS) {
  const total = pillars.reduce((sum, pillar) => sum + pillar.previousScore, 0);
  return Math.round(total / pillars.length);
}

/** The pillar to push next: lowest score, since that is where effort pays most. */
export function priorityPillar(pillars: Pillar[] = PILLARS) {
  return pillars.reduce((lowest, pillar) => (pillar.score < lowest.score ? pillar : lowest));
}
