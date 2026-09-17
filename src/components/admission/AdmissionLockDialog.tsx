import { useNavigate } from "react-router-dom";
import { Lock, ShieldCheck, ArrowLeft } from "lucide-react";

export function AdmissionLockDialog({
  onClose,
  featureName = "This feature",
}: {
  onClose?: () => void;
  featureName?: string;
}) {
  const navigate = useNavigate();

  const handleGoDashboard = () => {
    if (onClose) onClose();
    navigate("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-[1100] grid place-items-center bg-ink/75 p-4 backdrop-blur-md animate-fade-in">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lock-dialog-title"
        className="relative w-full max-w-md rounded-[28px] border border-line bg-white p-7 text-center shadow-2xl animate-pop-in"
      >
        {/* Glowing Icon */}
        <div className="relative mx-auto mb-4 size-16">
          <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-md animate-pulse" />
          <div className="relative grid size-full place-items-center rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 shadow-sm">
            <Lock className="size-7" />
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-300/60 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-900">
          ● Cohort 2025 Review
        </span>

        <h2 id="lock-dialog-title" className="mt-3 text-2xl font-extrabold tracking-tight text-ink">
          Unlocks When Admission is Approved
        </h2>

        <p className="mt-2.5 text-sm leading-relaxed text-muted">
          Full access to {featureName}, community lessons, peer challenges, and 1-on-1 industry mentorship will unlock automatically once your application has been approved by the admissions faculty.
        </p>

        <div className="mt-4 rounded-xl border border-line bg-slate-50 p-3 text-left flex items-center gap-3">
          <ShieldCheck className="size-5 text-brand-600 shrink-0" />
          <p className="text-xs text-ink-soft leading-tight">
            Complete all 5 onboarding steps on your dashboard to fast-track review within 24 hours.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={handleGoDashboard}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-500 font-bold text-white shadow-md hover:bg-brand-600 transition-colors"
          >
            <ArrowLeft className="size-4" /> Return to Dashboard
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-muted hover:text-ink transition-colors py-1"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
