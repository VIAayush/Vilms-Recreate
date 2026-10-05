// Every word of marketing copy on the public site lives here. Product facts
// come from the VILMS brochure and vilms.in; prices are the published plan
// list. Names, amounts and counts inside interface illustrations are sample
// data, labelled as illustrative on the page.
//
// House rule: short copy. A title, one line, and let the product visual
// do the explaining.

export const brand = {
  name: "VILMS",
  domain: "vilms.in",
  tagline: "Your students pay you. Not your software.",
  emails: { general: "hello@vilms.in", billing: "billing@vilms.in" },
};

export const nav = [
  { href: "/#product", label: "Product" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#about", label: "About" },
] as const;

/* ---------------- Hero carousel (featured products) ---------------- */

export type FeatureId = "dashboard" | "evaluation" | "crm" | "classes";

export const featured: { id: FeatureId; title: string; line: string; cta: "trial" | "demo" }[] = [
  { id: "dashboard", title: "Your whole institute", line: "Courses, students, fees and leads on one dashboard.", cta: "trial" },
  { id: "evaluation", title: "AI-Assisted Evaluation", line: "AI drafts against your rubric. Your mentor approves.", cta: "demo" },
  { id: "crm", title: "Lead CRM", line: "Turn ad clicks into paid enrolments.", cta: "demo" },
  { id: "classes", title: "Courses & Live Classes", line: "Recorded, live or hybrid — inside your own platform.", cta: "trial" },
];

/* ---------------- Discover (featured cards) ---------------- */

export type AreaId = "teach" | "assess" | "grow" | "payments" | "brand" | "manage";

export const discover = {
  title: ["Discover what's ", "possible", " with VILMS"],
  cards: [
    { id: "teach", title: "Teach", line: "Recorded, live and hybrid courses with secure video, materials and webinars." },
    { id: "assess", title: "Assess", line: "Tests, handwritten answers and rubrics — AI drafts, a mentor decides." },
    { id: "grow", title: "Grow", line: "Every enquiry, checkout and webinar RSVP in one pipeline." },
    { id: "payments", title: "Get Paid", line: "Fees go straight to your own Razorpay. 0% revenue share." },
    { id: "brand", title: "Brand", line: "Your logo, colours, domain and app. Students never see VILMS." },
    { id: "manage", title: "Manage", line: "Owners, teachers and counsellors — each sees only what they should." },
  ] satisfies { id: AreaId; title: string; line: string }[],
};

/* ---------------- Product grid (with category filter) ---------------- */

export const categories: { id: "all" | AreaId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "teach", label: "Teach" },
  { id: "assess", label: "Assess" },
  { id: "grow", label: "Grow" },
  { id: "payments", label: "Payments" },
  { id: "brand", label: "Brand" },
  { id: "manage", label: "Manage" },
];

export type ProductId =
  | "courses"
  | "live"
  | "webinars"
  | "materials"
  | "tests"
  | "evaluation"
  | "crm"
  | "landing"
  | "payments"
  | "invoices"
  | "whitelabel"
  | "certificates"
  | "team";

export const products: { id: ProductId; area: AreaId; title: string; line: string }[] = [
  { id: "courses", area: "teach", title: "Courses", line: "Recorded, live and hybrid. Drag, drip, preview." },
  { id: "live", area: "teach", title: "Live Classes", line: "Zoom or Meet, tied to the course, with RSVPs and reminders." },
  { id: "evaluation", area: "assess", title: "AI Evaluation", line: "AI drafts against your rubric. A mentor approves." },
  { id: "crm", area: "grow", title: "Lead CRM", line: "Turn ad clicks into paid enrolments." },
  { id: "payments", area: "payments", title: "Payments", line: "Student payments go directly to your institute." },
  { id: "whitelabel", area: "brand", title: "White Label", line: "Your platform. Your brand. Your domain." },
  { id: "tests", area: "assess", title: "Tests & Mock Tests", line: "Auto-graded MCQs and long-form answers." },
  { id: "webinars", area: "teach", title: "Webinars", line: "Sign-up with no login, and a one-click upsell." },
  { id: "landing", area: "grow", title: "Landing Pages", line: "Course pages built for paid traffic, plus WhatsApp follow-up." },
  { id: "invoices", area: "payments", title: "GST Invoices", line: "GST-aware invoices and receipts in your name." },
  { id: "certificates", area: "brand", title: "Certificates", line: "Issued under your institute's name." },
  { id: "materials", area: "teach", title: "Study Materials", line: "Public, lead-magnet gated or enrolled-only." },
  { id: "team", area: "manage", title: "Team & Roles", line: "Owners, teachers and sales — across branches." },
];

