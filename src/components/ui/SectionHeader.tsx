import { cn } from "@/lib/cn";

export function SectionHeader({
  title,
  description,
  action,
  className,
  id,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("mb-4 flex flex-wrap items-end justify-between gap-3", className)}>
      <div className="min-w-0">
        <h2 id={id} className="text-lg font-bold text-ink sm:text-xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
