import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/state/SessionProvider";

const slides = [
  {
    stepNumber: "01",
    label: "Gamified Learning",
    title: "4-Week Gamified Roadmap",
    body: "Follow a structured, milestone-driven roadmap filled with interactive community lessons, micro-quizzes, and practical challenges to build real career confidence.",
    image: "/welcome-journey.png",
    alt: "Two young people following a clear path toward the horizon"
  },
  {
    stepNumber: "02",
    label: "Community & Rewards",
    title: "Peer Exercises & Coin Rewards",
    body: "Collaborate on practical group exercises with peers at your stage. Earn coins and milestone badges you can redeem for 1-on-1 industry mentorship and exclusive job access.",
    image: "/welcome-peers.png",
    alt: "Young Nigerian students collaborating around a laptop and celebrating with coins"
  },
  {
    stepNumber: "03",
    label: "Real Access",
    title: "Industry Mentorship & Opportunities",
    body: "Get direct insight from verified professionals across 14 Nigerian economic sectors—from fintech to creative direction—discovering the real roles behind job titles.",
    image: "/welcome-industries.png",
    alt: "Students exploring modern industry sectors and future careers"
  },
  {
    stepNumber: "04",
    label: "The Starting Point",
    title: "Align with Your True Wiring",
    body: "Most students choose courses dictated by JAMB cut-offs or family expectations—trapping them in roles that fight their natural strengths. Success begins with self-knowledge.",
    image: "/images/expert_tony_1782720367131.jpg",
    alt: "Tony O. Elumelu, CFR"
  }
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
  const isLast = step === slides.length - 1;

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-[#0d0a1ec4] p-4 backdrop-blur-md">
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        aria-describedby="welcome-body"
        className="relative flex max-h-[calc(100dvh-28px)] w-full max-w-[580px] flex-col overflow-y-auto rounded-[28px] border border-white/80 bg-white p-6 text-center shadow-[0_28px_80px_#10092c4d] outline-none sm:p-8"
      >
        <button
          type="button"
          onClick={begin}
          aria-label="Skip introduction and begin assessment"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-muted hover:bg-canvas hover:text-ink transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Dynamic media / illustration per slide */}
        {step < 3 ? (
          <div className="mx-auto mt-2 flex h-[160px] w-full max-w-[390px] items-center justify-center sm:h-[185px]">
            <img
              key={slide.image}
              src={slide.image}
              alt={slide.alt}
              className="max-h-full w-full object-contain transition-all duration-300"
            />
          </div>
        ) : (
          /* Step 4: Tony Elumelu leadership perspective */
          <div className="mx-auto mt-2 w-full max-w-[460px] rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50/80 via-white to-amber-50/60 p-5 text-left shadow-sm">
            <div className="flex items-center gap-3.5">
              <img
                src={slide.image}
                alt={slide.alt}
                className="size-16 shrink-0 rounded-full border-2 border-brand-400 object-cover shadow-md"
              />
              <div className="min-w-0 flex-1">
                <p className="font-extrabold text-ink text-sm sm:text-base leading-tight">Tony O. Elumelu, CFR</p>
                <p className="text-[11px] font-semibold text-brand-700">Chairman, Heirs Holdings & Founder, TEF</p>
                <p className="mt-1 text-[11px] leading-relaxed text-ink-soft italic line-clamp-2">
                  "Understanding your innate wiring unlocks the confidence to command rooms and scale lasting impact across Africa."
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl bg-white/90 px-3 py-2 border border-line/70 text-[11px] text-muted">
              <span>Industry Leaders:</span>
              <div className="flex items-center gap-1.5 font-semibold text-ink">
                <span>Ebuka</span> · <span>Dr. Ngozi Okonjo-Iweala</span> · <span>Mai Atafo</span>
              </div>
            </div>
          </div>
        )}

        <h2
          id="welcome-title"
          className="mx-auto mt-4 max-w-[460px] text-[clamp(1.45rem,3.8vw,1.9rem)] font-extrabold leading-tight tracking-[-.035em] text-ink"
        >
          {step === 0 ? `Hi ${account?.name?.split(" ")[0] ?? "there"}, welcome to iCompass` : slide.title}
        </h2>
        
        <p id="welcome-body" className="mx-auto mt-2 max-w-[440px] text-sm leading-relaxed text-muted sm:text-[15px]">
          {slide.body}
        </p>

        {/* Step dots */}
        <div className="mt-6 flex items-center justify-center gap-2" role="group" aria-label="Welcome steps">
          {slides.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setStep(index)}
              aria-label={`Go to step ${index + 1}: ${item.label}`}
              aria-current={index === step ? "step" : undefined}
              className={`size-2.5 rounded-full transition-all ${
                index === step ? "w-7 bg-brand-500" : "bg-[#c9c1d6] hover:bg-brand-300"
              }`}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4">
          <button
            type="button"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-muted hover:text-ink disabled:invisible transition-colors"
          >
            <ArrowLeft className="size-4" /> Back
          </button>
          
          <button
            type="button"
            onClick={() => (isLast ? begin() : setStep(step + 1))}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-bold text-white hover:bg-brand-600 transition-all shadow-[0_4px_14px_#5525e838] hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLast ? "Take Personality Quiz" : "Next"}
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

