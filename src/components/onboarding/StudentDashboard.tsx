import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronRight,
  ClipboardCheck,
  Compass,
  Copy,
  FileText,
  GraduationCap,
  Lock,
  MessageCircle,
  Mic,
  MoreHorizontal,
  Rocket,
  ShieldCheck,
  Target,
  User,
  Users,
  Video,
  X,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSession } from "@/state/SessionProvider";
import { useAdmission } from "@/state/AdmissionProvider";
import { PERSONALITIES } from "@/features/personality/data";

const STEPS = [
  {
    id: "guardian",
    stepNum: "1",
    title: "Onboard your guardian",
    short: "Guardian",
    subtext: "Your name and guardian details",
    description: "Add a parent or guardian to your profile for consent and updates.",
    icon: ShieldCheck,
  },
  {
    id: "subscription",
    stepNum: "2",
    title: "Pick your subscription",
    short: "Subscription",
    subtext: "Choose your plan",
    description: "Select the subscription package that best matches your learning goals.",
    icon: Rocket,
  },
  {
    id: "accountability",
    stepNum: "3",
    title: "Accountability partner",
    short: "Accountability",
    subtext: "Team members and roles",
    description: "Invite an accountability partner to keep each other on track throughout your journey.",
    icon: Users,
  },
  {
    id: "interview",
    stepNum: "4",
    title: "Registration interview",
    short: "Interview",
    subtext: "Control access and voice check",
    description: "A short, conversational voice interview to understand your background and goals.",
    icon: Video,
  },
  {
    id: "profile",
    stepNum: "5",
    title: "Complete your profile",
    short: "Profile",
    subtext: "Review and launch",
    description: "Finalize your city, target industry, and career aspirations.",
    icon: ClipboardCheck,
  },
];

