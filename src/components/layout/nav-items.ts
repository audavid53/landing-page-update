import {
  Award,
  BarChart3,
  Bookmark,
  Briefcase,
  ClipboardCheck,
  Compass,
  GraduationCap,
  Home,
  Route,
  Target,
  User,
  Users,
} from "lucide-react";
import type { Ramp } from "@/data/types";

export type NavItem = {
  to: string;
  label: string;
  icon: typeof Home;
  /** Gradient used when this destination is the active one. */
  ramp: Ramp;
};

/**
 * Primary destinations. Blueprint section 5 names six areas, but a bottom bar
 * holds five before the touch targets get too tight — so Job Opportunities,
 * which is locked until Level 6 for most learners, lives in the sidebar and on
 * the dashboard rather than taking a permanent slot.
 */
export const PRIMARY_NAV: NavItem[] = [
  { to: "/dashboard", label: "Home", icon: Home, ramp: "violet" },
  { to: "/learning", label: "Learn", icon: GraduationCap, ramp: "sky" },
  { to: "/journey", label: "Journey", icon: Route, ramp: "amber" },
  { to: "/community", label: "Community", icon: Users, ramp: "green" },
  { to: "/profile", label: "Profile", icon: User, ramp: "rose" },
];

/** Secondary areas, revealed in the sidebar rather than the bottom bar. */
export const SECONDARY_NAV: NavItem[] = [
  { to: "/mentorship", label: "Mentorship Corner", icon: Compass, ramp: "violet" },
  { to: "/opportunities", label: "Job Opportunities", icon: Briefcase, ramp: "navy" },
  { to: "/assessments", label: "Assessments", icon: ClipboardCheck, ramp: "sky" },
  { to: "/stats", label: "Statistics", icon: BarChart3, ramp: "green" },
  { to: "/community#challenges", label: "Challenges", icon: Target, ramp: "amber" },
  { to: "/profile#badges", label: "Achievements", icon: Award, ramp: "rose" },
  { to: "/profile#saved", label: "Saved", icon: Bookmark, ramp: "violet" },
];
