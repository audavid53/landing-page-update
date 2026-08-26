import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ProgressProvider } from "@/state/ProgressProvider";
import { App } from "./App";
import "./styles/index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Root element #root was not found");

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <ProgressProvider>
        <App />
      </ProgressProvider>
    </BrowserRouter>
  </StrictMode>,
);
