import { useRef } from "react";
import { cn } from "@/lib/cn";

export type TabItem = { id: string; label: string; badge?: string | number };

type TabsProps = {
  /** Shared prefix so tabs and their panels can reference each other by id. */
  group: string;
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  className?: string;
};

const tabId = (group: string, id: string) => `${group}-tab-${id}`;
const panelId = (group: string, id: string) => `${group}-panel-${id}`;

/**
 * Accessible tab list (WAI-ARIA pattern): arrow keys move between tabs,
 * Home/End jump to the ends, and only the active tab is in the tab order.
 * Inactive panels are unmounted, so `aria-controls` is set on the selected
 * tab only — pointing at an element that does not exist is invalid ARIA.
 */
export function Tabs({ group, items, value, onChange, label, className }: TabsProps) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const focusAt = (index: number) => {
    const next = items[(index + items.length) % items.length];
    if (!next) return;
    onChange(next.id);
    refs.current[next.id]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => focusAt(index + 1),
      ArrowLeft: () => focusAt(index - 1),
      Home: () => focusAt(0),
      End: () => focusAt(items.length - 1),
    };
    const handler = keys[event.key];
    if (handler) {
      event.preventDefault();
      handler();
    }
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "flex gap-1 overflow-x-auto rounded-pill bg-canvas p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {items.map((item, index) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            ref={(node) => {
              refs.current[item.id] = node;
            }}
            role="tab"
            id={tabId(group, item.id)}
            aria-selected={selected}
            {...(selected ? { "aria-controls": panelId(group, item.id) } : {})}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "flex-1 shrink-0 rounded-pill px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
              selected ? "bg-surface text-brand-700 shadow-card" : "text-muted hover:text-ink",
            )}
          >
            {item.label}
            {item.badge !== undefined ? (
              <span className="ml-1.5 text-xs font-bold text-muted">{item.badge}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({
  group,
  id,
  value,
  children,
  className,
}: {
  group: string;
  id: string;
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (id !== value) return null;
  return (
    <div
      role="tabpanel"
      id={panelId(group, id)}
      aria-labelledby={tabId(group, id)}
      tabIndex={0}
      className={cn("animate-rise-in outline-none", className)}
    >
      {children}
    </div>
  );
}
