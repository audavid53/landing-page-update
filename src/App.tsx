import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { ApplyShell } from "@/components/layout/ApplyShell";

// Route-level code splitting: the landing page is the only chunk most first-time
// visitors download, and each in-app area loads on demand.
const Landing = lazy(() => import("@/pages/Landing"));

// Pre-admission (blueprint section 4). Kept under /apply so the two experience
// states in section 3 are visible in the URL, not just in component state.
const ApplyDashboard = lazy(() => import("@/pages/apply/ApplyDashboard"));
const Interview = lazy(() => import("@/pages/apply/Interview"));
const Guardian = lazy(() => import("@/pages/apply/Guardian"));
const Payment = lazy(() => import("@/pages/apply/Payment"));

// Post-admission platform (sections 5-14).
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Journey = lazy(() => import("@/pages/Journey"));
const LearningCentre = lazy(() => import("@/pages/LearningCentre"));
const PillarDetail = lazy(() => import("@/pages/PillarDetail"));
const LessonPlayer = lazy(() => import("@/pages/LessonPlayer"));
const Mentorship = lazy(() => import("@/pages/Mentorship"));
const MentorSession = lazy(() => import("@/pages/MentorSession"));
const Community = lazy(() => import("@/pages/Community"));
const Opportunities = lazy(() => import("@/pages/Opportunities"));
const Stats = lazy(() => import("@/pages/Stats"));
const Assessments = lazy(() => import("@/pages/Assessments"));
const AssessmentRunner = lazy(() => import("@/pages/AssessmentRunner"));
const Profile = lazy(() => import("@/pages/Profile"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/*
        Two shells for the two experience states in section 3. An applicant
        never sees the platform navigation, so the product does not present
        itself as a wall of locked destinations before admission.
      */}
      <Route element={<ApplyShell />}>
        <Route path="/apply" element={<ApplyDashboard />} />
        <Route path="/apply/assessments" element={<Assessments />} />
        <Route path="/apply/assessments/:assessmentId" element={<AssessmentRunner />} />
        <Route path="/apply/interview" element={<Interview />} />
        <Route path="/apply/guardian" element={<Guardian />} />
        <Route path="/apply/payment" element={<Payment />} />
      </Route>

      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/learning" element={<LearningCentre />} />
        <Route path="/learning/:pillarId" element={<PillarDetail />} />
        <Route path="/learning/:pillarId/:lessonId" element={<LessonPlayer />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/mentorship/:mentorId" element={<MentorSession />} />
        <Route path="/community" element={<Community />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/assessments" element={<Assessments />} />
        <Route path="/assessments/:assessmentId" element={<AssessmentRunner />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
