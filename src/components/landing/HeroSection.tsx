import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import { ButtonLink } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 pt-6 pb-16 sm:px-6 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Background ambient decorative orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/4 -z-10 size-72 rounded-full bg-brand-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 right-10 -z-10 size-80 rounded-full bg-xp-soft/60 blur-3xl"
      />

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left Column: Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center order-2 lg:order-1"
        >
          {/* Large hero illustration group */}
          <div className="relative">
            <div className="grid size-52 sm:size-64 lg:size-80 place-items-center rounded-[2rem] bg-brand-50/80 border border-brand-100">
              <Art3D name="compass" size="hero" />
            </div>

            {/* Floating accent cards */}
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 animate-float pointer-events-none">
              <div className="rounded-xl bg-surface/95 px-3 py-2 shadow-raised border border-line backdrop-blur-xs flex items-center gap-2">
                <Art3D name="trophy" size="xs" />
                <div className="text-left">
                  <p className="text-[0.6rem] font-bold text-muted uppercase tracking-wider">Level 6</p>
                  <p className="text-[0.7rem] font-extrabold text-ink">Unlocked</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 animate-float pointer-events-none" style={{ animationDelay: "1.5s" }}>
              <div className="rounded-xl bg-surface/95 px-3 py-2 shadow-raised border border-line backdrop-blur-xs flex items-center gap-2">
                <Art3D name="target" size="xs" />
                <div className="text-left">
                  <p className="text-[0.6rem] font-bold text-muted uppercase tracking-wider">Career Path</p>
                  <p className="text-[0.7rem] font-extrabold text-ink">Matched</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Value Proposition & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2"
        >
          {/* Cohort Status Tag */}
          <p className="text-xs font-semibold uppercase tracking-widest text-muted border-b border-ink/20 pb-1 inline-block mb-5">
            YOUR CAREER JOURNEY STARTS HERE
          </p>

          <h1 className="text-display text-ink text-balance tracking-tight leading-[1.08]">
            You don't need to have your career figured out.{" "}
            <span className="relative inline text-brand-600">
              You just need to know your next move.
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-0.5 left-0 h-1 w-full bg-brand-300/60 rounded-full origin-left -z-10"
              />
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm sm:text-base text-muted leading-relaxed">
            iPlace helps young Nigerians discover where they fit, build
            practical skills, learn from people in the industry, and connect
            with opportunities that move their careers forward.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <ButtonLink
              to="/apply"
              size="lg"
              className="group relative shadow-raised hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Sparkles className="size-4 text-amber-300" />
              Start your career journey
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </ButtonLink>

            <ButtonLink
              to="/apply/assessments/career-clarity"
              size="lg"
              variant="secondary"
              className="border-line-strong hover:bg-surface-sunk"
            >
              Take the free assessment
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
