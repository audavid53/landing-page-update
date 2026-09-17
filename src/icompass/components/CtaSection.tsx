/**
 * FinalCTASection — Final CTA with concentric circles + Footer
 * Matches existing OpportunityCallToActionSection
 */

import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";

export function FinalCTASection() {
  return (
    <>
      <section className="final-cta-section" id="cta">
        {/* Decorative circles */}
        <div className="circle circle-1" aria-hidden="true" />
        <div className="circle circle-2" aria-hidden="true" />
        <div className="circle circle-3" aria-hidden="true" />
        <div className="final-cta__gradient" aria-hidden="true" />

        <motion.div
          className="final-cta__content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2>Ready to navigate your future with <em>data</em>, not guesswork?</h2>
          <p>
            Join thousands of Nigerian students and professionals who are making smarter career decisions with Career Compass.
          </p>
          <div className="final-cta__buttons">
            <a href="#the-journey" data-journey-signup className="btn-primary">Start your journey <ArrowRight size={18} aria-hidden="true" /></a>
            <a href="#insights" className="btn-secondary btn-secondary--white">Explore industry insights <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </motion.div>
      </section>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__divider" />
          <div className="footer__content">
            <div className="footer__brand">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--primary-purple)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Compass size={20} color="white" aria-hidden="true" />
                </div>
                <span style={{ color: "white", fontWeight: 800, fontSize: 20, fontFamily: "'Raleway', sans-serif" }}>ICompass</span>
              </div>
              <p>
                Career clarity, practical skills, and people to move forward with.
              </p>
            </div>
            <nav className="footer__nav" aria-label="Footer navigation">
              <ul><li><a href="#features">How it works</a></li><li><a href="#the-journey">The journey</a></li><li><a href="#beliefs">Our beliefs</a></li></ul>
              <ul><li><a href="#impact">Our commitment</a></li><li><a href="#community">Community</a></li><li><a href="#testimonials">Stories</a></li></ul>
              <ul><li><a href="#hero">Back to top</a></li><li><a href="#the-journey" data-journey-signup>Start your journey</a></li></ul>
            </nav>
          </div>
          <div className="footer__legal">
            <span className="footer__copyright">Career by choice, not by chance.</span>
            <p className="footer__copyright">
              © 2026 ICompass. Built with care for young Nigerians.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