/* ---------------- About ---------------- */

export const about = {
  label: "About VILMS",
  // the statement colours in, phrase by phrase, as it scrolls into view
  statement: [
    "One platform for the entire student lifecycle.",
    "VILMS brings courses, live classes, assessments, payments and lead management together",
    "under your institute's own brand —",
    "and never takes a share of your fees.",
  ],
};

/* ---------------- Ecosystem ("life beyond") ---------------- */

export const ecosystem = {
  title: "From enquiry to graduation",
  line: "A lead becomes a student becomes a graduate — on one database, with nothing re-typed by hand. Every step lives in VILMS.",
  cards: [
    { id: "lead", title: "Lead", tag: "Grow" },
    { id: "student", title: "Student", tag: "Admissions" },
    { id: "learn", title: "Course & Live Class", tag: "Teach" },
    { id: "eval", title: "Evaluation", tag: "Assess" },
    { id: "pay", title: "0% Revenue Share", tag: "Get Paid" },
    { id: "cert", title: "Certificate", tag: "Brand" },
    { id: "renew", title: "Renewal", tag: "Grow" },
  ],
};

/* ---------------- Pricing ---------------- */

export type Plan = {
  id: "base" | "growth" | "scale" | "institute";
  name: string;
  price: string;
  limit: number;
  students: string;
  bestFor: string;
};

export const pricing = {
  title: "Simple plans. 0% of your fees.",
  plans: [
    { id: "base", name: "Base", price: "₹499", limit: 50, students: "Up to 50 students", bestFor: "Starting out" },
    { id: "growth", name: "Growth", price: "₹1,199", limit: 200, students: "Up to 200 students", bestFor: "Growing institutes" },
    { id: "scale", name: "Scale", price: "₹2,499", limit: 500, students: "Up to 500 students", bestFor: "Established institutes" },
    { id: "institute", name: "Institute", price: "₹4,999", limit: 1500, students: "Up to 1,500 students", bestFor: "Large operations" },
  ] satisfies Plan[],
  compare: [
    { label: "Full platform + your own website", values: [true, true, true, true] },
    { label: "0% commission on your fees", values: [true, true, true, true] },
    { label: "Unlimited recorded & live courses", values: [true, true, true, true] },
    { label: "Tests & AI-assisted grading", values: [true, true, true, true] },
    { label: "Your Razorpay + GST invoices", values: [true, true, true, true] },
    { label: "Leads CRM with WhatsApp follow-up", values: [true, true, true, true] },
    { label: "Multiple branches", values: [false, true, true, true] },
    { label: "Your branded Android app", values: [false, true, true, true] },
    { label: "Your branded iOS app", values: [false, false, true, true] },
    { label: "Bigger library · Priority support", values: [false, false, true, true] },
    { label: "Unlimited staff · 2 TB library", values: [false, false, false, true] },
    { label: "Dedicated manager", values: [false, false, false, true] },
    { label: "Onboarding", values: ["Guided setup call", "Done-for-you migration", "Done-for-you migration", "Migration + faculty training"] },
  ] as { label: string; values: (string | boolean)[] }[],
  notes: ["14-day free trial", "No credit card required", "0% revenue share", "Prices exclude 18% GST"],
  custom: { title: "Teaching 1,500+ students?", text: "Write to us for a custom quote." },
};

/* ---------------- Closing ---------------- */

export const connect = {
  title: "Bring your institute onto one platform",
};

// used by /demo
export const hero = {
  titleTop: "Your students pay you.",
  titleBottom: "Not your software.",
  proof: ["0% revenue share", "No card required", "Plans from ₹499/month"],
};
export const finalCta = {
  demo: {
    kicker: "30-minute walkthrough",
    text: "We'll walk through your current setup and show exactly what moves over — courses, students and all.",
  },
};
