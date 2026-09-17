/**
 * Navbar — Single, sleek rounded-pill header for ICompass.
 * Adapted for desktop and mobile with glassmorphism and smooth mobile dropdown.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Menu, X, ArrowRight } from "lucide-react";

const navItems = [
  { label: "How it works", href: "#features" },
  { label: "The Journey", href: "#the-journey" },
  { label: "Impact", href: "#impact" },
  { label: "Community", href: "#community" },
  { label: "Stories", href: "#testimonials" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className="navbar-wrapper">
      <motion.nav
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Primary navigation"
      >
        <div className="navbar__inner">
          {/* Brand Logo: ICompass */}
          <a href="#hero" className="navbar__logo" aria-label="ICompass Home">
            <div className="navbar__logo-icon">
              <Compass size={22} className="text-white" />
            </div>
            <span className="navbar__logo-text">ICompass</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="navbar__links" aria-label="Main menu">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="navbar__link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="navbar__actions">
            <a href="#the-journey" data-journey-signup className="navbar__cta-btn">
              Start your journey
            </a>

            <button
              className="navbar__mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="navbar__mobile-menu"
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="navbar__mobile-links">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="navbar__mobile-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={16} className="text-slate-400" />
                  </a>
                ))}
                <a
                  href="#the-journey"
                  data-journey-signup
                  className="btn-primary navbar__mobile-cta"
                  onClick={() => setMobileOpen(false)}
                >
                  Start your journey
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
