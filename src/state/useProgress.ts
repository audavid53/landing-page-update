import { useContext } from "react";
import { ProgressContext } from "./progress-context";

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside <ProgressProvider>");
  }
  return context;
}
