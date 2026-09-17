import { useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronRight, Sparkles, X, Zap } from "lucide-react";
import { Art3D } from "@/components/art/Art3D";
import { Avatar } from "@/components/ui/Avatar";
import { PRIMARY_NAV, SECONDARY_NAV } from "./nav-items";
import { tierFor } from "@/data/badges";
import { CURRENT_LEVEL } from "@/data/programme";
import { useProgress } from "@/state/useProgress";
import { cn } from "@/lib/cn";
import { useSession } from "@/state/SessionProvider";

type MobileNavDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const { pathname } = useLocation();
  const { xp } = useProgress();
  const { account } = useSession();
  const learnerName = account?.name ?? "Arere-Uzezi Ogheneyole David";
  const tier = tierFor(xp);

  // Close drawer ONLY when route path actually changes
  const prevPath = useRef(pathname);
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 flex lg:hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative flex w-[85%] max-w-sm flex-col overflow-y-auto bg-shell p-5 text-white shadow-2xl transition-transform duration-300">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-shell-line pb-4">
          <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
            <span
              data-ramp="violet"
              className="ramp-fill grid size-9 shrink-0 place-items-center rounded-tile"
            >
              <Art3D name="rocket" size="xs" />
            </span>
            <span className="text-lg font-extrabold tracking-tight">iPlace</span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-9 place-items-center rounded-full border border-shell-line bg-shell-raised text-shell-muted hover:text-white transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="mt-4 rounded-2xl border border-shell-line bg-shell-raised p-3.5">
          <div className="flex items-center gap-3">
            <Avatar name={learnerName} src="/images/profile_david.jpg" size="md" ring online />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">{learnerName}</p>
              <p className="truncate text-xs text-shell-muted">Cohort 2025 · Applicant</p>
            </div>
            <Link
              to="/profile"
              onClick={onClose}
              className="grid size-8 shrink-0 place-items-center rounded-full bg-shell text-shell-muted hover:text-white"
              aria-label="View profile"
            >
              <ChevronRight className="size-4" />
            </Link>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-shell/80 px-3 py-2 text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-xp">
              <Zap className="size-3.5" fill="currentColor" />
              Level {CURRENT_LEVEL} · {tier.name}
            </span>
            <span className="font-bold tabular-nums text-white">
              {xp.toLocaleString("en-NG")} XP
            </span>
          </div>
        </div>

        {/* Primary Navigation */}
        <div className="mt-5">
          <p className="px-2 pb-2 text-[0.6875rem] font-bold tracking-widest text-shell-muted uppercase">
            Main Menu
          </p>
          <nav aria-label="Mobile Primary Navigation">
            <ul className="flex flex-col gap-1">
              {PRIMARY_NAV.map(({ to, label, icon: Icon, ramp }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={onClose}
                    data-ramp={ramp}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                        isActive
                          ? "ramp-fill text-white shadow-xs"
                          : "text-shell-muted hover:bg-shell-raised hover:text-white",
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="flex items-center gap-3">
                          <Icon className="size-5 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                          {label}
                        </span>
                        {isActive && (
                          <span className="size-2 rounded-full bg-white animate-pulse" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Secondary / More Navigation */}
        <div className="mt-5">
          <p className="px-2 pb-2 text-[0.6875rem] font-bold tracking-widest text-shell-muted uppercase">
            Explore & Tools
          </p>
          <nav aria-label="Mobile Secondary Navigation">
            <ul className="flex flex-col gap-1">
              {SECONDARY_NAV.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-brand-500 text-white"
                          : "text-shell-muted hover:bg-shell-raised hover:text-white",
                      )
                    }
                  >
                    <Icon className="size-4.5 shrink-0" />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Footer info */}
        <div className="mt-auto pt-6 border-t border-shell-line text-xs text-shell-muted flex items-center justify-between">
          <span>Cohort 4 · Nigeria</span>
          <span className="flex items-center gap-1 text-brand-300 font-medium">
            <Sparkles className="size-3.5" /> Career Ready
          </span>
        </div>
      </div>
    </div>
  );
}
