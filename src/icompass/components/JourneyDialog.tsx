import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type AccountRole, useSession } from "@/state/SessionProvider";
import "./journey-dialog.css";

const roleCards: {
  id: AccountRole;
  label: string;
  sub: string;
  icon: typeof GraduationCap;
}[] = [
  {
    id: "student",
    label: "Student",
    sub: "4-week cohort, interactive lessons & mentorship",
    icon: GraduationCap,
  },
  {
    id: "professional",
    label: "Professional",
    sub: "Mentor rising talent & share industry insights",
    icon: Briefcase,
  },
  {
    id: "educator",
    label: "Instructor",
    sub: "Deliver curriculum modules & guide cohorts",
    icon: Users,
  },
  {
    id: "guardian",
    label: "Guardian",
    sub: "Track student milestones & approve consent",
    icon: ShieldCheck,
  },
];

export function JourneyDialog({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const { signUp, signIn } = useSession();

  // Mode: "signup" | "signin"
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  // Signup step: 1 | 2
  const [step, setStep] = useState<1 | 2>(1);

  const [role, setRole] = useState<AccountRole>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>("button:not(:disabled), input:not(:disabled)")
      );
      const first = focusable[0],
        last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  // Step 1: Advance to Step 2 with the chosen registration type
  const handleStep1Continue = () => {
    setError("");
    setStep(2);
  };

  // Step 2: Sign Up without rigid limitations
  const handleSignUp = (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase() || "david@example.com";
    const cleanName = name.trim() || "Arere-Uzezi David";

    // Clear previous progress so the Welcome modal pops up immediately on dashboard
    try {
      localStorage.removeItem(`icompass:personality-result:v1:${cleanEmail}`);
    } catch {}

    signUp({
      email: cleanEmail,
      name: cleanName,
      role,
    });

    onClose();
    navigate("/dashboard");
  };

  // Google Sign In (both Google and Sign Up lead straight to Welcome on dashboard)
  const handleGoogleAuth = () => {
    const googleEmail = "google.student@example.com";
    try {
      localStorage.removeItem(`icompass:personality-result:v1:${googleEmail}`);
    } catch {}

    signUp({
      email: googleEmail,
      name: "Google Learner",
      role,
    });
    onClose();
    navigate("/dashboard");
  };

  // Standard sign in
  const handleSignInSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const cleanEmail = email.trim().toLowerCase() || "david@example.com";
    if (!signIn(cleanEmail)) {
      signUp({
        email: cleanEmail,
        name: name.trim() || cleanEmail.split("@")[0]!,
        role,
      });
    }
    onClose();
    navigate("/dashboard");
  };

  const currentRoleInfo = roleCards.find((r) => r.id === role) ?? roleCards[0]!;

  return (
    <div className="journey-overlay">
      <div
        ref={panelRef}
        className="journey-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="journey-dialog-title"
      >
        <div className="journey-dialog__split">
          {/* LEFT COLUMN: Blue branded poster card */}
          <div className="journey-dialog__poster">
            <div className="journey-dialog__poster-badge">
              <span>★ ★ ★ BEST ★ ★ ★</span>
              <h3>CAREER PATH</h3>
              <p>IN 2025</p>
            </div>

            <div className="journey-dialog__poster-art">
              <img
                src="/images/cca_hero_illustration_1782672125497.jpg"
                alt="Career guidance illustration"
                className="journey-dialog__poster-img"
              />
            </div>

            {/* Carousel dots indicator */}
            <div className="journey-dialog__poster-dots">
              <span className="is-active" />
              <span />
              <span />
            </div>
          </div>

          {/* RIGHT COLUMN: 2-Step Form */}
          <div className="journey-dialog__form-area">
            {/* Top Bar with Logo and Back link */}
            <div className="journey-dialog__top-bar">
              <div className="journey-dialog__brand">
                <span className="journey-dialog__brand-dot" />
                <span className="journey-dialog__brand-name">iCompass</span>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="journey-dialog__back-link"
                aria-label="Back to home"
              >
                &lt; Back to Home
              </button>
            </div>

            {mode === "signup" ? (
              <div className="journey-dialog__content">
                {/* Step Progress Bar */}
                <div className="journey-dialog__stepper">
                  <div className="journey-dialog__stepper-info">
                    <span className="journey-dialog__step-text">
                      Step {step} of 2
                    </span>
                  </div>
                  <div className="journey-dialog__step-track">
                    <div
                      className="journey-dialog__step-fill"
                      style={{ width: step === 1 ? "50%" : "100%" }}
                    />
                  </div>
                </div>

                {/* STEP 1: Registration Type Selection (4 Boxes with Icons) */}
                {step === 1 && (
                  <div>
                    <h2 id="journey-dialog-title" className="journey-dialog__title">
                      Choose registration type
                    </h2>
                    <p className="journey-dialog__sub">
                      Select how you want to experience the platform.
                    </p>

                    {/* 4 Interactive Role Boxes with Icons */}
                    <div className="journey-dialog__role-boxes" role="radiogroup" aria-label="Registration type">
                      {roleCards.map((rc) => {
                        const isSelected = role === rc.id;
                        const Icon = rc.icon;
                        return (
                          <div
                            key={rc.id}
                            role="radio"
                            aria-checked={isSelected}
                            tabIndex={0}
                            onClick={() => setRole(rc.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setRole(rc.id);
                              }
                            }}
                            className={`journey-dialog__role-box ${isSelected ? "is-selected" : ""}`}
                          >
                            <div className="journey-dialog__role-box-icon">
                              <Icon size={20} />
                            </div>
                            <div className="journey-dialog__role-box-title">
                              <span>{rc.label}</span>
                              <span className="journey-dialog__role-check">
                                {isSelected && <Check size={11} strokeWidth={3} />}
                              </span>
                            </div>
                            <p className="journey-dialog__role-box-sub">{rc.sub}</p>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={handleStep1Continue}
                      className="journey-dialog__cta-btn"
                    >
                      Continue to Details
                    </button>
                  </div>
                )}

                {/* STEP 2: Name, Email, Password + Sign Up or Google */}
                {step === 2 && (
                  <form onSubmit={handleSignUp} className="journey-dialog__inputs">
                    <div>
                      <h2 id="journey-dialog-title" className="journey-dialog__title">
                        Create an account
                      </h2>
                      <p className="journey-dialog__sub">
                        Registering as <strong className="text-brand-600">{currentRoleInfo.label}</strong>
                      </p>
                    </div>

                    <label className="journey-dialog__field">
                      <span>Full Name</span>
                      <div className="journey-dialog__input-wrap">
                        <User className="journey-dialog__field-icon" size={17} />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Arere-Uzezi David"
                          autoComplete="name"
                        />
                      </div>
                    </label>

                    <label className="journey-dialog__field">
                      <span>Email</span>
                      <div className="journey-dialog__input-wrap">
                        <Mail className="journey-dialog__field-icon" size={17} />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="david@example.com"
                          autoComplete="email"
                        />
                        {email.includes("@") && (
                          <Check className="journey-dialog__valid-check" size={16} />
                        )}
                      </div>
                    </label>

                    <label className="journey-dialog__field">
                      <span>Password</span>
                      <div className="journey-dialog__input-wrap">
                        <Lock className="journey-dialog__field-icon" size={17} />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create your password"
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="journey-dialog__eye-btn"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </label>

                    {error && <p className="journey-dialog__error">{error}</p>}

                    {/* Both Sign Up and Google take the user directly to the Welcome modal */}
                    <button type="submit" className="journey-dialog__cta-btn">
                      Sign Up &amp; Launch Journey
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="journey-dialog__back-step"
                    >
                      <ArrowLeft size={14} /> Back to Role Selection
                    </button>
                  </form>
                )}

                {/* Social Sign In (Both Google & Sign Up take you to the welcome modal) */}
                <div className="journey-dialog__social-wrap">
                  <div className="journey-dialog__divider">
                    <span>or continue with</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    className="journey-dialog__social-btn w-full"
                    style={{ width: "100%" }}
                  >
                    <span className="journey-dialog__google-g">G</span> Continue with Google
                  </button>
                </div>

                <p className="journey-dialog__toggle-msg">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signin");
                      setError("");
                    }}
                    className="journey-dialog__toggle-link"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            ) : (
              /* SIGN IN VIEW */
              <div className="journey-dialog__content">
                <h2 className="journey-dialog__title">Welcome back</h2>
                <p className="journey-dialog__sub">Sign in to continue your career journey.</p>

                <form onSubmit={handleSignInSubmit} className="journey-dialog__inputs">
                  <label className="journey-dialog__field">
                    <span>Email</span>
                    <div className="journey-dialog__input-wrap">
                      <Mail className="journey-dialog__field-icon" size={17} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </div>
                  </label>

                  <label className="journey-dialog__field">
                    <span>Password</span>
                    <div className="journey-dialog__input-wrap">
                      <Lock className="journey-dialog__field-icon" size={17} />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your password"
                        autoComplete="current-password"
                      />
                    </div>
                  </label>

                  {error && <p className="journey-dialog__error">{error}</p>}

                  <button type="submit" className="journey-dialog__cta-btn">
                    Sign In to Dashboard
                  </button>
                </form>

                <div className="journey-dialog__social-wrap">
                  <div className="journey-dialog__divider">
                    <span>or continue with</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    className="journey-dialog__social-btn w-full"
                    style={{ width: "100%" }}
                  >
                    <span className="journey-dialog__google-g">G</span> Continue with Google
                  </button>
                </div>

                <p className="journey-dialog__toggle-msg">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setStep(1);
                      setError("");
                    }}
                    className="journey-dialog__toggle-link"
                  >
                    Create an account
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
