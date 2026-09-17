import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Compass, Sparkles, Trophy, Users } from "lucide-react";

const weeks = [
  { number: "01", title: "Find your direction", task: "Map your strengths and the work that excites you.", reward: "Clarity badge", label: "Discover" },
  { number: "02", title: "Build your proof", task: "Turn a new skill into something you can show.", reward: "Skill badge", label: "Create" },
  { number: "03", title: "Meet your people", task: "Learn with your circle and interview a professional.", reward: "Connector badge", label: "Connect" },
  { number: "04", title: "Make your move", task: "Take on a real-world challenge and find your next opportunity.", reward: "Momentum badge", label: "Launch" },
];

export function FeaturesCTASection() {
  const [activeWeek, setActiveWeek] = useState(0);
  const week = weeks[activeWeek]!;
  return <section className="intro-section" id="features">
    <div className="refined-inner intro-grid">
      <motion.div className="intro-copy" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .7 }}>
        <span className="refined-eyebrow">A path you can actually follow</span>
        <h2>Your career<br /><em>starts here.</em></h2>
        <p className="intro-lede">iCompass trains you to <strong>build the skills, experience, confidence, and connections you need</strong> to choose your path and get it right.</p>
        <p className="intro-support">Four weeks. Seven readiness pillars. Small, rewarding steps that take you from wondering what is next to doing something about it.</p>
        <div className="refined-actions"><a className="refined-button refined-button--purple" data-journey-signup href="#the-journey">Start your journey <ArrowRight size={18} aria-hidden="true" /></a><a className="refined-text-link" href="#beliefs">See what guides us <ArrowRight size={17} aria-hidden="true" /></a></div>
      </motion.div>
      <motion.div className="journey-preview" id="the-journey" initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .75, delay: .12 }} aria-label="Explore the four-week Career Compass Accelerator">
        <div className="journey-preview__top"><span className="journey-preview__mark"><Compass size={18} /></span><span>Career Compass Accelerator</span><span className="journey-preview__duration">4 weeks</span></div>
        <div className="journey-preview__heading"><div><span className="journey-preview__overline">YOUR NEXT MOVE</span><h3>A little progress<br />goes a long way.</h3></div><span className="journey-preview__trophy"><Trophy size={26} /></span></div>
        <div className="journey-preview__tabs" role="tablist" aria-label="Accelerator weeks">{weeks.map((item, index) => <button key={item.number} type="button" role="tab" id={`week-tab-${index}`} aria-selected={activeWeek === index} aria-controls="week-panel" tabIndex={activeWeek === index ? 0 : -1} className={`journey-preview__tab ${activeWeek === index ? "is-active" : ""}`} onClick={() => setActiveWeek(index)} onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); const next = (index + (event.key === "ArrowRight" ? 1 : weeks.length - 1)) % weeks.length; setActiveWeek(next); document.getElementById(`week-tab-${next}`)?.focus(); } }}><span>{item.number}</span><small>{item.label}</small></button>)}</div>
        <div className="journey-preview__panel" id="week-panel" role="tabpanel" aria-labelledby={`week-tab-${activeWeek}`}><AnimatePresence mode="wait" initial={false}><motion.div key={week.number} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .22 }}><span className="journey-preview__week">WEEK {week.number} / 04</span><h4>{week.title}</h4><p>{week.task}</p><div className="journey-preview__reward"><span><Sparkles size={17} /> Reward to unlock</span><strong>{week.reward}</strong></div></motion.div></AnimatePresence></div>
        <div className="journey-preview__foot"><span><Check size={16} /> Clear next steps</span><span><Users size={16} /> A circle to move with</span></div>
      </motion.div>
    </div>
    <div className="refined-inner motivation-strip" aria-label="What keeps you moving"><span>Earn rewards</span><span>Move with peers</span><span>Try real-world challenges</span><span>Find exciting opportunities</span></div>
  </section>;
}
