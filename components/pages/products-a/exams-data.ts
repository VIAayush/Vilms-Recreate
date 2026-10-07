/* ---------------- The sample paper ---------------- */

export type Mcq = { id: string; q: string; options: string[]; correct: number; why: string };

export const MCQS: Mcq[] = [
  {
    id: "q1",
    q: "Which Article of the Constitution guarantees equality before the law?",
    options: ["Article 12", "Article 14", "Article 19", "Article 21"],
    correct: 1,
    why: "Article 14 guarantees equality before the law and equal protection of the laws.",
  },
  {
    id: "q2",
    q: "The Directive Principles of State Policy are contained in which Part?",
    options: ["Part II", "Part III", "Part IV", "Part V"],
    correct: 2,
    why: "Part IV, Articles 36 to 51.",
  },
  {
    id: "q3",
    q: "Which Article lets a citizen move the Supreme Court directly to enforce a Fundamental Right?",
    options: ["Article 32", "Article 74", "Article 136", "Article 226"],
    correct: 0,
    why: "Article 32, the right to constitutional remedies.",
  },
  {
    id: "q4",
    q: "The Preamble of the Constitution of India opens with which words?",
    options: ["“India, that is Bharat”", "“We, the people of India”", "“Justice, liberty, equality”", "“Sovereign, socialist, secular”"],
    correct: 1,
    why: "The Preamble begins “We, the people of India”.",
  },
  {
    id: "q5",
    q: "Which word did the 42nd Amendment add to the Preamble?",
    options: ["Republic", "Democratic", "Socialist", "Sovereign"],
    correct: 2,
    why: "The 42nd Amendment (1976) added “Socialist”, “Secular” and “Integrity”.",
  },
];

export const LONG_Q = {
  id: "q6",
  q: "Discuss the relationship between Fundamental Rights and the Directive Principles of State Policy.",
  marks: 15,
};

export const EXAM_SECONDS = 29 * 60 + 48;

/* ---------------- Rubric (mentor review) ---------------- */

export const RUBRIC = [
  { id: "content", label: "Content", max: 7, ai: 6, note: "Covers both parts. Clear on how they interact." },
  { id: "structure", label: "Structure", max: 4, ai: 3, note: "Intro, argument and conclusion are in order." },
  { id: "examples", label: "Examples", max: 4, ai: 2, note: "Add one landmark case to support the second point." },
];

/* ---------------- Grade history ---------------- */

export type TestKind = "mcq" | "long" | "mock";

export type GradeRow = { id: string; name: string; kind: TestKind; score: number; max: number; when: string };

export const GRADES: GradeRow[] = [
  { id: "g1", name: "Weekly quiz 1", kind: "mcq", score: 14, max: 20, when: "Wk 1" },
  { id: "g2", name: "Mock test 1", kind: "mock", score: 34, max: 50, when: "Wk 2" },
  { id: "g3", name: "Mains Q1", kind: "long", score: 9, max: 15, when: "Wk 3" },
  { id: "g4", name: "Weekly quiz 2", kind: "mcq", score: 16, max: 20, when: "Wk 4" },
  { id: "g5", name: "Mock test 2", kind: "mock", score: 38, max: 50, when: "Wk 6" },
  { id: "g6", name: "Mains Q3", kind: "long", score: 11, max: 15, when: "Wk 7" },
];

export const KIND_LABEL: Record<TestKind, string> = { mcq: "MCQ", long: "Long-form", mock: "Mock test" };

/* ---------------- Study materials ---------------- */

export type Access = "public" | "lead" | "enrolled";

export const MATERIALS: { id: string; title: string; meta: string; access: Access }[] = [
  { id: "s1", title: "Polity notes · Part 1", meta: "PDF", access: "public" },
  { id: "s2", title: "100 PYQs with solutions", meta: "PDF", access: "lead" },
  { id: "s3", title: "Mock test 4 · answer key", meta: "PDF", access: "enrolled" },
  { id: "s4", title: "Current affairs · March", meta: "PDF", access: "enrolled" },
];

export const ACCESS_COPY: { id: Access; title: string; line: string }[] = [
  { id: "public", title: "Public", line: "Free for anyone who visits your site." },
  { id: "lead", title: "Lead-magnet gated", line: "Free in exchange for contact details. Builds your lead list." },
  { id: "enrolled", title: "Enrolled-only", line: "Reserved for students who have paid." },
];

/* ---------------- Page copy (docs/content-source.md) ---------------- */

export const EXAM_FEATURES = [
  { t: "Create Online Tests", d: "Create quizzes, practice tests, mock exams, and assessments with organized question sets." },
  { t: "Question Management", d: "Create and manage questions and build tests based on different subjects, topics, or learning programs." },
  { t: "Easy Exam Management", d: "Schedule exams, manage candidates, and organize multiple tests from one platform." },
  { t: "Instant Results", d: "View test results and learner performance after assessments." },
  { t: "Performance Tracking", d: "Track scores, completion, and learner performance to understand areas that need improvement." },
  { t: "Reports & Analytics", d: "Get useful reports to review test performance and assessment results." },
];

export const EXAM_WHO = [
  { t: "Coaching Institutes", d: "Conduct mock tests, practice exams, and online assessments." },
  { t: "Educational Institutions", d: "Manage digital tests and student assessments." },
  { t: "Training Institutes", d: "Conduct training evaluations and skill assessments." },
  { t: "Businesses & HR Teams", d: "Assess employee knowledge and training outcomes." },
  { t: "Professional Trainers", d: "Create tests and evaluate learner performance." },
];

export const EXAM_WHY = [
  "Create and manage online exams",
  "Conduct mock tests and quizzes",
  "Organize question banks",
  "Track learner performance",
  "Manage multiple assessments",
  "View results and reports",
  "Support online learning and assessment",
].map((title, i) => ({ n: String(i + 1).padStart(2, "0"), title }));

export const EXAM_FAQ = [
  {
    q: "What is online exam software for coaching institutes?",
    a: "Online exam software helps coaching institutes create, conduct, manage, and evaluate online tests, mock exams, quizzes, and assessments.",
  },
  {
    q: "Can VILMS be used for mock tests?",
    a: "Yes. VILMS can be used to create and manage mock tests, practice exams, quizzes, and other online assessments.",
  },
  {
    q: "Can educational institutions use VILMS for exams?",
    a: "Yes. Educational institutions can use VILMS to conduct online tests, manage assessments, and track learner performance.",
  },
  {
    q: "Does VILMS provide exam reports?",
    a: "Yes. VILMS can help administrators and trainers review test results, scores, completion, and learner performance.",
  },
];
