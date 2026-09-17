import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSession } from "./SessionProvider";

export type AdmissionState = {
  guardian?: { name: string; relationship: string; email: string };
  subscription?: "paid" | "scholarship";
  friend?: { name: string; code: string; inviteCopied: boolean };
  interviewComplete?: boolean;
  profile?: { city: string; goal: string };
};

type AdmissionValue = {
  state: AdmissionState;
  update: (next: Partial<AdmissionState>) => void;
};

const AdmissionContext = createContext<AdmissionValue | null>(null);

export function AdmissionProvider({ children }: { children: React.ReactNode }) {
  const { account } = useSession();
  const key = `icompass:admission:v1:${account?.email ?? "guest"}`;
  const [state, setState] = useState<AdmissionState>(() => {
    try { return JSON.parse(localStorage.getItem(key) || "{}") as AdmissionState; }
    catch { return {}; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch { /* storage may be unavailable */ }
  }, [key, state]);
  const value = useMemo<AdmissionValue>(() => ({ state, update: (next) => setState((previous) => ({ ...previous, ...next })) }), [state]);
  return <AdmissionContext.Provider value={value}>{children}</AdmissionContext.Provider>;
}

export function useAdmission() {
  const value = useContext(AdmissionContext);
  if (!value) throw new Error("AdmissionProvider is missing");
  return value;
}
