import { forwardRef } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold " +
  "transition-[transform,background-color,color,box-shadow] duration-150 ease-out " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-50 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white shadow-[0_6px_16px_-8px_var(--color-brand-500)] hover:bg-brand-600",
  secondary: "bg-brand-50 text-brand-700 hover:bg-brand-100",
  ghost: "bg-transparent text-muted hover:bg-brand-50 hover:text-brand-700",
  dark: "bg-shell text-white hover:bg-shell-raised",
  danger: "bg-danger-soft text-danger hover:bg-danger hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", fullWidth, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    />
  );
});

export type ButtonLinkProps = LinkProps & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

/** Same visual language as Button, but renders a real anchor for navigation. */
export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  fullWidth,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    />
  );
}