export function StudentDashboard() {
  const { account } = useSession();
  const { state: admission, update: updateAdmission } = useAdmission();

  let personality = null;
  try {
    const id = localStorage.getItem(`icompass:personality-result:v1:${account?.email}`);
    personality = id ? PERSONALITIES[id] ?? null : null;
  } catch {
    // device storage fallback
  }

  // Learner details from reference images
  const learnerName = account?.name ?? "Arere-Uzezi Ogheneyole David";
  const archetypeTitle = personality?.name ?? "Main Character";

  // Step completion flags
  const isDone = [
    Boolean(admission.guardian),
    Boolean(admission.subscription),
    Boolean(admission.friend?.inviteCopied),
    Boolean(admission.interviewComplete),
    Boolean(admission.profile),
  ];

  const doneCount = isDone.filter(Boolean).length;
  const firstIncomplete = isDone.findIndex((done) => !done);
  const activeStepIndex = firstIncomplete === -1 ? 4 : firstIncomplete;

  // Currently selected step in desktop wizard view
  const [selectedStep, setSelectedStep] = useState(activeStepIndex);
  useEffect(() => {
    setSelectedStep(activeStepIndex);
  }, [activeStepIndex]);

  // Selected plan option in Subscription step: "starter" | "pro" | "enterprise"
  const [selectedPlan, setSelectedPlan] = useState<string>(
    admission.subscription === "scholarship" ? "starter" : "pro"
  );
  const [showMobilePlanModal, setShowMobilePlanModal] = useState(false);

  // Accountability partner state
  const [friendName, setFriendName] = useState(admission.friend?.name ?? "");
  const [copySuccess, setCopySuccess] = useState(false);
  const inviteLink = admission.friend
    ? `${window.location.origin}/?invite=${admission.friend.code}`
    : `${window.location.origin}/?invite=icompass-peer`;

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      updateAdmission({
        friend: {
          name: friendName.trim() || admission.friend?.name || "Accountability Partner",
          code: admission.friend?.code || crypto.randomUUID().slice(0, 8),
          inviteCopied: true,
        },
      });
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch {
      setCopySuccess(false);
    }
  };

  const handleCreateInvite = () => {
    if (!friendName.trim()) return;
    updateAdmission({
      friend: {
        name: friendName.trim(),
        code: crypto.randomUUID().slice(0, 8),
        inviteCopied: true,
      },
    });
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    updateAdmission({
      subscription: plan === "starter" ? "scholarship" : "paid",
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1120px] space-y-8 pb-16 animate-fade-in">
      {/* =========================================================================
          TOP BANNER: GREETING & RADIANT PROFILE HEADER (Matches Reference Image 2)
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-4">
          {/* Glowing Radiant Avatar */}
          <div className="relative size-16 sm:size-20 shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-600 via-sky-400 to-indigo-500 blur-md opacity-75 animate-pulse" />
            <div className="relative size-full overflow-hidden rounded-full border-2 border-white bg-brand-500 shadow-xl flex items-center justify-center">
              <img
                src="/images/profile_david.jpg"
                alt={learnerName}
                className="size-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-medium text-muted">Good to see you,</p>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-ink">
              {learnerName}
            </h1>
            <p className="mt-0.5 text-xs sm:text-sm text-ink-soft">
              Build your skills. Create your opportunities. Shape your future.
            </p>
          </div>
        </div>

        <div className="self-start sm:self-center">
          <Link
            to="/assessments/personality"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1.5 transition-colors"
          >
            <span>{archetypeTitle}</span>
            <ChevronRight className="size-3.5 text-muted" />
          </Link>
        </div>
      </div>

      {/* ADMISSION STATUS BANNER */}
      <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/80 via-white to-orange-50/50 p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-500/15 text-amber-700 border border-amber-500/30">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm sm:text-base font-extrabold text-ink leading-tight">
                  Admission Status: Application In Progress
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-800 uppercase tracking-wider">
                  ● Review In Progress
                </span>
              </div>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                Cohort 2025 · Complete the 5 steps below to submit your file for final faculty approval and unlock platform features.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
            <div className="text-right">
              <p className="text-xs font-bold text-ink">{isDone.filter(Boolean).length} of 5 Completed</p>
              <div className="mt-1 w-28 h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${(isDone.filter(Boolean).length / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          DESKTOP VIEW: SPLIT STEP WIZARD & SUBSCRIPTION (Matches Reference Image 2)
          Visible on screens >= lg
          ========================================================================= */}
      <div className="hidden lg:block space-y-8">
        {/* Main Split Container */}
        <div className="rounded-[32px] border border-line/80 bg-white p-7 sm:p-9 shadow-card">
          <div className="grid grid-cols-[330px_1fr] gap-8 items-stretch">
            {/* Left Column: 5 Connected Vertical Steps */}
            <div className="relative flex flex-col justify-between border-r border-line/70 pr-6 space-y-3">
              {STEPS.map((step, idx) => {
                const complete = isDone[idx];
                const isSelected = selectedStep === idx;
                const isLocked = idx > activeStepIndex;

                return (
                  <div key={step.id} className="relative">
                    {/* Vertical Connector Line */}
                    {idx < STEPS.length - 1 && (
                      <div
                        className={`absolute left-[19px] top-[42px] bottom-[-14px] w-[2px] ${
                          complete ? "bg-emerald-500" : "bg-slate-200"
                        }`}
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedStep(idx)}
                      className={`relative z-10 w-full flex items-center gap-3.5 rounded-2xl p-3 text-left transition-all ${
                        isSelected
                          ? "bg-brand-500/10 border-2 border-brand-500 shadow-sm translate-x-1"
                          : "hover:bg-canvas border-2 border-transparent"
                      }`}
                    >
                      {/* Step Circle Indicator */}
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-full font-bold text-xs transition-all ${
                          complete
                            ? "bg-emerald-500 text-white shadow-xs"
                            : isSelected
                            ? "bg-brand-500 text-white shadow-md ring-4 ring-brand-100"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {complete ? (
                          <Check className="size-4 stroke-[3]" />
                        ) : (
                          step.stepNum
                        )}
                      </span>

                      {/* Step Title & Subtext */}
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm font-extrabold leading-tight ${
                            isSelected ? "text-brand-900" : "text-ink"
                          }`}
                        >
                          {step.stepNum}. {step.title}
                        </p>
                        <p className="text-[11px] text-muted truncate mt-0.5">
                          {step.subtext}
                        </p>
                      </div>

                      {/* Right Indicator Icon */}
                      {isSelected ? (
                        <ChevronRight className="size-4 text-brand-600 shrink-0" />
                      ) : isLocked ? (
                        <Lock className="size-3.5 text-slate-300 shrink-0" />
                      ) : null}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Step Content View */}
            <div className="flex flex-col justify-between pl-2 min-h-[460px]">
              {/* STEP 2: SUBSCRIPTION SELECTION (Exact Reference Image 2 UI) */}
              {selectedStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-ink tracking-tight">
                      Pick the subscription that suits your team.
                    </h2>
                    <p className="text-sm text-muted mt-1">
                      Choose the right features for your 4-week cohort journey.
                    </p>
                  </div>

                  {/* 3 Pricing Cards */}
                  <div className="grid grid-cols-3 gap-4 pt-1 items-stretch">
                    {/* Free: iPlace Scholarship Scheme */}
                    <div
                      onClick={() => handleSelectPlan("starter")}
                      className={`relative cursor-pointer flex flex-col justify-between rounded-2xl border-2 p-5 transition-all bg-white hover:border-emerald-400 ${
                        selectedPlan === "starter"
                          ? "border-emerald-500 bg-emerald-50/25 shadow-md ring-2 ring-emerald-200"
                          : "border-line"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <GraduationCap className="size-5" />
                          </div>
                          <span className="rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800">
                            60 slots left
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-ink text-base">iPlace Scholarship</h3>
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">Free</span>
                          </div>
                          <p className="text-xs text-muted mt-1 leading-relaxed">
                            Fully funded 4-week cohort pass sponsored by verified industry partners.
                          </p>
                        </div>
                        <ul className="space-y-2 text-xs text-ink-soft pt-2">
                          <li className="flex items-center gap-2">
                            <Check className="size-3.5 text-emerald-600 stroke-[3]" /> Full 4-Week Cohort Access
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="size-3.5 text-emerald-600 stroke-[3]" /> Mentorship & Community
                          </li>
                          <li className="flex items-center gap-2 font-semibold text-emerald-800">
                            <Check className="size-3.5 text-emerald-600 stroke-[3]" /> 60 Scholarship Slots Left
                          </li>
                        </ul>
                      </div>

                      <div className="mt-6 pt-3 border-t border-line/60 flex items-center gap-2 text-xs font-bold text-emerald-800">
                        <span
                          className={`size-4 rounded-full border flex items-center justify-center ${
                            selectedPlan === "starter"
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {selectedPlan === "starter" && <span className="size-1.5 rounded-full bg-white" />}
                        </span>
                        <span>Select Scholarship</span>
                      </div>
                    </div>

                    {/* Pro Plan (Recommended) */}
                    <div
                      onClick={() => handleSelectPlan("pro")}
                      className={`relative cursor-pointer flex flex-col justify-between rounded-2xl border-2 p-5 transition-all bg-white hover:border-brand-400 ${
                        selectedPlan === "pro"
                          ? "border-brand-500 bg-gradient-to-b from-brand-50/40 via-white to-white shadow-lg ring-2 ring-brand-400"
                          : "border-line"
                      }`}
                    >
                      {/* Recommended Floating Badge */}
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-0.5 text-[10px] font-extrabold text-white uppercase tracking-wider shadow-xs">
                        Recommended
                      </span>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600 border border-brand-100 shadow-2xs">
                            <Rocket className="size-5" />
                          </div>
                          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-extrabold text-brand-700 border border-brand-200">
                            ₦25k/month
                          </span>
                        </div>
                        <div>
                          <h3 className="font-extrabold text-ink text-base">Pro</h3>
                          <p className="text-xs text-muted mt-1 leading-relaxed">
                            Best for growing teams and serious learners.
                          </p>
                        </div>
                        <ul className="space-y-2 text-xs text-ink-soft pt-2">
                          <li className="flex items-center gap-2">
                            <Check className="size-3.5 text-brand-600 stroke-[3]" /> Up to 10 Users
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="size-3.5 text-brand-600 stroke-[3]" /> Unlimited Projects
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="size-3.5 text-brand-600 stroke-[3]" /> Priority Support
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="size-3.5 text-brand-600 stroke-[3]" /> Advanced Analytics
                          </li>
                        </ul>
                      </div>

                      <div className="mt-6 pt-3 border-t border-line/60 flex items-center gap-2 text-xs font-bold text-brand-700">
                        <span
                          className={`size-4 rounded-full border flex items-center justify-center ${
                            selectedPlan === "pro"
                              ? "border-brand-600 bg-brand-600 text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {selectedPlan === "pro" && <span className="size-1.5 rounded-full bg-white" />}
                        </span>
                        <span>Choose</span>
                      </div>
                    </div>

                    {/* Enterprise Plan */}
                    <div
                      onClick={() => handleSelectPlan("enterprise")}
                      className={`relative cursor-pointer flex flex-col justify-between rounded-2xl border-2 p-5 transition-all bg-white hover:border-brand-300 ${
                        selectedPlan === "enterprise"
                          ? "border-brand-500 bg-brand-50/20 shadow-md ring-2 ring-brand-200"
                          : "border-line"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                            <ShieldCheck className="size-5" />
                          </div>
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                            Contact Sales
                          </span>
                        </div>
                        <div>
                          <h3 className="font-extrabold text-ink text-base">Enterprise</h3>
                          <p className="text-xs text-muted mt-1 leading-relaxed">
                            For large organizations & schools.
                          </p>
                        </div>
                        <ul className="space-y-2 text-xs text-ink-soft pt-2">
                          <li className="flex items-center gap-2">
                            <Check className="size-3.5 text-brand-600 stroke-[3]" /> Unlimited Users
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="size-3.5 text-brand-600 stroke-[3]" /> Dedicated Resources
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="size-3.5 text-brand-600 stroke-[3]" /> 24/7 Support
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="size-3.5 text-brand-600 stroke-[3]" /> Custom Integrations
                          </li>
                        </ul>
                      </div>

                      <div className="mt-6 pt-3 border-t border-line/60 flex items-center gap-2 text-xs font-bold text-ink">
                        <span
                          className={`size-4 rounded-full border flex items-center justify-center ${
                            selectedPlan === "enterprise"
                              ? "border-brand-600 bg-brand-600 text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {selectedPlan === "enterprise" && <span className="size-1.5 rounded-full bg-white" />}
                        </span>
                        <span>Choose</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: ACCOUNTABILITY PARTNER */}
              {selectedStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-ink tracking-tight">
                      Invite an accountability partner.
                    </h2>
                    <p className="text-sm text-muted mt-1">
                      Learners with an accountability partner are 3.5x more likely to finish the 4-week roadmap.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-line bg-canvas/40 p-6 space-y-4 max-w-lg">
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted">
                      Partner's First Name
                      <input
                        type="text"
                        value={friendName}
                        onChange={(e) => setFriendName(e.target.value)}
                        placeholder="e.g. Tobi, Chinedu, Fatima"
                        className="mt-2 block w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-ink focus:border-brand-500 focus:outline-none"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={handleCreateInvite}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-600 transition-colors"
                    >
                      Create Invite Link <ArrowRight className="size-3.5" />
                    </button>

                    {admission.friend && (
                      <div className="pt-3 border-t border-line/80 space-y-2">
                        <p className="text-xs font-bold text-ink">Shareable invitation link:</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            readOnly
                            value={inviteLink}
                            className="flex-1 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-mono text-ink-soft"
                          />
                          <button
                            type="button"
                            onClick={copyInviteLink}
                            className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink hover:bg-canvas transition-colors"
                          >
                            {copySuccess ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                            <span>{copySuccess ? "Copied" : "Copy"}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 1: ONBOARD YOUR GUARDIAN */}
              {selectedStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-ink tracking-tight">
                      Onboard your parent or guardian.
                    </h2>
                    <p className="text-sm text-muted mt-1">
                      Guardian consent enables scholarship eligibility and cohort certification.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-line bg-canvas/40 p-6 space-y-4 max-w-lg">
                    {admission.guardian ? (
                      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900 text-sm">
                        <p className="font-bold">Guardian Verified</p>
                        <p className="text-xs mt-0.5">
                          {admission.guardian.name} ({admission.guardian.relationship}) · {admission.guardian.email}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-ink-soft leading-relaxed">
                        Add your guardian details in your profile to complete this milestone.
                      </p>
                    )}

                    <Link
                      to="/profile#guardian"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-600 transition-colors"
                    >
                      {admission.guardian ? "Edit Guardian Info" : "Add Guardian in Profile"}{" "}
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* STEP 4: REGISTRATION INTERVIEW */}
              {selectedStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-ink tracking-tight">
                      Conversational Voice Interview
                    </h2>
                    <p className="text-sm text-muted mt-1">
                      A brief 5-minute recorded dialogue to understand your career motivations.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-line bg-canvas/40 p-6 space-y-4 max-w-lg">
                    <ul className="grid grid-cols-3 gap-2 text-xs text-ink-soft">
                      <li className="flex items-center gap-2 rounded-xl bg-white p-3 border border-line">
                        <Video className="size-4 text-brand-600" /> Camera Ready
                      </li>
                      <li className="flex items-center gap-2 rounded-xl bg-white p-3 border border-line">
                        <Mic className="size-4 text-brand-600" /> Clear Audio
                      </li>
                      <li className="flex items-center gap-2 rounded-xl bg-white p-3 border border-line">
                        <ShieldCheck className="size-4 text-brand-600" /> Quiet Room
                      </li>
                    </ul>

                    <Link
                      to="/registration-interview"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-600 transition-colors"
                    >
                      Start Interview Session <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* STEP 5: COMPLETE YOUR PROFILE */}
              {selectedStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-ink tracking-tight">
                      Complete Your Pathway Profile
                    </h2>
                    <p className="text-sm text-muted mt-1">
                      Finalize your target industry sectors, education background, and career goals.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-line bg-canvas/40 p-6 space-y-4 max-w-lg">
                    <p className="text-sm text-ink-soft leading-relaxed">
                      Your profile information is used to match you with top industry mentors across 14 Nigerian economic sectors.
                    </p>

                    <Link
                      to="/profile"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-600 transition-colors"
                    >
                      Open Full Profile <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Step Navigation Controls (Previous / Continue) */}
              <div className="flex items-center justify-between border-t border-line/70 pt-5 mt-6">
                <button
                  type="button"
                  disabled={selectedStep === 0}
                  onClick={() => setSelectedStep(Math.max(0, selectedStep - 1))}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2 text-xs font-bold text-ink hover:bg-canvas disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ArrowLeft className="size-3.5" /> Previous
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStep(Math.min(STEPS.length - 1, selectedStep + 1))}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 px-6 py-2.5 text-xs font-extrabold text-white shadow-md hover:opacity-95 active:scale-95 transition-all"
                >
                  Continue <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: "Your Journey" Horizontal Pipeline (Exact Reference Image 2) */}
        <div className="rounded-[28px] border border-line/80 bg-white p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-ink">Your Journey</h2>
              <p className="text-xs text-muted">Stay on track with your next steps</p>
            </div>
            <Link
              to="/journey"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
            >
              View all &gt;
            </Link>
          </div>

          {/* Horizontal 5 Connected Cards */}
          <div className="grid grid-cols-5 gap-3 pt-2">
            {STEPS.map((step, idx) => {
              const complete = isDone[idx];
              const isCurrent = idx === activeStepIndex;

              return (
                <div
                  key={step.id}
                  onClick={() => setSelectedStep(idx)}
                  className={`cursor-pointer rounded-2xl border p-3.5 flex flex-col justify-between transition-all hover:border-brand-300 ${
                    isCurrent
                      ? "border-brand-500 bg-brand-50/30 shadow-sm ring-1 ring-brand-300"
                      : "border-line bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between pb-3">
                    <span
                      className={`grid size-7 place-items-center rounded-full text-xs font-bold ${
                        complete
                          ? "bg-emerald-500 text-white"
                          : isCurrent
                          ? "bg-brand-500 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {complete ? <Check className="size-3.5 stroke-[3]" /> : step.stepNum}
                    </span>
                    <step.icon
                      className={`size-4 ${
                        complete
                          ? "text-emerald-600"
                          : isCurrent
                          ? "text-brand-600"
                          : "text-slate-300"
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-ink leading-tight truncate">
                      {step.title}
                    </p>
                    <p
                      className={`text-[10px] font-semibold ${
                        complete
                          ? "text-emerald-600"
                          : isCurrent
                          ? "text-brand-600"
                          : "text-muted"
                      }`}
                    >
                      {complete ? "Completed" : isCurrent ? "In progress" : "Locked"}
                    </p>
                  </div>

                  <span className="mt-3 text-[10px] font-bold text-brand-700 inline-flex items-center gap-1">
                    {complete ? "View details" : isCurrent ? "Continue" : "Locked"} →
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE VIEW: CARDS FROM REFERENCE IMAGE 1
          Visible on screens < lg
          ========================================================================= */}
      <div className="block lg:hidden space-y-4">
        {/* CARD 1: YOUR JOURNEY SUMMARY CARD */}
        <div className="rounded-3xl border border-line bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-3.5">
            {/* Radiant Avatar */}
            <div className="relative size-14 shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-500 blur-sm opacity-70" />
              <div className="relative size-full overflow-hidden rounded-full border-2 border-white bg-brand-500 shadow-md flex items-center justify-center">
                <img
                  src="/images/profile_david.jpg"
                  alt={learnerName}
                  className="size-full object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted font-semibold">Your Journey</p>
                <ChevronRight className="size-4 text-muted" />
              </div>
              <p className="text-sm font-extrabold text-ink">Level 01 • Before Admission</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-600 via-indigo-500 to-sky-400"
                style={{ width: `${(doneCount / 5) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-bold text-muted">
              <span>{doneCount} of 5 steps</span>
              <span className="text-brand-600">✦ {archetypeTitle}</span>
            </div>
          </div>
        </div>

        {/* CARD 2: "YOUR NEXT STEP" BANNER CARD (Exact Reference Image 1) */}
        <div className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-[#ebe6ff] via-white to-[#f6f2ff] p-5 shadow-sm">
          <div className="relative z-10 max-w-[62%] space-y-2">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-brand-700">
              Your Next Step
            </span>
            <h2 className="text-lg font-extrabold text-ink leading-tight">
              Accountability partner
            </h2>
            <p className="text-xs text-muted leading-relaxed">
              Invite an accountability partner and keep each other on track.
            </p>
            <button
              type="button"
              onClick={copyInviteLink}
              className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-brand-600 transition-colors"
            >
              {copySuccess ? "Invite Copied!" : "Create Invite"} <ArrowRight className="size-3.5" />
            </button>
          </div>

          {/* Peer Collaboration Illustration */}
          <img
            src="/images/dashboard-share.png"
            alt="Students collaborating"
            className="pointer-events-none absolute -bottom-1 -right-2 w-44 object-contain"
          />
        </div>

        {/* CARD 3: QUICK ACTIONS 2X2 GRID (Exact Reference Image 1) */}
        <div className="rounded-3xl border border-line bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-ink">Quick Actions</h2>
            <Link to="/journey" className="text-xs font-bold text-brand-600">
              View all &gt;
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                setSelectedStep(1);
                setShowMobilePlanModal(true);
              }}
              className="flex items-center justify-between rounded-2xl border border-line/70 bg-canvas/40 p-3 text-left hover:border-brand-300 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-600">
                  <FileText className="size-4" />
                </span>
                <span className="text-xs font-bold text-ink truncate">View Plan Details</span>
              </div>
              <ChevronRight className="size-3.5 text-muted shrink-0" />
            </button>

            <button
              type="button"
              onClick={copyInviteLink}
              className="flex items-center justify-between rounded-2xl border border-line/70 bg-canvas/40 p-3 text-left hover:border-brand-300 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Users className="size-4" />
                </span>
                <span className="text-xs font-bold text-ink truncate">Accountability</span>
              </div>
              <ChevronRight className="size-3.5 text-muted shrink-0" />
            </button>

            <Link
              to="/community"
              className="flex items-center justify-between rounded-2xl border border-line/70 bg-canvas/40 p-3 text-left hover:border-brand-300 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                  <MessageCircle className="size-4" />
                </span>
                <span className="text-xs font-bold text-ink truncate">Get Help</span>
              </div>
              <ChevronRight className="size-3.5 text-muted shrink-0" />
            </Link>

            <Link
              to="/profile"
              className="flex items-center justify-between rounded-2xl border border-line/70 bg-canvas/40 p-3 text-left hover:border-brand-300 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600">
                  <MoreHorizontal className="size-4" />
                </span>
                <span className="text-xs font-bold text-ink truncate">More Options</span>
              </div>
              <ChevronRight className="size-3.5 text-muted shrink-0" />
            </Link>
          </div>
        </div>

        {/* CARD 4: YOUR PROGRESS CIRCULAR GAUGE (Exact Reference Image 1) */}
        <div className="rounded-3xl border border-line bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-ink">Your Progress</h2>
            <Link to="/journey" className="text-xs font-bold text-brand-600">
              View all &gt;
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Circular Gauge Ring */}
            <div className="relative size-20 shrink-0">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-brand-600"
                  strokeDasharray={`${(doneCount / 5) * 100}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-sm font-extrabold text-ink">{doneCount}/5</span>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold text-ink">Steps Completed</p>
              <p className="text-xs text-muted mt-0.5">You're making great progress!</p>
            </div>
          </div>

          {/* Next Up Target Card */}
          <div className="flex items-center justify-between rounded-2xl border border-brand-200 bg-brand-50/40 p-3.5">
            <div className="flex items-center gap-3 min-w-0">
              <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand-500 text-white">
                <Target className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase text-brand-700">Next up</p>
                <p className="text-xs font-extrabold text-ink truncate">
                  {STEPS[activeStepIndex]?.title ?? "Complete Onboarding"}
                </p>
              </div>
            </div>
            <ChevronRight className="size-4 text-brand-600 shrink-0" />
          </div>
        </div>

        {/* CARD 5: UPCOMING TASKS (Exact Reference Image 1) */}
        <div className="rounded-3xl border border-line bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-ink">Upcoming Tasks</h2>
            <Link to="/learning" className="text-xs font-bold text-brand-600">
              View all &gt;
            </Link>
          </div>

          <div className="divide-y divide-line/60">
            <div className="flex items-center justify-between py-2.5">
              <div className="flex items-center gap-2.5">
                <span className="grid size-7 place-items-center rounded-full bg-indigo-50 text-indigo-600">
                  <User className="size-3.5" />
                </span>
                <span className="text-xs font-bold text-ink">Complete your profile</span>
              </div>
              <span className="text-[11px] font-semibold text-muted">Today</span>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <div className="flex items-center gap-2.5">
                <span className="grid size-7 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <Users className="size-3.5" />
                </span>
                <span className="text-xs font-bold text-ink">Join the community</span>
              </div>
              <span className="text-[11px] font-semibold text-muted">Tomorrow</span>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <div className="flex items-center gap-2.5">
                <span className="grid size-7 place-items-center rounded-full bg-sky-50 text-sky-600">
                  <FileText className="size-3.5" />
                </span>
                <span className="text-xs font-bold text-ink">Explore resources</span>
              </div>
              <span className="text-[11px] font-semibold text-muted">Wed, 10 Sep</span>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <div className="flex items-center gap-2.5">
                <span className="grid size-7 place-items-center rounded-full bg-amber-50 text-amber-600">
                  <Compass className="size-3.5" />
                </span>
                <span className="text-xs font-bold text-ink">Attend onboarding session</span>
              </div>
              <span className="text-[11px] font-semibold text-muted">Fri, 12 Sep</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Subscription Modal: iPlace Scholarship Scheme */}
      {showMobilePlanModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ink/60 backdrop-blur-xs animate-fade-in"
        >
          <div className="w-full sm:max-w-md max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-line">
              <div>
                <h3 className="text-base font-extrabold text-ink">Subscription Plans</h3>
                <p className="text-xs text-muted">Choose your cohort pathway</p>
              </div>
              <button
                type="button"
                onClick={() => setShowMobilePlanModal(false)}
                className="grid size-8 place-items-center rounded-full bg-canvas text-muted hover:text-ink transition-colors"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Plan 1: Free iPlace Scholarship */}
            <div
              onClick={() => {
                handleSelectPlan("starter");
                setShowMobilePlanModal(false);
              }}
              className={`cursor-pointer rounded-2xl border-2 p-4 transition-all ${
                selectedPlan === "starter"
                  ? "border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-200"
                  : "border-line bg-white hover:border-emerald-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                    <GraduationCap className="size-4" />
                  </span>
                  <span className="font-extrabold text-sm text-ink">iPlace Scholarship</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">Free</span>
                </div>
                <span className="rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800">
                  60 slots left
                </span>
              </div>
              <p className="text-xs text-muted mt-2 leading-relaxed">
                Fully funded 4-week cohort pass sponsored by verified industry partners.
              </p>
              <ul className="mt-2.5 space-y-1.5 text-xs text-ink-soft">
                <li className="flex items-center gap-2 text-emerald-800 font-medium">
                  <Check className="size-3.5 stroke-[3] text-emerald-600" /> Full 4-Week Cohort Access
                </li>
                <li className="flex items-center gap-2 text-emerald-800 font-medium">
                  <Check className="size-3.5 stroke-[3] text-emerald-600" /> Mentorship & Community
                </li>
                <li className="flex items-center gap-2 text-emerald-800 font-bold">
                  <Check className="size-3.5 stroke-[3] text-emerald-600" /> 60 Scholarship Slots Left
                </li>
              </ul>
              <button
                type="button"
                className="mt-3.5 w-full rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
              >
                {selectedPlan === "starter" ? "Selected (Free Scholarship)" : "Select Free Scholarship"}
              </button>
            </div>

            {/* Plan 2: Pro */}
            <div
              onClick={() => {
                handleSelectPlan("pro");
                setShowMobilePlanModal(false);
              }}
              className={`cursor-pointer rounded-2xl border-2 p-4 transition-all ${
                selectedPlan === "pro"
                  ? "border-brand-500 bg-brand-50/30 ring-2 ring-brand-200"
                  : "border-line bg-white hover:border-brand-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg bg-brand-100 text-brand-700">
                    <Sparkles className="size-4" />
                  </span>
                  <span className="font-extrabold text-sm text-ink">Pro Member</span>
                </div>
                <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                  ₦15,000 / mo
                </span>
              </div>
              <p className="text-xs text-muted mt-2 leading-relaxed">
                Priority matching with 1-on-1 industry mentors and guaranteed interview review.
              </p>
              <button
                type="button"
                className="mt-3.5 w-full rounded-xl border border-brand-500 py-2.5 text-xs font-bold text-brand-700 hover:bg-brand-50 transition-colors"
              >
                {selectedPlan === "pro" ? "Selected" : "Select Pro Plan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
