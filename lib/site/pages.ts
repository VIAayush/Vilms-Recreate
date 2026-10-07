// The site map, in one place. Paths, groups and target keywords come from
// VILMS-Structure.jpeg and the "VI LMS Website Structure and Suggested SEO
// Friendly URL" Google Sheet (Keywords tab). Everything that lists pages —
// the mega menu, footer, breadcrumbs, sitemap.xml, related-page cards and
// each page's metadata — reads from this registry, so a page is renamed or
// re-keyworded in exactly one place.
//
// URLs are served without a trailing slash (/lms-platform); canonicals and
// the sitemap use the same form, so there is one URL per page.

export type PageGroup = "home" | "product" | "solution" | "business" | "resource" | "legal" | "article";

export type PageKey =
  | "home"
  | "lmsPlatform"
  | "onlineCourses"
  | "onlineExams"
  | "aiEvaluation"
  | "leadCrm"
  | "whiteLabel"
  | "coaching"
  | "testPrep"
  | "onlineCoaching"
  | "training"
  | "schoolsColleges"
  | "about"
  | "why"
  | "pricing"
  | "demo"
  | "contact"
  | "faq"
  | "blog"
  | "buyingGuide"
  | "vsTraditional"
  | "bestLms"
  | "comparison"
  | "privacy"
  | "terms"
  | "refund"
  | "cookies"
  | "blogAiEvaluation"
  | "blogOnePlatform";

/** Lucide icon names used by menus and cards (resolved in components/site-ui/icons.ts). */
export type IconKey =
  | "home"
  | "platform"
  | "courses"
  | "exams"
  | "ai"
  | "crm"
  | "brand"
  | "coaching"
  | "testPrep"
  | "online"
  | "training"
  | "school"
  | "about"
  | "why"
  | "pricing"
  | "demo"
  | "contact"
  | "faq"
  | "blog"
  | "guide"
  | "compare"
  | "best"
  | "legal";

export type PageDef = {
  path: string;
  group: PageGroup;
  /** nav / breadcrumb / card label */
  name: string;
  /** <title> without the " · VILMS" suffix the root layout adds */
  title: string;
  description: string;
  /** primary keyword — from the sheet where it has one */
  keyword: string;
  keywords: string[];
  /** one line for menus and "related" cards */
  blurb: string;
  icon: IconKey;
  /** false = noindex and left out of sitemap.xml (placeholder pages) */
  indexable?: boolean;
};

