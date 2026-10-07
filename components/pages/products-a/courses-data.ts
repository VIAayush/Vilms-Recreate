/* ---------------- Builder ---------------- */

export type ModuleType = "recorded" | "live" | "test";
export type Avail = "open" | "preview" | "drip" | "soon";

export type CourseModule = {
  id: string;
  type: ModuleType;
  title: string;
  meta: string;
  avail: Avail;
  files?: number;
};

export const START_MODULES: CourseModule[] = [
  { id: "m1", type: "recorded", title: "Orientation & study plan", meta: "Recorded · 4 lessons", avail: "preview" },
  { id: "m2", type: "recorded", title: "Polity essentials", meta: "Recorded · 9 lessons", avail: "drip", files: 2 },
  { id: "m3", type: "live", title: "Weekly doubt-clearing", meta: "Live · Google Meet · Thu 7:00 PM", avail: "open" },
  { id: "m4", type: "test", title: "Mock test 1 · answer writing", meta: "Test · rubric graded", avail: "soon" },
];

export const EXTRA_MODULES: CourseModule[] = [
  { id: "m5", type: "recorded", title: "Economy basics", meta: "Recorded · 6 lessons", avail: "open", files: 1 },
  { id: "m6", type: "live", title: "Answer-writing workshop", meta: "Live · Zoom · Sat 11:00 AM", avail: "open" },
  { id: "m7", type: "test", title: "Weekly quiz", meta: "Test · auto-graded", avail: "open" },
];

export const AVAIL_ORDER: Avail[] = ["open", "preview", "drip", "soon"];
export const AVAIL_LABEL: Record<Avail, string> = { open: "Open", preview: "Free preview", drip: "Drip · day 7", soon: "Coming soon" };

/* ---------------- Journey (scroll story) ---------------- */

export const JOURNEY = [
  { title: "Create the course", text: "Name it, pick recorded, live or hybrid, set the price." },
  { title: "Add lessons", text: "Drag modules into order. Attach notes and worksheets." },
  { title: "Schedule a live class", text: "Paste a Zoom or Meet link. RSVPs and reminders switch on." },
  { title: "Students join", text: "They RSVP, get a reminder and join from inside the course." },
  { title: "Students learn", text: "Recordings stay private in the course. Drip lessons open on schedule." },
  { title: "Completion", text: "A certificate in your name, and a one-click offer for the next batch." },
];

/* ---------------- Hybrid ---------------- */

export type HybridFormat = "recorded" | "live" | "hybrid";

export const HYBRID_MODULES: { id: string; type: ModuleType; title: string; meta: string }[] = [
  { id: "h1", type: "recorded", title: "Orientation & study plan", meta: "4 recorded lessons" },
  { id: "h2", type: "live", title: "Kick-off class", meta: "Live · Mon 7 PM" },
  { id: "h3", type: "recorded", title: "Polity essentials", meta: "9 recorded lessons" },
  { id: "h4", type: "live", title: "Weekly doubt-clearing", meta: "Live · Thu 7 PM" },
  { id: "h5", type: "test", title: "Mock test 1", meta: "Rubric graded" },
  { id: "h6", type: "recorded", title: "Class recordings", meta: "Inside the course" },
];

export const HYBRID_COPY: Record<HybridFormat, { title: string; text: string }> = {
  recorded: { title: "Recorded", text: "Learners study on their own time, with videos, documents and presentations inside the course." },
  live: { title: "Live", text: "A batch that meets for live classes, with the class link kept in the course." },
  hybrid: { title: "Hybrid", text: "Online and blended learning in one course: recorded lessons, live classes and tests together, with one progress view and one certificate." },
};

/* ---------------- Page copy (docs/content-source.md) ---------------- */

export const COURSE_CREATE = [
  "Create and organize courses",
  "Upload videos, documents, and presentations",
  "Manage lessons and learning resources",
  "Add quizzes, tests, and assignments",
  "Manage students and course access",
  "Track learner progress",
  "Generate reports and certificates",
].map((t) => ({ t }));

export const COURSE_WHO = [
  { t: "Teachers & Educators", d: "Create online courses and share learning content with students through an easy-to-use platform." },
  { t: "Coaching Institutes", d: "Manage courses, batches, learners, assessments, and learning materials from one place." },
  { t: "Trainers & Professionals", d: "Deliver structured training programs and track learner performance." },
  { t: "Education Businesses", d: "Use VILMS as a course selling platform to organize and deliver paid or free online courses." },
];

export const COURSE_WHY = [
  "Simplify course creation",
  "Manage learners easily",
  "Deliver courses online",
  "Track learner progress",
  "Conduct online assessments",
  "Organize learning content",
  "Support different learning programs",
].map((title, i) => ({ n: String(i + 1).padStart(2, "0"), title }));

export const COURSE_FAQ = [
  {
    q: "What is an online course platform for educators?",
    a: "An online course platform helps educators create, manage, and deliver courses, learning content, assessments, and student activities online.",
  },
  {
    q: "Can teachers create courses with VILMS?",
    a: "Yes. Teachers and educators can use VILMS to organize courses, lessons, learning resources, assessments, and learners.",
  },
  {
    q: "Can VILMS be used to sell online courses?",
    a: "Yes. VILMS can support organizations and educators that want to offer and manage paid or free online courses.",
  },
  {
    q: "Is VILMS suitable for coaching institutes?",
    a: "Yes. Coaching institutes can use VILMS to manage courses, learners, batches, assessments, and learning content.",
  },
];
