import { Users, Award, Briefcase, Zap, CheckCircle2 } from "lucide-react";

const TICKER_ITEMS = [
  {
    icon: Award,
    color: "text-xp",
    bg: "bg-xp-soft",
    text: "Chidinma O. unlocked Pathfinder Badge (+90 XP)",
    meta: "12m ago",
  },
  {
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success-soft",
    text: "Tunde A. completed Five Real Conversations Challenge",
    meta: "34m ago",
  },
  {
    icon: Briefcase,
    color: "text-brand-600",
    bg: "bg-brand-50",
    text: "Paystack Product Analyst placement opened for Level 6",
    meta: "1h ago",
  },
  {
    icon: Users,
    color: "text-info",
    bg: "bg-info-soft",
    text: "486 learners active in Cohort 4 Week 2 sessions",
    meta: "Live now",
  },
  {
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-50",
    text: "Amara N. reached Level 4 · Skill Stacker (+150 XP)",
    meta: "2h ago",
  },
];

export function LivePulseTicker() {
  return (
    <div className="w-full border-y border-line bg-surface/80 backdrop-blur-xs py-3 overflow-hidden">
      <div className="mx-auto flex w-full max-w-6xl items-center px-4 sm:px-6">
        <div className="flex shrink-0 items-center gap-2 pr-6 border-r border-line font-bold text-xs text-ink uppercase tracking-wider">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-success" />
          </span>
          <span className="hidden sm:inline">Cohort Pulse</span>
        </div>

        {/* Scrolling ticker track */}
        <div className="flex overflow-x-auto no-scrollbar scroll-smooth pl-4 gap-6 items-center">
          {TICKER_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-ink-soft whitespace-nowrap bg-surface-sunk px-3 py-1.5 rounded-full border border-line/60"
              >
                <span className={`grid size-5 place-items-center rounded-full ${item.bg} ${item.color}`}>
                  <Icon className="size-3" />
                </span>
                <span>{item.text}</span>
                <span className="text-[0.6875rem] font-bold text-muted">· {item.meta}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
