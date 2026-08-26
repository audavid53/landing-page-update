import { cn } from "@/lib/cn";

export type FilterOption = { id: string; label: string; count?: number };

/**
 * A row of filter capsules. Deliberately *not* a tablist: these filter a list
 * in place rather than swapping panels, so each chip is a toggle button
 * carrying its own pressed state.
 */
export function FilterChips({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: FilterOption[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  className?: string;
}) {
  return (
    <div role="group" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={cn(
              "rounded-pill px-4 py-2 text-sm font-semibold transition-colors",
              active
                ? "bg-brand-500 text-white"
                : "bg-surface text-muted ring-1 ring-line hover:text-ink",
            )}
          >
            {option.label}
            {option.count !== undefined ? (
              <span className={cn("ml-1.5 text-xs font-bold", active ? "text-white/80" : "text-muted")}>
                {option.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
