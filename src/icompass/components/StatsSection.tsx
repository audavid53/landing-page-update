import { motion } from "framer-motion";
import { ChartNoAxesCombined, Footprints, Lightbulb, UsersRound } from "lucide-react";

const beliefs = [
  { title: "Grounded in real data", text: "We pull live hiring trends, salary ranges, and policy shifts from Nigeria's fastest-growing sectors, so you can plan around today's job market.", icon: ChartNoAxesCombined, className: "belief-card--data", id: "insights" },
  { title: "Built from what actually works", text: "Our career clarity assessments draw on the journeys of hundreds of successful Nigerian professionals across 14 industries.", icon: Lightbulb, className: "belief-card--evidence" },
  { title: "Structured, not overwhelming", text: "The four-week Career Compass Accelerator breaks readiness into seven clear pillars, one step at a time.", icon: Footprints, className: "belief-card--structure" },
  { title: "Connected to real people", text: "Mentorship interviews and peer networks bring you closer to real professionals and real opportunities.", icon: UsersRound, className: "belief-card--people" },
];
export function StatsSection() {
  return <section className="beliefs-section" id="beliefs"><div className="refined-inner">
    <motion.div className="beliefs-header" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65 }}><span className="refined-eyebrow">What we believe</span><h2>Clarity is built.<br /><em>Not guessed.</em></h2><p>Career guidance should feel useful in the world you are stepping into. These four ideas shape every part of the experience.</p></motion.div>
    <div className="belief-grid">{beliefs.map((belief, index) => <motion.article key={belief.title} id={belief.id} className={`belief-card ${belief.className}`} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: .6, delay: index * .07 }}><div className="belief-card__top"><span className="belief-card__icon"><belief.icon size={25} strokeWidth={1.8} /></span><span className="belief-card__index">0{index + 1} / 04</span></div><div><h3>{belief.title}</h3><p>{belief.text}</p></div></motion.article>)}</div>
  </div></section>;
}
