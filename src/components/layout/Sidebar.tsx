import { NavLink } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { ProfileStatusCard } from "@/components/gamification/ProfileStatusCard";
import { PRIMARY_NAV, SECONDARY_NAV } from "./nav-items";
import { Art3D } from "@/components/art/Art3D";
import { Avatar } from "@/components/ui/Avatar";
import { tierFor } from "@/data/badges";
import { useProgress } from "@/state/useProgress";
import { cn } from "@/lib/cn";

type SidebarProps = {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
};

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200",
    isActive
      ? "bg-brand-500 text-white shadow-xs"
      : "text-shell-muted hover:bg-shell-raised hover:text-white",
  );

const collapsedLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "group relative flex size-11 items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200",
    isActive
      ? "bg-brand-500 text-white shadow-xs"
      : "text-shell-muted hover:bg-shell-raised hover:text-white",
  );

export function Sidebar({ isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const { xp } = useProgress();
  const tier = tierFor(xp);

  return (
    <aside
      aria-label="Main"
      className={cn(
        "sticky top-0 hidden h-dvh shrink-0 flex-col overflow-y-auto bg-shell py-6 transition-all duration-300 ease-in-out lg:flex",
        isCollapsed ? "w-20 items-center px-3" : "w-72 gap-6 px-4",
      )}
    >
      {/* Header with Logo and Collapse Toggle */}
      <div className={cn("flex items-center", isCollapsed ? "justify-center w-full" : "justify-between w-full px-1")}>
        <NavLink
          to="/"
          className={cn(
            "flex items-center gap-2.5 rounded-xl py-1 text-white group",
            isCollapsed && "justify-center",
          )}
          title="iPlace Home"
        >
          <span
            data-ramp="violet"
            className="ramp-fill grid size-9 shrink-0 place-items-center rounded-tile shadow-xs"
          >
            <Art3D name="rocket" size="xs" />
          </span>
          {!isCollapsed && (
            <span className="text-base font-extrabold tracking-tight">iPlace</span>
          )}
        </NavLink>

        {onToggleCollapse && !isCollapsed && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
            className="grid size-8 place-items-center rounded-lg border border-shell-line text-shell-muted hover:bg-shell-raised hover:text-white transition-colors"
          >
            <PanelLeftClose className="size-4" />
          </button>
        )}
      </div>

      {/* When collapsed, toggle button sits right under the logo */}
      {onToggleCollapse && isCollapsed && (
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label="Expand sidebar"
          title="Expand sidebar"
          className="mt-4 grid size-9 place-items-center rounded-xl border border-shell-line bg-shell-raised text-shell-muted hover:bg-shell-line hover:text-white transition-colors"
        >
          <PanelLeftOpen className="size-4" />
        </button>
      )}

      {/* Primary Navigation */}
      <nav aria-label="Primary" className={cn("w-full", isCollapsed && "mt-4")}>
        <ul className={cn("flex flex-col gap-1.5", isCollapsed && "items-center")}>
          {PRIMARY_NAV.map(({ to, label, icon: Icon }) => (
            <li key={to} className={cn(isCollapsed ? "w-auto" : "w-full")}>
              <NavLink
                to={to}
                title={isCollapsed ? label : undefined}
                className={isCollapsed ? collapsedLinkClass : linkClass}
              >
                <Icon aria-hidden="true" className="size-4.5 shrink-0" />
                {!isCollapsed && <span>{label}</span>}
                {isCollapsed && (
                  <span className="pointer-events-none absolute left-full ml-2.5 hidden rounded-md bg-ink px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-white shadow-md group-hover:block z-50">
                    {label}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Secondary Navigation */}
      <nav aria-label="Secondary" className={cn("w-full", isCollapsed && "mt-2")}>
        {!isCollapsed && (
          <p className="px-3 pb-2 text-[0.6875rem] font-bold tracking-widest text-shell-muted uppercase">
            More
          </p>
        )}
        {isCollapsed && <div className="mx-auto my-2 h-px w-8 bg-shell-line" />}
        <ul className={cn("flex flex-col gap-1", isCollapsed && "items-center")}>
          {SECONDARY_NAV.map(({ to, label, icon: Icon }) => (
            <li key={to} className={cn(isCollapsed ? "w-auto" : "w-full")}>
              <NavLink
                to={to}
                title={isCollapsed ? label : undefined}
                className={isCollapsed ? collapsedLinkClass : linkClass}
              >
                <Icon aria-hidden="true" className="size-4.5 shrink-0" />
                {!isCollapsed && <span>{label}</span>}
                {isCollapsed && (
                  <span className="pointer-events-none absolute left-full ml-2.5 hidden rounded-md bg-ink px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-white shadow-md group-hover:block z-50">
                    {label}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Profile Section */}
      {!isCollapsed ? (
        <ProfileStatusCard className="mt-auto" />
      ) : (
        <div className="mt-auto flex flex-col items-center gap-2 pt-4">
          <NavLink
            to="/profile"
            className="group relative grid size-10 place-items-center rounded-xl bg-shell-raised border border-shell-line transition-transform hover:scale-105"
            title={`Mary Sokoh · Level 3 · ${tier.name}`}
          >
            <Avatar name="Mary Sokoh" size="sm" ring />
            <span className="pointer-events-none absolute left-full ml-2.5 hidden rounded-md bg-ink px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-white shadow-md group-hover:block z-50">
              Mary Sokoh · Level 3 ({tier.name})
            </span>
          </NavLink>
        </div>
      )}
    </aside>
  );
}
