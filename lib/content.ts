// Every word of marketing copy on the public site lives here. Product facts
// come from the VILMS Product Brochure (2026) and the live vilms.in site;
// prices are the published plan list. Names, amounts and counts that appear
// *inside* interface illustrations are sample data, and the page labels them
// as illustrative.

export const brand = {
  name: "VILMS",
  domain: "vilms.in",
  tagline: "Your students pay you. Not your software.",
  emails: { general: "hello@vilms.in", billing: "billing@vilms.in" },
};

export const nav = [
  { href: "/#solutions", label: "Solutions" },
  { href: "/#why-vilms", label: "Why VILMS" },
  { href: "/#pricing", label: "Pricing" },
] as const;

/* ---------------- Hero ---------------- */

export const hero = {
  titleTop: "Your students pay you.",
  // the same line, split so the promise can carry the brand colour
  titleTopLead: "Your students",
  titleTopEmphasis: "pay you.",
  titleBottom: "Not your software.",
  sub: "VILMS is the all-in-one learning platform for coaching institutes — courses, live classes, answer evaluation, payments and leads, all under your own brand.",
  proof: ["0% revenue share", "No card required", "Plans from ₹499/month"],
};

export type StoryId = "lead" | "enrol" | "course" | "live" | "eval" | "pay" | "cert" | "renew";

/** The hero's living product: one student's journey, start to finish. */
export const heroStory: { id: StoryId; nav: string; event: string; meta: string }[] = [
  { id: "lead", nav: "Leads", event: "New lead captured", meta: "Google Ads · JEE crash course page" },
  { id: "enrol", nav: "Students", event: "Student enrolled", meta: "Prelims Foundation · Batch A" },
  { id: "course", nav: "Courses", event: "Course opened", meta: "Polity essentials · lesson 3" },
  { id: "live", nav: "Live classes", event: "Live class started", meta: "Polity · Batch A · Zoom" },
  { id: "eval", nav: "Evaluations", event: "Answer evaluated", meta: "AI draft · mentor approved" },
  { id: "pay", nav: "Payments", event: "₹15,000 payment received", meta: "Razorpay → your account" },
  { id: "cert", nav: "Certificates", event: "Certificate issued", meta: "Under your institute's name" },
];

/* ---------------- The problem ---------------- */

export const tools = {
  kicker: "The old way",
  title: "Your institute shouldn't run across seven different tools.",
  items: [
    { label: "WhatsApp", pain: "Enquiries lost in chats", x: -30, y: -32, rot: -8 },
    { label: "Zoom / Meet", pain: "Classes not tied to courses", x: 28, y: -36, rot: 6 },
    { label: "Google Forms", pain: "Can't grade written answers", x: -35, y: 0, rot: 5 },
    { label: "Spreadsheets", pain: "Data re-typed by hand", x: 34, y: -3, rot: -5 },
    { label: "Payment tools", pain: "Manual reconciliation", x: -25, y: 33, rot: -4 },
    { label: "Separate LMS", pain: "A cut of every enrolment", x: 27, y: 31, rot: 7 },
    { label: "Manual follow-ups", pain: "No pipeline, no trail", x: 2, y: -4, rot: -3 },
  ],
  afterKicker: "One platform",
  afterTitle: "Meet VILMS.",
  afterSub: "Courses, live classes, tests, payments and leads — one platform, one database.",
  modules: ["Courses", "Live classes", "Tests", "Materials", "Payments", "Lead CRM", "Certificates"],
};

/* ---------------- Lifecycle ---------------- */

export const lifecycle = {
  kicker: "One student lifecycle",
  title: "From first enquiry to the next batch.",
  sub: "A lead becomes a student becomes a graduate — on one database, with nothing re-typed by hand.",
  stages: [
    { id: "lead", title: "Lead captured", text: "From ads, webinars and free materials — straight into one pipeline." },
    { id: "enrol", title: "Student enrolled", text: "Pays through your Razorpay. One profile from day one." },
    { id: "course", title: "Course consumed", text: "Recorded, live or hybrid — with drip, previews and notes." },
    { id: "eval", title: "Answer graded", text: "Rubrics and AI-drafted evaluation, approved by a mentor." },
    { id: "cert", title: "Certificate issued", text: "Branded certificates and receipts, in your institute's name." },
    { id: "renew", title: "Cohort renewed", text: "Offer the next course or batch to students you already know." },
  ] satisfies { id: StoryId; title: string; text: string }[],
};

/* ---------------- Product explorer ---------------- */

