import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ProgressProvider } from "@/state/ProgressProvider";
import { SessionProvider, useSession } from "@/state/SessionProvider";
import { AdmissionProvider } from "@/state/AdmissionProvider";
import { App } from "./App";
import "./styles/index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Root element #root was not found");

export function AccountProgress() {
  const { account } = useSession();
  return <ProgressProvider key={account?.email ?? "demo"}><AdmissionProvider key={account?.email ?? "demo"}><App /></AdmissionProvider></ProgressProvider>;
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <SessionProvider><AccountProgress /></SessionProvider>
    </BrowserRouter>
  </StrictMode>,
);
