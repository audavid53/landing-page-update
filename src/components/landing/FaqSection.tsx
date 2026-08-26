import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const FAQS = [
  {
    q: "Is the Career Clarity Assessment really free?",
    a: "Yes, 100% free with zero strings attached. It takes 11 minutes and immediately calculates your baseline score across the 7 Pillars of Career Readiness, giving you 3 tailored sectors to explore.",
  },
  {
    q: "How do the scholarships and payment work?",
    a: "We believe financial constraints should never prevent young Nigerians from getting career clarity. Applicants can submit a short scholarship interview. Scholarship awards (up to 100% coverage) are applied directly before any programme payment is confirmed.",
  },
  {
    q: "Can I participate if I am currently in school or serving (NYSC)?",
    a: "Absolutely. The programme is asynchronous-first with high-impact weekly touchpoints. Expect to dedicate 4–6 flexible hours per week, fitting comfortably around university lectures or NYSC primary assignments.",
  },
  {
    q: "What makes iPlace different from generic online course platforms?",
    a: "Traditional platforms give you hours of video lectures with a 5% completion rate. iPlace is an accountability cohort: you get a diagnostic baseline, live sessions with working leads across 14 Nigerian sectors, peer Dream Teams, and portfolio pieces reviewed by real mentors.",
  },
  {
    q: "How does the Level 6 Treasure Chest work?",
    a: "When you graduate and hit readiness milestones (Level 6), our partner employer pipelines open up. Employers like Paystack, Andela, and local agribusiness innovators review vetted iPlace profiles for junior and internship roles.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
          <HelpCircle className="size-3.5" />
          Clear Answers
        </div>
        <h2 className="mt-3 text-title text-ink font-extrabold tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm sm:text-base text-muted">
          Everything you need to know about the 4-week cohort, assessments, and scholarships.
        </p>
      </div>

      {/* Accordion List */}
      <div className="mt-10 space-y-3.5">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? "bg-surface border-brand-400 shadow-card" : "bg-surface/80 border-line hover:border-line-strong"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-ink hover:text-brand-600 transition-colors"
              >
                <span className="text-sm sm:text-base">{faq.q}</span>
                <ChevronDown
                  className={`size-5 shrink-0 text-muted transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-brand-600" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-ink-soft leading-relaxed border-t border-line/50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
