// Copy for the business pages (about, why, pricing, demo, contact). Wording is
// taken from the product brochure and lib/content.ts; plan facts are always
// computed from `pricing.plans`, never typed here.

import type { PageKey } from "@/lib/site/pages";

/* ------------------------------ About ------------------------------ */

export const ABOUT_STATEMENT = [
  { text: "VILMS is a learning platform for coaching institutes, educational institutions and businesses." },
  { text: "You enrol, teach, evaluate, follow up and get paid from one login, under your own brand —" },
  { text: "and VILMS never takes a share of your fees.", accent: true },
];

export const ABOUT_QA = [
  { q: "What is VILMS?", a: "A hosted learning platform to sell courses, run live classes, evaluate answers, collect fees and manage leads." },
  {
    q: "Who is it for?",
    a: "Coaching and training institutes first: Indian coaching institutes, test-prep centres and skill academies, especially those that use ads to find students. Also educational institutions, and businesses running employee training.",
  },
  { q: "What problem does it solve?", a: "It replaces a patchwork of WhatsApp, Zoom, Google Forms, spreadsheets and platforms that take a cut of your fees." },
  { q: "How does it help?", a: "One database from first enquiry to certificate. Nothing is re-typed, and every rupee your students pay stays yours." },
];

export const ABOUT_STEPS = [
  { title: "It starts with WhatsApp", text: "Enquiries arrive in chat threads, with no pipeline and no follow-up trail." },
  { title: "Classes move to Zoom", text: "Live sessions aren't linked to what a student enrolled in or paid for." },
  { title: "Tests go on Google Forms", text: "Essay and handwritten answers can't be graded properly, and results end up scattered." },
  { title: "Fees land in a spreadsheet", text: "Manual reconciliation, no receipts, no GST-ready records." },
  { title: "Then a platform takes a cut", text: "Many course platforms charge a monthly fee and a percentage of every enrolment." },
];

export const ABOUT_RESOLUTION = {
  title: "VILMS replaces all of it",
  text: "One database from first enquiry to certificate, flat plans, and 0% revenue share on every one of them.",
};

export const PRINCIPLES = [
  { icon: "percent", title: "0% revenue share", text: "A flat monthly plan. VILMS never takes a percentage of your fees, on any plan." },
  { icon: "rupee", title: "India-first payments", text: "Your own Razorpay account, UPI and bank transfer as a fallback, and GST-aware invoices in your name." },
  { icon: "brand", title: "Your brand, not ours", text: "Your logo, colours, domain, emails and certificates. Students never see VILMS." },
  {
    icon: "limits",
    title: "Transparent limits",
    text: "Published plan limits, usage meters that warn you at 80% and 100%, and nothing switches off when you reach one. Your own accounts connect at cost, with no markup.",
  },
  {
    icon: "data",
    title: "Your data, in India, yours to take",
    text: "Primary data sits in the Mumbai region, encrypted and isolated per institute. Export it to CSV any time, even after you cancel.",
  },
  {
    icon: "ai",
    title: "Never used to train AI",
    text: "Your students' data is not used to train AI models. AI only drafts; a mentor approves before a student sees anything.",
  },
] as const;

export const WHO_KEYS: PageKey[] = ["coaching", "testPrep", "onlineCoaching", "training", "schoolsColleges"];

/* ------------------------------- Why ------------------------------- */

export type Verdict = "yes" | "partial" | "no";
export type ApproachCell = { v: Verdict; t: string };

export const APPROACHES = [
  { id: "share", name: "Revenue-share course platform", sub: "A monthly fee plus a % of every enrolment" },
  { id: "stack", name: "Stack of separate tools", sub: "WhatsApp, Zoom, forms, spreadsheets" },
  { id: "vilms", name: "VILMS", sub: "Flat monthly plan, 0% revenue share" },
] as const;

