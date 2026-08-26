import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, Sparkles, X, Zap } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { id: "pillars", label: "7 Pillars", href: "#pillars" },
  { id: "journey", label: "4-Week Journey", href: "#journey" },
  { id: "sectors", label: "14 Sectors", href: "#sectors" },
  { id: "mini-assessment", label: "Live Mini-Quiz", href: "#mini-assessment", special: true },
  { id: "faq", label: "FAQ", href: "#faq" },
];

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const observerCallback: IntersectionObserverCallback = (entries) => {
      const intersecting = entries.find((entry) => entry.isIntersecting);
      if (intersecting) {
        setActiveSection(intersecting.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.slice(1);
      const el = document.getElementById(targetId);
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        setActiveSection(targetId);
        setMobileOpen(false);
      }
    }
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-surface/90 py-2.5 sm:py-3 shadow-card backdrop-blur-md border-b border-line/70"
            : "bg-transparent py-4 sm:py-5",
        )}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5">
            <span
              data-ramp="violet"
              className="ramp-fill grid size-9.5 place-items-center rounded-tile shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:rotate-3"
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

          {/* Desktop Nav Links with Active Indicator */}
          <nav
            aria-label="Main Landing Navigation"
            className="hidden md:flex items-center gap-1 rounded-full bg-surface/70 p-1 border border-line/60 shadow-2xs backdrop-blur-sm"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-xs lg:text-sm font-bold transition-all duration-200",
                    isActive
                      ? "bg-brand-500 text-white shadow-xs"
                      : item.special
                        ? "text-brand-600 hover:bg-brand-50 hover:text-brand-700"
                        : "text-muted hover:text-ink hover:bg-surface-sunk",
                  )}
                >
                  {item.label}
                  {item.special && !isActive && (
                    <span className="ml-1.5 inline-block size-1.5 rounded-full bg-brand-500 animate-pulse" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              to="/apply/assessments"
              className="rounded-full px-3.5 py-2 text-xs lg:text-sm font-bold text-ink-soft hover:text-brand-600 hover:bg-brand-50/70 transition-all"
            >
              Scholarship
            </Link>
            <ButtonLink
              to="/dashboard"
              size="sm"
              className="group relative shadow-xs hover:shadow-md transition-all duration-300 bg-brand-500 hover:bg-brand-600 text-white font-bold"
            >
              <Zap className="size-3.5 text-amber-300 fill-current group-hover:scale-110 transition-transform" />
              <span>Enter Platform</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
            </ButtonLink>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="grid size-10 place-items-center rounded-xl border border-line bg-surface text-ink shadow-2xs md:hidden active:scale-95 transition-transform"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-shell/95 backdrop-blur-xl text-white p-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-shell-line pb-4">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-tile bg-brand-500 text-white">
                <Art3D name="rocket" size="xs" />
              </span>
              <span className="text-lg font-extrabold tracking-tight">iPlace NG</span>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="grid size-9 place-items-center rounded-full border border-shell-line text-shell-muted hover:text-white active:scale-95"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition-all",
                    isActive
                      ? "bg-brand-500 text-white shadow-md"
                      : "text-shell-muted hover:bg-shell-raised hover:text-white",
                  )}
                >
                  <span>{item.label}</span>
                  {item.special && (
                    <span className="rounded-full bg-brand-400/20 px-2 py-0.5 text-xs text-brand-300 font-bold">
                      Interactive
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 pt-6 border-t border-shell-line">
            <ButtonLink
              to="/apply/assessments/career-clarity"
              size="lg"
              className="w-full justify-center bg-brand-500 text-white shadow-lg font-bold"
              onClick={() => setMobileOpen(false)}
            >
              <Sparkles className="size-4 text-amber-300" />
              Take Free Assessment
            </ButtonLink>
            <ButtonLink
              to="/dashboard"
              size="lg"
              variant="secondary"
              className="w-full justify-center bg-shell-raised text-white border-shell-line font-bold"
              onClick={() => setMobileOpen(false)}
            >
              <Zap className="size-4 text-amber-300 fill-current" />
              Enter Platform Demo
            </ButtonLink>
          </div>
        </div>
      )}
    </>
  );
}
