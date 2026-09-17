import { useEffect, useState } from "react";

export function useFlowLayout() {
  const [flow, setFlow] = useState(() => typeof window !== "undefined" && (window.matchMedia("(max-width: 1023px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches));
  useEffect(() => {
    const width = window.matchMedia("(max-width: 1023px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setFlow(width.matches || motion.matches);
    update();
    width.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => { width.removeEventListener("change", update); motion.removeEventListener("change", update); };
  }, []);
  return flow;
}
