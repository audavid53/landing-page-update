import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, RotateCcw, Sparkles, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";

interface MiniQuestion {
  id: string;
  pillar: string;
  prompt: string;
  options: { label: string; points: number }[];
}

const MINI_QUESTIONS: MiniQuestion[] = [
  {
    id: "q1",
    pillar: "Self-Knowledge",
    prompt: "If a recruiter asked what distinct problem you solve best, how clearly could you explain it?",
    options: [
      { label: "Very vaguely — I just know my degree or job title", points: 15 },
      { label: "Somewhat — I have a general sense of my skills", points: 25 },
      { label: "Crystal clearly with 2 concrete past examples", points: 35 },
    ],
  },
  {
    id: "q2",
    pillar: "Market Curiosity",
    prompt: "How well do you understand how companies in your target Nigerian industry actually hire graduates?",
    options: [
      { label: "I mostly submit random applications on job boards", points: 10 },
      { label: "I know a few industry names, but have no inside contacts", points: 20 },
      { label: "I know the hidden referral routes & entry-level roles", points: 35 },
    ],
  },
  {
    id: "q3",
    pillar: "Skill Stacking",
    prompt: "Do you currently have a proof-of-work portfolio piece that you can share with an employer today?",
    options: [
      { label: "No, only my CV and certificates", points: 10 },
      { label: "I have some unfinished coursework or school projects", points: 20 },
      { label: "Yes, I have at least one real-world case study or repo", points: 30 },
    ],
  },
];

export function InteractiveAssessmentPreview() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (points: number) => {
    const nextAnswers = [...selectedAnswers, points];
    setSelectedAnswers(nextAnswers);

    if (currentStep + 1 < MINI_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#5525e8", "#f0a202", "#1f8f45", "#1273d4"],
      });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setIsCompleted(false);
  };

  const totalScore = selectedAnswers.reduce((a, b) => a + b, 0);
  const activeQuestion: MiniQuestion = MINI_QUESTIONS[currentStep] ?? MINI_QUESTIONS[0]!;

  return (
    <section id="mini-assessment" className="bg-surface py-16 sm:py-24 border-y border-line">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            <Sparkles className="size-3.5" />
            Instant 30-Second Diagnostic
          </div>
          <h2 className="mt-3 text-title text-ink font-extrabold tracking-tight">
            Check your Career Clarity Index
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted">
            Answer 3 rapid questions to test where you stand right now across self-knowledge, market insight, and proof of skill.
          </p>
        </div>

        {/* Interactive Quiz Card */}
        <div className="mt-8">
          <Card className="p-6 sm:p-8 bg-surface-sunk/60 border border-line rounded-3xl shadow-card" padded>
            {!isCompleted ? (
              <div>
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs font-bold text-muted mb-3">
                  <span>Question {currentStep + 1} of {MINI_QUESTIONS.length}</span>
                  <span className="text-brand-600 font-extrabold">{activeQuestion.pillar}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-line overflow-hidden mb-6">
                  <div
                    className="h-full bg-brand-500 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / MINI_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="text-base sm:text-lg font-extrabold text-ink leading-snug">
                      {activeQuestion.prompt}
                    </h3>

                    {/* Options list */}
                    <div className="mt-5 space-y-3">
                      {activeQuestion.options.map((opt, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => handleSelectOption(opt.points)}
                          className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-surface border border-line hover:border-brand-500 hover:shadow-xs transition-all text-left group"
                        >
                          <span className="text-xs sm:text-sm font-semibold text-ink group-hover:text-brand-700 transition-colors">
                            {opt.label}
                          </span>
                          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-surface-sunk text-muted group-hover:bg-brand-500 group-hover:text-white transition-colors">
                            <ArrowRight className="size-3.5" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              /* Completed Results Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="inline-flex size-16 items-center justify-center rounded-full bg-brand-50 border border-brand-200 text-brand-600 mb-3">
                  <Trophy className="size-8 text-brand-600" />
                </div>

                <h3 className="text-xl font-black text-ink">
                  Your Estimated Clarity Score: {totalScore}/100
                </h3>
                <p className="mt-2 text-sm text-muted max-w-md mx-auto">
                  {totalScore >= 75
                    ? "Strong Baseline! You have solid foundations. The 4-week cohort will sharpen your proof-of-work and connect you with top employer pipelines."
                    : totalScore >= 50
                      ? "Moderate Foundation. You know what you want, but lack the practical proof and insider networks required to break through fast."
                      : "High Growth Potential. Right now you're applying in the dark. The 4-week structured programme will give you an unfair clarity advantage."}
                </p>

                <div className="mt-6 flex flex-wrap justify-center items-center gap-3.5">
                  <ButtonLink
                    to="/apply/assessments/career-clarity"
                    size="lg"
                    className="bg-brand-500 text-white font-extrabold shadow-raised"
                  >
                    Take Official 12-Question Diagnostic
                    <ArrowRight className="size-4" />
                  </ButtonLink>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-pill px-4 py-2 text-xs font-bold text-muted hover:text-ink hover:bg-surface transition-colors"
                  >
                    <RotateCcw className="size-3.5" />
                    Retake Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
