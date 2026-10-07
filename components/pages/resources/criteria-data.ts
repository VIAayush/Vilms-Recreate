// Content for /best-lms-software-india. The coverage notes describe what VILMS
// does and does not do, stated plainly: "full" where the product covers the
// criterion, "partial" where it covers part of it or depends on the plan.
// No competitors are named or ranked.

export type Coverage = "full" | "partial";

export type Criterion = {
  id: string;
  short: string;
  title: string;
  why: string;
  ask: string[];
  coverage: Coverage;
  vilms: string;
};

export const CRITERIA: Criterion[] = [
  {
    id: "payments",
    short: "Payments",
    title: "India-first payments and GST",
    why: "Parents pay by UPI, cards and net banking, and your accounts team needs GST-ready paperwork. If fees route through the vendor’s account first, you can end up waiting on payouts and reconciling by hand.",
    ask: ["Whose account do student fees land in?", "Are GST invoices issued in my institute’s name?", "What if a parent wants to pay by bank transfer?"],
    coverage: "full",
    vilms: "Razorpay checkout paid straight to your own account, manual UPI and bank-transfer fallback, GST-aware invoices and receipts, and every order and refund on record.",
  },
  {
    id: "brand",
    short: "Brand",
    title: "Your brand and your domain",
    why: "Students enrol with an institute they trust. If the platform’s name sits in the web address and the emails, you are building someone else’s brand.",
    ask: ["What do students see: my name or yours?", "Can I use my own domain?", "Whose name is on certificates and receipts?"],
    coverage: "full",
    vilms: "Your logo, colours and emails on every screen; certificates and receipts in your institute’s name; students never see VILMS. A yourname.vilms.in address from day one, and your own domain on higher plans.",
  },
  {
    id: "evaluation",
    short: "Evaluation",
    title: "Handwritten and long-form answer evaluation",
    why: "Test-prep and essay-based courses live on written answers. Multiple-choice auto-marking does not help there, and marking every copy by hand does not scale.",
    ask: ["Can it read handwritten uploads?", "Does a mentor approve before a student sees a result?", "Are student answers used to train AI models?"],
    coverage: "full",
    vilms: "Rubric grading, handwritten uploads, AI drafts that a mentor approves, an evaluated-copy view and grades on the student’s profile. You connect your own AI key at cost, and student data is never used to train AI models.",
  },
  {
    id: "leads",
    short: "Leads",
    title: "Lead management",
    why: "Most institutes find students through ads and webinars. A lead that is not followed up is advertising spend wasted.",
    ask: ["Do enquiries, checkouts and webinar sign-ups land in one pipeline?", "Can I follow up on WhatsApp from it?", "Can I export my leads?"],
    coverage: "full",
    vilms: "One pipeline for enquiries, checkouts and webinar RSVPs, course landing pages built for paid traffic, WhatsApp follow-up through your own Wati account, and CSV export.",
  },
  {
    id: "live",
    short: "Live classes",
    title: "Live classes",
    why: "Live teaching is the heart of cohort coaching. What matters is that a class is tied to the course and to the student who paid, more than which video engine runs it.",
    ask: ["Is each class linked to enrolment?", "Are there RSVPs and reminders?", "Do recordings stay private to enrolled students?"],
    coverage: "partial",
    vilms: "Live classes run on your own Zoom or Meet link, tied to the course, with RSVPs, reminders and private recordings. VILMS is not a video-conferencing tool in its own right, so it relies on the link you bring.",
  },
  {
    id: "data",
    short: "Data",
    title: "Data location and ownership",
    why: "Student records and payments are sensitive. Know where they live, who can see them and whether you can leave with them.",
    ask: ["Which region is my data stored in?", "Is it encrypted, and is each institute isolated?", "Can I export everything, even after I cancel?"],
    coverage: "full",
    vilms: "Primary data in the Mumbai region, encrypted in transit and at rest, isolated per institute at the database level, with CSV export of students, enrolments and orders at any time, even after you cancel. Never sold, never used to train AI.",
  },
  {
    id: "pricing",
    short: "Pricing",
    title: "A pricing model you can predict",
    why: "A flat monthly plan is predictable. A percentage of fee income grows with every enrolment. Either can be right; the point is to know which one you are buying.",
    ask: ["Is there a revenue share?", "What are the limits, and what happens at one?", "Which add-ons cost extra?"],
    coverage: "full",
    vilms: "Flat monthly plans with 0% revenue share on every plan, prices excluding 18% GST, a 14-day free trial with no card, and usage meters that warn before a limit. Your site and classes keep running at a limit.",
  },
  {
    id: "support",
    short: "Support",
    title: "Support and onboarding",
    why: "The first month decides whether a platform sticks. Ask who helps you move courses and students across, and whether faster help is a paid tier.",
    ask: ["Who do I write to?", "What does onboarding include?", "Is priority support a higher tier?"],
    coverage: "partial",
    vilms: "Email support (hello@vilms.in) on every plan, priority support from the Scale plan, and onboarding that runs from a guided setup call to done-for-you migration, depending on the plan.",
  },
];

