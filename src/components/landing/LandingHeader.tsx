import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "How it works", href: "#problem" },
  { label: "The Journey", href: "#journey" },
  { label: "Learn", href: "#learn" },
  { label: "Community", href: "#community" },
  { label: "Opportunities", href: "#readiness" },
];

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-surface/90 py-3 shadow-card backdrop-blur-md border-b border-line/60"
            : "bg-transparent py-4 sm:py-5",
        )}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5">
            <span
              data-ramp="violet"
              className="ramp-fill grid size-9.5 place-items-center rounded-tile shadow-xs transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
            >
              <Art3D name="rocket" size="xs" />
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-ink flex items-center gap-1.5">
                iPlace
                <span className="inline-flex items-center rounded-full bg-brand-100 px-2 py-0.5 text-[0.65rem] font-bold text-brand-700">
                  NG
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav aria-label="Main Landing Navigation" className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-pill px-3.5 py-1.5 text-sm font-semibold text-muted transition-colors hover:text-ink hover:bg-surface/70"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/apply/assessments"
              className="rounded-pill px-3.5 py-2 text-sm font-bold text-brand-600 hover:text-brand-700 hover:bg-brand-50 transition-colors"
            >
              Take the assessment
            </Link>
            <ButtonLink
              to="/apply/interview"
              size="sm"
              className="group shadow-xs hover:shadow-md transition-all duration-300"
            >
              Apply for scholarship
              <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
            </ButtonLink>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="grid size-10 place-items-center rounded-xl border border-line bg-surface text-ink shadow-2xs md:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-shell text-white p-6 md:hidden animate-in fade-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between border-b border-shell-line pb-4">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-tile bg-brand-500 text-white">
                <Art3D name="rocket" size="xs" />
              </span>
              <span className="text-lg font-extrabold">iPlace</span>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="grid size-9 place-items-center rounded-full border border-shell-line text-shell-muted hover:text-white"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-semibold text-shell-muted hover:bg-shell-raised hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto space-y-3 pt-6 border-t border-shell-line">
            <ButtonLink
              to="/apply/assessments/career-clarity"
              size="lg"
              className="w-full justify-center bg-brand-500 text-white shadow-lg"
              onClick={() => setMobileOpen(false)}
            >
              Take Free Assessment
            </ButtonLink>
            <ButtonLink
              to="/apply/interview"
              size="lg"
              variant="secondary"
              className="w-full justify-center bg-shell-raised text-white border-shell-line"
              onClick={() => setMobileOpen(false)}
            >
              Apply for Scholarship
            </ButtonLink>
          </div>
        </div>
      )}
    </>
  );
}
