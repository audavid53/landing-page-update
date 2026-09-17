import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/Progress";
import { useProgress } from "@/state/useProgress";
import { useSession } from "@/state/SessionProvider";
import { PERSONALITIES, QUESTIONS, type CareerPersonality } from "./data";
import { scorePersonality } from "./scoring";

const resultKey = (email: string) => `icompass:personality-result:v1:${email}`;

export function PersonalityAssessment() {
  const { account } = useSession();
  const { complete, hasCompleted } = useProgress();
  const key = resultKey(account?.email ?? "guest");
  const [savedResult, setSavedResult] = useState<CareerPersonality | null>(() => {
    try { const id = localStorage.getItem(key); return id ? PERSONALITIES[id] ?? null : null; }
    catch { return null; }
  });
  const [stage, setStage] = useState<"intro" | "questions" | "result">(() => savedResult && hasCompleted("assessment:personality") ? "result" : "intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const total = QUESTIONS.length;
  const question = QUESTIONS[index]!;
  const chosen = answers[index];

  const finish = () => {
    if (Object.keys(answers).length !== total) return;
    const result = scorePersonality(answers);
    setSavedResult(result);
    try { localStorage.setItem(key, result.id); } catch { /* device storage may be unavailable */ }
    complete({ key: "assessment:personality", xp: 100, label: "Personality assessment completed", effect: result.name });
    setStage("result");
  };

  if (stage === "intro") return <div className="mx-auto max-w-2xl space-y-6">
    <Card className="p-7 sm:p-10">
      <p className="text-xs font-bold uppercase tracking-[.16em] text-brand-700">Your first step / career clarity</p>
      <h1 className="mt-4 text-title text-ink">Discover how you naturally work.</h1>
      <p className="mt-4 max-w-xl text-muted">Before choosing a path, look at what comes naturally. These five situations reveal the strengths and environments that may fit you.</p>
      <p className="mt-3 text-sm text-muted">Choose the action that feels most natural to you, not just what you think is “right”.</p>
      <div className="mt-7 flex items-center justify-between border-t border-line pt-5 text-sm text-muted"><span>5 questions · about 5 minutes</span><span>+100 XP</span></div>
      <Button size="lg" className="mt-6" onClick={() => setStage("questions")}>Begin assessment <ArrowRight aria-hidden="true" className="size-4" /></Button>
    </Card>
  </div>;

  if (stage === "questions") return <div className="mx-auto max-w-2xl space-y-6">
    <div className="flex items-center justify-between text-sm font-semibold text-muted"><span>Question {index + 1} of {total}</span><span>{Math.round((index / total) * 100)}% complete</span></div>
    <ProgressBar value={(index / total) * 100} label="Personality assessment progress" color="var(--color-brand-500)" />
    <Card className="p-6 sm:p-8">
      <fieldset>
        <legend className="text-xl font-bold leading-snug text-ink">{question.question}</legend>
        {question.subtext && <p className="mt-2 text-sm text-muted">{question.subtext}</p>}
        <div className="mt-6 grid gap-3">
          {question.options.map((option, optionIndex) => <label key={option.text} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm leading-relaxed transition-colors ${chosen === optionIndex ? "border-brand-500 bg-brand-50 text-brand-800" : "border-line text-ink-soft hover:border-brand-300"}`}>
            <input type="radio" name={`personality-${index}`} className="mt-0.5 size-4 shrink-0 accent-[var(--color-brand-500)]" checked={chosen === optionIndex} onChange={() => setAnswers((previous) => ({ ...previous, [index]: optionIndex }))} />
            <span>{option.text}</span>
          </label>)}
        </div>
      </fieldset>
    </Card>
    <div className="flex justify-between gap-3"><Button variant="ghost" onClick={() => index ? setIndex(index - 1) : setStage("intro")}><ArrowLeft className="size-4" /> Back</Button><Button disabled={chosen === undefined} onClick={() => index === total - 1 ? finish() : setIndex(index + 1)}>{index === total - 1 ? "See my result" : "Next"}<ArrowRight className="size-4" /></Button></div>
  </div>;

  const result = savedResult;
  if (!result) return null;
  return <div className="mx-auto max-w-2xl space-y-5">
    <Card className="p-7 sm:p-10">
      <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-success"><Check className="size-4" /> Assessment complete</p>
      <p className="mt-7 text-sm font-semibold text-brand-700">{result.tagline}</p>
      <h1 className="mt-1 text-title text-ink">{result.name}</h1>
      <p className="mt-4 text-muted">{result.description}</p>
      <dl className="mt-8 divide-y divide-line border-y border-line">
        <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr]"><dt className="text-sm font-bold text-ink">Your strength</dt><dd className="text-sm text-muted">{result.superpower}</dd></div>
        <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr]"><dt className="text-sm font-bold text-ink">Watch for</dt><dd className="text-sm text-muted">{result.blindspot}</dd></div>
      </dl>
      <h2 className="mt-7 text-base font-bold text-ink">Roles to explore</h2>
      <ul className="mt-3 flex flex-wrap gap-2">{result.careers.map((career) => <li key={career} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft">{career}</li>)}</ul>
    </Card>
    <div className="flex flex-wrap items-center gap-3"><ButtonLink to="/dashboard">Continue to dashboard <ArrowRight className="size-4" /></ButtonLink><Link to="/assessments" className="text-sm font-semibold text-brand-700 hover:underline">All assessments</Link><Button variant="ghost" onClick={() => { setAnswers({}); setIndex(0); setStage("intro"); }}>Retake</Button></div>
    <p className="text-xs text-muted">A personality result offers a starting point for exploration. Your answers remain on this device.</p>
  </div>;
}