export const WEIGHTS = [
  { value: 0, label: "Skip" },
  { value: 1, label: "Nice" },
  { value: 2, label: "Important" },
  { value: 3, label: "Critical" },
] as const;

export const PRESETS: { id: string; label: string; weights: Record<string, number> }[] = [
  { id: "balanced", label: "Balanced", weights: { payments: 2, brand: 2, evaluation: 2, leads: 2, live: 2, data: 2, pricing: 2, support: 2 } },
  { id: "testprep", label: "Test-prep institute", weights: { payments: 2, brand: 1, evaluation: 3, leads: 1, live: 2, data: 2, pricing: 2, support: 1 } },
  { id: "ads", label: "Ads-driven growth", weights: { payments: 3, brand: 2, evaluation: 1, leads: 3, live: 1, data: 1, pricing: 2, support: 1 } },
  { id: "hands", label: "Hands-on support first", weights: { payments: 2, brand: 1, evaluation: 1, leads: 1, live: 2, data: 1, pricing: 2, support: 3 } },
];

export const VERIFY_STEPS = [
  { title: "Ask for it live, on your material.", text: "A promise on a slide is not a feature. Ask the vendor to do it in front of you with your own sample." },
  { title: "Read the price page, then the terms.", text: "Look for revenue share, limits, add-ons and what happens when you cross a limit." },
  { title: "Check you can leave.", text: "Ask how your students, enrolments and orders come out, and whether that still works after you cancel." },
];

export const BEST_FAQ = [
  {
    q: "Which is the best LMS in India for coaching institutes?",
    a: "There is no single best for everyone. The best LMS is the one that covers the criteria your institute weights highest: payments and GST, your own brand and domain, handwritten answer evaluation, lead management, live classes, data location and a pricing model you can predict. Use the scorer on this page to set your own weights.",
  },
  {
    q: "What should an Indian coaching institute look for in an LMS?",
    a: "Start with payments paid straight into your own account with GST-aware invoices, then answer evaluation for written and handwritten tests, a lead pipeline for ad and webinar enquiries, data stored in India with an export you can run yourself, and a flat, published price.",
  },
  {
    q: "Does VILMS rank itself first?",
    a: "No. This page does not rank any vendor. The scorer shows how well VILMS covers the criteria you care about and says plainly where it only partly does, such as live classes, which run on your own Zoom or Meet link.",
  },
  {
    q: "Where does VILMS store data?",
    a: "Primary data is stored in the Mumbai region, encrypted in transit and at rest, and isolated per institute. You can export students, enrolments and orders to CSV at any time, even after you cancel.",
  },
  {
    q: "Is there a revenue share on VILMS?",
    a: "No. VILMS has a flat monthly plan and 0% revenue share on every plan. Students pay into your own Razorpay account.",
  },
];
