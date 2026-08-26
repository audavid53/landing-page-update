import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Clock, Play, Video, Zap } from "lucide-react";
import { MENTORS, SECTORS } from "@/data/mentors";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";

export function MentorsShowcase() {
  const [selectedSector, setSelectedSector] = useState<string>("All");

  const filteredMentors =
    selectedSector === "All"
      ? MENTORS
      : MENTORS.filter((m) => m.sector.toLowerCase() === selectedSector.toLowerCase());

  return (
    <section id="sectors" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            <Video className="size-3.5" />
            14 Nigerian Industry Sectors
          </div>
          <h2 className="mt-3 text-title text-ink font-extrabold tracking-tight">
            Learn directly from those doing the work.
          </h2>
          <p className="mt-3 text-base text-muted leading-relaxed">
            No vague theory. Hear how professionals actually broke into Nigerian tech, fintech, healthcare, and agribusiness — what they were never told, and what they would skip today.
          </p>
        </div>

        <ButtonLink
          to="/mentorship"
          size="md"
          variant="secondary"
          className="self-start md:self-end"
        >
          Browse All 14 Sectors
          <ArrowRight className="size-4" />
        </ButtonLink>
      </div>

      {/* Sector filter chips */}
      <div className="mt-8 flex flex-wrap gap-2 items-center">
        <button
          type="button"
          onClick={() => setSelectedSector("All")}
          className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
            selectedSector === "All"
              ? "bg-brand-500 text-white shadow-xs"
              : "bg-surface text-ink-soft hover:bg-surface-sunk border border-line"
          }`}
        >
          All Sectors ({MENTORS.length})
        </button>
        {SECTORS.slice(0, 7).map((sector) => (
          <button
            type="button"
            key={sector}
            onClick={() => setSelectedSector(sector)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
              selectedSector === sector
                ? "bg-brand-500 text-white shadow-xs"
                : "bg-surface text-ink-soft hover:bg-surface-sunk border border-line"
            }`}
          >
            {sector}
          </button>
        ))}
      </div>

      {/* Mentor Cards Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredMentors.slice(0, 6).map((mentor) => (
            <motion.div
              layout
              key={mentor.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="h-full flex flex-col justify-between p-5 bg-surface border border-line hover:border-brand-300 hover:shadow-card transition-all duration-300 rounded-2xl group" padded>
                <div>
                  {/* Header info */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={mentor.name} size="md" ring />
                      <div className="min-w-0">
                        <h3 className="text-sm font-extrabold text-ink truncate group-hover:text-brand-600 transition-colors">
                          {mentor.name}
                        </h3>
                        <p className="text-xs text-muted truncate">
                          {mentor.role} · {mentor.company}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[0.6875rem] font-bold text-brand-700">
                      {mentor.sector}
                    </span>
                  </div>

                  {/* Session Title & Meta */}
                  <div className="mt-4 rounded-xl bg-surface-sunk p-3 border border-line/60">
                    <div className="flex items-center justify-between text-[0.6875rem] font-bold text-muted mb-1">
                      <span className="flex items-center gap-1 text-brand-600">
                        <Play className="size-3 fill-current" />
                        Video Session
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {mentor.duration}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-ink line-clamp-2">
                      “{mentor.sessionTitle}”
                    </p>
                  </div>

                  {/* Takeaways snippet */}
                  <div className="mt-4 space-y-2">
                    <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-muted">
                      Key Takeaway:
                    </p>
                    <p className="text-xs text-ink-soft line-clamp-2 italic">
                      “{mentor.takeaways[0]}”
                    </p>
                  </div>
                </div>

                {/* Footer action */}
                <div className="mt-5 pt-3 border-t border-line flex items-center justify-between">
                  <span className="text-xs font-bold text-xp flex items-center gap-1">
                    <Zap className="size-3.5 fill-current" />
                    +{mentor.xp} XP
                  </span>

                  <ButtonLink
                    to={`/mentorship/${mentor.id}`}
                    size="sm"
                    className="bg-brand-50 text-brand-700 hover:bg-brand-100 font-bold"
                  >
                    Watch Preview
                    <ArrowRight className="size-3" />
                  </ButtonLink>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
