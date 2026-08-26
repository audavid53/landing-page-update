import { useMemo, useState } from "react";
import { Check, Clock, Play, Video, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/Feedback";
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
    <div className="space-y-8 max-w-6xl mx-auto">
      <header>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 mb-2">
          <Video className="size-3.5 text-brand-600" />
          Industry Video Masterclasses
        </div>
        <h1 className="text-display sm:text-title text-ink font-extrabold tracking-tight">
          Mentorship & Industry Insight
        </h1>
        <p className="mt-2 max-w-2xl text-muted text-sm sm:text-base leading-relaxed">
          Real video breakdowns with working professionals across 14 Nigerian sectors. Watch the masterclass, review actionable takeaways, complete the checkpoint quiz, and ask questions directly.
        </p>
      </header>

      {/* Sector Filters */}
      <section aria-labelledby="sector-filter">
        <h2 id="sector-filter" className="sr-only">
          Filter sessions by sector
        </h2>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {available.map((item) => {
            const active = item === sector;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => setSector(item)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap border",
                  active
                    ? "bg-brand-500 text-white border-brand-500 shadow-xs"
                    : "bg-surface text-muted border-line hover:text-ink hover:bg-surface-sunk",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>

      {/* Video Sessions Grid */}
      <section aria-labelledby="sessions">
        <SectionHeader
          id="sessions"
          title={sector === "All" ? "All Video Sessions" : `${sector} Sessions`}
          description={`${visible.length} on-demand video session${visible.length === 1 ? "" : "s"} available`}
        />

        {visible.length === 0 ? (
          <EmptyState
            title="No sessions in this sector yet"
            description="We are recording more every week. Try another sector in the meantime."
          />
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((mentor) => {
              const watched = mentor.watched || hasCompleted(`session:${mentor.id}`);

              return (
                <li key={mentor.id}>
                  <Link
                    to={`/mentorship/${mentor.id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-raised hover:border-brand-300"
                  >
                    {/* Video Player Thumbnail Screen */}
                    <div className="relative aspect-video w-full overflow-hidden bg-linear-to-br from-shell via-brand-950 to-brand-900 flex flex-col justify-between p-3.5 text-white">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,var(--color-brand-600),transparent_75%)] opacity-40 group-hover:opacity-75 transition-opacity duration-300"
                      />

                      {/* Header overlay */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="rounded-full bg-black/50 backdrop-blur-md px-2.5 py-1 text-[0.6875rem] font-bold text-brand-200 border border-white/10">
                          {mentor.sector}
                        </span>
                        <span className="flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[0.6875rem] font-bold text-white border border-white/10">
                          <Clock className="size-3 text-amber-300" />
                          {mentor.duration}
                        </span>
                      </div>

                      {/* Play Button */}
                      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                        <div className="grid size-12 place-items-center rounded-full bg-brand-500 text-white shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                          <Play className="size-5 fill-current translate-x-0.5" />
                        </div>
                      </div>

                      {/* Bottom HUD */}
                      <div className="relative z-10 flex items-center justify-between text-[0.625rem] font-mono text-white/80">
                        <span>1080p HD Video</span>
                        <div className="flex items-center gap-0.5">
                          <span className="h-2 w-0.5 rounded-full bg-brand-300 animate-pulse" />
                          <span className="h-3.5 w-0.5 rounded-full bg-brand-300 animate-pulse delay-75" />
                          <span className="h-2 w-0.5 rounded-full bg-brand-300 animate-pulse delay-150" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <h3 className="text-base font-extrabold text-ink group-hover:text-brand-600 transition-colors line-clamp-2">
                          {mentor.sessionTitle}
                        </h3>

                        <div className="mt-3.5 flex items-center gap-3">
                          <Avatar name={mentor.name} size="sm" />
                          <div className="min-w-0">
                            <p className="truncate text-xs font-bold text-ink">{mentor.name}</p>
                            <p className="truncate text-[0.6875rem] text-muted">
                              {mentor.role} · {mentor.company}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 rounded-xl bg-surface-sunk p-2.5 border border-line/60">
                          <p className="text-[0.6875rem] text-ink-soft line-clamp-2 italic">
                            “{mentor.takeaways[0]}”
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-xp">
                            <Zap className="size-3.5 fill-current" />
                            +{mentor.xp} XP
                          </span>
                          {watched ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[0.6875rem] font-bold text-emerald-700">
                              <Check className="size-3" />
                              Watched
                            </span>
                          ) : null}
                        </div>

                        <span className="text-xs font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                          Watch
                          <Play className="size-2.5 fill-current" />
                        </span>
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
