// Content for /lms-software-comparison. Three approaches, described in general
// terms — no real competitor is named, and statements about approaches A and B
// are hedged ("usually", "varies") because terms differ between products.
// Statements about approach C are VILMS product facts.

export type Approach = "share" | "stack" | "flat";

export const APPROACHES: { id: Approach; letter: string; name: string; line: string }[] = [
  {
    id: "share",
    letter: "A",
    name: "A revenue-share course platform",
    line: "A hosted platform that charges a monthly fee, a percentage of each sale, or both. Quick to start, and the cost follows your sales.",
  },
  {
    id: "stack",
    letter: "B",
    name: "A stack of separate tools",
    line: "A payment gateway, a video tool, a form tool, a CRM and a spreadsheet, wired together by your team. Maximum flexibility, maximum glue.",
  },
  {
    id: "flat",
    letter: "C",
    name: "A flat-fee white-label LMS",
    line: "One platform on your own brand with a flat monthly plan and no cut of your fees. VILMS is this kind.",
  },
];

/** yes = typically built in · varies = differs by product, check · manual = usually extra or done by hand */
export type Signal = "yes" | "varies" | "manual";

export type Cell = { text: string; signal: Signal };

export type Row = {
  id: string;
  group: "Money" | "Product" | "Practicalities";
  label: string;
  share: Cell;
  stack: Cell;
  flat: Cell;
};

export const GROUPS = ["All", "Money", "Product", "Practicalities"] as const;

export const ROWS: Row[] = [
  {
    id: "pricing",
    group: "Money",
    label: "How you pay",
    share: { text: "A monthly fee, a percentage of every sale, or both. Terms vary by platform.", signal: "varies" },
    stack: { text: "A separate bill for each tool, each with its own tiers.", signal: "manual" },
    flat: { text: "One flat monthly plan. 0% revenue share on every plan.", signal: "yes" },
  },
  {
    id: "money-flow",
    group: "Money",
    label: "Where student fees land",
    share: { text: "Ask whether fees reach your account or the platform’s first.", signal: "varies" },
    stack: { text: "In your own gateway account.", signal: "yes" },
    flat: { text: "Straight into your own Razorpay account.", signal: "yes" },
  },
  {
    id: "growth",
    group: "Money",
    label: "Cost as you grow",
    share: { text: "Tends to rise with every enrolment if a percentage applies.", signal: "varies" },
    stack: { text: "Rises with each tool’s tier, plus the staff time spent connecting them.", signal: "manual" },
    flat: { text: "Steps up by plan, by student count. Warnings come before a limit.", signal: "yes" },
  },
  {
    id: "brand",
    group: "Product",
    label: "Your brand and domain",
    share: { text: "Varies. Check whether the platform’s name shows to students.", signal: "varies" },
    stack: { text: "Yours where each tool allows, rarely consistent across all of them.", signal: "varies" },
    flat: { text: "Your logo, colours, emails and domain. Students never see VILMS.", signal: "yes" },
  },
  {
    id: "evaluation",
    group: "Product",
    label: "Handwritten and long-form answers",
    share: { text: "Often quizzes and assignments. Check for handwritten support.", signal: "varies" },
    stack: { text: "Forms handle multiple-choice. Written answers are marked by hand elsewhere.", signal: "manual" },
    flat: { text: "Rubric grading, handwritten uploads, AI drafts a mentor approves.", signal: "yes" },
  },
  {
    id: "leads",
    group: "Product",
    label: "Lead management",
    share: { text: "Varies, and sometimes needs an add-on or integration.", signal: "varies" },
    stack: { text: "A CRM or spreadsheet, linked to enrolment by hand.", signal: "manual" },
    flat: { text: "One pipeline for enquiries, checkouts and webinar RSVPs, with WhatsApp follow-up.", signal: "yes" },
  },
  {
    id: "live",
    group: "Product",
    label: "Live classes",
    share: { text: "Built in or integrated, depending on the platform.", signal: "varies" },
    stack: { text: "A video tool on its own. Not tied to who enrolled.", signal: "manual" },
    flat: { text: "Your Zoom or Meet link, tied to the course, with RSVPs and reminders.", signal: "yes" },
  },
  {
    id: "records",
    group: "Product",
    label: "Student records and data",
    share: { text: "Inside the platform. Check how you export them.", signal: "varies" },
    stack: { text: "Scattered across tools, joined by whoever keeps the sheet.", signal: "manual" },
    flat: { text: "One student profile. CSV export any time. Primary data in the Mumbai region.", signal: "yes" },
  },
  {
    id: "setup",
    group: "Practicalities",
    label: "Time to start",
    share: { text: "Usually quick. This is a real strength of the approach.", signal: "yes" },
    stack: { text: "The longest: you choose, connect and maintain every piece.", signal: "manual" },
    flat: { text: "Live in minutes on a yourname.vilms.in address; a 14-day trial with no card.", signal: "yes" },
  },
  {
    id: "fit",
    group: "Practicalities",
    label: "Often the right choice when",
    share: { text: "You are starting out, fee income is small or uncertain, and you want to launch fast.", signal: "varies" },
    stack: { text: "You have unusual needs, in-house technical skill and time to maintain it.", signal: "varies" },
    flat: { text: "You teach in cohorts, collect meaningful fees and want to keep all of them.", signal: "varies" },
  },
];

export const COMPARISON_FAQ = [
  {
    q: "What are the main ways to run a coaching institute online?",
    a: "Three approaches are common: a revenue-share course platform that charges a fee and a percentage of sales, a stack of separate tools joined together by your team, and a flat-fee white-label LMS that bundles courses, tests, payments and leads under your own brand.",
  },
  {
    q: "Is a flat fee always cheaper than a revenue share?",
    a: "No. At small fee incomes a percentage can cost less than a flat plan. As fee income grows, a percentage grows with it while a flat plan stays put until you move up a tier. The calculator on this page shows where the two lines cross for the numbers you enter.",
  },
  {
    q: "Which platforms does this page compare?",
    a: "None by name. It compares approaches, because terms differ between products and change over time. Check any platform’s current price page and terms, and enter the figures you find into the calculator.",
  },
  {
    q: "Does VILMS take any share of student fees?",
    a: "No. VILMS has a flat monthly plan and 0% revenue share on every plan. Students pay into your own Razorpay account, and plan prices exclude 18% GST.",
  },
  {
    q: "What is the weakness of the flat-fee approach?",
    a: "You commit to a monthly plan even in a quiet month, and VILMS runs live classes on your own Zoom or Meet account rather than a video room of its own. Choose the plan by the number of students you teach, and move up when you outgrow it.",
  },
];