export type ExplorerTabId = "teach" | "assess" | "grow" | "payments" | "brand";
export type ExplorerFeature = { id: string; label: string; text: string };
export type ExplorerTab = { id: ExplorerTabId; label: string; title: string; line: string; features: ExplorerFeature[] };

export const explorer: { kicker: string; title: string; sub: string; tabs: ExplorerTab[] } = {
  kicker: "The platform",
  title: "Everything your institute runs on.",
  sub: "Pick an area. Hover a feature to see where it lives.",
  tabs: [
    {
      id: "teach",
      label: "Teach",
      title: "Teach the way you actually teach.",
      line: "Courses, live classes, video, materials, webinars",
      features: [
        { id: "courses", label: "Courses", text: "Recorded, live or hybrid. Drag modules and lessons into place; preview, drip and coming-soon per lesson." },
        { id: "live", label: "Live classes", text: "Paste a Zoom or Meet link and the class is tied to the course. Students RSVP; reminders go out before class." },
        { id: "video", label: "Video", text: "Recordings play inside the course, next to their notes — not on a public channel. Secure Video adds expiring links and a name watermark." },
        { id: "materials", label: "Materials", text: "Public, lead-magnet gated or enrolled-only. PDFs and images aren't counted against any limit." },
        { id: "webinars", label: "Webinars", text: "Public sign-up with no login, per-session branding, and a one-click upsell into the paired paid course." },
      ],
    },
    {
      id: "assess",
      label: "Assess",
      title: "Grade real answers — not just MCQs.",
      line: "Tests, handwritten answers, rubrics, AI-assisted evaluation",
      features: [
        { id: "tests", label: "Tests", text: "Tests and mock tests. Multiple-choice questions mark themselves." },
        { id: "handwritten", label: "Handwritten answers", text: "Students upload their written answer to long-form questions — subjective, not just multiple choice." },
        { id: "rubrics", label: "Rubrics", text: "Mentors score against clear criteria. Marks, comments and rubric in one evaluated-copy view." },
        { id: "ai", label: "AI-assisted evaluation", text: "AI drafts the evaluation against your rubric. A mentor approves it before a student sees anything." },
      ],
    },
    {
      id: "grow",
      label: "Grow",
      title: "Turn ad clicks into paid enrolments.",
      line: "Leads, CRM, WhatsApp, landing pages, analytics",
      features: [
        { id: "leads", label: "Leads", text: "Enquiries, checkouts and webinar RSVPs land in one pipeline." },
        { id: "crm", label: "CRM", text: "One student profile with grades, certificates, orders and lifetime value — across batches and branches." },
        { id: "whatsapp", label: "WhatsApp", text: "Follow up through your own WhatsApp (Wati) account." },
        { id: "landing", label: "Landing pages", text: "Course pages built for paid traffic, and lead-magnet materials that grow your list." },
        { id: "analytics", label: "Analytics", text: "Add your own analytics and pixel to your site. CSV export everywhere." },
      ],
    },
    {
      id: "payments",
      label: "Payments",
      title: "Fees paid straight into your own account.",
      line: "Razorpay, UPI, GST invoices, orders, refunds",
      features: [
        { id: "razorpay", label: "Razorpay", text: "Checkout runs on your own Razorpay account. Card details stay with your payment provider — never with VILMS." },
        { id: "upi", label: "UPI", text: "Accept manual UPI or bank transfers as a fallback." },
        { id: "gst", label: "GST invoices", text: "GST-aware invoices and receipts, issued in your institute's name." },
        { id: "orders", label: "Orders", text: "Every order on record, and on the student's profile." },
        { id: "refunds", label: "Refunds", text: "Refunds are logged alongside the original order." },
      ],
    },
    {
      id: "brand",
      label: "Brand",
      title: "Your brand in front.",
      line: "Logo, colours, domain, certificates, emails, apps",
      features: [
        { id: "logo", label: "Logo", text: "Your logo on every screen, certificate and email." },
        { id: "colours", label: "Colours", text: "Your brand colours across your site." },
        { id: "domain", label: "Domain", text: "Start on yourinstitute.vilms.in, or connect your own domain." },
        { id: "certificates", label: "Certificates", text: "Certificates and receipts issued in your institute's name." },
        { id: "emails", label: "Emails", text: "Emails carry your brand. Students never see “VILMS”." },
        { id: "apps", label: "Apps", text: "Your own branded app — Android from Growth, iOS too from Scale." },
      ],
    },
  ],
};

/* ---------------- AI-assisted evaluation ---------------- */

