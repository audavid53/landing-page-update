import { NavLink } from "react-router-dom";
import { PRIMARY_NAV } from "./nav-items";
import { cn } from "@/lib/cn";

/**
 * The floating dark capsule from the design reference: solid, high-contrast,
 * with the active destination lifted into a filled gradient circle rather than
 * merely tinted. Labels are visible only for the active item so five icons fit
 * a narrow phone without shrinking below the touch target.
 *
 * It never becomes the only route to a destination — the sidebar carries the
 * same links, plus the secondary ones, at desktop widths.
 */
export function BottomNav() {
  return (
    <nav
      aria-label="Quick navigation"
      className={cn(
        "fixed inset-x-4 bottom-4 z-40 rounded-pill bg-shell shadow-pill",
        "mb-[env(safe-area-inset-bottom)]",
        "sm:inset-x-auto sm:left-1/2 sm:w-auto sm:-translate-x-1/2",
      )}
    >
      <ul className="flex items-stretch justify-between gap-1 p-2">
        {PRIMARY_NAV.map(({ to, label, icon: Icon, ramp }) => (
          <li key={to} className="flex-1 sm:flex-none">
            <NavLink
              to={to}
              data-ramp={ramp}
              className={({ isActive }) =>
                cn(
                  "group relative flex h-12 items-center justify-center gap-2 rounded-pill px-3 transition-colors",
                  isActive ? "ramp-fill" : "text-shell-muted hover:text-white",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    aria-hidden="true"
                    className={cn("size-5 shrink-0", isActive && "text-white")}
                    strokeWidth={2.6}
                    {...(isActive ? { fill: "currentColor", fillOpacity: 0.25 } : {})}
                  />
                  {/*
                    The visible label appears only for the active item, and only
                    once there is room for it. It is hidden from assistive tech
                    because the sr-only label below is always present — without
                    that split, the active link loses its accessible name at the
                    widths where the visible label is display:none.
                  */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "hidden text-[0.8125rem] font-bold whitespace-nowrap text-white",
                      isActive && "sm:inline",
                    )}
                  >
                    {label}
                  </span>
                  <span className="sr-only">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
