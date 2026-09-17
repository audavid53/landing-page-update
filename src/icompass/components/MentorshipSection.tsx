import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Handshake, Star, UsersRound } from "lucide-react";
const support = [
  { icon: UsersRound, title: "A peer group that shows up", text: "Share goals, celebrate progress, and keep each other moving through every week." },
  { icon: Handshake, title: "Conversations that open doors", text: "Meet professionals, ask honest questions, and learn what their work is really like." },
  { icon: CalendarDays, title: "Experiences beyond the screen", text: "Join activities, events, and practical challenges that make learning stick." },
];
export function MentorshipSection() {
  return <section className="community-section" id="community"><div className="refined-inner community-grid">
    <motion.div className="community-visual" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}><img src="/figmaAssets/frame-2147227104.png" alt="Young people learning together around a table" loading="lazy" /><div className="community-visual__note"><Star size={18} fill="currentColor" aria-hidden="true" /><span>Better together</span></div></motion.div>
    <div className="community-copy"><motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65 }}><span className="refined-eyebrow">Find your people</span><h2>You don't have to figure it out <em>alone.</em></h2><p className="community-lede">A good path has people on it. Your peers, mentors, and real-world opportunities help you keep going when another online course might fade into the background.</p></motion.div><div className="community-list">{support.map((item, index) => <motion.div key={item.title} className="community-list__item" initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: index * .08 }}><span className="community-list__icon"><item.icon size={23} strokeWidth={1.8} /></span><div><h3>{item.title}</h3><p>{item.text}</p></div></motion.div>)}</div><a className="refined-button refined-button--purple" data-journey-signup href="#the-journey">Start your journey <ArrowRight size={18} aria-hidden="true" /></a></div>
  </div></section>;
}
