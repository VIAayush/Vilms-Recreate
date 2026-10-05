// Every word of marketing copy on the public site lives here. Product facts
// come from the VILMS brochure and vilms.in; prices are the published plan
// list. Names, amounts and counts that appear *inside* interface
// illustrations are sample data, and the page labels them as illustrative.
//
// House rule for this file: short copy. A title, one sentence, and let the
// product visual do the explaining.

export const brand = {
  name: "VILMS",
  domain: "vilms.in",
  tagline: "Your students pay you. Not your software.",
  emails: { general: "hello@vilms.in", billing: "billing@vilms.in" },
};

export const nav = [
  { href: "/#explore", label: "Explore" },
  { href: "/#platform", label: "Platform" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#about", label: "About" },
] as const;

/* ---------------- Hero ---------------- */

export const hero = {
  eyebrow: "Built for coaching institutes",
  lines: ["Your entire institute.", "One platform."],
  sub: "Courses, live classes, evaluation, payments and leads — under your brand, with 0% revenue share.",
  notes: ["14-day free trial", "No card required", "0% revenue share"],
  // the brand line, used on /demo and in the revenue section
  titleTop: "Your students pay you.",
  titleBottom: "Not your software.",
  proof: ["0% revenue share", "No card required", "Plans from ₹499/month"],
};

/* ---------------- Explore (discovery) ---------------- */

export type ExplorerTabId = "teach" | "assess" | "grow" | "payments" | "brand" | "team";

export const explore = {
  kicker: "Explore",
  title: "Everything your institute runs on.",
  sub: "Pick a part of your institute. Watch it come alive.",
  areas: [
    { id: "teach", label: "Teach", title: "Teach the way you actually teach.", line: "Recorded, live or hybrid courses — with live classes and secure video inside.", cta: "See courses in a demo" },
    { id: "assess", label: "Assess", title: "Grade real answers, not just MCQs.", line: "Tests, handwritten answers and rubrics — AI drafts, a mentor decides.", cta: "See evaluation in a demo" },
    { id: "grow", label: "Grow", title: "Turn ad clicks into enrolments.", line: "Every enquiry in one pipeline, with WhatsApp follow-up.", cta: "See the CRM in a demo" },
    { id: "payments", label: "Payments", title: "Fees land in your own account.", line: "Your Razorpay, UPI fallback, GST-aware invoices. 0% revenue share.", cta: "See payments in a demo" },
    { id: "brand", label: "Brand", title: "Your brand in front.", line: "Your logo, colours, domain, certificates and app.", cta: "See white-label in a demo" },
    { id: "team", label: "Team", title: "Everyone sees what they should.", line: "Owners, teachers and counsellors — across branches and batches.", cta: "See team roles in a demo" },
  ] satisfies { id: ExplorerTabId; label: string; title: string; line: string; cta: string }[],
};

/* ---------------- Lifecycle ---------------- */

export const lifecycle = {
  kicker: "One student, one database",
  title: "Watch a lead become a graduate.",
  stages: [
    { id: "lead", title: "Lead captured", line: "From an ad, a webinar or a free PDF." },
    { id: "enrol", title: "Student enrolled", line: "Pays through your Razorpay." },
    { id: "course", title: "Course consumed", line: "Recorded, live or hybrid." },
    { id: "eval", title: "Answer graded", line: "AI drafts. A mentor approves." },
    { id: "cert", title: "Certificate issued", line: "In your institute's name." },
    { id: "renew", title: "Cohort renewed", line: "The next batch, one click away." },
  ],
};

/* ---------------- Showcase ---------------- */

export const showcase = {
  kicker: "See it in action",
  title: "The product, not the brochure.",
  slides: [
    { id: "dashboard", label: "Dashboard", line: "Your whole institute at a glance." },
    { id: "courses", label: "Courses", line: "Build recorded, live or hybrid courses." },
    { id: "live", label: "Live classes", line: "Zoom or Meet, tied to the course." },
    { id: "evaluation", label: "Evaluation", line: "Rubrics, AI drafts, mentor approval." },
    { id: "crm", label: "CRM", line: "Every enquiry, one pipeline." },
    { id: "payments", label: "Payments", line: "Your Razorpay. Your GST invoices." },
  ],
};

/* ---------------- AI evaluation ---------------- */

export const evaluation = {
  kicker: "AI-assisted evaluation",
  title: "AI assists. Your mentor decides.",
  steps: [
    { id: "upload", label: "Handwritten answer" },
    { id: "analyse", label: "AI analysis" },
    { id: "draft", label: "Draft evaluation" },
    { id: "approve", label: "Mentor approval" },
    { id: "final", label: "Final score" },
  ],
  facts: ["Your own AI key, at cost", "Nothing sent without approval", "Never used for training"],
};

/* ---------------- Leads + CRM ---------------- */

export const crm = {
  kicker: "Leads & CRM",
  title: "A marketing-to-admissions machine.",
  sub: "From the first ad click to a paid enrolment — every step in one place.",
  funnel: ["Ad", "Landing page", "Lead", "CRM", "Call / WhatsApp", "Demo", "Trial", "Student"],
  columns: ["New", "Contacted", "Demo scheduled", "Demo completed", "Follow-up", "Interested", "Trial started", "Converted"],
};

/* ---------------- 0% revenue share ---------------- */

export const revenue = {
  kicker: "0% revenue share",
  collected: 100000,
  // An illustrative commission rate for a commission-based platform; the
  // VILMS brochure's comparison uses a 10% entry tier.
  exampleRate: 0.1,
};

/* ---------------- White label ---------------- */

export const whiteLabel = {
  kicker: "White-label",
  title: "Students see your brand. Never ours.",
  institute: "ABC Coaching Institute",
  domain: "learn.abccoaching.in",
  swatches: ["#1A73E8", "#003056", "#188038", "#D93025", "#9334E6", "#202124"],
};

/* ---------------- Audience ---------------- */

export type AudienceId = "coaching" | "testprep" | "skills" | "training" | "schools" | "online";

export const audience = {
  kicker: "Who it's for",
  title: "Built for institutes that teach — and sell — courses.",
  items: [
    { id: "coaching", label: "Coaching institutes", line: "Live batches, graded tests, admissions from ads and webinars." },
    { id: "testprep", label: "Test prep", line: "Mock tests and answer writing, built around exam cycles." },
    { id: "skills", label: "Skill academies", line: "Hybrid programmes with branded certificates." },
    { id: "training", label: "Training institutes", line: "Programmes across branches, with team roles." },
    { id: "schools", label: "Schools & colleges", line: "Paid add-on programmes, fees to your own account." },
    { id: "online", label: "Online academies", line: "Start at ₹499/month and grow on one platform." },
  ] satisfies { id: AudienceId; label: string; line: string }[],
};

/* ---------------- Pricing ---------------- */

export type Plan = {
  id: "base" | "growth" | "scale" | "institute";
  name: string;
  price: string;
  limit: number;
  students: string;
  perStudent: string;
  bestFor: string;
};

export const pricing = {
  kicker: "Pricing",
  title: "Simple plans. 0% of your fees.",
  plans: [
    { id: "base", name: "Base", price: "₹499", limit: 50, students: "up to 50 students", perStudent: "₹9.98", bestFor: "Starting out" },
    { id: "growth", name: "Growth", price: "₹1,199", limit: 200, students: "up to 200 students", perStudent: "₹6.00", bestFor: "Growing institutes" },
    { id: "scale", name: "Scale", price: "₹2,499", limit: 500, students: "up to 500 students", perStudent: "₹5.00", bestFor: "Established institutes" },
    { id: "institute", name: "Institute", price: "₹4,999", limit: 1500, students: "up to 1,500 students", perStudent: "₹3.33", bestFor: "Large operations" },
  ] satisfies Plan[],
  // "Compare plans" — rows are features, values per plan in the order above.
  compare: [
    { label: "Students", values: ["50", "200", "500", "1,500"] },
    { label: "Full platform + your own website", values: [true, true, true, true] },
    { label: "0% commission on your fees", values: [true, true, true, true] },
    { label: "Unlimited recorded & live courses", values: [true, true, true, true] },
    { label: "Tests & AI-assisted grading", values: [true, true, true, true] },
    { label: "Your Razorpay + GST invoices", values: [true, true, true, true] },
    { label: "Leads CRM with WhatsApp follow-up", values: [true, true, true, true] },
    { label: "Multiple branches", values: [false, true, true, true] },
    { label: "Your branded Android app", values: [false, true, true, true] },
    { label: "Your branded iOS app", values: [false, false, true, true] },
    { label: "Bigger library", values: [false, false, true, true] },
    { label: "Priority support", values: [false, false, true, true] },
    { label: "Unlimited staff · 2 TB library", values: [false, false, false, true] },
    { label: "Dedicated manager", values: [false, false, false, true] },
    { label: "Onboarding", values: ["Guided setup call", "Done-for-you migration", "Done-for-you migration", "Migration + faculty training"] },
  ] as { label: string; values: (string | boolean)[] }[],
  trialNote: ["14-day free trial", "No card required", "0% revenue share"],
  footnote: "Prices per month, excluding 18% GST. After the trial, add a payment method or stay on Base at ₹499/month.",
  custom: { title: "Teaching 1,500+ students?", text: "Write to us for a custom quote." },
};

/* ---------------- Closing ---------------- */

export const finalCta = {
  title: "Ready to run your institute on one platform?",
  demo: {
    kicker: "30-minute walkthrough",
    text: "We'll walk through your current setup and show exactly what moves over — courses, students and all.",
  },
};

export const about = {
  title: "About VILMS",
  line: "VILMS is the learning platform built for Indian coaching institutes — so you can teach, assess, sell and get paid under your own brand, without giving away a share of your fees.",
};
