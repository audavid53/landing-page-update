import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { AdmissionChecklist } from "@/components/admissions/AdmissionChecklist";
import { Art3D } from "@/components/art/Art3D";
import { BlockCard } from "@/components/ui/Block";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ADMISSION_STEPS } from "@/data/programme";

/**
 * The pre-admission dashboard (blueprint section 4.5).
 *
 * Deliberately not the learning dashboard: an applicant who has not been
 * admitted has exactly one job, which is to finish their application. So the
 * checklist is the page, and the platform they are applying to is shown as a
 * preview of what admission opens rather than as navigation that dead-ends in
 * lock icons.
 */
export default function ApplyDashboard() {
  const steps = ADMISSION_STEPS;
  const waiting = steps.find((s) => s.state === "in-review");
  const yours = steps.find((s) => s.state === "current");

  return (
    <div className="space-y-8">
      <header>
        <Pill tone="brand">Application in progress</Pill>
        <h1 className="mt-3 text-title text-ink">Almost there, Mary</h1>
        <p className="mt-2 max-w-2xl text-muted">
          {yours
            ? "One step is waiting on you. The rest is with us."
            : waiting
              ? "Everything we need from you is in. Your application is with the admissions team."
              : "Your application is complete."}
        </p>
      </header>

      <AdmissionChecklist steps={steps} />

      {/* What admission actually opens — the reason to finish. */}
      <section aria-labelledby="unlocks-heading">
        <SectionHeader
          id="unlocks-heading"
          title="What admission opens"
          description="Locked for now, and worth seeing before you get there."
        />

        <BlockCard
          to="/"
          ramp="violet"
          eyebrow="After admission"
          title="A six-level career journey"
          description="Interactive lessons, mentor sessions across 14 sectors, a cohort at your level, and internships at Level 6."
          art="rocket"
          artSize="2xl"
        />

        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { art: "books", title: "Learning Centre", detail: "Lessons you do, not watch" },
            { art: "video-camera", title: "Mentorship Corner", detail: "14 Nigerian sectors" },
            { art: "gift", title: "Treasure Chest", detail: "Internships at Level 6" },
          ].map((item) => (
            <li key={item.title}>
              <Card className="flex h-full items-start gap-3 border-dashed">
                <Art3D name={item.art as "books"} size="md" className="opacity-45 grayscale" />
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-sm font-bold text-ink">
                    {item.title}
                    <Lock className="size-3.5 text-muted" aria-hidden="true" strokeWidth={2.5} />
                  </p>
                  <p className="mt-0.5 text-sm text-muted">{item.detail}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <Card className="flex flex-col items-start gap-4 rounded-block sm:flex-row sm:items-center">
        <Art3D name="speech" size="lg" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold text-ink">Something not right?</p>
          <p className="mt-1 text-sm text-muted">
            If a detail on your application needs changing, tell us before verification finishes.
          </p>
        </div>
        <Link
          to="/apply/guardian"
          className="rounded-pill bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100"
        >
          Review my details
        </Link>
      </Card>
    </div>
  );
}