export const PAGES: Record<PageKey, PageDef> = {
  home: {
    path: "/",
    group: "home",
    name: "Home",
    title: "VILMS — LMS for Coaching Institutes | Your students pay you. Not your software.",
    description:
      "VILMS is the LMS for coaching institutes: courses, live classes, AI-assisted answer evaluation, payments and a lead CRM under your own brand. 0% revenue share.",
    keyword: "LMS for coaching institutes",
    keywords: ["coaching institute LMS", "LMS for education institutes", "education LMS platform", "LMS software India"],
    blurb: "One platform for your whole institute.",
    icon: "home",
  },

  /* ---------------- Product ---------------- */
  lmsPlatform: {
    path: "/lms-platform",
    group: "product",
    name: "LMS Platform",
    title: "LMS Platform for Coaching Institutes",
    description:
      "One LMS platform for courses, live classes, tests, AI-assisted evaluation, payments, leads and your own brand — built for coaching institutes in India.",
    keyword: "LMS platform for coaching institutes",
    keywords: ["learning management system for institutes", "education management platform", "LMS software for institutes", "online LMS platform"],
    blurb: "Courses, classes, tests, payments and leads on one database.",
    icon: "platform",
  },
  onlineCourses: {
    path: "/online-course-platform",
    group: "product",
    name: "Courses & Live Classes",
    title: "Online Course Platform for Educators",
    description:
      "Build recorded, live and hybrid courses with drip content, private recordings, Zoom or Meet classes, webinars, RSVPs and reminders — on your own branded platform.",
    keyword: "online course platform for educators",
    keywords: ["course creation platform for teachers", "online course management platform", "online teaching platform India", "course selling platform"],
    blurb: "Recorded, live and hybrid — inside your own platform.",
    icon: "courses",
  },
  onlineExams: {
    path: "/online-exam-platform",
    group: "product",
    name: "Online Exams",
    title: "Online Exam Software for Coaching Institutes",
    description:
      "Run MCQ tests, long-form and handwritten answer tests and mock exams with rubric grading, evaluated copies and grade history on every student's profile.",
    keyword: "online exam software for coaching institutes",
    keywords: ["online test platform for coaching institutes", "exam management software", "online assessment platform India", "mock test software"],
    blurb: "MCQs, long answers and mock tests with rubric grading.",
    icon: "exams",
  },
  aiEvaluation: {
    path: "/ai-answer-evaluation-software",
    group: "product",
    name: "AI Answer Evaluation",
    title: "AI Answer Evaluation Software",
    description:
      "AI reads handwritten answers and drafts an evaluation against your rubric. Your mentor reviews and approves before the student sees it. Mentors stay in control.",
    keyword: "AI answer evaluation software",
    keywords: ["AI grading software for coaching institutes", "AI assessment platform India", "AI exam evaluation software", "automated answer evaluation"],
    blurb: "AI drafts against your rubric. A mentor approves.",
    icon: "ai",
  },
  leadCrm: {
    path: "/lead-management-software",
    group: "product",
    name: "Lead CRM",
    title: "Lead Management Software for Coaching Institutes",
    description:
      "Capture leads from Meta Ads, Google Ads, landing pages, webinars and free PDFs, follow up on calls and WhatsApp, and track every lead from enquiry to enrolment.",
    keyword: "lead management software for coaching institutes",
    keywords: ["coaching institute CRM", "education CRM software", "student lead management software", "admission CRM for coaching institutes"],
    blurb: "Turn ad clicks into paid enrolments.",
    icon: "crm",
  },
  whiteLabel: {
    path: "/white-label-lms",
    group: "product",
    name: "White-Label LMS",
    title: "White Label LMS for Coaching Institutes",
    description:
      "Your logo, your colours, your domain, your certificates. A white-label LMS where students see your institute's brand and never see VILMS.",
    keyword: "white label LMS for coaching institutes",
    keywords: ["white label education platform", "branded LMS platform", "white label online academy", "own branded LMS"],
    blurb: "Your logo, colours, domain and certificates.",
    icon: "brand",
  },

  /* ---------------- Solutions ---------------- */
  coaching: {
    path: "/lms-for-coaching-institutes",
    group: "solution",
    name: "Coaching Institutes",
    title: "LMS for Coaching Institutes in India",
    description:
      "Run admissions, batches, tests, faculty, fees and your lead pipeline on one LMS built for coaching institutes — under your own brand, with 0% revenue share.",
    keyword: "LMS for coaching institutes in India",
    keywords: ["coaching management software", "coaching institute management system", "coaching centre LMS", "software for coaching institutes"],
    blurb: "Admissions, batches, tests, faculty and fees.",
    icon: "coaching",
  },
  testPrep: {
    path: "/lms-for-test-preparation",
    group: "solution",
    name: "Test Preparation",
    title: "LMS for Test Preparation Institutes",
    description:
      "Mock tests, answer evaluation, performance views and study materials for exam-prep institutes — rubric grading with AI drafts and mentor approval.",
    keyword: "LMS for test preparation institutes",
    keywords: ["test preparation software", "exam preparation LMS", "test series management software", "coaching test platform"],
    blurb: "Mock tests, answer evaluation and performance.",
    icon: "testPrep",
  },
  onlineCoaching: {
    path: "/lms-for-online-coaching",
    group: "solution",
    name: "Online Coaching",
    title: "LMS for Online Coaching",
    description:
      "Sell courses, run live classes, collect fees to your own Razorpay and issue certificates — one LMS for online coaching, on your own domain.",
    keyword: "LMS for online coaching",
    keywords: ["online coaching management software", "online teaching LMS", "online academy platform", "online coaching platform"],
    blurb: "Courses, live classes, payments and certificates.",
    icon: "online",
  },
  training: {
    path: "/lms-for-training-institutes",
    group: "solution",
    name: "Training Institutes",
    title: "LMS for Training Institutes in India",
    description:
      "Programmes, batches, assessments, certificates and lead management for training institutes — sold under your own brand and domain.",
    keyword: "LMS for training institutes in India",
    keywords: ["training institute management software", "training LMS India", "training centre LMS", "online training platform"],
    blurb: "Programmes, batches, assessments and certificates.",
    icon: "training",
  },
  schoolsColleges: {
    path: "/lms-for-schools-colleges",
    group: "solution",
    name: "Schools & Colleges",
    title: "LMS for Schools and Colleges",
    description:
      "Run paid add-on programmes, assessments, student records and faculty access online — with fees paid straight to your institution's own account.",
    keyword: "LMS for schools and colleges",
    keywords: ["education management software", "school LMS platform", "college LMS software", "student learning platform"],
    blurb: "Paid programmes, assessments and faculty access.",
    icon: "school",
  },

  /* ---------------- Business ---------------- */
  about: {
    path: "/about",
    group: "business",
    name: "About VILMS",
    title: "About VILMS",
    description:
      "VILMS is a learning platform for Indian coaching institutes. Learn what it is, why it exists and who it is for — courses, classes, evaluation, payments and leads in one place.",
    keyword: "VILMS LMS platform",
    keywords: ["VILMS education platform", "VILMS software", "VILMS learning platform"],
    blurb: "What VILMS is, why it exists and who it is for.",
    icon: "about",
  },
  why: {
    path: "/why-choose-vilms",
    group: "business",
    name: "Why VILMS",
    title: "Why Choose VILMS",
    description:
      "0% revenue share, your own brand and domain, one platform for courses, evaluation, payments and leads. See how VILMS compares with a patchwork of tools.",
    keyword: "why choose VILMS LMS",
    keywords: ["0% revenue share LMS", "LMS without commission", "own brand LMS India"],
    blurb: "0% revenue share, your brand, one platform.",
    icon: "why",
  },
  pricing: {
    path: "/pricing",
    group: "business",
    name: "Pricing",
    title: "LMS Software Pricing in India — Plans from ₹499/month",
    description:
      "Simple LMS pricing for coaching institutes: Base ₹499, Growth ₹1,199, Scale ₹2,499 and Institute ₹4,999 a month. 0% revenue share, 14-day free trial, no card needed.",
    keyword: "LMS software pricing India",
    keywords: ["LMS pricing India", "coaching LMS pricing", "online teaching platform pricing", "LMS software cost"],
    blurb: "Plans from ₹499/month. 0% of your fees.",
    icon: "pricing",
  },
  demo: {
    path: "/book-a-demo",
    group: "business",
    name: "Book a Demo",
    title: "Book a VILMS Demo — LMS Demo for Coaching Institutes",
    description:
      "Book a 30-minute VILMS demo. We walk through your current setup and show exactly what moves over — courses, students, tests, payments and leads.",
    keyword: "LMS demo for coaching institutes",
    keywords: ["LMS software demo", "coaching LMS demo", "education software demo", "LMS platform demo"],
    blurb: "A 30-minute walkthrough of your setup.",
    icon: "demo",
  },
  contact: {
    path: "/contact",
    group: "business",
    name: "Contact",
    title: "Contact VILMS",
    description: "Write to the VILMS team about the platform, pricing or your institute's setup. Support and billing emails, and a contact form.",
    keyword: "contact VILMS",
    keywords: ["VILMS support", "VILMS email"],
    blurb: "Questions about VILMS? Write to us.",
    icon: "contact",
  },
  faq: {
    path: "/faq",
    group: "business",
    name: "FAQ",
    title: "VILMS FAQ — LMS for Coaching Institutes",
    description:
      "Answers about VILMS: the product, pricing, payments, AI evaluation, courses, live classes, CRM, branding, security and the free trial.",
    keyword: "LMS for coaching institutes FAQ",
    keywords: ["LMS software questions", "coaching LMS FAQ", "online education platform FAQ"],
    blurb: "Product, pricing, payments, AI and more.",
    icon: "faq",
  },

  /* ---------------- Resources ---------------- */
  blog: {
    path: "/blog",
    group: "resource",
    name: "Blog",
    title: "VILMS Blog — LMS Guides for Coaching Institutes",
    description: "Guides for coaching institute owners: choosing an LMS, answer evaluation, running courses, tests and payments in one platform.",
    keyword: "LMS blog for coaching institutes",
    keywords: ["coaching institute software guides", "LMS guides India"],
    blurb: "Guides for coaching institute owners.",
    icon: "blog",
  },
  buyingGuide: {
    path: "/lms-buying-guide",
    group: "resource",
    name: "LMS Buying Guide",
    title: "How to Choose an LMS for a Coaching Institute",
    description:
      "A practical LMS buying guide for coaching institutes: what to check on payments, branding, evaluation, leads and pricing — with a checklist you can score.",
    keyword: "how to choose an LMS for a coaching institute",
    keywords: ["LMS buying guide", "choosing an LMS", "LMS selection checklist"],
    blurb: "A scoreable checklist for choosing an LMS.",
    icon: "guide",
  },
  vsTraditional: {
    path: "/lms-vs-traditional-teaching",
    group: "resource",
    name: "LMS vs Traditional Teaching",
    title: "LMS vs Traditional Classroom Teaching",
    description:
      "How an LMS changes admissions, classes, tests, evaluation, fee collection and follow-up compared with running a coaching institute the traditional way.",
    keyword: "LMS vs traditional classroom teaching",
    keywords: ["online vs offline coaching", "LMS vs classroom", "benefits of LMS for coaching"],
    blurb: "What actually changes when you add an LMS.",
    icon: "compare",
  },
  bestLms: {
    path: "/best-lms-software-india",
    group: "resource",
    name: "Best LMS Software in India",
    title: "Best LMS Software in India for Coaching Institutes",
    description:
      "What makes an LMS the best fit for an Indian coaching institute: payments, GST, branding, evaluation, lead management and cost. Score the criteria yourself.",
    keyword: "best LMS software in India",
    keywords: ["best LMS for coaching institutes in India", "top LMS India", "LMS software for coaching institutes"],
    blurb: "The criteria that matter, scored by you.",
    icon: "best",
  },
  comparison: {
    path: "/lms-software-comparison",
    group: "resource",
    name: "LMS Software Comparison",
    title: "LMS Software Comparison for Coaching Institutes",
    description:
      "Compare the main ways to run an institute online — revenue-share course platforms, a stack of separate tools, and a flat-fee white-label LMS — side by side, with a cost calculator.",
    keyword: "LMS software comparison",
    keywords: ["compare LMS software India", "LMS vs course platform", "revenue share vs flat fee LMS"],
    blurb: "Three approaches, side by side, with a cost calculator.",
    icon: "compare",
  },

  /* ---------------- Blog articles (topics 4 and 5 of the sitemap) ---------------- */
  blogAiEvaluation: {
    path: "/blog/how-ai-answer-evaluation-software-helps-institutes",
    group: "article",
    name: "How AI Answer Evaluation Software Helps Institutes",
    title: "How AI Answer Evaluation Software Helps Institutes",
    description:
      "How AI-drafted, mentor-approved answer evaluation saves mentors time on handwritten answers without taking the final decision away from them.",
    keyword: "AI answer evaluation software",
    keywords: ["AI grading for coaching institutes", "handwritten answer evaluation", "mentor approval"],
    blurb: "AI drafts. Mentors decide. Here is how it works.",
    icon: "ai",
  },
  blogOnePlatform: {
    path: "/blog/manage-courses-tests-payments-in-one-platform",
    group: "article",
    name: "Manage Courses, Tests & Payments in One Platform",
    title: "Manage Courses, Tests & Payments in One Platform",
    description:
      "Why coaching institutes outgrow WhatsApp, Zoom, Google Forms and spreadsheets — and what changes when courses, tests, payments and leads share one database.",
    keyword: "manage courses tests and payments in one platform",
    keywords: ["all-in-one LMS for coaching institutes", "coaching management software"],
    blurb: "From a stack of tools to one database.",
    icon: "platform",
  },

  /* ---------------- Legal ---------------- */
  privacy: {
    path: "/privacy-policy",
    group: "legal",
    name: "Privacy Policy",
    title: "Privacy Policy",
    description: "How the VILMS website handles the details you share with us and the analytics we collect.",
    keyword: "VILMS privacy policy",
    keywords: [],
    blurb: "How we handle your details.",
    icon: "legal",
  },
  terms: {
    path: "/terms-and-conditions",
    group: "legal",
    name: "Terms & Conditions",
    title: "Terms & Conditions",
    description: "Terms for using the VILMS website.",
    keyword: "VILMS terms and conditions",
    keywords: [],
    blurb: "Terms for using this website.",
    icon: "legal",
    indexable: false,
  },
  refund: {
    path: "/refund-policy",
    group: "legal",
    name: "Refund Policy",
    title: "Refund Policy",
    description: "Refund and billing information for VILMS plans.",
    keyword: "VILMS refund policy",
    keywords: [],
    blurb: "Billing and refunds.",
    icon: "legal",
    indexable: false,
  },
  cookies: {
    path: "/cookie-policy",
    group: "legal",
    name: "Cookie Policy",
    title: "Cookie Policy",
    description: "What the VILMS website stores in your browser, why, and how to control it.",
    keyword: "VILMS cookie policy",
    keywords: [],
    blurb: "What this site stores in your browser.",
    icon: "legal",
  },
};

export const pageList = (Object.keys(PAGES) as PageKey[]).map((key) => ({ key, ...PAGES[key] }));
export const pagesIn = (group: PageGroup) => pageList.filter((p) => p.group === group);
export const href = (key: PageKey) => PAGES[key].path;

/** Menu structure for the header and mobile menu. */
export const MENU: { id: string; label: string; groups: { label?: string; keys: PageKey[] }[] }[] = [
  {
    id: "product",
    label: "Product",
    groups: [{ keys: ["lmsPlatform", "onlineCourses", "onlineExams", "aiEvaluation", "leadCrm", "whiteLabel"] }],
  },
  {
    id: "solutions",
    label: "Solutions",
    groups: [{ keys: ["coaching", "testPrep", "onlineCoaching", "training", "schoolsColleges"] }],
  },
  {
    id: "business",
    label: "Business",
    groups: [{ keys: ["about", "why", "pricing", "demo", "contact", "faq"] }],
  },
  {
    id: "resources",
    label: "Resources",
    groups: [
      { label: "Read", keys: ["blog", "buyingGuide"] },
      { label: "Compare", keys: ["vsTraditional", "bestLms", "comparison"] },
    ],
  },
];
