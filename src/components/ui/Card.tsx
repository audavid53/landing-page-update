import { cn } from "@/lib/cn";

type CardProps = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "article" | "li";
  padded?: boolean;
  interactive?: boolean;
};

/** The base friendly surface: rounded, hairline border, soft elevation. */
export function Card({
  as: Tag = "div",
  className,
  padded = true,
  interactive = false,
  ...props
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card border border-line bg-surface shadow-card",
        padded && "p-5 sm:p-6",
        interactive &&
          "transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-raised",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <h3 className="text-base font-bold text-ink">{title}</h3>
        {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