export const APPROACH_ROWS: { label: string; cells: [ApproachCell, ApproachCell, ApproachCell] }[] = [
  {
    label: "Share of your fee income",
    cells: [
      { v: "no", t: "A percentage of every enrolment" },
      { v: "yes", t: "None to a platform" },
      { v: "yes", t: "0% on every plan" },
    ],
  },
  {
    label: "Your brand and domain",
    cells: [
      { v: "partial", t: "Depends on the platform and plan" },
      { v: "no", t: "Each tool shows its own name" },
      { v: "yes", t: "Your logo, colours and domain; students never see VILMS" },
    ],
  },
  {
    label: "One database",
    cells: [
      { v: "partial", t: "Often courses and sales only" },
      { v: "no", t: "Separate apps that don't talk to each other" },
      { v: "yes", t: "Enquiry to certificate on one record" },
    ],
  },
  {
    label: "Lead management",
    cells: [
      { v: "partial", t: "Varies by platform" },
      { v: "no", t: "Enquiries live in chat threads" },
      { v: "yes", t: "Enquiries, RSVPs and checkouts in one pipeline" },
    ],
  },
  {
    label: "Handwritten answer evaluation",
    cells: [
      { v: "partial", t: "Varies by platform" },
      { v: "no", t: "Forms can't grade essays or handwriting" },
      { v: "yes", t: "Rubric grading; AI drafts, a mentor approves" },
    ],
  },
  {
    label: "India payments and GST",
    cells: [
      { v: "partial", t: "Check where fees are settled" },
      { v: "partial", t: "Spreadsheets: manual reconciliation, no receipts" },
      { v: "yes", t: "Your Razorpay, UPI and bank fallback, GST-aware invoices" },
    ],
  },
  {
    label: "Cost as you grow",
    cells: [
      { v: "no", t: "Rises with every enrolment" },
      { v: "partial", t: "Rises with every tool you add" },
      { v: "yes", t: "Flat monthly plan; move up at your student limit" },
    ],
  },
  {
    label: "Day-to-day effort",
    cells: [
      { v: "partial", t: "One tool, plus whatever it lacks" },
      { v: "no", t: "Re-typing between four or five tools" },
      { v: "yes", t: "One login; each role sees only what it needs" },
    ],
  },
];

export const WHY_FAQ = [
  {
    q: "Is it really 0% revenue share on every plan?",
    a: "Yes. VILMS charges a flat monthly plan price and never takes a percentage of your fees. Students pay your own Razorpay account.",
  },
  {
    q: "What if a percentage cut would cost me less?",
    a: "At small fee incomes it can. The calculator above shows the break-even for your numbers: a flat plan wins as your fee income grows, because it does not change with every enrolment.",
  },
  {
    q: "Do I still pay payment gateway charges?",
    a: "Gateway charges are set by your own Razorpay account. VILMS adds nothing on top.",
  },
  {
    q: "Which tools can I keep using?",
    a: "You bring your own Razorpay, Zoom or Google Meet, WhatsApp (Wati), AI and email accounts, and VILMS connects to them at cost with no markup.",
  },
];

/* ------------------------------ Pricing ---------------------------- */

export const BILLING_STEPS = [
  { title: "Start free", text: "14 days, no credit card. Your institute is ready in about a minute." },
  { title: "Pick your plan", text: "Chosen by how many students you teach. 0% of your fees goes to us, on every plan." },
  { title: "Pay monthly", text: "The plan price, plus 18% GST. Nothing is ever charged per sale." },
  { title: "Move up when you outgrow it", text: "Usage meters warn you at 80% and 100% of a limit. Nothing switches off." },
];

/** Accounts you bring yourself; VILMS connects to them at cost, with no markup. */
export const OWN_ACCOUNTS = ["Razorpay", "WhatsApp (Wati)", "Zoom or Google Meet", "Anthropic or OpenAI", "Your email provider", "Your video provider"];

/* ------------------------------- Demo ------------------------------ */

export const DEMO_STEPS = [
  { title: "Your setup", text: "We start with how you run things today: batches, the tools you use, how fees come in." },
  { title: "VILMS on your use case", text: "Courses, live classes and tests, shown the way an institute like yours would use them." },
  { title: "What moves over", text: "Evaluation, payments and leads, and exactly what migrates: courses, students and all." },
  { title: "Plan fit and next steps", text: "Which plan matches your student count, and how the 14-day free trial would start." },
];

export const DEMO_BRING = [
  "How you run things today: the tools, sheets or platforms you use.",
  "Roughly how many students and batches you have.",
  "One course or test you would like to see set up.",
  "Any questions about payments, branding or moving over.",
];