export const evaluation = {
  kicker: "Assess · AI-assisted evaluation",
  titleTop: "AI assists.",
  titleBottom: "Your mentor stays in control.",
  sub: "A student uploads their handwritten answer. AI drafts an evaluation against your rubric. A mentor reviews, edits and approves — nothing reaches the student before that.",
  steps: [
    { id: "upload", label: "Handwritten answer", text: "Uploaded by the student, straight into the test." },
    { id: "draft", label: "AI draft", text: "Rubric scores and comments, drafted — not decided." },
    { id: "review", label: "Mentor reviews", text: "Every score checked. Anything can be changed." },
    { id: "approve", label: "Approve or edit", text: "Nothing reaches the student until a mentor approves." },
    { id: "final", label: "Evaluated copy", text: "Marks, comments and rubric in one view, saved to the profile." },
  ],
  facts: [
    { title: "Your own AI key", text: "Pay the AI provider at cost — no markup." },
    { title: "Mentor always decides", text: "Nothing is sent without approval." },
    { title: "Never used for training", text: "Students' data doesn't train AI models." },
  ],
};

/* ---------------- Leads / CRM ---------------- */

export const pipeline = {
  kicker: "Grow · Lead CRM",
  title: "Turn ad clicks into paid enrolments.",
  sub: "Enquiries, checkouts and webinar RSVPs land in one pipeline — nobody falls through a WhatsApp thread again.",
  columns: ["New enquiry", "Webinar RSVP", "Checkout started", "Enrolled"],
  highlights: [
    { title: "Lead pipeline", text: "Every enquiry, checkout and RSVP" },
    { title: "Lead magnets", text: "Free resources that grow your list" },
    { title: "Landing pages", text: "Course pages built for paid traffic" },
    { title: "WhatsApp follow-up", text: "Through your own Wati account" },
    { title: "Analytics", text: "Your own analytics and pixel" },
    { title: "CSV export", text: "Your data, whenever you want it" },
  ],
};

/* ---------------- 0% revenue share ---------------- */

export const revenue = {
  kicker: "0% revenue share",
  title: "Keep 100% of your students' fees.",
  sub: "Students pay through checkout on your own Razorpay account. VILMS charges one flat monthly price per plan — and takes nothing from your fees, on every plan, at any size.",
  fee: 15000,
  steps: ["Student pays", "Your Razorpay account", "VILMS commission"],
};

/* ---------------- White label ---------------- */

export const whiteLabel = {
  kicker: "White-label",
  title: "Your brand in front.",
  punch: "Students never see VILMS.",
  sub: "Your logo, colours and domain on every screen, certificate and email. Try it — nothing you type is saved.",
  swatches: ["#1A73E8", "#188038", "#D93025", "#E37400", "#007B83", "#202124"],
  surfaces: [
    { id: "site", label: "Website" },
    { id: "certificate", label: "Certificate" },
    { id: "email", label: "Email" },
  ],
};

/* ---------------- Who it's for ---------------- */

export type AudienceVisual = "live" | "test" | "cert" | "team" | "invoice" | "materials";

export const audience = {
  kicker: "Who it's for",
  title: "Built for institutes that teach — and sell — courses.",
  items: [
    { id: "coaching", label: "Coaching institutes", text: "Run cohort batches with live classes, recorded lessons and graded tests — and fill them through ads and webinars.", tags: ["Live batches", "Answer evaluation", "Lead pipeline"], visual: "live" },
    { id: "testprep", label: "Test prep", text: "Mock tests, long-form answer writing and mentor feedback, built around exam cycles.", tags: ["Auto-graded MCQs", "AI-assisted evaluation", "Drip lessons"], visual: "test" },
    { id: "skills", label: "Skill academies", text: "Hybrid programmes with branded certificates for every student who completes.", tags: ["Hybrid courses", "Certificates", "Webinars"], visual: "cert" },
    { id: "training", label: "Training institutes", text: "Sell recorded and live programmes under your own brand, across branches and batches, with each team member in the right role.", tags: ["White-label", "Razorpay checkout", "Team roles"], visual: "team" },
    { id: "schools", label: "Schools & colleges", text: "Run paid add-on programmes — entrance prep or certificate courses — online, with fees paid to your own account.", tags: ["Courses", "Tests", "GST invoices"], visual: "invoice" },
    { id: "online", label: "Online academies", text: "Start on Base at ₹499/month and grow to 15,000 students on the same platform.", tags: ["Free materials", "Webinars", "Flat pricing"], visual: "materials" },
  ] satisfies { id: string; label: string; text: string; tags: string[]; visual: AudienceVisual }[],
};

