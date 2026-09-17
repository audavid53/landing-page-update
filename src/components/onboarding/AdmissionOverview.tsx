import { useEffect, useState } from "react";
import { ArrowRight, Check, ClipboardCheck, Copy, Lock, Mic, Monitor, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdmission } from "@/state/AdmissionProvider";

const steps = [
  { title: "Onboard your guardian", short: "Guardian", description: "Add a parent or guardian to your profile." },
  { title: "Pick your subscription", short: "Plan", description: "Choose the ₦40,000 plan or apply for a free scholarship place." },
  { title: "Share with a friend", short: "Friend", description: "Invite an accountability partner and follow their sign-up status." },
  { title: "Registration interview", short: "Interview", description: "A recorded, conversational voice interview to get to know you." },
  { title: "Complete your profile", short: "Profile", description: "Add the details that make your path yours." },
];

const actionClass = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-500 px-5 text-sm font-bold text-white transition-colors hover:bg-brand-600";

export function AdmissionOverview() {
  const { state, update } = useAdmission();
  const done = [Boolean(state.guardian), Boolean(state.subscription), Boolean(state.friend?.inviteCopied), Boolean(state.interviewComplete), Boolean(state.profile)];
  const current = done.findIndex((value) => !value);
  const active = current < 0 ? steps.length : current;
  const [selected, setSelected] = useState(active < steps.length ? active : steps.length - 1);
  const [friendName, setFriendName] = useState(state.friend?.name ?? "");
  const [copyError, setCopyError] = useState("");
  useEffect(() => setSelected(active < steps.length ? active : steps.length - 1), [active]);

  const friendLink = state.friend ? `${window.location.origin}/?invite=${state.friend.code}` : "";
  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText(friendLink);
      update({ friend: { ...state.friend!, inviteCopied: true } });
      setCopyError("");
    } catch { setCopyError("Copy the link from the field below to share it."); }
  };

  return <section aria-labelledby="admission-heading" className="space-y-5">
    <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand-700">Level 01 / Before admission</p><h2 id="admission-heading" className="mt-2 text-2xl font-extrabold tracking-tight text-ink">Your next five steps</h2><p className="mt-2 text-sm text-muted">Work through these in order. Select a step to see what it involves.</p></div><span className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700">{done.filter(Boolean).length} of 5 complete</span></div>
    <div className="h-1.5 overflow-hidden rounded-full bg-[#e8e3f2]" role="progressbar" aria-label="Pre-admission progress" aria-valuenow={done.filter(Boolean).length} aria-valuemin={0} aria-valuemax={5}><div className="h-full rounded-full bg-brand-500 transition-[width]" style={{ width: `${done.filter(Boolean).length * 20}%` }} /></div>

    <div className="grid gap-5 lg:grid-cols-[minmax(250px,.72fr)_minmax(0,1.28fr)] lg:items-start">
      <ol className="grid grid-cols-5 gap-1.5 lg:block" aria-label="Pre-admission steps">{steps.map((step, index) => {
        const complete = done[index];
        const isCurrent = index === active;
        return <li key={step.title} className="relative lg:pb-2 last:lg:pb-0">
          {index < steps.length - 1 && <span aria-hidden="true" className={`absolute left-[21px] top-[48px] hidden h-[calc(100%-35px)] w-px lg:block ${complete ? "bg-success" : "bg-line-strong"}`} />}
          <button type="button" onClick={() => setSelected(index)} aria-label={`${step.title}, ${complete ? "complete" : isCurrent ? "up next" : "locked"}`} aria-current={selected === index ? "step" : undefined} aria-controls="admission-detail" className={`flex min-h-[78px] w-full flex-col items-center justify-center gap-1 rounded-2xl border px-1 py-2 text-center transition-colors lg:min-h-[68px] lg:flex-row lg:justify-start lg:gap-3 lg:px-4 lg:text-left ${selected === index ? "border-brand-400 bg-white shadow-[0_6px_20px_#602de020]" : "border-transparent bg-white/60 hover:border-line-strong"}`}>
            <span className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-extrabold lg:size-9 lg:text-xs ${complete ? "bg-success text-white" : isCurrent ? "bg-brand-500 text-white" : "bg-[#e9e7ee] text-muted"}`}>{complete ? <Check className="size-4" strokeWidth={3} /> : String(index + 1).padStart(2, "0")}</span>
            <span className="min-w-0"><strong className="block text-[10px] leading-tight text-ink sm:text-xs lg:text-sm">{step.short}<span className="hidden lg:inline">{step.title === "Onboard your guardian" ? " onboarding" : step.title === "Pick your subscription" ? " selection" : step.title === "Share with a friend" ? " invite" : step.title === "Registration interview" ? "" : " completion"}</span></strong><small className="mt-1 hidden text-[11px] font-semibold text-muted lg:block">{complete ? "Complete" : isCurrent ? "Up next" : "Locked"}</small></span>
          </button>
        </li>;
      })}</ol>

      <div id="admission-detail" role="region" aria-live="polite" aria-label={`Step ${selected + 1}: ${steps[selected]!.title}`} className="min-h-[340px] rounded-[26px] border border-line bg-white p-5 shadow-card sm:p-7">
        <div className="flex items-start justify-between gap-4"><p className="text-xs font-extrabold uppercase tracking-[.14em] text-brand-700">Step {String(selected + 1).padStart(2, "0")} / 05</p>{selected > active && <Lock className="size-4 text-muted" aria-hidden="true" />}{done[selected] && <Check className="size-4 text-success" aria-hidden="true" />}</div>
        <h3 className="mt-3 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{steps[selected]!.title}</h3><p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{steps[selected]!.description}</p>
        <div className="mt-6 border-t border-line pt-6">
          {selected === 0 && <div className="space-y-5"><p className="text-sm text-ink-soft">Your guardian’s name, relationship, and email live with your account details. You can update them on your profile.</p>{state.guardian && <p className="rounded-xl bg-success-soft px-4 py-3 text-sm font-semibold text-success">{state.guardian.name} is saved as your {state.guardian.relationship.toLowerCase()}.</p>}<Link to="/profile#guardian" className={actionClass}>{state.guardian ? "View guardian details" : "Add guardian in profile"}<ArrowRight className="size-4" /></Link></div>}

          {selected === 1 && <div className="space-y-4"><div className="grid gap-3 sm:grid-cols-2"><button type="button" disabled={selected > active} onClick={() => update({ subscription: "paid" })} className={`rounded-2xl border p-4 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${state.subscription === "paid" ? "border-brand-500 bg-brand-50" : "border-line hover:border-brand-300"}`}><span className="block text-xs font-bold uppercase tracking-wider text-brand-700">Standard place</span><strong className="mt-2 block text-2xl text-ink">₦40,000</strong><span className="mt-2 block text-sm text-muted">Choose a paid place in the programme.</span><span className="mt-5 block text-xs font-bold text-brand-700">{state.subscription === "paid" ? "Selected" : "Select plan →"}</span></button><button type="button" disabled={selected > active} onClick={() => update({ subscription: "scholarship" })} className={`rounded-2xl border p-4 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${state.subscription === "scholarship" ? "border-brand-500 bg-brand-50" : "border-line hover:border-brand-300"}`}><span className="block text-xs font-bold uppercase tracking-wider text-brand-700">This month's cohort</span><strong className="mt-2 block text-2xl text-ink">Scholarship</strong><span className="mt-2 block text-sm text-muted">Apply for a free place in this month's cohort. The interview completes your application.</span><span className="mt-5 block text-xs font-bold text-brand-700">{state.subscription === "scholarship" ? "Selected" : "Choose scholarship →"}</span></button></div><p className="text-xs text-muted">This step saves your choice. Payment and scholarship review are not connected in this preview.</p></div>}

          {selected === 2 && <div className="space-y-4"><p className="text-sm text-ink-soft">You have an amazing personality. Bring someone along to keep each other accountable.</p><label className="block max-w-sm text-xs font-bold text-ink">Friend's name<input value={friendName} disabled={selected > active} onChange={(event) => setFriendName(event.target.value)} placeholder="Their first name" className="mt-2 block h-11 w-full rounded-xl border border-line-strong bg-white px-3 text-sm text-ink outline-none focus:border-brand-500 disabled:bg-canvas" /></label>{(!state.friend || state.friend.name !== friendName.trim()) && <button type="button" disabled={selected > active || !friendName.trim()} onClick={() => update({ friend: { name: friendName.trim(), code: crypto.randomUUID().slice(0, 8), inviteCopied: false } })} className={`${actionClass} disabled:cursor-not-allowed disabled:opacity-45`}>Create invite <ArrowRight className="size-4" /></button>}{state.friend && state.friend.name === friendName.trim() && <div className="space-y-3"><label className="block text-xs font-bold text-ink">Invitation link<input readOnly value={friendLink} onFocus={(event) => event.target.select()} className="mt-2 block h-11 w-full rounded-xl border border-line-strong bg-canvas px-3 text-sm text-ink" /></label><button type="button" onClick={copyInvite} className={actionClass}><Copy className="size-4" /> Copy invite link</button><p className="text-xs text-muted">{state.friend.inviteCopied ? `Invite copied · waiting for ${state.friend.name} to sign up.` : "Copy the link and send it to your friend."} Sign-up tracking will appear once invitations are connected.</p>{copyError && <p className="text-xs text-danger" role="alert">{copyError}</p>}</div>}</div>}

          {selected === 3 && <div className="space-y-5"><p className="text-sm text-ink-soft">A voice conversation will help us get to know you and your goals. The session is recorded when you choose to begin it.</p><ul className="grid gap-2 text-sm text-ink-soft sm:grid-cols-3"><li className="flex items-center gap-2 rounded-xl bg-canvas p-3"><Monitor className="size-4 text-brand-700" /> Use a laptop</li><li className="flex items-center gap-2 rounded-xl bg-canvas p-3"><Video className="size-4 text-brand-700" /> Turn on camera</li><li className="flex items-center gap-2 rounded-xl bg-canvas p-3"><Mic className="size-4 text-brand-700" /> Turn on microphone</li></ul>{selected === active ? <Link to="/registration-interview" className={actionClass}>Open interview setup <ArrowRight className="size-4" /></Link> : <p className="text-sm font-semibold text-muted">Finish the earlier steps to open the interview.</p>}</div>}

          {selected === 4 && <div className="space-y-5"><p className="text-sm text-ink-soft">Add your city and the kind of work you want to explore. You can change these as you learn more.</p><div className="flex items-center gap-3 rounded-xl bg-canvas p-4 text-sm text-ink-soft"><ClipboardCheck className="size-5 text-brand-700" /> Personal details and career goal</div>{selected === active ? <Link to="/profile#complete" className={actionClass}>Complete your profile <ArrowRight className="size-4" /></Link> : <p className="text-sm font-semibold text-muted">Available after your interview is complete.</p>}</div>}
        </div>
      </div>
    </div>
  </section>;
}
