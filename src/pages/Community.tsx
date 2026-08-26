import { useState } from "react";
import { Award, MessageCircle, Sparkles, Target, Trophy } from "lucide-react";
import { ChallengeBanner } from "@/components/gamification/ChallengeBanner";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/Progress";
import { TabPanel, Tabs } from "@/components/ui/Tabs";
import { tierFor } from "@/data/badges";
import { CHALLENGES, DREAM_TEAM, FEED, LEVEL_PEERS } from "@/data/programme";
import type { FeedItem } from "@/data/types";
import { useProgress } from "@/state/useProgress";
import { cn } from "@/lib/cn";

const KIND_ICON = {
  mission: Target,
  badge: Award,
  project: Sparkles,
  question: MessageCircle,
  challenge: Trophy,
} as const;

function ActivityRow({ item }: { item: FeedItem }) {
  const Icon = KIND_ICON[item.kind];

  return (
    <li className="flex items-start gap-3 rounded-card border border-line bg-surface p-4">
      <Avatar name={item.person} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="text-sm text-ink-soft">
          <span className="font-semibold text-ink">{item.person}</span> {item.action} {item.detail}
        </p>
        <p className="mt-1 flex flex-wrap items-center gap-1.5">
          <Pill tone="neutral" size="sm" icon={<Icon />}>
            {item.kind}
          </Pill>
          {item.xp ? (
            <Pill tone="xp" size="sm">
              +{item.xp} XP
            </Pill>
          ) : null}
          <span className="text-xs text-muted">{item.timeAgo}</span>
        </p>
      </div>
    </li>
  );
}

export default function Community() {
  const [tab, setTab] = useState("feed");
  const { xp, complete, hasCompleted } = useProgress();
  const tier = tierFor(xp);

  // Peers are shown with the learner's live XP so the comparison is honest.
  const peers = LEVEL_PEERS.map((peer) => (peer.you ? { ...peer, xp } : peer)).sort(
    (a, b) => b.xp - a.xp,
  );
  const leader = peers[0]!;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-title text-ink">Support & community</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Your cohort, your Dream Team and this week’s challenge. Everything here connects back to
          the missions and pillars you are already working on.
        </p>
      </header>

      <ChallengeBanner challenge={CHALLENGES[0]!} />

      <Tabs
        group="community"
        items={[
          { id: "feed", label: "Feed" },
          { id: "challenges", label: "Challenges", badge: CHALLENGES.length },
          { id: "level", label: "Your level" },
          { id: "team", label: "Dream Team" },
        ]}
        value={tab}
        onChange={setTab}
        label="Community sections"
      />

      <div>
        <TabPanel group="community" id="feed" value={tab}>
          <ul className="space-y-3">
            {FEED.map((item) => (
              <ActivityRow key={item.id} item={item} />
            ))}
          </ul>
        </TabPanel>

        <TabPanel group="community" id="challenges" value={tab}>
          <div className="space-y-4">
            {CHALLENGES.map((challenge) => {
              const key = `challenge:${challenge.id}`;
              const joined = hasCompleted(key);

              return (
                <Card key={challenge.id}>
                  <CardHeader
                    title={challenge.title}
                    description={challenge.description}
                    action={
                      <Pill tone="xp" icon={<Sparkles />}>
                        +{challenge.xp} XP
                      </Pill>
                    }
                  />
                  <ProgressBar
                    value={Math.round((challenge.progress / challenge.goal) * 100)}
                    label={`${challenge.title} cohort progress`}
                    showLabel
                    color="var(--color-brand-500)"
                  />
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {joined ? (
                      <Pill tone="success">You have joined — ends in {challenge.endsIn}</Pill>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() =>
                          complete({
                            key,
                            xp: challenge.xp,
                            label: `Joined: ${challenge.title}`,
                            effect: `You are one of ${challenge.participants + 1} learners taking part`,
                          })
                        }
                      >
                        Join challenge
                      </Button>
                    )}
                    <span className="text-sm text-muted">
                      {challenge.participants} taking part · ends in {challenge.endsIn}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabPanel>

        <TabPanel group="community" id="level" value={tab}>
          <Card>
            <CardHeader
              title={`Level ${tier.level} — ${tier.name}`}
              description="How you are moving compared with others at your level. Not a race — a reference point."
            />
            <ol className="space-y-2">
              {peers.map((peer, index) => (
                <li
                  key={peer.name}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5",
                    peer.you ? "bg-brand-50 ring-1 ring-brand-200" : "bg-canvas",
                  )}
                >
                  <span className="w-5 text-sm font-bold tabular-nums text-muted">{index + 1}</span>
                  <Avatar name={peer.name} size="xs" />
                  <span
                    className={cn(
                      "min-w-0 flex-1 truncate text-sm",
                      peer.you ? "font-bold text-brand-700" : "font-medium text-ink-soft",
                    )}
                  >
                    {peer.name}
                  </span>
                  <ProgressBar
                    className="hidden max-w-40 flex-1 sm:block"
                    size="sm"
                    value={Math.round((peer.xp / leader.xp) * 100)}
                    label={`${peer.name} xp`}
                    color={peer.you ? "var(--color-brand-500)" : "var(--color-line-strong)"}
                  />
                  <span className="text-sm font-bold tabular-nums text-ink">
                    {peer.xp.toLocaleString("en-NG")}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-muted">
              Everyone here is within the same badge tier, so the gap is always something you can
              close this week.
            </p>
          </Card>
        </TabPanel>

        <TabPanel group="community" id="team" value={tab}>
          <Card>
            <CardHeader
              title="Your Dream Team"
              description="Five learners who check in on each other every week."
              action={<AvatarGroup people={DREAM_TEAM} label="Dream Team members" max={5} />}
            />
            <ul className="space-y-2">
              {DREAM_TEAM.map((person) => (
                <li key={person.name} className="flex items-center gap-3 rounded-xl bg-canvas px-3 py-2.5">
                  <Avatar name={person.name} size="sm" />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink-soft">
                    {person.name}
                  </span>
                  <Pill tone="neutral" size="sm">
                    Week 2 on track
                  </Pill>
                </li>
              ))}
            </ul>
          </Card>
        </TabPanel>
      </div>
    </div>
  );
}
