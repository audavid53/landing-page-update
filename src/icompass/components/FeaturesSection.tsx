import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Briefcase,
  ChevronDown,
  ClipboardCheck,
  Compass,
  GraduationCap,
  Home,
  PanelLeftClose,
  Rocket,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import "../blue-sky-section.css";

export function FeaturesCTASection() {
  return (
    <section className="blue-sky-section" id="features">
      <div className="blue-sky-inner">
        {/* Top Centered Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="blue-sky-title">Your Career Starts Here.</h2>
          <p className="blue-sky-subtitle">
            Build the skills, experience, confidence, and connections you need to move from potential to opportunity.
          </p>

          <div className="blue-sky-actions">
            <button
              type="button"
              data-journey-signup
              className="blue-sky-btn-scholarship"
            >
              Apply for scholarship
            </button>
            <a href="#beliefs" className="blue-sky-btn-explore">
              Explore iCompass
            </a>
          </div>
        </motion.div>

        {/* Dashboard Preview Window Mockup */}
        <motion.div
          className="blue-sky-mockup"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="blue-sky-app-window">
            {/* Left Dark Sidebar */}
            <aside className="blue-sky-sidebar" aria-label="Mockup navigation">
              <div className="blue-sky-sidebar-header">
                <div className="blue-sky-sidebar-brand">
                  <div className="blue-sky-brand-icon">
                    <Rocket size={16} className="text-white" />
                  </div>
                  <span>iCompass</span>
                </div>
                <PanelLeftClose size={16} className="text-slate-400" />
              </div>

              <nav className="blue-sky-nav-list">
                <div className="blue-sky-nav-item is-active">
                  <Home size={16} />
                  <span>Home</span>
                </div>
                <div className="blue-sky-nav-item">
                  <GraduationCap size={16} />
                  <span>Learn</span>
                </div>
                <div className="blue-sky-nav-item">
                  <Users size={16} />
                  <span>Community</span>
                </div>
                <div className="blue-sky-nav-item">
                  <span className="grid size-4 place-items-center font-bold text-xs">👤</span>
                  <span>Profile</span>
                </div>

                <span className="blue-sky-nav-section-title">MORE</span>

                <div className="blue-sky-nav-item">
                  <Compass size={16} />
                  <span>Mentorship Corner</span>
                </div>
                <div className="blue-sky-nav-item">
                  <Briefcase size={16} />
                  <span>Job Opportunities</span>
                </div>
                <div className="blue-sky-nav-item">
                  <ClipboardCheck size={16} />
                  <span>Assessments</span>
                </div>
              </nav>
            </aside>

            {/* Floating Overlays */}
            <div className="blue-sky-floating-badge" aria-hidden="true">
              <span className="blue-sky-badge-score">92%</span>
              <span className="blue-sky-badge-label">Resume Score</span>
            </div>

            <div className="blue-sky-floating-ai" aria-hidden="true">
              <Sparkles size={15} className="text-amber-500" />
              <span>Ask AI Coach anything...</span>
            </div>

            {/* Right Main Dashboard Area */}
            <main className="blue-sky-main">
              {/* Top Search Bar & Profile */}
              <div className="blue-sky-top-bar">
                <div className="blue-sky-search-wrap">
                  <Search size={15} className="blue-sky-search-icon" />
                  <input
                    type="text"
                    readOnly
                    value=""
                    placeholder="Search lessons, mentors, opportunities..."
                    tabIndex={-1}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative grid size-9 place-items-center rounded-full bg-white border border-slate-200 text-slate-600 shadow-2xs">
                    <Bell size={15} />
                    <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
                  </div>

                  <div className="blue-sky-user-pill">
                    <div className="blue-sky-user-avatar">MS</div>
                    <div className="blue-sky-user-info">
                      <span className="blue-sky-user-name">Hi, Mary</span>
                      <span className="blue-sky-user-level">● Level 3 (Connector)</span>
                    </div>
                    <ChevronDown size={14} className="text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Greeting & Level Heading */}
              <div className="blue-sky-greeting-area">
                <p>Good evening, Mary 👋</p>
                <h3>Level 3: Explore the sectors</h3>
              </div>

              {/* Violet Hero Banner Card */}
              <div className="blue-sky-card">
                <div className="blue-sky-card-info">
                  <h4>Keep learning, keep growing</h4>
                  <p>
                    You are on Level 3 of 6. Two more missions and the Skill Stacking level opens up.
                  </p>
                  <div className="blue-sky-card-progress">
                    <div className="blue-sky-card-progress-fill" />
                  </div>
                </div>

                {/* Floating Skills Card + Rocket Action */}
                <div className="blue-sky-card-action">
                  <div className="blue-sky-skills-card">
                    <div className="blue-sky-skills-header">
                      <span>Skills</span>
                      <span>✏️</span>
                    </div>
                    <div className="blue-sky-skills-chips">
                      <span className="blue-sky-skill-chip">Management</span>
                      <span className="blue-sky-skill-chip">Analytical Thinking</span>
                      <span className="blue-sky-skill-chip">Leadership</span>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-center gap-3">
                    <span className="blue-sky-rocket-icon">🚀</span>
                    <button
                      type="button"
                      className="blue-sky-arrow-btn"
                      aria-label="Continue mission"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
