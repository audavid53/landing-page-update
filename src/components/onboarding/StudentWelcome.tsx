import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/state/SessionProvider";

const slides = [
  { title: "Welcome to iCompass", body: "A four-week path to career clarity, with small lessons and community games to keep you moving.", label: "Your path" },
  { title: "You'll grow with others", body: "Meet peers, try exercises together, and earn coins you can use toward mentors and opportunities later.", label: "Your people" },
  { title: "Get closer to real work", body: "Hear from people in different industries and discover the roles and opportunities behind the job titles.", label: "Your future" },
  { title: "First, understand your strengths", body: "Family pressure, a JAMB score, or circumstance can put you on a path that doesn't fit. See how you naturally lead, create, analyse, connect, or care for others.", label: "Your strengths" },
  { title: "Start with who you are", body: "Our Nigerian career personality profiles offer a first clue, not a final label. Five honest answers will help you choose your next step with more clarity.", label: "First step" },
];

export function StudentWelcome() {
  const navigate = useNavigate();
  const { account } = useSession();
  const [step, setStep] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const begin = () => navigate("/assessments/personality");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !panel.current) return;
      const focusable = Array.from(panel.current.querySelectorAll<HTMLElement>("button:not(:disabled)"));
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); };
  }, []);

  const slide = slides[step]!;
  return <div className="fixed inset-0 z-[1000] grid place-items-center bg-[#161322a6] p-4 backdrop-blur-[5px]">
    <div ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="welcome-title" aria-describedby="welcome-body" className="relative flex max-h-[calc(100dvh-32px)] w-full max-w-[570px] flex-col overflow-y-auto rounded-[24px] border border-white bg-white p-6 text-center shadow-[0_24px_72px_#17112b38] outline-none sm:p-9">
      <button type="button" onClick={begin} aria-label="Skip introduction and begin assessment" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-muted hover:bg-canvas hover:text-ink"><X className="size-4" /></button>
      <div className="mx-auto mt-3 flex h-[155px] w-full max-w-[410px] items-center justify-center sm:h-[180px]"><img src="/welcome-journey.png" alt="Two young people following a path with a compass" className="max-h-full w-full object-contain" /></div>
      <p className="mt-4 text-[11px] font-extrabold uppercase tracking-[.16em] text-brand-700">{slide.label} · {step + 1} of {slides.length}</p>
      <h2 id="welcome-title" className="mx-auto mt-3 max-w-[450px] text-[clamp(1.55rem,4vw,2rem)] font-extrabold leading-tight tracking-[-.035em] text-ink">{step === 0 ? `Hi ${account?.name?.split(" ")[0] ?? "there"}, welcome to iCompass` : slide.title}</h2>
      <p id="welcome-body" className="mx-auto mt-3 max-w-[430px] text-sm leading-relaxed text-muted sm:text-[15px]">{slide.body}</p>
      <div className="mt-7 flex items-center justify-center gap-2" role="group" aria-label="Welcome steps">{slides.map((item, index) => <button key={item.label} type="button" onClick={() => setStep(index)} aria-label={`Go to step ${index + 1}: ${item.label}`} aria-current={index === step ? "step" : undefined} className={`size-2.5 rounded-full transition-all ${index === step ? "w-6 bg-brand-500" : "bg-[#c9c1d6] hover:bg-brand-300"}`} />)}</div>
      <div className="mt-7 flex items-center justify-between gap-3 border-t border-line pt-5"><button type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-muted hover:text-ink disabled:invisible"><ArrowLeft className="size-4" /> Back</button><button type="button" onClick={() => step === slides.length - 1 ? begin() : setStep(step + 1)} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-500 px-5 text-sm font-bold text-white hover:bg-brand-600">{step === slides.length - 1 ? "Take the assessment" : "Next"}<ArrowRight className="size-4" /></button></div>
    </div>
  </div>;
}
