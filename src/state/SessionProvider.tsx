import { createContext, useContext, useMemo, useState } from "react";

export type AccountRole = "student" | "guardian" | "educator" | "professional";
export type LocalAccount = { email: string; name: string; role: AccountRole };

const ACCOUNT_KEY = "icompass:local-account:v1";
const SESSION_KEY = "icompass:local-session:v1";

function readAccount(): LocalAccount | null {
  try {
    const value = JSON.parse(localStorage.getItem(ACCOUNT_KEY) || "null") as LocalAccount | null;
    return value?.email && value?.role ? value : null;
  } catch { return null; }
}

type SessionValue = {
  account: LocalAccount | null;
  signUp: (account: LocalAccount) => void;
  signIn: (email: string) => boolean;
};

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<LocalAccount | null>(() => {
    const saved = readAccount();
    return saved && localStorage.getItem(SESSION_KEY) === saved.email ? saved : null;
  });

  const value = useMemo<SessionValue>(() => ({
    account,
    signUp: (next) => {
      localStorage.setItem(ACCOUNT_KEY, JSON.stringify(next));
      localStorage.setItem(SESSION_KEY, next.email);
      setAccount(next);
    },
    signIn: (email) => {
      const saved = readAccount();
      if (!saved || saved.email.toLowerCase() !== email.toLowerCase()) return false;
      localStorage.setItem(SESSION_KEY, saved.email);
      setAccount(saved);
      return true;
    },
  }), [account]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const value = useContext(SessionContext);
  if (!value) throw new Error("SessionProvider is missing");
  return value;
}
