import type {
  AdmissionStep,
  Challenge,
  Cohort,
  FeedItem,
  Level,
  LevelNumber,
  Mission,
  Opportunity,
} from "./types";

/**
 * The level this demo learner currently sits on. Section 9 has learners moving
 * at different speeds, so this is per-learner state — it replaces the old
 * global CURRENT_WEEK constant, which could not express that.
 */
export const CURRENT_LEVEL: LevelNumber = 3;

export const MISSIONS: Mission[] = [
  {
    id: "m-1",
    title: "Complete the Career Clarity assessment",
    description: "Twelve questions. It sets the baseline the rest of your journey is measured against.",
    xp: 120,
    pillar: "self-knowledge",
    href: "/assessments/career-clarity",
    cta: "Start assessment",
    level: 1,
    units: 2,
    art: "memo",
  },
  {
    id: "m-2",
    title: "Watch one session from your target sector",
    description: "Hear how someone actually got in — and what they would skip if they started again.",
    xp: 80,
    pillar: "curiosity",
    href: "/mentorship",
    cta: "Browse sessions",
    level: 2,
    units: 2,
    art: "video-camera",
  },
  {
    id: "m-3",
    title: "Send three networking messages",
    description: "Your weakest pillar right now. Three messages this week moves it more than any lesson.",
    xp: 90,
    pillar: "social-skills",
    href: "/learning/social-skills",
    cta: "Open the lesson",
    level: 3,
    units: 3,
    art: "handshake",
  },
  {
    id: "m-4",
    title: "Ship your Proof-of-Skill portfolio piece",
    description: "One small piece of real work beats a long list of courses.",
    xp: 150,
    pillar: "skill-stacking",
    href: "/learning/skill-stacking",
    cta: "See the project",
    level: 4,
    units: 4,
    art: "package",
  },
  {
    id: "m-5",
    title: "Present your plan to your Dream Team",
    description: "Say it out loud to four people who will hold you to it.",
    xp: 130,
    pillar: "adaptability",
    href: "/community",
    cta: "Go to community",
    level: 5,
    units: 3,
    art: "people",
  },
];

/**
 * Blueprint section 6. Eight week-keyed stages collapse into six levels: a
 * learner's position is now their own, not the calendar's, and Level 6 is the
 * Treasure Chest rather than another block of learning.
 */
export const LEVELS: Level[] = [
  {
    level: 1,
    title: "Find your footing",
    description:
      "Set up your profile, meet your cohort and take the baseline assessments the rest of your journey is measured against.",
    perk: "Explorer badge",
    xpRequired: 0,
    units: 6,
    art: "compass",
    ramp: "violet",
  },
  {
    level: 2,
    title: "Know yourself",
    description:
      "Self-Knowledge and Financial Awareness lessons, and your first written Career Identity Statement.",
    perk: "Full assessment suite",
    xpRequired: 900,
    units: 8,
    art: "brain",
    ramp: "sky",
  },
  {
    level: 3,
    title: "Explore the sectors",
    description:
      "Mentor sessions across 14 Nigerian sectors, then a deep-dive into the one you are aiming at.",
    perk: "Cohort rooms and weekly challenges",
    xpRequired: 2100,
    units: 10,
    art: "telescope",
    ramp: "green",
  },
  {
    level: 4,
    title: "Stack your skills",
    description:
      "Choose a second skill and ship one proof-of-skill portfolio piece a mentor will review.",
    perk: "Mentor project review",
    xpRequired: 3800,
    units: 12,
    art: "tools",
    ramp: "amber",
  },
  {
    level: 5,
    title: "Prove it",
    description:
      "Mock interviews, portfolio review and your readiness re-assessment against the seven pillars.",
    perk: "Profile shared with partner employers",
    xpRequired: 5600,
    units: 12,
    art: "target",
    ramp: "rose",
  },
  {
    level: 6,
    title: "Treasure Chest",
    description:
      "Internships and job placements open up. What you unlock depends on the readiness you have built.",
    perk: "Internship and placement opportunities",
    xpRequired: 8000,
    units: 0,
    art: "gift",
    ramp: "navy",
    isTreasure: true,
  },
];

export const CHALLENGES: Challenge[] = [
  {
    id: "c-1",
    title: "The Five Conversations Challenge",
    description:
      "Every learner in the cohort reaches out to five professionals this week. Log each conversation and share one thing you learned.",
    xp: 200,
    endsIn: "3 days",
    participants: 486,
    progress: 1720,
    goal: 2500,
  },
  {
    id: "c-2",
    title: "Sector Myth-Buster",
    description:
      "Post one belief about your target sector that turned out to be wrong once you looked closely.",
    xp: 90,
    endsIn: "6 days",
    participants: 213,
    progress: 640,
    goal: 1000,
  },
];

