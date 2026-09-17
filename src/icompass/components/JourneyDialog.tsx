import { useEffect, useRef, useState } from "react";
import { ArrowRight, Compass, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type AccountRole, useSession } from "@/state/SessionProvider";
import "./journey-dialog.css";

const roles: { id: AccountRole; label: string; detail: string }[] = [
  { id: "student", label: "Student", detail: "Find the right direction before you choose." },
  { id: "guardian", label: "Guardian", detail: "Support someone finding their path." },
  { id: "educator", label: "Educator / counselor", detail: "Guide learners with greater clarity." },
  { id: "professional", label: "Young professional", detail: "Understand where you can thrive." },
];

export function JourneyDialog({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const { signUp, signIn } = useSession();
  const [role, setRole] = useState<AccountRole>("student");
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled)'));
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); };
  }, [onClose]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const cleanEmail = email.trim().toLowerCase();
    if (mode === "signin") {
      if (!signIn(cleanEmail)) { setError("No account found on this device. Choose Sign up to begin."); return; }
    } else {
      signUp({ email: cleanEmail, name: name.trim() || cleanEmail.split("@")[0]!, role });
    }
    onClose();
    navigate("/dashboard");
  };

  return <div className="journey-overlay">
    <div ref={panelRef} className="journey-dialog" role="dialog" aria-modal="true" aria-labelledby="journey-dialog-title">
      <button ref={closeRef} type="button" className="journey-dialog__close" onClick={onClose} aria-label="Close sign in"><X size={19} /></button>
      <div className="journey-dialog__intro"><span className="journey-dialog__mark"><Compass size={19} /></span><span>ICOMPASS / YOUR FIRST STEP</span></div>
      <div className="journey-dialog__grid">
        <div className="journey-dialog__roles">
          <p className="journey-dialog__eyebrow">01 / TELL US ABOUT YOU</p>
          <h2 id="journey-dialog-title">Where are you starting from?</h2>
          <p className="journey-dialog__hint">Choose the experience that fits you today.</p>
          <div className="journey-dialog__role-list" role="radiogroup" aria-label="Your role">
            {roles.map((item) => <button key={item.id} type="button" role="radio" aria-checked={role === item.id} className={`journey-dialog__role ${role === item.id ? "is-selected" : ""}`} onClick={() => setRole(item.id)}>
              <span><strong>{item.label}</strong><small>{item.detail}</small></span><span className="journey-dialog__radio" aria-hidden="true" />
            </button>)}
          </div>
        </div>
        <div className="journey-dialog__form-side">
          <p className="journey-dialog__eyebrow">02 / YOUR ACCOUNT</p>
          <h3>Start your journey</h3>
          <p className="journey-dialog__hint">A clearer path starts here.</p>
          <button type="button" className="journey-dialog__google" onClick={() => setError("Google sign-in is not connected in this preview. Continue with email below.")}><span className="journey-dialog__google-g" aria-hidden="true">G</span> Continue with Google</button>
          <div className="journey-dialog__divider"><span>or continue with email</span></div>
          <div className="journey-dialog__tabs" role="tablist" aria-label="Account action">
            <button type="button" role="tab" aria-selected={mode === "signup"} className={mode === "signup" ? "is-active" : ""} onClick={() => { setMode("signup"); setError(""); }}>Sign up</button>
            <button type="button" role="tab" aria-selected={mode === "signin"} className={mode === "signin" ? "is-active" : ""} onClick={() => { setMode("signin"); setError(""); }}>Sign in</button>
          </div>
          <form onSubmit={submit} className="journey-dialog__form">
            {mode === "signup" && <label>Your name<input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="Your name" required /></label>}
            <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" required /></label>
            {error && <p className="journey-dialog__error" role="alert">{error}</p>}
            <button type="submit" className="journey-dialog__submit">{mode === "signup" ? "Create account" : "Continue to dashboard"}<ArrowRight size={18} /></button>
          </form>
          <p className="journey-dialog__note">Preview account on this device. No password or Google account is connected yet.</p>
        </div>
      </div>
    </div>
  </div>;
}
