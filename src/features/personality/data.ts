export type PersonalityLeader = {
  name: string;
  title: string;
  image: string;
  quote: string;
};

export type CareerPersonality = {
  id: string;
  name: string;
  tagline: string;
  superpower: string;
  blindspot: string;
  description: string;
  careers: string[];
  gradient: string;
  color: string;
  badge: string;
  iconName: string;
  leader: PersonalityLeader;
  whyItMatters: string;
  statusPunchline: string;
};

export type QuizQuestion = {
  id: number;
  question: string;
  subtext?: string;
  options: { text: string; personalityWeights: Record<string, number> }[];
};

export const PERSONALITIES: { [id: string]: CareerPersonality } = {
  main_character: {
    id: "main_character",
    name: "Main Character",
    tagline: "The Visionary Leader",
    superpower: "Commanding presence, high visibility, and inspiring vision.",
    blindspot: "Can overshadow talented peers and struggle with deep tactical execution.",
    description: "You thrive when you are at the helm, charting the course and rallying others. You aren't afraid of the spotlight—in fact, you perform best under its warm glow. You value autonomy, influence, and high-impact decisions.",
    careers: ["Startup Founder", "Corporate Executive", "Product Management Director", "Public Speaker / Advocate"],
    gradient: "from-amber-500 to-rose-600",
    color: "#e11d48",
    badge: "Vision & Impact",
    iconName: "Sparkles",
    leader: {
      name: "Tony O. Elumelu, CFR",
      title: "Chairman, Heirs Holdings & Founder, TEF",
      image: "/images/expert_tony_1782720367131.jpg",
      quote: "Understanding your innate wiring unlocks the confidence to command rooms, scale empires, and champion youth empowerment across Africa."
    },
    whyItMatters: "In a high-velocity economy, people don't follow hesitation—they follow vision. As a Main Character, you bridge ambition with market movement, turning bold ideas into scalable institutions.",
    statusPunchline: "Wired to command rooms, rally teams, and turn ambitious visions into institutions."
  },
  sweet_mouth: {
    id: "sweet_mouth",
    name: "Sweet Mouth",
    tagline: "The Master Storyteller",
    superpower: "Hypnotic persuasion, instant empathy, and unlocking trust.",
    blindspot: "Might over-promise to secure the yes; easily bored by admin chores.",
    description: "You have the rare gift of words. Whether you are pitching a client, smoothing over a project crisis, or selling a grand vision, people listen—and they agree. You understand human emotions and naturally bridge gaps between minds.",
    careers: ["Tech Sales Executive", "Public Relations Lead", "Business Development Director", "Brand Evangelist"],
    gradient: "from-emerald-400 to-teal-600",
    color: "#0d9488",
    badge: "Influence & Trust",
    iconName: "Megaphone",
    leader: {
      name: "Ebuka Obi-Uchendu",
      title: "Media Personality, Lawyer & Host",
      image: "/images/expert_ebuka_1782720291600.jpg",
      quote: "Words create worlds. Persuasion is the bridge between brilliant work and people actually buying into it."
    },
    whyItMatters: "Every breakthrough product, deal, or campaign dies without translation. Your gift of narrative creates alignment where logic alone hits walls.",
    statusPunchline: "The master storyteller. Transforming raw ideas into compelling narratives that unlock trust."
  },
  creative_director: {
    id: "creative_director",
    name: "Creative Director",
    tagline: "The Aesthetic Architect",
    superpower: "Seeing unique connections and crafting beautiful systems from scratch.",
    blindspot: "Struggles inside overly rigid corporate grids; prone to creative burnout.",
    description: "You are wired to build and design. For you, function is nothing without elegant form. You see patterns, aesthetics, and hidden emotional currents where others see plain bullet points. You bring the soul to the machinery of business.",
    careers: ["UX/UI Design Lead", "Brand Strategist", "Creative Director", "Product Concept Designer"],
    gradient: "from-violet-500 to-purple-700",
    color: "#7c3aed",
    badge: "Design & Innovation",
    iconName: "Palette",
    leader: {
      name: "Mai Atafo",
      title: "Founder & Creative Director, ATAFO",
      image: "/images/expert_mai_1782720340168.jpg",
      quote: "Craft is non-negotiable. When you pour intentional design into culture, the world respects your standard."
    },
    whyItMatters: "Commodities compete on price; creative systems compete on desire. You give brands, interfaces, and experiences an unmistakable soul that commands premium value.",
    statusPunchline: "Bringing the soul to the machinery of business through intentional design and aesthetics."
  },
  big_brain: {
    id: "big_brain",
    name: "Big Brain",
    tagline: "The Analytical Genius",
    superpower: "Surgical problem-solving and finding order in massive datasets.",
    blindspot: "Analysis paralysis; can overcomplicate things that require fast, intuitive action.",
    description: "You make decisions based on data, logic, and first principles. Where others speculate, you research. You possess a rare cognitive endurance, capable of parsing complex problems, finding deep optimization paths, and structuring logic.",
    careers: ["Data Scientist", "Quantitative Analyst", "Management Consultant", "Systems Architect"],
    gradient: "from-blue-500 to-indigo-700",
    color: "#2563eb",
    badge: "Logic & Analysis",
    iconName: "BrainCircuit",
    leader: {
      name: "Dr. Ngozi Okonjo-Iweala",
      title: "Director-General, World Trade Organization",
      image: "/images/expert_ngozi_1782720353213.jpg",
      quote: "Hard facts and rigorous economic logic cut through noise. Precision is the strongest negotiating table power."
    },
    whyItMatters: "In uncertain markets, speculation is expensive. Your ability to extract clarity from chaos and model outcomes protects millions of dollars and builds resilient structures.",
    statusPunchline: "Extracting clarity from data and modeling decisions with surgical, first-principles logic."
  },
  the_plug: {
    id: "the_plug",
    name: "The Plug",
    tagline: "The Ecosystem Connector",
    superpower: "Unlocking gatekeepers and weaving vast, high-trust networks.",
    blindspot: "Can spread yourself too thin; sometimes values social status over technical depth.",
    description: "You don't just know people; you know the *right* people. You see professional ecosystems as beautiful interconnected webs. You love making introductions that result in magic, and your reputation is your primary currency.",
    careers: ["VP of Partnerships", "Venture Capital Scout", "Community Director", "Client Relations Partner"],
    gradient: "from-pink-500 to-rose-500",
    color: "#db2777",
    badge: "Social Capital",
    iconName: "Share2",
    leader: {
      name: "Tunde Onakoya",
      title: "Founder, Chess in Slums & World Record Holder",
      image: "/images/expert_tunde_1782720306726.jpg",
      quote: "Social capital is a catalyst. Connecting the right hands can pull brilliance out of the deepest corners."
    },
    whyItMatters: "Merit alone gets overlooked. Opportunities flow through human relationships. You are the catalyst who turns isolated talent into unstoppable coalitions.",
    statusPunchline: "The high-trust ecosystem connector. Weaving networks that unlock impossible doors."
  },
  correct_guy: {
    id: "correct_guy",
    name: "Correct Guy",
    tagline: "The Execution Anchor",
    superpower: "Absolute reliability, steady execution under fire, and team trust.",
    blindspot: "Hesitant to take high-stakes risks; may default to 'the way it's always been done.'",
    description: "You are the heartbeat of the operation. While others are busy pitching or brainstorming, you are on the ground getting things done. You value craftsmanship, consistency, and honor in execution. Everyone trusts you with their life.",
    careers: ["Operations Manager", "Chief of Staff", "Senior Project Lead", "Client Success Architect"],
    gradient: "from-sky-400 to-blue-600",
    color: "#0284c7",
    badge: "Flawless Execution",
    iconName: "ShieldCheck",
    leader: {
      name: "Gbenga Agboola",
      title: "CEO & Co-Founder, Flutterwave",
      image: "/images/expert_gbenga_1782720253488.jpg",
      quote: "Infrastructure is built by showing up and delivering daily. Reliability is the ultimate unfair advantage."
    },
    whyItMatters: "Ideas are cheap; flawless delivery under pressure is gold. Teams and markets place enormous premiums on people who execute consistently without drop-off.",
    statusPunchline: "The execution anchor. High trust, absolute reliability, and delivering results under pressure."
  },
  mr_organized: {
    id: "mr_organized",
    name: "Mr./Ms. Organized",
    tagline: "The System Architect",
    superpower: "Designing bulletproof processes that turn chaos into compound growth.",
    blindspot: "Can get highly frustrated by rapid, uncalculated pivots or operational untidiness.",
    description: "You look at messy workflows and feel a burning desire to tidy them. You love checklist templates, CRM pipelines, calendar integrations, and database schemas. You build systems that run smoothly even while everyone is asleep.",
    careers: ["Operations Architect", "Logistics & Supply Director", "Database Engineer", "Legal & Compliance Lead"],
    gradient: "from-orange-500 to-amber-600",
    color: "#d97706",
    badge: "Process & Scale",
    iconName: "Workflow",
    leader: {
      name: "Dr. Ola Brown",
      title: "Founder, Flying Doctors Healthcare Investment Group",
      image: "/images/expert_ola_1782720274767.jpg",
      quote: "Chaos doesn't scale. Repeatable workflows and clean systems build generational wealth."
    },
    whyItMatters: "Without systems, growth becomes exhausting and fragile. You build the rails that allow companies to scale from 10 customers to 10 million without breaking.",
    statusPunchline: "Building bulletproof operational systems that turn chaos into compounding growth."
  },
  merlin: {
    id: "merlin",
    name: "Merlin",
    tagline: "The Strategic Sage",
    superpower: "Quiet wisdom, specialized expertise, and guiding from the shadows.",
    blindspot: "Hesitant to promote your own visibility; can be perceived as distant or unapproachable.",
    description: "You are a master of craft. You don't care about noisy title hierarchies or corporate buzzwords. You care about deep knowledge. You sit in quiet rooms, map out long-term strategic moves, and provide council to decision-makers.",
    careers: ["Principal Consultant", "Technical Advisor", "Specialized Subject Expert", "Lead Policy Researcher"],
    gradient: "from-slate-700 to-slate-900",
    color: "#334155",
    badge: "Expert Council",
    iconName: "Wizard",
    leader: {
      name: "Prof. Kingsley Moghalu",
      title: "Political Economist & Former CBN Deputy Governor",
      image: "/images/expert_moghalu_1782720326176.jpg",
      quote: "Deep strategic insight outlasts hype. True leadership is seeing the horizon before others see the dawn."
    },
    whyItMatters: "Noisy rooms need quiet sages. When founders, ministers, and CEOs face complex cross-currents, your deep domain wisdom provides the anchor that prevents catastrophic errors.",
    statusPunchline: "The strategic sage. Mapping long-term moves with deep craft and master council."
  }
};

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "You wake up to a chaotic, high-stakes project emergency. What is your first instinct?",
    subtext: "Choose the action that feels most natural to you, not just what you think is 'right'.",
    options: [
      {
        text: "Gather the team immediately, boost morale, and direct the recovery plan.",
        personalityWeights: { main_character: 3, correct_guy: 1 }
      },
      {
        text: "Call the stakeholders, explain the context smoothly, and buy the team breathing room.",
        personalityWeights: { sweet_mouth: 3, the_plug: 1 }
      },
      {
        text: "Dive straight into the logs and data points to find the precise root cause.",
        personalityWeights: { big_brain: 3, merlin: 1 }
      },
      {
        text: "Coordinate with an external expert or contact in your network who can fix it fast.",
        personalityWeights: { the_plug: 3, mr_organized: 1 }
      }
    ]
  },
  {
    id: 2,
    question: "Where do you feel your cognitive energy truly peaking?",
    subtext: "Think about the work that leaves you feeling energized rather than drained.",
    options: [
      {
        text: "Designing a beautiful, aesthetic visual system, deck, or product flow.",
        personalityWeights: { creative_director: 3, sweet_mouth: 1 }
      },
      {
        text: "Mapping out a flawless, step-by-step checklist to streamline a messy operation.",
        personalityWeights: { mr_organized: 3, correct_guy: 1 }
      },
      {
        text: "Spending uninterrupted quiet hours coding, writing, or researching a complex domain.",
        personalityWeights: { merlin: 3, big_brain: 1 }
      },
      {
        text: "Collaborating side-by-side with your team to solve tangible problems in real time.",
        personalityWeights: { correct_guy: 3, main_character: 1 }
      }
    ]
  },
  {
    id: 3,
    question: "You are pitching an ambitious initiative to secure a budget. What is your weapon of choice?",
    options: [
      {
        text: "A compelling, emotional story about the human impact that holds the room spellbound.",
        personalityWeights: { sweet_mouth: 3, creative_director: 1 }
      },
      {
        text: "A flawless, data-backed 30-page financial projection and market analysis.",
        personalityWeights: { big_brain: 3, mr_organized: 1 }
      },
      {
        text: "An inspiring, bold claim about how this secures absolute industry leadership.",
        personalityWeights: { main_character: 3, the_plug: 1 }
      },
      {
        text: "An elegant, interactive high-fidelity mockup that speaks for itself.",
        personalityWeights: { creative_director: 3, merlin: 1 }
      }
    ]
  },
  {
    id: 4,
    question: "Which of these professional compliments would make you proudest?",
    options: [
      {
        text: "\"We couldn't have pulled off this massive execution with such high quality without you.\"",
        personalityWeights: { correct_guy: 3, mr_organized: 1 }
      },
      {
        text: "\"Your network is unbelievable. You literally unlocked a partnership no one else could.\"",
        personalityWeights: { the_plug: 3, sweet_mouth: 1 }
      },
      {
        text: "\"Your foresight is incredible. Your guidance saved us from months of wasted effort.\"",
        personalityWeights: { merlin: 3, big_brain: 1 }
      },
      {
        text: "\"This pipeline is flawless. You turned absolute chaos into clockwork automation.\"",
        personalityWeights: { mr_organized: 3, big_brain: 1 }
      }
    ]
  },
  {
    id: 5,
    question: "What is your deepest professional fear regarding your future career?",
    options: [
      {
        text: "Being trapped in a rigid, repetitive, sterile corporate grid that kills creative expression.",
        personalityWeights: { creative_director: 3, merlin: 1 }
      },
      {
        text: "Pouring years of hard execution into a project that makes zero public splash or impact.",
        personalityWeights: { main_character: 3, sweet_mouth: 1 }
      },
      {
        text: "Operating in a chaotic, unpredictable setup without structured growth, systems, or clear rules.",
        personalityWeights: { mr_organized: 3, correct_guy: 1 }
      },
      {
        text: "Knowing you have deep, unique genius inside you, but never finding the courage to step out.",
        personalityWeights: { merlin: 3, creative_director: 1 }
      }
    ]
  }
];

