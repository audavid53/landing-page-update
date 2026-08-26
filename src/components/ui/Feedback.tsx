import { cn } from "@/lib/cn";

/** Loading placeholder that keeps layout stable while route chunks load. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-card bg-[linear-gradient(90deg,var(--color-line)_25%,var(--color-canvas)_50%,var(--color-line)_75%)] bg-[length:200%_100%]",
        className,
      )}
    />
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <Skeleton className="h-10 w-56" />
      <Skeleton className="h-44 w-full" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
  art,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  art?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-line-strong bg-surface px-6 py-12 text-center">
      {art ? <div aria-hidden="true">{art}</div> : null}
      <h3 className="text-base font-bold text-ink">{title}</h3>
      <p className="max-w-sm text-sm text-muted">{description}</p>
      {action}
    </div>
  );
}