export const FEED: FeedItem[] = [
  {
    id: "f-1",
    person: "Chidinma O.",
    action: "completed",
    detail: "Five Real Conversations project",
    timeAgo: "12m ago",
    xp: 70,
    kind: "project",
  },
  {
    id: "f-2",
    person: "Tunde A.",
    action: "unlocked",
    detail: "the Pathfinder badge",
    timeAgo: "48m ago",
    kind: "badge",
  },
  {
    id: "f-3",
    person: "Amara N.",
    action: "asked",
    detail: "Ifeoma Balogun a question about breaking into fintech",
    timeAgo: "2h ago",
    kind: "question",
  },
  {
    id: "f-4",
    person: "Segun B.",
    action: "finished",
    detail: "the Sector Deep-Dive mission",
    timeAgo: "3h ago",
    xp: 60,
    kind: "mission",
  },
  {
    id: "f-5",
    person: "Halima Y.",
    action: "joined",
    detail: "The Five Conversations Challenge",
    timeAgo: "5h ago",
    kind: "challenge",
  },
];

export const DREAM_TEAM = [
  { name: "Chidinma Okeke" },
  { name: "Tunde Adebayo" },
  { name: "Amara Nwosu" },
  { name: "Segun Bello" },
  { name: "Halima Yusuf" },
];

/** Peers within the same level — comparison stays encouraging, not cut-throat. */
export const LEVEL_PEERS = [
  { name: "Chidinma O.", xp: 2860, you: false },
  { name: "You", xp: 2450, you: true },
  { name: "Tunde A.", xp: 2310, you: false },
  { name: "Amara N.", xp: 2180, you: false },
  { name: "Segun B.", xp: 2020, you: false },
];

/* ==========================================================================
   Admissions checklist (blueprint section 4.6)
   --------------------------------------------------------------------------
   The brief is explicit that a bare "Pending" label is the wrong answer. Each
   requirement is therefore its own row with its own state and its own reason,
   so a waiting learner can always see which step is theirs to act on and which
   is sitting with the admin team.
   ========================================================================== */
export const ADMISSION_STEPS: AdmissionStep[] = [
  {
    id: "assessments",
    title: "Assessments",
    why: "Your results shape the learning path we build for you.",
    state: "completed",
    href: "/apply/assessments",
    art: "memo",
  },
  {
    id: "interview",
    title: "Scholarship interview",
    why: "A short recorded conversation so we can hear your goals in your own words.",
    state: "completed",
    href: "/apply/interview",
    art: "clipboard",
  },
  {
    id: "guardian",
    title: "Parent or guardian details",
    why: "Applicants under 21 need a guardian on record before admission is confirmed.",
    state: "completed",
    href: "/apply/guardian",
    art: "guardian",
  },
  {
    id: "verification",
    title: "Verification",
    why: "Our team checks the details you submitted. Nothing is needed from you.",
    state: "in-review",
    href: "/apply",
    art: "shield",
    note: "With the admissions team — usually 2 working days",
  },
  {
    id: "admission",
    title: "Admission decision",
    why: "Assessed against published criteria: completed requirements, assessment results and interview.",
    state: "locked",
    href: "/apply",
    art: "id-card",
  },
  {
    id: "payment",
    title: "Programme payment",
    why: "Opens once you are admitted. Scholarship awards are applied before you pay.",
    state: "locked",
    href: "/apply/payment",
    art: "credit-card",
  },
];

/* ==========================================================================
   Cohorts (blueprint section 9)
   ========================================================================== */
export const COHORTS: Cohort[] = [
  {
    level: 3,
    name: "Level 3 · Sector Explorers",
    members: [
      { name: "Mary A." },
      { name: "Oreva E." },
      { name: "Oboz I." },
      { name: "Chidinma O." },
      { name: "Tunde A." },
    ],
    activeProject: "Sector Deep-Dive: five findings that surprised you",
    messagesToday: 34,
  },
  {
    level: 4,
    name: "Level 4 · Skill Stackers",
    members: [{ name: "Halima Y." }, { name: "Segun B." }, { name: "Amara N." }],
    activeProject: "Ship one proof-of-skill piece and review a peer's",
    messagesToday: 18,
  },
];

/* ==========================================================================
   Level 6 Treasure Chest (blueprint section 14)
   ========================================================================== */
export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "o-1",
    title: "Product Analyst Internship",
    organisation: "Paystack",
    sector: "Finance",
    kind: "internship",
    location: "Lagos · Hybrid",
    closes: "Closes in 12 days",
    unlocksAt: 6,
    eligibility: [
      "Reached Level 6",
      "Shipped at least two proof-of-skill projects",
      "Readiness score of 70 or above",
    ],
    art: "bank",
    ramp: "green",
  },
  {
    id: "o-2",
    title: "Junior Developer Placement",
    organisation: "Andela",
    sector: "Technology",
    kind: "placement",
    location: "Remote · Nigeria",
    closes: "Rolling",
    unlocksAt: 6,
    eligibility: [
      "Reached Level 6",
      "Completed the Skill Stacking pillar",
      "Portfolio reviewed by a mentor",
    ],
    art: "laptop",
    ramp: "navy",
  },
  {
    id: "o-3",
    title: "Health Communications Fellowship",
    organisation: "Nigeria Health Watch",
    sector: "Health",
    kind: "fellowship",
    location: "Abuja · On-site",
    closes: "Closes in 27 days",
    unlocksAt: 6,
    eligibility: [
      "Reached Level 6",
      "Completed a Social Impact sector deep-dive",
      "Two mentor recommendations",
    ],
    art: "stethoscope",
    ramp: "sky",
  },
];
