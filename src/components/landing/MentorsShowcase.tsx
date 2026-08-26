import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Clock, Pause, Play, Video, Volume2, VolumeX, X, Zap } from "lucide-react";
import { MENTORS, SECTORS } from "@/data/mentors";
import type { Mentor } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function MentorsShowcase() {
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [activePreviewMentor, setActivePreviewMentor] = useState<Mentor | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredMentors =
    selectedSector === "All"
      ? MENTORS
      : MENTORS.filter((m) => m.sector.toLowerCase() === selectedSector.toLowerCase());

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const openPreview = (mentor: Mentor) => {
    setActivePreviewMentor(mentor);
    setIsPlaying(true);
  };

  return (
    <section id="sectors" className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-700 shadow-2xs">
            <Video className="size-3.5 text-brand-600" />
            14 Nigerian Industry Sectors
          </div>
          <h2 className="mt-3 text-display sm:text-title text-ink font-extrabold tracking-tight">
            Learn directly from those doing the work.
          </h2>
          <p className="mt-3 text-base text-muted leading-relaxed">
            No vague theory. Watch on-demand video sessions with working professionals across Nigerian fintech, software, health systems, agribusiness, and media.
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink shadow-xs hover:border-brand-300 hover:text-brand-600 active:scale-95 transition-all"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink shadow-xs hover:border-brand-300 hover:text-brand-600 active:scale-95 transition-all"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          <ButtonLink
            to="/mentorship"
            size="md"
            variant="secondary"
            className="font-bold hover:bg-surface-sunk"
          >
            <span>All 14 Sectors</span>
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </div>

      {/* Sector filter chips */}
      <div className="mt-8 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <button
          type="button"
          onClick={() => setSelectedSector("All")}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap border",
            selectedSector === "All"
              ? "bg-brand-500 text-white border-brand-500 shadow-xs"
              : "bg-surface text-ink-soft hover:bg-surface-sunk border-line",
          )}
        >
          All Sectors ({MENTORS.length})
        </button>
        {SECTORS.map((sector) => {
          const count = MENTORS.filter((m) => m.sector === sector).length;
          if (count === 0) return null;
          return (
            <button
              type="button"
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap border",
                selectedSector === sector
                  ? "bg-brand-500 text-white border-brand-500 shadow-xs"
                  : "bg-surface text-ink-soft hover:bg-surface-sunk border-line",
              )}
            >
              {sector}
            </button>
          );
        })}
      </div>

      {/* Single-Line Horizontal Video Carousel Reel */}
      <div
        ref={scrollContainerRef}
        className="mt-8 flex gap-5 overflow-x-auto no-scrollbar pb-4 pt-1 snap-x snap-mandatory scroll-smooth"
      >
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="w-[310px] sm:w-[360px] shrink-0 snap-start"
          >
            <Card
              className="h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface shadow-card hover:border-brand-300 hover:shadow-raised transition-all duration-300 group p-0"
            >
              <div>
                {/* High-Fidelity Video Preview Screen */}
                <div className="relative aspect-video w-full overflow-hidden bg-linear-to-br from-shell via-brand-950 to-brand-900 flex flex-col justify-between p-3.5 text-white">
                  {/* Decorative Video Glow Background */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,var(--color-brand-600),transparent_75%)] opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                  />

                  {/* Top Video Header: Sector Tag + Duration Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="rounded-full bg-black/50 backdrop-blur-md px-2.5 py-1 text-[0.6875rem] font-bold text-brand-200 border border-white/10">
                      {mentor.sector}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[0.6875rem] font-bold text-white border border-white/10">
                      <Clock className="size-3 text-amber-300" />
                      {mentor.duration}
                    </span>
                  </div>

                  {/* Center Action: Play Preview Overlay Button */}
                  <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                    <button
                      type="button"
                      onClick={() => openPreview(mentor)}
                      aria-label={`Play preview for ${mentor.name}`}
                      className="group/btn relative grid size-13 place-items-center rounded-full bg-brand-500 text-white shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 active:scale-95"
                    >
                      <span className="absolute inset-0 rounded-full bg-brand-400 animate-ping opacity-25" />
                      <Play className="size-6 fill-current translate-x-0.5" />
                    </button>
                    <span className="mt-2 text-[0.6875rem] font-bold text-white/90 drop-shadow-sm">
                      Watch Video Preview
                    </span>
                  </div>

                  {/* Bottom Video HUD: Animated Audio Waveform + Live HD Badge */}
                  <div className="relative z-10 flex items-center justify-between text-[0.625rem] font-mono text-white/80">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>1080p HD Video</span>
                    </div>
                    {/* Simulated Waveform bars */}
                    <div className="flex items-center gap-0.5">
                      <span className="h-2.5 w-0.5 rounded-full bg-brand-300 animate-pulse" />
                      <span className="h-4 w-0.5 rounded-full bg-brand-300 animate-pulse delay-75" />
                      <span className="h-2 w-0.5 rounded-full bg-brand-300 animate-pulse delay-150" />
                      <span className="h-3.5 w-0.5 rounded-full bg-brand-300 animate-pulse delay-100" />
                    </div>
                  </div>
                </div>

                {/* Session Details */}
                <div className="p-5">
                  {/* Mentor Info */}
                  <div className="flex items-center gap-3">
                    <Avatar name={mentor.name} size="md" ring />
                    <div className="min-w-0">
                      <h3 className="text-sm font-extrabold text-ink truncate group-hover:text-brand-600 transition-colors">
                        {mentor.name}
                      </h3>
                      <p className="text-xs text-muted truncate">
                        {mentor.role} · <span className="font-semibold text-ink-soft">{mentor.company}</span>
                      </p>
                    </div>
                  </div>

                  {/* Session Title */}
                  <div className="mt-3.5 rounded-2xl bg-surface-sunk p-3 border border-line/70">
                    <p className="text-xs font-black text-ink line-clamp-2 leading-snug">
                      “{mentor.sessionTitle}”
                    </p>
                  </div>

                  {/* Key Takeaway */}
                  <div className="mt-3.5 space-y-1">
                    <p className="text-[0.6875rem] font-extrabold uppercase tracking-wider text-muted">
                      Industry Insider Takeaway:
                    </p>
                    <p className="text-xs text-ink-soft line-clamp-2 italic leading-relaxed">
                      “{mentor.takeaways[0]}”
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-line flex items-center justify-between">
                <span className="text-xs font-extrabold text-xp flex items-center gap-1">
                  <Zap className="size-3.5 fill-current" />
                  +{mentor.xp} XP
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openPreview(mentor)}
                    className="rounded-full bg-brand-50 hover:bg-brand-100 px-3 py-1.5 text-xs font-bold text-brand-700 transition-colors flex items-center gap-1"
                  >
                    <Play className="size-3 fill-current" />
                    Preview
                  </button>
                  <ButtonLink
                    to={`/mentorship/${mentor.id}`}
                    size="sm"
                    className="bg-brand-500 hover:bg-brand-600 text-white font-bold"
                  >
                    <span>Full Session</span>
                    <ArrowRight className="size-3" />
                  </ButtonLink>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Interactive Video Playback Preview Modal */}
      <AnimatePresence>
        {activePreviewMentor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-shell text-white shadow-2xl border border-shell-line"
            >
              {/* Modal Video Header */}
              <div className="flex items-center justify-between border-b border-shell-line px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-red-500 animate-ping" />
                  <div>
                    <h3 className="text-sm font-black text-white">{activePreviewMentor.sessionTitle}</h3>
                    <p className="text-xs text-shell-muted">
                      {activePreviewMentor.name} · {activePreviewMentor.role} at {activePreviewMentor.company}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActivePreviewMentor(null)}
                  aria-label="Close video preview"
                  className="grid size-8 place-items-center rounded-full border border-shell-line text-shell-muted hover:text-white hover:bg-shell-raised transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Video Player Display */}
              <div className="relative aspect-video w-full bg-linear-to-br from-black via-brand-950 to-shell flex flex-col justify-between p-6">
                {/* Radiant Backdrop */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-brand-600),transparent_70%)] opacity-30"
                />

                {/* Top Overlay Badge */}
                <div className="relative z-10 flex items-center justify-between text-xs">
                  <span className="rounded-full bg-brand-500/30 px-3 py-1 font-bold text-brand-300 border border-brand-400/30 backdrop-blur-sm">
                    {activePreviewMentor.sector} Masterclass Preview
                  </span>
                  <span className="rounded-full bg-black/60 px-3 py-1 font-mono text-white/80 border border-white/10">
                    {activePreviewMentor.duration} Full Runtime
                  </span>
                </div>

                {/* Center Speaker Graphic & Waveform */}
                <div className="relative z-10 my-auto text-center">
                  <div className="mx-auto grid size-20 place-items-center rounded-3xl bg-brand-500/20 border border-brand-400/40 shadow-inner">
                    <Avatar name={activePreviewMentor.name} size="lg" />
                  </div>
                  <h4 className="mt-3 text-lg font-black text-white">{activePreviewMentor.name}</h4>
                  <p className="text-xs text-brand-300 font-semibold">{activePreviewMentor.bio}</p>

                  {/* Subtitle / Key Quote Highlight */}
                  <div className="mx-auto mt-4 max-w-lg rounded-2xl bg-black/60 backdrop-blur-md p-3.5 border border-white/10 text-xs sm:text-sm italic text-white/90">
                    “{activePreviewMentor.takeaways[0]}”
                  </div>
                </div>

                {/* Player Controls Bar */}
                <div className="relative z-10 space-y-2">
                  {/* Scrubber Progress Bar */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                    <motion.div
                      initial={{ width: "15%" }}
                      animate={{ width: isPlaying ? "65%" : "15%" }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="h-full bg-brand-400 rounded-full"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-shell-muted">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="grid size-8 place-items-center rounded-full bg-white text-ink hover:bg-brand-50 transition-colors"
                      >
                        {isPlaying ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-shell-muted hover:text-white"
                      >
                        {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                      </button>
                      <span className="font-mono text-[0.6875rem]">04:12 / {activePreviewMentor.duration}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-xp-soft/20 px-2.5 py-0.5 text-xs font-bold text-amber-300">
                        +{activePreviewMentor.xp} XP Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer with Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-shell-line bg-shell-raised px-6 py-4">
                <div className="flex items-center gap-2 text-xs text-shell-muted">
                  <CheckCircle2 className="size-4 text-emerald-400" />
                  <span>Includes {activePreviewMentor.quiz.length}-Question Checkpoint Quiz</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <ButtonLink
                    to={`/mentorship/${activePreviewMentor.id}`}
                    size="md"
                    className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-white font-bold"
                    onClick={() => setActivePreviewMentor(null)}
                  >
                    <span>Open Full Session & Take Quiz</span>
                    <ArrowRight className="size-4" />
                  </ButtonLink>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
