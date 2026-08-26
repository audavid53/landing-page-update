import { BookOpen, CheckCircle2, Route, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Art3D } from "@/components/art/Art3D";
import { MissionCard } from "@/components/gamification/MissionCard";
import { BlockCard, CircleArrow, StatTile } from "@/components/ui/Block";
import { NudgeRow } from "@/components/ui/NudgeRow";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/Progress";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { nextTierFor, tierFor, xpToNextTier } from "@/data/badges";
import { PILLARS, priorityPillar, readinessScore } from "@/data/pillars";
import {
  CURRENT_LEVEL,
  DREAM_TEAM,
  LEVELS,
  MISSIONS,
} from "@/data/programme";
import { useProgress } from "@/state/useProgress";

const LEARNER_FIRST_NAME = "Mary";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/**
 * The reference-style home.
 *
 * Blueprint section 6 asks the dashboard to answer "where am I / what is next /
 * what am I working toward". Rather than making the whole screen a roadmap, the
 * roadmap gets one hero card that opens the full trail at /journey — so the
 * stat tiles, the next mission and the streak nudges all stay above the fold on
 * a phone.
 */
export default function Dashboard() {
  const { xp, hasCompleted } = useProgress();
  const tier = tierFor(xp);
  const next = nextTierFor(xp);

  const currentLevel = LEVELS.find((l) => l.level === CURRENT_LEVEL) ?? LEVELS[0]!;
  const nextLevel = LEVELS.find((l) => l.level === CURRENT_LEVEL + 1);

  const nextMission =
    MISSIONS.find((m) => m.level <= CURRENT_LEVEL && !hasCompleted(`mission:${m.id}`)) ??
    MISSIONS[0]!;
  const laterMissions = MISSIONS.filter((m) => m.id !== nextMission.id).slice(0, 2);

  const completedLessons = PILLARS.flatMap((p) => p.lessons).filter((l) =>
    hasCompleted(`lesson:${l.id}`),
  ).length;
  const totalLessons = PILLARS.flatMap((p) => p.lessons).length;

  const priority = priorityPillar();
  const score = readinessScore();

  /* Progress toward the next level, which is what the header bar reports. */
  const levelFloor = currentLevel.xpRequired;
  const levelCeiling = nextLevel?.xpRequired ?? levelFloor + 1;
  const levelPct = Math.min(
    100,
    Math.round(((xp - levelFloor) / (levelCeiling - levelFloor)) * 100),
  );

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-semibold text-muted">
          {greeting()}, {LEARNER_FIRST_NAME} 👋
        </p>
        <h1 className="mt-1 text-title text-ink">Level {currentLevel.level}: {currentLevel.title}</h1>
      </header>

      {/* 1 — The promo block, carrying the product's own voice. -------------- */}
      <BlockCard
        to="/journey"
        ramp="violet"
        title="Keep learning, keep growing"
        description="You are on Level 3 of 6. Two more missions and the Skill Stacking level opens up."
        art="rocket"
        artSize="2xl"
      >
        <div className="max-w-xs">
          <ProgressBar
            value={levelPct}
            label={`Progress to Level ${nextLevel?.level ?? currentLevel.level}`}
            tone="onDark"
          />
        </div>
      </BlockCard>

      {/* 2 — The two figures that answer "what have I done". ----------------- */}
      <div className="grid grid-cols-2 gap-4">
        <StatTile
          icon={BookOpen}
          ramp="violet"
          value={totalLessons}
          label="Lessons"
        />
        <StatTile
          icon={CheckCircle2}
          ramp="sky"
          value={completedLessons}
          label="Completed"
        />
      </div>

      {/* 3 — Where the learner is on the six-level journey. ------------------ */}
      <section aria-labelledby="journey-heading">
        <SectionHeader
          id="journey-heading"
          title="Your career journey"
          description="Six levels. The last one opens real opportunities."
          action={
            <Link
              to="/journey"
              className="text-sm font-bold text-brand-700 hover:text-brand-800"
            >
              See the map
            </Link>
          }
        />

        <Link
          to="/journey"
          data-ramp={currentLevel.ramp}
          className="ramp-block group relative flex items-center gap-4 overflow-hidden rounded-block p-5 transition-transform duration-200 ease-out hover:-translate-y-0.5"
        >
          <Art3D name={currentLevel.art} size="xl" className="drop-shadow-lg" />
          <div className="min-w-0 flex-1">
            <Pill size="sm" tone="dark">
              Level {currentLevel.level} of 6
            </Pill>
            <h3 className="mt-2 text-lg leading-tight font-extrabold text-white">
              {currentLevel.title}
            </h3>
            <p className="mt-1 text-sm on-block-muted">
              {nextLevel
                ? `Next: ${nextLevel.title} — unlocks ${nextLevel.perk.toLowerCase()}.`
                : "You have reached the Treasure Chest."}
            </p>
          </div>
          <CircleArrow />
        </Link>
      </section>

      {/* 4 — The single most useful thing to do next. ------------------------ */}
      <section aria-labelledby="next-heading">
        <SectionHeader
          id="next-heading"
          title="Do this next"
          description="One action, chosen from where you are and which pillar needs the most work."
        />
        <MissionCard mission={nextMission} featured peers={DREAM_TEAM} />
      </section>

      {/* 5 — Encouragement, kept quiet so it never competes with the mission. */}
      <div className="grid gap-3 sm:grid-cols-2">
        <NudgeRow
          to="/profile#badges"
          art="trophy"
          ramp="amber"
          title="Keep it up!"
          detail={
            next
              ? `${xpToNextTier(xp).toLocaleString("en-NG")} XP to ${next.name}`
              : `${tier.name} — the top tier`
          }
        />
        <NudgeRow
          to="/community"
          art="fire"
          ramp="sky"
          title="7 day streak"
          detail="Your cohort is 34 messages in today"
        />
      </div>

      {/* 6 — Readiness, and the pillar to spend effort on. ------------------- */}
      <section aria-labelledby="readiness-heading">
        <SectionHeader
          id="readiness-heading"
          title="Career readiness"
          description="Across the seven pillars, re-scored each time you finish something."
          action={
            <Link to="/stats" className="text-sm font-bold text-brand-700 hover:text-brand-800">
              Full statistics
            </Link>
          }
        />
        <div className="rounded-block border border-line bg-surface p-5 shadow-card">
          <div className="flex items-center gap-4">
            <Art3D name="chart-up" size="lg" />
            <div className="min-w-0 flex-1">
              <p className="text-3xl leading-none font-extrabold tracking-tight text-ink">
                {score}
                <span className="text-base font-bold text-muted">/100</span>
              </p>
              <p className="mt-1 text-sm text-muted">
                Weakest right now: <span className="font-semibold text-ink">{priority.name}</span>
              </p>
            </div>
            <Pill tone="xp" icon={<Zap />}>
              {xp.toLocaleString("en-NG")} XP
            </Pill>
          </div>

          <ul className="mt-5 space-y-3">
            {PILLARS.slice(0, 4).map((pillar) => (
              <li key={pillar.id} className="flex items-center gap-3">
                <Art3D name={pillar.art} size="sm" />
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-3">
                  <span className="block text-sm font-semibold text-ink sm:w-40 sm:shrink-0">
                    {pillar.shortName}
                  </span>
                  <ProgressBar
                    value={pillar.score}
                    label={`${pillar.name} readiness`}
                    className="mt-1.5 sm:mt-0 sm:flex-1"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7 — What is coming, so the roadmap is not a surprise. --------------- */}
      <section aria-labelledby="later-heading">
        <SectionHeader
          id="later-heading"
          title="Coming up"
          description="Missions waiting at the levels ahead."
          action={
            <Link to="/journey" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
              <Route className="size-4" aria-hidden="true" />
              Journey
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {laterMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              locked={mission.level > CURRENT_LEVEL}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
