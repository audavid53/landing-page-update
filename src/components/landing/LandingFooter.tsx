import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import { ButtonLink } from "@/components/ui/Button";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { cn } from "@/lib/cn";

export function LandingFooter() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <footer className="border-t border-line bg-surface pt-16 pb-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Top Callout Box */}
        <div
          ref={ref}
          className={cn("scroll-reveal", isVisible && "visible")}
        >
          <div className="relative overflow-hidden rounded-[32px] bg-linear-to-br from-brand-700 via-brand-800 to-shell p-8 sm:p-12 text-white shadow-raised mb-16 text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur-xs">
                <Sparkles className="size-3.5 text-amber-300" />
                Cohort 5 Application Deadline
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-balance">
                Start with one honest assessment.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
                Eleven minutes, zero financial cost, and you leave with your baseline score, three priority sectors to explore, and your first high-leverage action this week.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0">
              <ButtonLink
                to="/apply/assessments/career-clarity"
                size="lg"
                className="bg-white text-brand-800 hover:bg-brand-50 shadow-lg font-extrabold"
              >
                Take Free Assessment
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                to="/apply/interview"
                size="lg"
                variant="secondary"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Scholarship Form
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 py-8 border-b border-line">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <span
                data-ramp="violet"
                className="ramp-fill grid size-9 place-items-center rounded-tile shadow-xs"
              >
                <Art3D name="rocket" size="xs" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-ink">iPlace</span>
            </Link>
            <p className="text-xs text-muted leading-relaxed">
              Career readiness platform for young Nigerians. Diagnostics, sector mentors, practical projects, and cohort accountability.
            </p>
          </div>

          {/* Col 2: Platform */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ink mb-3">Platform</p>
            <ul className="space-y-2 text-xs font-semibold text-muted">
              <li>
                <Link to="/apply/assessments" className="hover:text-brand-600 transition-colors">
                  Diagnostic Assessments
                </Link>
              </li>
              <li>
                <Link to="/learning" className="hover:text-brand-600 transition-colors">
                  The 7 Pillars
                </Link>
              </li>
              <li>
                <Link to="/mentorship" className="hover:text-brand-600 transition-colors">
                  14 Nigerian Sectors
                </Link>
              </li>
              <li>
                <Link to="/opportunities" className="hover:text-brand-600 transition-colors">
                  Treasure Chest Placements
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Admissions */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ink mb-3">Admissions</p>
            <ul className="space-y-2 text-xs font-semibold text-muted">
              <li>
                <Link to="/apply/interview" className="hover:text-brand-600 transition-colors">
                  Scholarship Application
                </Link>
              </li>
              <li>
                <Link to="/apply/guardian" className="hover:text-brand-600 transition-colors">
                  Guardian Verification
                </Link>
              </li>
              <li>
                <Link to="/apply" className="hover:text-brand-600 transition-colors">
                  Applicant Dashboard
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-brand-600 transition-colors">
                  Dream Team Cohorts
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Demo Access */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ink mb-3">Instant Demo</p>
            <p className="text-xs text-muted mb-3">
              Explore the full interactive learner dashboard with live demo data.
            </p>
            <ButtonLink to="/dashboard" size="sm" className="bg-brand-500 text-white w-full justify-center">
              Launch App Demo
              <ArrowRight className="size-3" />
            </ButtonLink>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-muted">
          <p>© {new Date().getFullYear()} iPlace Africa. Built with care for young Nigerians.</p>
          <div className="flex items-center gap-4">
            <a href="#content" className="hover:text-ink transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
