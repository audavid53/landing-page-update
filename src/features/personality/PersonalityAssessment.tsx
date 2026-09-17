import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  Compass,
  Copy,
  Megaphone,
  Palette,
  RotateCcw,
  Share2,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
  Workflow,
  Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useProgress } from "@/state/useProgress";
import { useSession } from "@/state/SessionProvider";
import { PERSONALITIES, QUESTIONS, type CareerPersonality } from "./data";
import { scorePersonality } from "./scoring";

const resultKey = (email: string) => `icompass:personality-result:v1:${email}`;

// Gentle Web Audio feedback chime
function playSelectChime() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(540, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    // AudioContext may be blocked before interaction
  }
}

export function PersonalityAssessment() {
  const navigate = useNavigate();
  const { account } = useSession();
  const { complete, hasCompleted } = useProgress();
  const key = resultKey(account?.email ?? "guest");

  const [savedResult, setSavedResult] = useState<CareerPersonality | null>(() => {
    try {
      const id = localStorage.getItem(key);
      return id ? PERSONALITIES[id] ?? null : null;
    } catch {
      return null;
    }
  });

  const [stage, setStage] = useState<"intro-problem" | "intro-archetypes" | "questions" | "result">(() =>
    savedResult && hasCompleted("assessment:personality") ? "result" : "intro-problem"
  );
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedPreviewArchetype, setSelectedPreviewArchetype] = useState<string>("main_character");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Persistent quiz audio preference (default to true for automatic play)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("icompass:quiz:sound_enabled:v1");
      return saved !== "false";
    } catch {
      return true;
    }
  });

  const total = QUESTIONS.length;
  const question = QUESTIONS[index]!;
  const chosen = answers[index];

  // Speech synthesis reader for current slide
  const speakCurrentSlide = (force = false) => {
    if ((!soundEnabled && !force) || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    let text = "";
    if (stage === "intro-problem") {
      text = "Too many choice careers are dictated. It is time to choose by wiring. High-performing Nigerian professionals know their natural wiring, allowing them to thrive where their unique strengths shine.";
    } else if (stage === "intro-archetypes") {
      text = "Explore the eight Nigerian career archetypes. Discover your natural operating system and career pathways.";
    } else if (stage === "questions") {
      const optionsText = question.options
        .map((opt, idx) => `Option ${String.fromCharCode(65 + idx)}: ${opt.text}`)
        .join(". ");
      text = `${question.question}. ${question.subtext ? question.subtext + ". " : ""}${optionsText}`;
    } else if (stage === "result" && savedResult) {
      text = `Congratulations! Your Nigerian Career Archetype is ${savedResult.name}. ${savedResult.tagline}. ${savedResult.description}`;
    }

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.96;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((v) => v.lang.startsWith("en"));
    if (englishVoice) utterance.voice = englishVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  // Turn sound off once, and it persists for all remaining slides
  const toggleSound = () => {
    if (!("speechSynthesis" in window)) {
      alert("Audio is not supported on this browser.");
      return;
    }

    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("icompass:quiz:sound_enabled:v1", String(next));
      } catch {}

      if (!next) {
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
        setIsSpeaking(false);
      } else {
        setTimeout(() => speakCurrentSlide(true), 80);
      }
      return next;
    });
  };

  // Automatic play on slide or question change
  useEffect(() => {
    if (!soundEnabled) {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      return;
    }

    const timer = setTimeout(() => {
      speakCurrentSlide();
    }, 250);

    return () => {
      clearTimeout(timer);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    };
  }, [stage, index, soundEnabled]);

  // Confetti on reaching result stage
  useEffect(() => {
    if (stage === "result") {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#602de0", "#5525e8", "#f0a202", "#10b981", "#ec4899"],
        });
      } catch {
        // Confetti fallback
      }
    }
  }, [stage]);

  const handleSelectOption = (optionIndex: number) => {
    playSelectChime();
    setAnswers((prev) => ({ ...prev, [index]: optionIndex }));
  };

  const finish = () => {
    if (Object.keys(answers).length !== total) return;
    const result = scorePersonality(answers);
    setSavedResult(result);
    try {
      localStorage.setItem(key, result.id);
    } catch {
      // Storage unavailable
    }
    complete({
      key: "assessment:personality",
      xp: 100,
      label: "Personality assessment completed",
      effect: result.name,
    });
    setStage("result");
  };

  const copyStatusCardText = (result: CareerPersonality) => {
    const text = `🧭 My iCompass Career Archetype is: ${result.name.toUpperCase()} (${result.tagline})!\n\n⚡ Superpower: ${result.superpower}\n👑 Wired like: ${result.leader.name} (${result.leader.title})\n\n💡 "${result.statusPunchline}"\n\nFind your authentic career wiring at https://icompass.ng`;
    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  const shareToWhatsApp = (result: CareerPersonality) => {
    const text = `🧭 My iCompass Career Archetype is: *${result.name.toUpperCase()}* (${result.tagline})!\n\n⚡ *Superpower:* ${result.superpower}\n👑 *Wired like:* ${result.leader.name}\n\n💡 _"${result.statusPunchline}"_\n\nFind your own career wiring on iCompass: https://icompass.ng`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Helper icon renderer
  const getArchetypeIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="size-4" />;
      case "Megaphone":
        return <Megaphone className="size-4" />;
      case "Palette":
        return <Palette className="size-4" />;
      case "BrainCircuit":
        return <Brain className="size-4" />;
      case "Share2":
        return <Share2 className="size-4" />;
      case "ShieldCheck":
        return <ShieldCheck className="size-4" />;
      case "Workflow":
        return <Workflow className="size-4" />;
      default:
        return <Compass className="size-4" />;
    }
  };

  /* ============================================================================
     STAGE 1: THE CAREER TRAP (Reference App Problem Slide)
     ========================================================================== */
  if (stage === "intro-problem") {
    return (
      <div className="mx-auto max-w-4xl space-y-6 pb-12 animate-pop-in">
        {/* Top Eyebrow */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold tracking-wider text-brand-700 uppercase">
            Career Clarity Assessment
          </span>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleSound}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all border ${
                soundEnabled
                  ? isSpeaking
                    ? "border-brand-500 bg-brand-50 text-brand-700 animate-pulse ring-2 ring-brand-200"
                    : "border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100"
                  : "border-slate-300 bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
              title={soundEnabled ? "Mute quiz audio (applies to all slides)" : "Turn on quiz sound"}
              aria-label={soundEnabled ? "Mute audio" : "Unmute audio"}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="size-3.5 text-brand-600" />
                  <span>{isSpeaking ? "Speaking..." : "Sound: On"}</span>
                </>
              ) : (
                <>
                  <VolumeX className="size-3.5 text-slate-400" />
                  <span>Sound: Muted</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setStage("questions")}
              className="text-xs font-bold text-muted hover:text-ink transition-colors"
            >
              Skip to Quiz →
            </button>
          </div>
        </div>

        {/* Central Split Layout */}
        <div className="grid gap-8 md:grid-cols-2 items-stretch">
          {/* Left Column: Problem Statement */}
          <div className="flex flex-col justify-between space-y-6 rounded-[28px] border border-line bg-white p-7 sm:p-9 shadow-sm">
            <div className="space-y-4">
              <h1 className="text-[clamp(1.75rem,3.2vw,2.35rem)] font-extrabold leading-[1.12] tracking-[-.035em] text-ink">
                Too many choice careers{" "}
                <span className="text-rose-500 line-through decoration-rose-300">are dictated.</span>
                <br />
                It is time to choose <span className="text-brand-600 font-extrabold">by wiring.</span>
              </h1>
              <p className="text-base leading-relaxed text-ink-soft">
                Studies show that virtually all high-performing Nigerian professionals know their natural wiring—allowing
                them to thrive in environments where their unique strengths shine.
              </p>
              <p className="rounded-2xl border-l-4 border-brand-500 bg-brand-50/70 p-4 text-sm leading-relaxed text-brand-900 font-medium">
                Yet too many Nigerians choose careers dictated by JAMB cut-off marks, parental expectations, or pure
                circumstance—fighting their natural cognitive wiring every single day.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                size="lg"
                onClick={() => setStage("intro-archetypes")}
                className="w-full sm:w-auto shadow-md border-b-4 border-brand-700 active:border-b-0 active:translate-y-1"
              >
                Explore The 8 Archetypes
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          {/* Right Column: Spotlight on Tony Elumelu & Social Proof */}
          <div className="relative flex flex-col justify-between rounded-[28px] border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-amber-50/50 p-6 sm:p-7 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">Leadership Perspective</span>
              </div>

              {/* Leader Photo Box */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/60 shadow-md">
                <img
                  src="/images/expert_tony_1782720367131.jpg"
                  alt="Tony O. Elumelu, CFR"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="font-extrabold text-lg leading-tight">Tony O. Elumelu, CFR</p>
                  <p className="text-xs text-brand-200 font-mono">Economist, Banker & Philanthropist</p>
                </div>
              </div>

              <blockquote className="rounded-xl bg-white/90 p-3.5 text-xs sm:text-sm italic leading-relaxed text-ink-soft border border-line shadow-sm">
                "Understanding your innate wiring unlocks the confidence to command rooms, scale empires, and champion
                youth empowerment across Africa."
              </blockquote>
            </div>

            <div className="mt-4 border-t border-line pt-3.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Icons who know their wiring:</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  "Ebuka Obi-Uchendu",
                  "Dr. Ngozi Okonjo-Iweala",
                  "Mai Atafo",
                  "Gbenga Agboola",
                  "Tunde Onakoya",
                  "Dr. Ola Brown",
                ].map((name) => (
                  <span
                    key={name}
                    className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-ink-soft border border-line shadow-2xs"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================================
     STAGE 2: THE 8 ARCHETYPES PREVIEW (Reference App Curiosity Slide)
     ========================================================================== */
  if (stage === "intro-archetypes") {
    const activeArchetype = PERSONALITIES[selectedPreviewArchetype] ?? PERSONALITIES.main_character!;
    return (
      <div className="mx-auto max-w-5xl space-y-6 pb-12 animate-pop-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Nigerian Career Archetypes
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Which archetype is your natural operating system?
            </h1>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleSound}
              className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition-all border ${
                soundEnabled
                  ? isSpeaking
                    ? "border-brand-500 bg-brand-50 text-brand-700 animate-pulse ring-2 ring-brand-200"
                    : "border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100"
                  : "border-slate-300 bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
              title={soundEnabled ? "Mute quiz audio" : "Turn on quiz sound"}
              aria-label={soundEnabled ? "Mute audio" : "Unmute audio"}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="size-3.5 text-brand-600" />
                  <span>{isSpeaking ? "Speaking..." : "Sound: On"}</span>
                </>
              ) : (
                <>
                  <VolumeX className="size-3.5 text-slate-400" />
                  <span>Sound: Muted</span>
                </>
              )}
            </button>
            <Button
              size="lg"
              onClick={() => setStage("questions")}
              className="shrink-0 border-b-4 border-brand-700 active:border-b-0 active:translate-y-1 shadow-md"
            >
              Start Quiz (+100 XP) ⚡
            </Button>
          </div>
        </div>

        {/* Grid of 8 Archetypes with Celebrity Leader Photos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {Object.values(PERSONALITIES).map((item) => {
            const isSelected = item.id === selectedPreviewArchetype;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedPreviewArchetype(item.id)}
                className={`relative flex flex-col items-center rounded-2xl p-3 sm:p-4 text-center transition-all border-2 ${
                  isSelected
                    ? "border-brand-500 bg-brand-50/80 shadow-md scale-[1.02] border-b-4 border-b-brand-700"
                    : "border-line bg-white hover:border-brand-300 hover:bg-canvas border-b-4 border-b-slate-200"
                }`}
              >
                <div className="relative size-14 sm:size-16 overflow-hidden rounded-full border-2 border-brand-400/80 shadow-sm">
                  <img
                    src={item.leader.image}
                    alt={item.leader.name}
                    className="size-full object-cover"
                  />
                </div>
                <p className="mt-2 text-xs sm:text-sm font-extrabold text-ink leading-tight">{item.name}</p>
                <p className="text-[10px] sm:text-[11px] font-semibold text-brand-700 mt-0.5">{item.tagline}</p>
                <span className="mt-1 text-[10px] text-muted line-clamp-1">{item.leader.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Archetype Deep Dive Card */}
        <Card className="p-6 sm:p-8 bg-gradient-to-br from-white via-surface to-brand-50/40 border-2 border-brand-200 shadow-sm">
          <div className="grid gap-6 md:grid-cols-[1fr_240px] items-center">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-brand-700 uppercase tracking-wide">
                  {activeArchetype.badge}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-ink">
                {activeArchetype.name} — <span className="text-brand-700">{activeArchetype.tagline}</span>
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-ink-soft">{activeArchetype.description}</p>
              
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs">
                  <p className="font-bold text-emerald-800">⚡ Superpower:</p>
                  <p className="mt-0.5 text-emerald-900">{activeArchetype.superpower}</p>
                </div>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs">
                  <p className="font-bold text-amber-800">⚠️ Watch For:</p>
                  <p className="mt-0.5 text-amber-900">{activeArchetype.blindspot}</p>
                </div>
              </div>
            </div>

            {/* Leader Spotlight Column */}
            <div className="flex flex-col items-center text-center rounded-2xl border border-line bg-white p-4 shadow-sm">
              <div className="size-20 overflow-hidden rounded-full border-2 border-brand-500 shadow-md">
                <img
                  src={activeArchetype.leader.image}
                  alt={activeArchetype.leader.name}
                  className="size-full object-cover"
                />
              </div>
              <p className="mt-2.5 font-bold text-ink text-sm leading-tight">{activeArchetype.leader.name}</p>
              <p className="text-[11px] text-muted leading-tight mt-0.5">{activeArchetype.leader.title}</p>
              <p className="mt-2 text-[11px] italic text-ink-soft leading-relaxed border-t border-line pt-2">
                "{activeArchetype.leader.quote}"
              </p>
            </div>
          </div>
        </Card>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <Button variant="ghost" onClick={() => setStage("intro-problem")}>
            <ArrowLeft className="size-4" /> Back to The Problem
          </Button>
          <Button
            size="lg"
            onClick={() => setStage("questions")}
            className="border-b-4 border-brand-700 active:border-b-0 active:translate-y-1 shadow-md"
          >
            Take 5-Question Quiz <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    );
  }

  /* ============================================================================
     STAGE 3: DUOLINGO-STYLE QUIZ WITH TEXT-TO-SPEECH (TTS)
     ========================================================================== */
  if (stage === "questions") {
    const progressPercent = Math.round((index / total) * 100);

    return (
      <div className="mx-auto max-w-2xl space-y-6 pb-16 animate-pop-in">
        {/* Duolingo Top Header Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => (index ? setIndex(index - 1) : setStage("intro-archetypes"))}
              className="grid size-9 place-items-center rounded-full text-muted hover:bg-canvas hover:text-ink transition-colors"
              aria-label="Previous question"
            >
              <ArrowLeft className="size-5" />
            </button>

            {/* Chunky Duolingo Progress Bar */}
            <div className="relative h-4 flex-1 overflow-hidden rounded-full bg-slate-200 p-0.5 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-300 relative shadow-sm"
                style={{ width: `${progressPercent}%` }}
              >
                {/* Gloss highlight */}
                <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-white/30" />
              </div>
            </div>

            {/* XP Spark Indicator */}
            <div className="flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-extrabold text-amber-700">
              <Zap className="size-3.5 fill-amber-500 text-amber-500 animate-pulse" />
              <span>100 XP</span>
            </div>
          </div>

          <div className="flex items-center justify-between px-1 text-xs font-semibold text-muted">
            <span>Question {index + 1} of {total}</span>
            <span>{progressPercent}% complete</span>
          </div>
        </div>

        {/* Question Container Card */}
        <div className="rounded-[28px] border-2 border-b-4 border-slate-200 bg-white p-6 sm:p-9 shadow-sm space-y-6">
          {/* Question Title & TTS Audio Button */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink leading-snug tracking-tight">
                {question.question}
              </h2>
              {question.subtext && (
                <p className="text-sm text-muted leading-relaxed">{question.subtext}</p>
              )}
            </div>

            {/* Audio / Text-To-Speech Button */}
            <button
              type="button"
              onClick={toggleSound}
              title={soundEnabled ? "Sound is on (click to mute for all remaining questions)" : "Sound is muted (click to unmute)"}
              aria-label={soundEnabled ? "Mute quiz audio" : "Unmute quiz audio"}
              className={`shrink-0 flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition-all border-2 border-b-4 active:border-b-2 active:translate-y-0.5 ${
                soundEnabled
                  ? isSpeaking
                    ? "border-brand-500 bg-brand-100 text-brand-800 animate-pulse ring-2 ring-brand-200"
                    : "border-brand-300 bg-brand-50 text-brand-700 hover:bg-brand-100/60"
                  : "border-slate-300 bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="size-4 text-brand-600" />
                  <span className="hidden sm:inline">{isSpeaking ? "Speaking..." : "Sound On"}</span>
                </>
              ) : (
                <>
                  <VolumeX className="size-4 text-slate-400" />
                  <span className="hidden sm:inline">Sound Muted</span>
                </>
              )}
            </button>
          </div>

          {/* Duolingo-style Tactile Options */}
          <div className="grid gap-3 pt-2" role="radiogroup" aria-label="Question choices">
            {question.options.map((option, optIdx) => {
              const isOptionChosen = chosen === optIdx;
              const letterKey = String.fromCharCode(65 + optIdx);

              return (
                <button
                  key={option.text}
                  type="button"
                  role="radio"
                  aria-checked={isOptionChosen}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`relative flex items-center gap-3.5 rounded-2xl p-4 text-left transition-all border-2 ${
                    isOptionChosen
                      ? "border-brand-500 border-b-4 border-b-brand-700 bg-brand-50/80 text-brand-950 shadow-md translate-y-[-1px]"
                      : "border-slate-200 border-b-4 border-b-slate-300 bg-white hover:border-brand-300 hover:bg-brand-50/20 active:border-b-2 active:translate-y-1"
                  }`}
                >
                  {/* Keyboard Badge Key (A, B, C, D) */}
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-xl font-mono text-xs font-bold transition-colors ${
                      isOptionChosen
                        ? "bg-brand-500 text-white shadow-xs"
                        : "bg-slate-100 text-ink-soft border border-slate-200"
                    }`}
                  >
                    {letterKey}
                  </span>

                  <span className="flex-1 text-sm sm:text-[15px] font-medium leading-relaxed">
                    {option.text}
                  </span>

                  {isOptionChosen && (
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                      <Check className="size-3.5 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Duolingo Sticky Bottom Action Bar */}
        <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
          <Button
            variant="ghost"
            onClick={() => (index ? setIndex(index - 1) : setStage("intro-archetypes"))}
            className="text-muted hover:text-ink"
          >
            <ArrowLeft className="size-4" /> Back
          </Button>

          <Button
            size="lg"
            disabled={chosen === undefined}
            onClick={() => (index === total - 1 ? finish() : setIndex(index + 1))}
            className="min-w-[180px] shadow-lg border-b-4 border-brand-700 active:border-b-0 active:translate-y-1 font-extrabold text-sm"
          >
            {index === total - 1 ? "See My Archetype Result" : "Continue"}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    );
  }

  /* ============================================================================
     STAGE 4: REDESIGNED RESULT & WHATSAPP / INSTAGRAM STATUS SHARE CARD
     ========================================================================== */
  const result = savedResult;
  if (!result) return null;

  const studentFirstName = account?.name?.split(" ")[0]?.toUpperCase() ?? "MY";

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-16 animate-pop-in">
      {/* Top Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <Check className="size-4 text-emerald-600 stroke-[3]" />
          Diagnostic Complete • +100 XP Awarded
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
          Your Career Archetype is identified.
        </h1>
        <p className="text-muted text-sm sm:text-base max-w-md mx-auto">
          Here is your natural operating blueprint, how it creates value in Nigeria, and what to watch out for.
        </p>
      </div>

      {/* Grid: Left Main Analysis / Right Shareable Status Card */}
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
        {/* Left Column: Full Archetype Report */}
        <div className="space-y-6">
          <Card className="p-6 sm:p-8 space-y-5 border-2 border-brand-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  {result.tagline}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">{result.name}</h2>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white shadow-xs">
                {getArchetypeIcon(result.iconName)}
                {result.badge}
              </span>
            </div>

            <p className="text-ink-soft text-sm sm:text-base leading-relaxed">{result.description}</p>

            {/* Superpower and Watch For */}
            <div className="grid gap-3 sm:grid-cols-2 pt-2">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/60 p-4 space-y-1">
                <p className="font-extrabold text-xs text-emerald-800 uppercase tracking-wider">⚡ Superpower</p>
                <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                  {result.superpower}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-500/20 bg-amber-50/60 p-4 space-y-1">
                <p className="font-extrabold text-xs text-amber-800 uppercase tracking-wider">⚠️ Blindspot to Guard</p>
                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                  {result.blindspot}
                </p>
              </div>
            </div>

            {/* Recommended Careers */}
            <div className="border-t border-line pt-4 space-y-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted">
                High-Leverage Career Paths for You
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.careers.map((career) => (
                  <span
                    key={career}
                    className="rounded-full border border-brand-200 bg-brand-50/60 px-3.5 py-1 text-xs font-bold text-brand-800"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* "Why This Matters" Section */}
          <Card className="p-6 sm:p-8 space-y-4 border-line">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand-500" />
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-700">
                Why This Matters for Your Career
              </h3>
            </div>
            <p className="text-ink-soft text-sm sm:text-base leading-relaxed">{result.whyItMatters}</p>

            {/* Connected Icon Quote Box */}
            <div className="rounded-2xl border border-line bg-canvas/70 p-4.5 flex items-center gap-4">
              <img
                src={result.leader.image}
                alt={result.leader.name}
                className="size-16 shrink-0 rounded-full border-2 border-brand-400 object-cover shadow-sm"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted font-bold">Wired like:</p>
                <p className="text-sm font-extrabold text-ink leading-tight">{result.leader.name}</p>
                <p className="text-[11px] text-brand-700 leading-tight">{result.leader.title}</p>
                <p className="mt-1 text-xs italic text-muted leading-relaxed line-clamp-2">
                  "{result.leader.quote}"
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: High-Impact WhatsApp / Instagram Status Card */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Shareable Status Card
            </span>
            <span className="text-[11px] font-semibold text-muted">WhatsApp / Instagram Ready</span>
          </div>

          {/* The Physical Status Card (4:5 Ratio Visual) */}
          <div
            id="status-card-preview"
            className="relative mx-auto w-full max-w-[370px] overflow-hidden rounded-[32px] border-2 border-white/20 bg-gradient-to-b from-[#180f3b] via-[#120a2e] to-[#0a051d] p-6 text-white shadow-2xl text-left flex flex-col justify-between aspect-[4/5]"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-12 -right-12 size-40 rounded-full bg-brand-500/25 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 size-40 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />

            {/* Card Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-1.5">
                <Compass className="size-4 text-brand-300" />
                <span className="text-[11px] font-mono font-extrabold tracking-widest text-brand-200">ICOMPASS</span>
              </div>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-200 border border-white/10">
                {studentFirstName}'S BLUEPRINT
              </span>
            </div>

            {/* Center Visual: Prism + Archetype Title */}
            <div className="relative z-10 py-4 text-center space-y-3">
              <div className="relative mx-auto size-28 overflow-hidden rounded-2xl border-2 border-white/30 shadow-lg">
                <img
                  src="/images/cca_result_prism_1782672155873.jpg"
                  alt="Career Prism"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-1.5 inset-x-2 rounded-md bg-brand-500/90 py-0.5 text-[10px] font-extrabold text-white">
                  {result.badge}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-white leading-tight">
                  {result.name}
                </h3>
                <p className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                  {result.tagline}
                </p>
              </div>

              <p className="text-xs leading-relaxed text-slate-200 italic px-2 line-clamp-3">
                "{result.statusPunchline}"
              </p>
            </div>

            {/* Card Footer: Social Proof & URL */}
            <div className="relative z-10 border-t border-white/10 pt-3 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <img
                  src={result.leader.image}
                  alt={result.leader.name}
                  className="size-7 rounded-full border border-white/40 object-cover"
                />
                <div className="text-left leading-tight">
                  <p className="text-[10px] text-white/60">Wired like:</p>
                  <p className="font-bold text-white text-[11px]">{result.leader.name.split(",")[0]}</p>
                </div>
              </div>
              <span className="font-mono text-[10px] text-brand-300 tracking-wider">icompass.ng</span>
            </div>
          </div>

          {/* Share Action Buttons */}
          <div className="flex flex-col gap-2 pt-1 max-w-[370px] mx-auto">
            <button
              type="button"
              onClick={() => shareToWhatsApp(result)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#20bd5a] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Share2 className="size-4" />
              Share to WhatsApp Status
            </button>

            <button
              type="button"
              onClick={() => copyStatusCardText(result)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-line bg-white px-5 py-2.5 text-xs font-bold text-ink hover:bg-canvas transition-colors"
            >
              <Copy className="size-3.5" />
              {copiedToast ? "Copied to Clipboard! 🎉" : "Copy Shareable Summary Text"}
            </button>
          </div>

          {/* Primary Proceed CTA */}
          <div className="pt-4 max-w-[370px] mx-auto">
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="w-full shadow-lg border-b-4 border-brand-700 active:border-b-0 active:translate-y-1 font-extrabold"
            >
              Continue to 4-Week Roadmap <ArrowRight className="size-4" />
            </Button>
            <div className="mt-3 flex items-center justify-center gap-4 text-xs font-semibold text-muted">
              <Link to="/dashboard" className="hover:text-brand-700">
                Go to Dashboard
              </Link>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setIndex(0);
                  setStage("intro-problem");
                }}
                className="hover:text-brand-700 inline-flex items-center gap-1"
              >
                <RotateCcw className="size-3" /> Retake Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

