import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChartNoAxesCombined,
  ChevronRight,
  Footprints,
  Lightbulb,
  Sparkles,
  UsersRound,
} from "lucide-react";

const beliefs = [
  {
    stepNumber: "01",
    statBadge: "14 Sectors",
    title: "Grounded in real data",
    subtitle: "Live Nigerian hiring trends & salary ranges",
    text: "We pull live hiring trends, salary ranges, and policy shifts from Nigeria's fastest-growing sectors, so you can plan around today's job market.",
    icon: ChartNoAxesCombined,
    iconBg: "bg-indigo-50 text-indigo-600 border border-indigo-100",
    numberColor: "text-indigo-700 bg-indigo-50/90 border-indigo-200/80",
    id: "insights",
  },
  {
    stepNumber: "02",
    statBadge: "500+ Journeys",
    title: "Built from what actually works",
    subtitle: "Insights from verified Nigerian leaders",
    text: "Our career clarity assessments draw on the journeys of hundreds of successful Nigerian professionals across 14 high-growth industries.",
    icon: Lightbulb,
    iconBg: "bg-purple-50 text-purple-600 border border-purple-100",
    numberColor: "text-purple-700 bg-purple-50/90 border-purple-200/80",
  },
  {
    stepNumber: "03",
    statBadge: "4-Week Cohort",
    title: "Structured, not overwhelming",
    subtitle: "Seven clear pillars taken one step at a time",
    text: "The four-week Career Compass Accelerator breaks readiness into seven clear pillars, one step at a time without burnout.",
    icon: Footprints,
    iconBg: "bg-sky-50 text-sky-600 border border-sky-100",
    numberColor: "text-sky-700 bg-sky-50/90 border-sky-200/80",
  },
  {
    stepNumber: "04",
    statBadge: "100+ Mentors",
    title: "Connected to real people",
    subtitle: "Mentorship interviews & real peer networks",
    text: "Mentorship interviews and peer networks bring you closer to real professionals and real opportunities across Africa.",
    icon: UsersRound,
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    numberColor: "text-emerald-700 bg-emerald-50/90 border-emerald-200/80",
  },
];

export function StatsSection() {
  // Active expanded card index (default open first card)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleCard = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="beliefs-section py-20 lg:py-28 bg-[#faf9fe]" id="beliefs">
      <div className="refined-inner max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading & Narrative */}
          <motion.div
            className="beliefs-header max-w-xl space-y-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200/70 px-3 py-1 text-xs font-bold text-brand-700 tracking-wide uppercase">
              <Sparkles className="size-3.5 text-brand-600" /> What we believe
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Clarity is built.<br />
              <span className="text-brand-600">Not guessed.</span>
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-slate-600">
              Career guidance should feel useful in the world you are stepping into. These four core ideas
              shape every part of the experience.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-2 flex flex-wrap gap-2 sm:gap-3">
              <span className="rounded-full bg-white border border-slate-200/80 px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs">
                ✦ 200 Scholarships
              </span>
              <span className="rounded-full bg-white border border-slate-200/80 px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs">
                ✦ 14 Industries
              </span>
              <span className="rounded-full bg-white border border-slate-200/80 px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs">
                ✦ 4-Week Cohort
              </span>
            </div>
          </motion.div>

          {/* Right Column: React Native Card Component Stack (Exact Image 2 Reference) */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Ambient Background Glow */}
            <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-tr from-brand-200/40 via-purple-100/30 to-sky-100/40 blur-xl opacity-75 pointer-events-none" />

            {/* Floating Purple Counter Badge at top-right, matching reference image */}
            <div
              className="absolute -top-3.5 -right-2 sm:-top-4 sm:-right-3 z-20 grid size-8 sm:size-9 place-items-center rounded-full bg-[#6d4aff] text-white font-black text-xs sm:text-sm shadow-md ring-4 ring-white"
              title="4 core pillars"
            >
              4
            </div>

            {/* Card Stack Container */}
            <div className="relative rounded-[28px] sm:rounded-[34px] border border-slate-200/90 bg-white/95 backdrop-blur-md p-3 sm:p-5 shadow-[0_20px_50px_rgba(45,25,95,0.08)] space-y-2.5 sm:space-y-3">
              {beliefs.map((belief, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={belief.title}
                    id={belief.id}
                    onClick={() => toggleCard(index)}
                    className={`group cursor-pointer overflow-hidden rounded-2xl bg-white p-3.5 sm:p-4 border transition-all duration-200 shadow-2xs hover:shadow-md ${
                      isOpen
                        ? "border-brand-500 ring-2 ring-brand-100 shadow-sm bg-gradient-to-r from-white via-white to-brand-50/20"
                        : "border-slate-100 hover:border-brand-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 sm:gap-3.5">
                      {/* Left: Rounded Squircle Icon Container */}
                      <div
                        className={`grid size-11 sm:size-12 shrink-0 place-items-center rounded-2xl ${belief.iconBg} shadow-2xs transition-transform duration-200 group-hover:scale-105`}
                      >
                        <belief.icon className="size-5 sm:size-5.5" strokeWidth={2.2} />
                      </div>

                      {/* Center: Title & Subtitle */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm sm:text-[15px] font-extrabold text-slate-900 leading-snug truncate">
                          {belief.title}
                        </h3>
                        <p className="text-xs sm:text-[12.5px] text-slate-500 font-medium truncate mt-0.5">
                          {belief.subtitle}
                        </p>
                      </div>

                      {/* Right: Numbers on cards that need numbers + Chevron */}
                      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                        {/* Number badge (01, 02, 03, 04) */}
                        <span
                          className={`rounded-full px-2 sm:px-2.5 py-0.5 text-[11px] font-extrabold font-mono border ${belief.numberColor}`}
                        >
                          {belief.stepNumber}
                        </span>

                        {/* Stat badge for cards that need numbers */}
                        <span className="hidden sm:inline-block rounded-full bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 text-[10px] font-extrabold text-slate-700">
                          {belief.statBadge}
                        </span>

                        {/* Right Chevron Arrow */}
                        <span
                          className={`grid size-7 place-items-center rounded-full text-slate-400 transition-all duration-200 ${
                            isOpen ? "rotate-90 text-brand-600 bg-brand-50" : "group-hover:text-slate-700 group-hover:translate-x-0.5"
                          }`}
                        >
                          <ChevronRight className="size-4" />
                        </span>
                      </div>
                    </div>

                    {/* Smooth Accordion Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                        >
                          <div className="pt-3 mt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                            <p>{belief.text}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
