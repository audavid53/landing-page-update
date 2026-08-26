import { cn } from "@/lib/cn";

const sizes = {
  xs: "size-7 text-[0.625rem]",
  sm: "size-9 text-xs",
  md: "size-12 text-sm",
  lg: "size-16 text-lg",
  xl: "size-20 text-2xl",
} as const;

type AvatarProps = {
  name: string;
  src?: string;
  size?: keyof typeof sizes;
  ring?: boolean;
  online?: boolean;
  className?: string;
};

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export function Avatar({ name, src, size = "md", ring, online, className }: AvatarProps) {
  return (
    <span className={cn("relative inline-block shrink-0", className)}>
      <span
        className={cn(
          "grid place-items-center overflow-hidden rounded-full bg-brand-100 font-bold text-brand-700",
          sizes[size],
          ring && "ring-2 ring-brand-500 ring-offset-2 ring-offset-transparent",
        )}
      >
        {src ? (
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        ) : (
          <span aria-hidden="true">{initials(name)}</span>
        )}
      </span>
      {online ? (
        <span
          className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-surface bg-success"
          aria-hidden="true"
        />
      ) : null}
      <span className="sr-only">{name}</span>
    </span>
  );
}

/** Overlapping avatar row used for community/Dream Team presence. */
export function AvatarGroup({
  people,
  max = 4,
  label,
}: {
  people: { name: string; src?: string }[];
  max?: number;
  label: string;
}) {
  const shown = people.slice(0, max);
  const overflow = people.length - shown.length;

  return (
    <div className="flex items-center" aria-label={label} role="group">
      <div className="flex -space-x-2">
        {shown.map((person) => (
          <span key={person.name} className="rounded-full ring-2 ring-surface">
            <Avatar name={person.name} src={person.src} size="xs" />
          </span>
        ))}
        {overflow > 0 ? (
          <span className="grid size-7 place-items-center rounded-full bg-canvas text-[0.625rem] font-bold text-muted ring-2 ring-surface">
            +{overflow}
          </span>
        ) : null}
      </div>
    </div>
  );
}
