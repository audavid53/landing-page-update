import { useState } from "react";
import { X } from "lucide-react";

export function TopBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative w-full bg-brand-300 overflow-hidden">
      {/* Decorative abstract shapes */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-full opacity-30 bg-gradient-to-r from-brand-400 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-full opacity-30 bg-gradient-to-l from-brand-400 to-transparent"
      />

      <div className="relative flex items-center justify-center gap-3 px-4 py-2.5 text-center">
        <p className="text-sm font-medium text-ink tracking-wide">
          Four weeks · cohort-based · built in Nigeria
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
          className="absolute right-3 top-1/2 -translate-y-1/2 grid size-6 place-items-center rounded-full text-ink/60 hover:text-ink hover:bg-brand-400/30 transition-colors sm:right-4"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
