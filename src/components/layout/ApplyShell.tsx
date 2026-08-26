import { Suspense, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Art3D } from "@/components/art/Art3D";
import { GradientDefs } from "@/components/ui/GradientIcon";
import { PageSkeleton } from "@/components/ui/Feedback";
import { Pill } from "@/components/ui/Pill";
import { ADMISSION_STEPS } from "@/data/programme";

/**
 * The pre-admission shell (blueprint section 3's first experience state).
 *
 * An applicant is deliberately not given the platform's navigation. Showing
 * Home / Learn / Journey / Community to someone who cannot open any of them
 * turns the whole product into a wall of locks, which is the opposite of what
 * section 4.6 asks for. Instead the chrome carries one thing — how far through
 * the application they are — and every route here leads back to the checklist.
 */
export function ApplyShell() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);

  const done = ADMISSION_STEPS.filter((s) => s.state === "completed").length;

  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <a
        href="#main"
        className="skip-link rounded-pill bg-brand-500 px-4 py-2 text-sm font-bold text-white"
      >
        Skip to main content
      </a>
      <GradientDefs />

      <header className="sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span
              data-ramp="violet"
              className="ramp-fill grid size-9 shrink-0 place-items-center rounded-tile"
            >
              <Art3D name="rocket" size="xs" />
            </span>
            <span className="text-base font-extrabold tracking-tight text-ink">iPlace</span>
          </Link>

          <Link to="/apply" className="ml-auto">
            <Pill tone="brand">
              Application {done}/{ADMISSION_STEPS.length}
            </Pill>
          </Link>
        </div>
      </header>

      <main
        id="main"
        tabIndex={-1}
        className="mx-auto w-full max-w-3xl flex-1 px-4 pt-6 pb-16 outline-none sm:px-6"
      >
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="border-t border-line bg-surface px-4 py-6 text-center text-sm text-muted sm:px-6">
        Questions about your application? Reply to any iPlace email and a person will answer.
      </footer>
    </div>
  );
}
