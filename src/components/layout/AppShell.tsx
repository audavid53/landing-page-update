import { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
} from "lucide-react";
import { RewardFeedback } from "@/components/gamification/RewardFeedback";
import { GradientDefs } from "@/components/ui/GradientIcon";
import { PageSkeleton } from "@/components/ui/Feedback";
import { Avatar } from "@/components/ui/Avatar";
import { tierFor } from "@/data/badges";
import { CURRENT_LEVEL } from "@/data/programme";
import { useProgress } from "@/state/useProgress";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { cn } from "@/lib/cn";
import { useSession } from "@/state/SessionProvider";
import { StudentWelcome } from "@/components/onboarding/StudentWelcome";

/** Send focus and scroll to the top of the new page on every navigation. */
function useRouteChangeFocus() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);
}

import { Art3D } from "@/components/art/Art3D";
import { useAdmission } from "@/state/AdmissionProvider";
import { AdmissionLockDialog } from "@/components/admission/AdmissionLockDialog";

/** Header on mobile with Hamburger menu, brand logo, and profile. */
function MobileTopBar({ onOpenMobileMenu }: { onOpenMobileMenu: () => void }) {
  const { account } = useSession();
  const name = account?.name ?? "Arere-Uzezi Ogheneyole David";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-surface/95 px-4 py-3 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-2.5">
        {/* Hamburger menu button */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Open navigation menu"
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface text-ink hover:bg-canvas active:scale-95 transition-all"
        >
          <Menu className="size-5 text-ink" strokeWidth={2.2} />
        </button>

        {/* Brand logo icon taking user to home page */}
        <Link
          to="/"
          aria-label="Return to home page"
          className="flex items-center gap-2 group"
          title="Back to Home"
        >
          <span
            data-ramp="violet"
            className="ramp-fill grid size-8.5 shrink-0 place-items-center rounded-lg shadow-xs transition-transform group-active:scale-95"
          >
            <Art3D name="rocket" size="xs" />
          </span>
          <span className="font-extrabold text-ink text-base tracking-tight">iCompass</span>
        </Link>
      </div>

      {/* User profile avatar */}
      <Link
        to="/profile"
        aria-label={`Your profile — ${name}`}
        className="flex items-center gap-2 rounded-xl py-1 pr-1"
      >
        <Avatar name={name} src="/images/profile_david.jpg" size="sm" ring />
      </Link>
    </header>
  );
}

/** Desktop Top Bar matching the clean reference image header style */
function DesktopTopBar({
  isCollapsed,
  onToggleCollapse,
}: {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}) {
  const { xp } = useProgress();
  const { account } = useSession();
  const name = account?.name ?? "Arere-Uzezi Ogheneyole David";
  const tier = tierFor(xp);

  return (
    <header className="hidden items-center justify-between gap-4 px-6 pt-5 pb-3 lg:flex">
      {/* Search Input & Collapse Toggle */}
      <div className="flex flex-1 items-center gap-3 max-w-md">
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface text-muted hover:text-ink hover:border-line-strong transition-colors shadow-2xs"
        >
          {isCollapsed ? (
            <PanelLeftOpen className="size-4.5" />
          ) : (
            <PanelLeftClose className="size-4.5" />
          )}
        </button>

        <div className="relative w-full">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            placeholder="Search your journey..."
            aria-label="Search iCompass"
            className="h-10 w-full rounded-full border border-line bg-surface py-2 pr-4 pl-9 text-sm text-ink placeholder:text-muted/80 focus:border-brand-500 focus:bg-surface focus:outline-none shadow-2xs transition-colors"
          />
        </div>
      </div>

      {/* Right User Bar */}
      <div className="flex items-center gap-3.5">
        <Link
          to="/community"
          aria-label="Notifications"
          className="relative grid size-10 place-items-center rounded-full border border-line bg-surface text-ink hover:bg-canvas hover:text-brand-600 transition-colors shadow-2xs"
        >
          <Bell aria-hidden="true" className="size-4.5" strokeWidth={2.2} />
          <span
            aria-hidden="true"
            className="absolute top-2 right-2.5 size-2 rounded-full bg-danger ring-2 ring-surface"
          />
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 rounded-full border border-line bg-surface py-1.5 pr-4 pl-1.5 shadow-2xs hover:border-line-strong hover:bg-canvas/50 transition-all"
        >
          <Avatar name={name} src="/images/profile_david.jpg" size="sm" ring />
          <div className="text-left">
            <p className="text-xs font-extrabold text-ink leading-tight">{name.split(" ")[0]}</p>
            <p className="text-[0.6875rem] font-semibold text-muted flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-success" />
              Level {account ? tier.level : CURRENT_LEVEL} ({tier.name})
            </p>
          </div>
          <ChevronDown className="size-3.5 text-muted ml-0.5" />
        </Link>
      </div>
    </header>
  );
}

export function AppShell() {
  useRouteChangeFocus();
  const { pathname } = useLocation();
  const { account } = useSession();
  const { hasCompleted } = useProgress();
  const showWelcome = account?.role === "student" && !hasCompleted("assessment:personality") && pathname === "/dashboard";

  const { state: admission } = useAdmission();
  const isAdmitted = Boolean(
    admission.guardian &&
    admission.subscription &&
    admission.friend?.inviteCopied &&
    admission.interviewComplete &&
    admission.profile
  );

  const isStudentRole = !account || account.role === "student";
  const isLockedRoute =
    isStudentRole &&
    !isAdmitted &&
    !["/dashboard", "/profile", "/assessments/personality"].includes(pathname);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem("iplace_sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("iplace_sidebar_collapsed", String(next));
      } catch {
        // ignore localstorage errors
      }
      return next;
    });
  };

  return (
    <div className="flex min-h-dvh bg-canvas antialiased">
      <a
        href="#main"
        className="skip-link rounded-pill bg-brand-500 px-4 py-2 text-sm font-bold text-white z-50"
      >
        Skip to main content
      </a>

      <GradientDefs />

      {/* Desktop Collapsible Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      {/* Mobile Drawer (Hamburger Menu) */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col transition-all duration-300">
        {/* Mobile Header with Hamburger */}
        <MobileTopBar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Desktop Header */}
        <DesktopTopBar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />

        {/* The Rounded Main Container as in the reference */}
        <div className="flex-1 px-3 py-3 sm:px-6 sm:py-4 lg:px-6 lg:pb-8">
          <main
            id="main"
            tabIndex={-1}
            className={cn(
              "mx-auto w-full max-w-6xl flex-1 outline-none",
              "rounded-2xl sm:rounded-3xl lg:rounded-[32px]",
              "border border-line/80 bg-surface shadow-card",
              "p-4 pt-6 pb-28 sm:p-7 sm:pb-28 lg:p-8 lg:pb-16",
              "transition-all duration-300 ease-in-out",
            )}
          >
            <Suspense fallback={<PageSkeleton />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>

      <BottomNav />
      <RewardFeedback />
      {showWelcome && <StudentWelcome />}
      {isLockedRoute && <AdmissionLockDialog />}
    </div>
  );
}
