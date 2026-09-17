import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
export function JourneySection() {
  return <section className="commitment-section" id="impact"><div className="refined-inner commitment-grid">
    <motion.div className="commitment-number" initial={{ opacity: 0, scale: .92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .8 }}><span className="commitment-number__orbit" aria-hidden="true" /><strong>400</strong><span>young people<br />and schools</span></motion.div>
    <motion.div className="commitment-copy" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}><span className="refined-eyebrow">Our commitment</span><h2>Career by choice.<br /><em>Not by chance.</em></h2><p>We are committed to giving 400 young people and schools access to international-standard career guidance infrastructure.</p><p>iCompass is built in line with Nigeria's move toward a national career guidance policy framework, making a clearer path possible for more people.</p><a className="refined-text-link" href="#community">Meet your support system <ArrowUpRight size={19} aria-hidden="true" /></a></motion.div>
  </div></section>;
}
