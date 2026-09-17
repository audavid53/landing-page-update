/**
 * ScrollCue — Subtle animated scroll indicator shown on initial load.
 */

import { motion } from "framer-motion";

interface ScrollCueProps {
  visible: boolean;
}

export function ScrollCue({ visible }: ScrollCueProps) {
  if (!visible) return null;

  return (
    <motion.div
      className="scroll-cue"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <span className="scroll-cue-text">Scroll to explore</span>
      <motion.div
        className="scroll-cue-chevron"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
