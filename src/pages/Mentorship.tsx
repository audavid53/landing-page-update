import { useMemo, useState } from "react";
import { Check, Clock, PlayCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/Feedback";
import { Pill } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MENTORS, SECTORS } from "@/data/mentors";
import { useProgress } from "@/state/useProgress";
import { cn } from "@/lib/cn";

export default function Mentorship() {
  const [sector, setSector] = useState<string>("All");
  const { hasCompleted } = useProgress();

  // Only offer filters that would actually return a session.
  const available = useMemo(() => {
    const withSessions = new Set(MENTORS.map((mentor) => mentor.sector));
    return ["All", ...SECTORS.filter((item) => withSessions.has(item))];
  }, []);

  const visible = sector === "All" ? MENTORS : MENTORS.filter((mentor) => mentor.sector === sector);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-title text-ink">Mentorship & industry insight</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Sessions with professionals working across 14 Nigerian sectors. Watch, take the short
          quiz, and ask them a question directly.
        </p>
      </header>

      <section aria-labelledby="sector-filter">
        <h2 id="sector-filter" className="sr-only">
          Filter sessions by sector
        </h2>
        <ul className="flex flex-wrap gap-2">
          {available.map((item) => {
            const active = item === sector;
            return (
              <li key={item}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSector(item)}
                  className={cn(
                    "rounded-pill px-4 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "bg-brand-500 text-white"
                      : "bg-surface text-muted ring-1 ring-line hover:text-ink",
                  )}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="sessions">
        <SectionHeader
          id="sessions"
          title={sector === "All" ? "All sessions" : `${sector} sessions`}
          description={`${visible.length} session${visible.length === 1 ? "" : "s"} available`}
        />

        {visible.length === 0 ? (
          <EmptyState
            title="No sessions in this sector yet"
            description="We are recording more every week. Try another sector in the meantime."
          />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {visible.map((mentor) => {
              const watched = mentor.watched || hasCompleted(`session:${mentor.id}`);

              return (
                <li key={mentor.id}>
                  <Link
                    to={`/mentorship/${mentor.id}`}
                    className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-raised"
                  >
                    {/* Video thumbnail stand-in — the video stays dominant. */}
                    <div className="relative grid aspect-video place-items-center bg-linear-to-br from-brand-600 to-brand-800">
                      <PlayCircle aria-hidden="true" className="size-14 text-white/90" />
                      <span className="absolute top-3 left-3">
                        <Pill tone="dark" className="bg-black/40 text-white">
                          {mentor.sector}
                        </Pill>
                      </span>
                      <span className="absolute right-3 bottom-3">
                        <Pill tone="dark" className="bg-black/50 text-white" icon={<Clock />}>
                          {mentor.duration}
                        </Pill>
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-base font-bold text-ink">{mentor.sessionTitle}</h3>
                      <div className="mt-3 flex items-center gap-3">
                        <Avatar name={mentor.name} size="sm" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-ink">{mentor.name}</p>
                          <p className="truncate text-xs text-muted">
                            {mentor.role}, {mentor.company}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <Pill tone="xp" size="sm" icon={<Sparkles />}>
                          +{mentor.xp} XP
                        </Pill>
                        {watched ? (
                          <Pill tone="success" size="sm" icon={<Check />}>
                            Watched
                          </Pill>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
