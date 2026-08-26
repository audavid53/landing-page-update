import type { Assessment } from "./types";

export const ASSESSMENTS: Assessment[] = [
  {
    id: "personality",
    title: "Personality Profile",
    tagline: "How you naturally work",
    why: "Knowing how you work best stops you chasing roles that will drain you. It takes about six minutes and you only answer with what feels true today.",
    minutes: 6,
    xp: 100,
    questionCount: 4,
    aiAssisted: false,
    questions: [
      {
        id: "p1",
        prompt: "After a long week, what restores you fastest?",
        options: ["Time alone", "Time with a few close friends", "A big social gathering", "Getting something finished"],
      },
      {
        id: "p2",
        prompt: "You are given a task with no instructions. What do you do first?",
        options: ["Ask exactly what is expected", "Start and adjust as you go", "Research how others did it", "Plan the whole thing on paper"],
      },
      {
        id: "p3",
        prompt: "Which feedback would sting the most?",
        options: ["\"You were disorganised\"", "\"You were unoriginal\"", "\"You were difficult to work with\"", "\"You were too slow\""],
      },
      {
        id: "p4",
        prompt: "In a group project you usually end up as the one who…",
        options: ["Keeps everyone on schedule", "Comes up with the idea", "Smooths over disagreements", "Does the detailed work"],
      },
    ],
    outcome: {
      headline: "Structured Collaborator",
      summary:
        "You do your best work when expectations are clear and you are building something with other people. You lose energy in ambiguous, purely solo work — which is worth knowing before you accept a role.",
      highlights: [
        { label: "Works best", value: "In small, clear teams" },
        { label: "Energy drain", value: "Undefined solo work" },
        { label: "Natural strength", value: "Follow-through" },
      ],
      nextActions: [
        { label: "Strengthen Social Skills & Networks", href: "/learning/social-skills" },
        { label: "Watch a session on team-based roles", href: "/mentorship" },
      ],
    },
  },
  {
    id: "career-readiness",
    title: "Career Readiness",
    tagline: "Your seven-pillar baseline",
    why: "This is the score your whole journey is measured against. Answer honestly — a low score now just means there is more room to show progress later.",
    minutes: 9,
    xp: 150,
    questionCount: 4,
    aiAssisted: false,
    questions: [
      {
        id: "r1",
        prompt: "Can you describe, in one sentence, the kind of work you want?",
        options: ["Yes, clearly", "Roughly", "Not really", "No idea yet"],
      },
      {
        id: "r2",
        prompt: "Do you know what entry roles in your target sector actually pay?",
        options: ["Yes, with numbers", "A rough range", "I have guessed", "No"],
      },
      {
        id: "r3",
        prompt: "How many professionals in your target sector have you spoken to?",
        options: ["Five or more", "Two to four", "One", "None"],
      },
      {
        id: "r4",
        prompt: "Do you have one piece of real work you could show an employer?",
        options: ["Yes, published", "Yes, unfinished", "Only coursework", "No"],
      },
    ],
    outcome: {
      headline: "Readiness score: 65%",
      summary:
        "You have direction but not yet enough evidence. Your Self-Knowledge and Adaptability pillars are strong; Social Skills & Networks is the one holding your score down.",
      highlights: [
        { label: "Strongest pillar", value: "Adaptability" },
        { label: "Priority pillar", value: "Social Skills" },
        { label: "Change", value: "First baseline" },
      ],
      nextActions: [
        { label: "See your seven pillars", href: "/learning" },
        { label: "Start the Social Skills lesson", href: "/learning/social-skills" },
      ],
    },
  },
  {
    id: "career-clarity",
    title: "Interest & Career Clarity",
    tagline: "Where you could thrive",
    why: "This one matches what you enjoy against how the 14 sectors actually work in Nigeria, so the suggestions are things you can genuinely pursue from here.",
    minutes: 11,
    xp: 180,
    questionCount: 4,
    aiAssisted: true,
    aiExplainer:
      "Your answers are compared against patterns from the 14 sector profiles in this programme to suggest directions worth exploring. It does not decide your career and nothing is shared with anyone else — you can retake it at any point.",
    questions: [
      {
        id: "c1",
        prompt: "Which problem would you most enjoy spending a year on?",
        options: [
          "Making a confusing service simple",
          "Getting goods to people faster",
          "Helping people learn something hard",
          "Making money work better for families",
        ],
      },
      {
        id: "c2",
        prompt: "What kind of result makes you feel proud?",
        options: ["Something people use daily", "A number that improved", "A person who changed", "A thing you can point at"],
      },
      {
        id: "c3",
        prompt: "Where would you rather spend most of your working day?",
        options: ["At a desk, thinking", "Moving between places", "In conversation with people", "Making or building something"],
      },
      {
        id: "c4",
        prompt: "Which trade-off would you accept for work you believe in?",
        options: ["Lower pay", "Longer hours", "Less stability", "None — pay comes first"],
      },
    ],
    outcome: {
      headline: "Three sectors worth exploring",
      summary:
        "Your answers lean toward work where you simplify something complicated for other people, with visible results. Financial services, health operations and education technology all fit that pattern and all hire graduates in Nigeria.",
      highlights: [
        { label: "Best fit", value: "Finance" },
        { label: "Also explore", value: "Health, EdTech" },
        { label: "Watch out for", value: "Pure solo research roles" },
      ],
      nextActions: [
        { label: "Watch Ifeoma on fintech hiring", href: "/mentorship/ifeoma-balogun" },
        { label: "Run a sector deep-dive", href: "/learning/curiosity" },
      ],
    },
  },
];

export const ASSESSMENT_BY_ID = Object.fromEntries(
  ASSESSMENTS.map((assessment) => [assessment.id, assessment]),
);
