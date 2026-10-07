import { Award, BarChart3, ClipboardCheck, MonitorPlay, TrendingUp, Users, type LucideIcon } from "lucide-react";

// Copy comes from docs/content-source.md ("LMS Platform for Coaching Institutes").

/* ---------------- The six key features, as modules ---------------- */

export type ModuleId = "courses" | "learners" | "assessments" | "progress" | "reports" | "certificates";

export type ModuleDef = {
  id: ModuleId;
  label: string;
  Icon: LucideIcon;
  /** the doc's one-line description */
  line: string;
  /** modules it works together with */
  shares: ModuleId[];
};

export const MODULES: ModuleDef[] = [
  { id: "courses", label: "Course Management", Icon: MonitorPlay, line: "Create and manage courses, videos, documents, and other learning resources.", shares: ["learners", "assessments"] },
  { id: "learners", label: "Learner Management", Icon: Users, line: "Manage learners, batches, groups, and course access easily.", shares: ["courses", "progress"] },
  { id: "assessments", label: "Online Assessments", Icon: ClipboardCheck, line: "Create quizzes, tests, assignments, and evaluations.", shares: ["progress", "reports"] },
  { id: "progress", label: "Progress Tracking", Icon: TrendingUp, line: "Monitor learner activity, course completion, and performance.", shares: ["reports", "certificates"] },
  { id: "reports", label: "Reports & Analytics", Icon: BarChart3, line: "Track learning activities and get useful training insights.", shares: ["progress", "assessments"] },
  { id: "certificates", label: "Certificates", Icon: Award, line: "Provide certificates after successful course completion.", shares: ["progress", "courses"] },
];

export const MODULE_BY_ID = Object.fromEntries(MODULES.map((m) => [m.id, m])) as Record<ModuleId, ModuleDef>;

/* ---------------- "Choose the right online LMS platform" ---------------- */

export type ToolChip = { id: string; name: string; holds: string; x: number; y: number; xm: number; ym: number; rot: number };

// x / y are percentages of the arena on wide screens, xm / ym on phones.
export const TOOLS: ToolChip[] = [
  { id: "chat", name: "Chat groups", holds: "Learners", x: 15, y: 20, xm: 27, ym: 11, rot: -4 },
  { id: "calls", name: "Video calls", holds: "Classes", x: 50, y: 11, xm: 73, ym: 21, rot: 3 },
  { id: "forms", name: "Quiz forms", holds: "Assessments", x: 85, y: 22, xm: 27, ym: 36, rot: -3 },
  { id: "sheets", name: "Spreadsheets", holds: "Progress", x: 13, y: 70, xm: 73, ym: 47, rot: 3 },
  { id: "drive", name: "Drive folders", holds: "Content", x: 38, y: 88, xm: 27, ym: 62, rot: -3 },
  { id: "word", name: "Word templates", holds: "Certificates", x: 64, y: 86, xm: 73, ym: 73, rot: 4 },
  { id: "manual", name: "Manual reports", holds: "Results", x: 87, y: 68, xm: 50, ym: 90, rot: -4 },
];

export const CRITERIA = [
  { n: "01", t: "Easy course management" },
  { n: "02", t: "Learner tracking" },
  { n: "03", t: "Assessments" },
  { n: "04", t: "Reporting" },
  { n: "05", t: "Content management" },
  { n: "06", t: "Scalability" },
];

/* ---------------- Who can use VILMS ---------------- */

export type Audience = { name: string; blurb: string; modules: ModuleId[]; href?: "coaching" | "schoolsColleges" | "training" };

export const AUDIENCES: Audience[] = [
  { name: "Coaching & Training Institutes", blurb: "Manage courses, batches, trainers, and learners.", modules: ["courses", "learners", "assessments", "progress", "certificates"], href: "coaching" },
  { name: "Educational Institutions", blurb: "Deliver online and blended learning.", modules: ["courses", "learners", "assessments", "progress"], href: "schoolsColleges" },
  { name: "Businesses", blurb: "Manage employee onboarding and training.", modules: ["courses", "learners", "progress", "certificates"] },
  { name: "HR & L&D Teams", blurb: "Organize employee learning and development.", modules: ["learners", "progress", "reports", "certificates"] },
  { name: "Training Organizations", blurb: "Manage courses, assessments, and training programs.", modules: ["courses", "assessments", "reports", "certificates"], href: "training" },
];

/* ---------------- Why choose VILMS ---------------- */

export const BENEFITS = [
  "Simplify learning management",
  "Track learner progress",
  "Manage training programs",
  "Organize learning content",
  "Support employee development",
  "Access learning across devices",
].map((title, i) => ({ n: String(i + 1).padStart(2, "0"), title }));

/* ---------------- FAQ ---------------- */

export const LMS_FAQ = [
  {
    q: "What is an LMS platform for coaching institutes?",
    a: "An LMS is a digital platform for managing courses, learners, trainers, assessments, content, and progress.",
  },
  {
    q: "Can VILMS be used for employee training?",
    a: "Yes. VILMS can help businesses manage employee training, onboarding, assessments, and learning activities.",
  },
  {
    q: "Can educational institutions use VILMS?",
    a: "Yes. VILMS supports online and blended learning for educational institutions.",
  },
  {
    q: "What features does VILMS offer?",
    a: "VILMS offers course management, learner management, assessments, progress tracking, reports, content management, and certificates.",
  },
  {
    q: "Is VILMS suitable for training institutes?",
    a: "Yes. Training institutes can use VILMS to manage courses, learners, trainers, assessments, and training progress.",
  },
];