/* ---------------- Why VILMS ---------------- */

// The statement reads as one sentence; each term is a proof point the visitor
// can open. Plain strings are the connective text between terms.
export const why = {
  kicker: "Why VILMS",
  statement: [
    "VILMS puts your institute on",
    { id: "one", term: "one platform", proof: "Courses, live classes, tests, payments and leads on one database — a lead becomes a student becomes a graduate with nothing re-typed." },
    "under",
    { id: "brand", term: "your own brand", proof: "Your logo, colours, domain, certificates and emails. Fully white-labelled — students never see VILMS." },
    ", with",
    { id: "payments", term: "India-first payments", proof: "Razorpay checkout on your own account, UPI and bank fallback, GST-aware invoices." },
    ", a",
    { id: "crm", term: "lead CRM", proof: "Every enquiry, checkout and webinar RSVP in one pipeline, with WhatsApp follow-up through your own Wati account." },
    "built in and",
    { id: "ai", term: "AI-assisted evaluation", proof: "AI drafts, mentors decide. Bring your own AI key and pay the provider at cost." },
    "your mentors control. One",
    { id: "flat", term: "flat price", proof: "From ₹499/month. The cost per student falls from ₹1.00 to ₹0.33 a month as you move up the plans." },
    "per plan, and",
    { id: "zero", term: "0% revenue share", proof: "On every plan, at any size. Your students' fees go to your own account — VILMS never takes a cut." },
    ".",
  ] as (string | { id: string; term: string; proof: string })[],
};

/* ---------------- Pricing ---------------- */

export type Plan = {
  id: "base" | "growth" | "scale" | "institute";
  stage: string;
  name: string;
  price: string;
  limit: number;
  students: string;
  perStudent: string;
  blurb: string;
  points: string[];
  onboarding: string;
};

export const pricing = {
  kicker: "Pricing",
  title: "Pick a plan by how many students you teach.",
  plans: [
    { id: "base", stage: "Starting out", name: "Base", price: "₹499", limit: 500, students: "up to 500 students", perStudent: "₹1.00", blurb: "Everything one institute needs to teach, test and get paid online.", points: ["Full platform + your own website", "Single institute"], onboarding: "Self-serve + guided setup call" },
    { id: "growth", stage: "Growing institute", name: "Growth", price: "₹1,199", limit: 2000, students: "up to 2,000 students", perStudent: "₹0.60", blurb: "Your own branded Android app, and more than one branch to run.", points: ["Your branded Android app", "Multiple branches"], onboarding: "Done-for-you migration" },
    { id: "scale", stage: "Established institute", name: "Scale", price: "₹2,499", limit: 5000, students: "up to 5,000 students", perStudent: "₹0.50", blurb: "Both app stores, a bigger library, and priority support behind it.", points: ["Android + iOS apps", "Bigger library", "Priority support"], onboarding: "Done-for-you migration" },
    { id: "institute", stage: "Large operation", name: "Institute", price: "₹4,999", limit: 15000, students: "up to 15,000 students", perStudent: "₹0.33", blurb: "Unlimited staff, 2 TB of library, and a dedicated manager.", points: ["Android + iOS apps", "Unlimited staff · 2 TB library", "Dedicated manager"], onboarding: "Done-for-you migration + faculty training" },
  ] satisfies Plan[],
  everyPlan: [
    "0% commission on your fees",
    "Your logo, colours & domain",
    "Your own website",
    "Unlimited recorded & live courses",
    "Tests, mock tests & AI-assisted grading",
    "Fees to your own Razorpay + GST invoices",
    "Leads CRM with WhatsApp follow-up",
    "Change plans yourself, any time",
  ],
  trialNote: ["14-day free trial", "No card required", "0% revenue share"],
  footnote:
    "All prices exclude 18% GST. 14-day free trial with no card — after it, add a payment method or stay on Base at ₹499/month. Upgrades apply immediately from your billing page.",
  custom: { title: "Teaching 15,000+ students?", text: "Write to us for a custom quote for large operations." },
};

/* ---------------- Closing ---------------- */

export const finalCta = {
  title: "Ready to bring your institute onto one platform?",
  sub: "Courses, live classes, answer evaluation, payments and leads — under your own brand.",
  demo: {
    kicker: "30-minute walkthrough",
    text: "We'll walk through your current setup and show exactly what moves over — courses, students and all.",
  },
};
