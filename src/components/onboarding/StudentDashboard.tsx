import { ArrowRight, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar } from "@/components/ui/Avatar";
import { useSession } from "@/state/SessionProvider";
import { useProgress } from "@/state/useProgress";
import { PERSONALITIES } from "@/features/personality/data";
import { AdmissionOverview } from "./AdmissionOverview";

export function StudentDashboard() {
  const { account } = useSession();
  const { hasCompleted } = useProgress();
  const complete = hasCompleted("assessment:personality");
  let personality = null;
  try {
    const id = localStorage.getItem(`icompass:personality-result:v1:${account?.email}`);
    personality = id ? PERSONALITIES[id] ?? null : null;
  } catch { /* device storage may be unavailable */ }

  return <div className="mx-auto max-w-[1060px] space-y-7 pb-12">
    <header className="flex flex-col items-center pt-1 text-center sm:flex-row sm:justify-between sm:gap-5 sm:text-left"><div className="flex flex-col items-center gap-3 sm:flex-row"><div className="rounded-full bg-white p-1 shadow-[0_6px_28px_#3c1e8224]"><Avatar name={account?.name ?? "Student"} size="xl" ring /></div><div><p className="text-sm font-medium text-muted">Good to see you,</p><h1 className="mt-0.5 text-[clamp(1.55rem,3vw,2rem)] font-extrabold tracking-tight text-ink">{account?.name ?? "Student"}</h1></div></div><span className="mt-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-bold text-brand-700 sm:mt-0">{personality && complete ? `${personality.name} · ` : ""}Before admission</span></header>

    <nav aria-label="Dashboard sections" className="mx-auto grid w-full max-w-[470px] grid-cols-3 rounded-full border border-brand-100 bg-[#f5f1ff] p-1.5 text-center text-sm font-bold"><span aria-current="page" className="rounded-full bg-brand-500 px-3 py-2.5 text-white shadow-[0_5px_16px_#602de03d]">Overview</span><Link to="/profile" className="rounded-full px-3 py-2.5 text-muted hover:bg-white hover:text-ink">Account</Link><a href="#what-next" className="rounded-full px-3 py-2.5 text-muted hover:bg-white hover:text-ink">More</a></nav>

    {!complete ? <section className="mx-auto max-w-2xl rounded-[26px] border border-line bg-white p-6 shadow-card sm:p-9"><span className="grid size-11 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Compass className="size-5" /></span><p className="mt-5 text-xs font-extrabold uppercase tracking-[.16em] text-brand-700">Your first step</p><h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">Discover how you naturally work.</h2><p className="mt-3 text-sm leading-relaxed text-muted">Take five short questions to understand the strengths behind your choices. Your pre-admission steps open after that.</p><Link to="/assessments/personality" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-500 px-5 text-sm font-bold text-white hover:bg-brand-600">Take the assessment <ArrowRight className="size-4" /></Link></section> : <AdmissionOverview />}

    <section id="what-next" className="border-t border-line pt-6 text-center"><p className="text-xs font-bold uppercase tracking-[.15em] text-brand-700">After admission</p><p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">Your four-week learning roadmap, community activities, industry mentors, and opportunities will live here as your journey opens up.</p></section>
  </div>;
}
