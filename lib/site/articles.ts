// The blog, in one place. Five recommended topics from the sitemap:
//   1-3 are canonical pages elsewhere on the site (`kind: "page"`) — the blog
//       lists them but links to the page, so there is never a duplicate article;
//   4-5 are real articles rendered by app/(site)/blog/[slug]/page.tsx from the
//       `body` blocks below (`kind: "article"`).
//
// No authors, no dates: they do not exist. Reading time is computed from the
// word count of the body (real articles) or measured from the page's copy.
// Every statement is grounded in the VILMS brochure or plain, non-numeric
// industry reasoning — no statistics, studies or customer stories.

import type { PageKey } from "./pages";

export type ArticleCategory = "Buying guides" | "Teaching models" | "AI & assessment" | "Operations";

export type CoverKind = "best" | "checklist" | "classroom" | "ai" | "platform";

export type Block =
  | { type: "p"; text: string; lead?: boolean }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; tone: "note" | "watch" | "fact"; title: string; text: string }
  | { type: "quote"; text: string; source: string }
  | { type: "facts"; items: { value: string; label: string }[] }
  | { type: "figure"; kind: "evalFlow" | "handoffs"; caption: string }
  | { type: "links"; title: string; keys: PageKey[] };

export type Article = {
  slug: string;
  /** Registry key: metadata, breadcrumbs and JSON-LD come from this page. */
  pageKey: PageKey;
  kind: "page" | "article";
  title: string;
  excerpt: string;
  category: ArticleCategory;
  tags: string[];
  readingMinutes: number;
  href: string;
  cover: CoverKind;
  body?: Block[];
};

/** Words per minute used for every reading-time figure on the site. */
export const WORDS_PER_MINUTE = 200;

const stripInline = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");

export function blockWords(blocks: Block[]): number {
  const text = blocks
    .map((b) => {
      switch (b.type) {
        case "p":
        case "h3":
          return b.text;
        case "h2":
          return b.text;
        case "ul":
        case "ol":
          return b.items.join(" ");
        case "callout":
          return `${b.title} ${b.text}`;
        case "quote":
          return b.text;
        case "facts":
          return b.items.map((i) => `${i.value} ${i.label}`).join(" ");
        case "figure":
          return b.caption;
        case "links":
          return "";
      }
    })
    .join(" ");
  return stripInline(text).split(/\s+/).filter(Boolean).length;
}

export const readingMinutes = (words: number) => Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));

/* ---------------------------------------------------------------------- */
/* Article 4 — AI answer evaluation                                        */
/* ---------------------------------------------------------------------- */

const aiEvaluation: Block[] = [
  { type: "h2", id: "bottleneck", text: "The bottleneck is the marking, not the test" },
  {
    type: "p",
    lead: true,
    text: "Setting a test series is the easy part. A mock test goes out on Sunday, the copies come back, and the mentors who should be teaching spend the week with a red pen. Feedback that reaches a student long after the test is feedback for something they have already forgotten.",
  },
  {
    type: "p",
    text: "Multiple-choice questions never had this problem, because software marks them instantly. The trouble is that the tests that matter most to many institutes are long-form, essay and handwritten answers, and those cannot be machine-marked the old way. So evaluation becomes the one part of the institute that does not scale: it is bound by mentor hours.",
  },

  { type: "h2", id: "what-it-does", text: "What AI answer evaluation does, and what it does not" },
  {
    type: "p",
    text: "AI-assisted evaluation means software reads a student’s answer and writes a first draft of the evaluation: marks against each criterion and a short comment. A mentor then reviews that draft, changes whatever they disagree with, and approves it. Only after that does the student see anything.",
  },
  {
    type: "ol",
    items: [
      "The student writes the answer on paper and uploads a photo from their phone.",
      "The AI reads the answer and scores it against your rubric, criterion by criterion.",
      "A draft evaluation appears for the mentor, marked as awaiting approval.",
      "The mentor accepts or edits the marks and comments, then approves.",
      "The student receives an evaluated copy: marks, comments and the rubric in one view.",
    ],
  },
  { type: "figure", kind: "evalFlow", caption: "The same five steps, played out. Illustrative interface · sample data." },
  {
    type: "callout",
    tone: "note",
    title: "The key word is draft",
    text: "The AI proposes. The mentor decides. Nothing reaches a student until a person has approved it.",
  },

  { type: "h2", id: "rubric-first", text: "Why the rubric comes first" },
  {
    type: "p",
    text: "An AI can only be as consistent as the yardstick you give it. A rubric (content, structure, examples and language, each with its own marks) turns “a good answer” into something you can check. It helps human evaluators as well: two mentors working from the same rubric drift apart less than two mentors working from their own instincts.",
  },
  {
    type: "p",
    text: "If your institute has no written rubrics yet, writing them is the most useful first step, whether or not you ever adopt software. Software then applies the same criteria to every copy, in every batch.",
  },

  { type: "h2", id: "time-back", text: "Where the time goes back" },
  {
    type: "ul",
    items: [
      "**Mentors review instead of starting blank.** Reading a draft and correcting it is usually quicker than writing an evaluation from nothing.",
      "**Feedback arrives while the test is still fresh.** A student who gets marks and comments soon after writing can act on them.",
      "**One yardstick across mentors and batches.** The first pass is always against the same rubric.",
      "**Expert attention goes where it is needed.** Judging the borderline answer and writing the comment that changes how a student writes are the parts only a mentor can do.",
    ],
  },
  { type: "quote", text: "Mentors review AI-drafted evaluations instead of starting blank.", source: "How VILMS describes faster answer evaluation" },

  { type: "h2", id: "what-ai-should-not-do", text: "What AI should not do" },
  {
    type: "p",
    text: "Be wary of any tool that grades and publishes in one step. Handwriting can be misread. An unusual but correct answer can be marked down for not matching a pattern. A borderline student deserves a human look. That is why approval before release is the design, not an optional extra.",
  },
  {
    type: "callout",
    tone: "watch",
    title: "A simple test",
    text: "If a vendor cannot show you the exact point where a human approves a result, assume there is not one.",
  },

  { type: "h2", id: "questions", text: "Questions to ask any vendor" },
  {
    type: "ul",
    items: [
      "Does a mentor approve every evaluation before the student can see it?",
      "Can I set my own rubric, and can the mentor edit marks and comments?",
      "Does it read handwritten uploads, or only typed text?",
      "Are my students’ answers used to train AI models?",
      "Whose AI account does it run on, and what does each evaluation cost me?",
      "Where do the evaluated copies and grades live afterwards: on the student’s profile, or only in an export?",
    ],
  },

  { type: "h2", id: "how-vilms-does-it", text: "How VILMS handles it" },
  {
    type: "p",
    text: "VILMS grades long-form and handwritten answers against your rubric. The AI drafts the evaluation, and it is marked as awaiting mentor approval until a mentor approves or edits it. The student then sees an evaluated copy with marks, comments and rubric together, and the grade is saved on their profile.",
  },
  {
    type: "facts",
    items: [
      { value: "Mentor approves", label: "AI drafts; a person decides what the student sees" },
      { value: "Your own key", label: "Connect your Anthropic or OpenAI account and pay them at cost" },
      { value: "Never for training", label: "Your students’ data is not used to train AI models" },
    ],
  },
  {
    type: "links",
    title: "Go deeper",
    keys: ["aiEvaluation", "onlineExams", "testPrep"],
  },

  { type: "h2", id: "where-to-start", text: "A sensible way to start" },
  {
    type: "ol",
    items: [
      "Pick one test series with long-form answers.",
      "Write or refine its rubric so every criterion has marks and a plain description.",
      "Run the first batch with every draft reviewed closely.",
      "Compare the drafts with how your mentors would have marked, and adjust the rubric.",
      "Widen to more tests once the drafts need only light edits.",
    ],
  },
  {
    type: "p",
    text: "VILMS has a 14-day free trial with no card needed, so you can set up a rubric and a test before you decide. If you would rather see it on your own material, [book a demo](/book-a-demo) and we will walk through your setup.",
  },
];

/* ---------------------------------------------------------------------- */
/* Article 5 — Courses, tests and payments in one platform                 */
/* ---------------------------------------------------------------------- */

const onePlatform: Block[] = [
  { type: "h2", id: "stack", text: "A stack that grows one tool at a time" },
  {
    type: "p",
    lead: true,
    text: "Nobody plans a patchwork. An institute starts with a WhatsApp group for enquiries, adds Zoom for live classes, Google Forms for a test and a spreadsheet to track who has paid. Each choice is sensible on the day, and each tool does its own job well enough.",
  },
  {
    type: "p",
    text: "The cost does not sit inside any one tool. It sits in the gaps between them: the places where a person has to carry information from one screen to another by hand.",
  },

  { type: "h2", id: "gaps", text: "Where the gaps show up" },
  {
    type: "ul",
    items: [
      "**Enquiries disappear into chat threads.** A parent who asked about a batch last month is somewhere in a long scroll, with no pipeline and no follow-up trail.",
      "**Classes are not linked to enrolment.** A Zoom link does not know which student paid for which batch.",
      "**Tests are scattered.** Google Forms copes with multiple-choice questions, but essay and handwritten answers cannot be graded properly, and the results end up in separate sheets.",
      "**Payments live in a spreadsheet.** Reconciling by hand leaves no receipts and no GST-ready records.",
      "**The ad click lands on a weak page.** Paid traffic arrives at a course listing buried several clicks deep.",
    ],
  },
  { type: "figure", kind: "handoffs", caption: "Every dashed arrow is a person re-typing something. Illustrative." },
  {
    type: "quote",
    text: "Four or five tools that don’t talk to each other means lost leads, re-typed data, slow grading.",
    source: "How VILMS describes the problem",
  },

  { type: "h2", id: "one-platform", text: "What “one platform” actually means" },
  {
    type: "p",
    text: "One platform does not mean one enormous feature list. It means one database. A person is entered once, as a lead, and the same record becomes a student, a test-taker, a payer and eventually a certificate holder. Nothing is re-typed on the way.",
  },
  {
    type: "ol",
    items: [
      "A lead is captured from an ad, a webinar or a free download.",
      "The student enrols and pays through your own Razorpay account.",
      "They take the course, recorded, live or a mix of both.",
      "Their answers are graded against rubrics, with AI drafts for the mentor to approve.",
      "A certificate is issued under your institute’s name.",
      "The cohort is invited to renew into the next batch.",
    ],
  },

  { type: "h2", id: "parts", text: "What changes in each part of the institute" },
  { type: "h3", text: "Courses and live classes" },
  {
    type: "p",
    text: "Recorded lessons, live classes on your own Zoom or Meet link and downloadable notes sit inside the same course, so a student’s schedule, recordings and materials are in one place. Live classes carry RSVPs and reminders. More on [courses and live classes](/online-course-platform).",
  },
  { type: "h3", text: "Tests and evaluation" },
  {
    type: "p",
    text: "Objective questions mark themselves. Long-form and handwritten answers are graded against a rubric, with an AI draft for the mentor to approve, and every grade lands on the student’s profile rather than in a separate file. See [online exams](/online-exam-platform) and [AI answer evaluation](/ai-answer-evaluation-software).",
  },
  { type: "h3", text: "Payments" },
  {
    type: "p",
    text: "Fees are paid at checkout straight to your own Razorpay account, with UPI and bank-transfer fallback, GST-aware invoices and a record of every order and refund. VILMS takes 0% of what students pay.",
  },
  { type: "h3", text: "Leads" },
  {
    type: "p",
    text: "Enquiries, checkouts and webinar RSVPs land in one pipeline, with follow-up on calls and WhatsApp. See [lead management](/lead-management-software).",
  },
  {
    type: "callout",
    tone: "fact",
    title: "You keep your own accounts",
    text: "Razorpay, WhatsApp through Wati, Zoom or Meet, your email provider and your AI key connect to VILMS. They stay yours, billed at cost with no markup.",
  },
  {
    type: "facts",
    items: [
      { value: "0%", label: "revenue share, on every plan" },
      { value: "Mumbai", label: "primary data region, exportable any time" },
      { value: "14 days", label: "free trial, no card needed" },
    ],
  },

  { type: "h2", id: "stays", text: "What stays exactly as it is" },
  {
    type: "p",
    text: "Putting the admin on one platform does not change how you teach. Your faculty, your batches and your classroom remain yours. The platform replaces the glue (the forwarding, re-typing and reconciling), not the teaching. If you teach in a room, the platform simply sits behind it; the page on [LMS vs traditional teaching](/lms-vs-traditional-teaching) walks through a day at an institute both ways.",
  },

  { type: "h2", id: "moving", text: "A cautious way to move" },
  {
    type: "ol",
    items: [
      "List every tool that touches a student, from first enquiry to certificate.",
      "Pick the handoff that costs you most. For many institutes that is payments or leads.",
      "Run one batch end to end on the new platform before moving the rest.",
      "Confirm you can take your data out: students, enrolments and orders as CSV.",
      "Move the remaining batches once the first has run cleanly.",
    ],
  },
  {
    type: "p",
    text: "The 14-day free trial needs no card, which is enough time to set up a first course and look at the pipeline before you commit.",
  },

  { type: "h2", id: "questions", text: "Questions to settle before you switch" },
  {
    type: "ul",
    items: [
      "Does the platform take a percentage of your fee income?",
      "Whose payment account do student fees go to?",
      "Can each team member see only what their role needs: owner, teacher, counsellor?",
      "Where is your data stored, and can you export it, even after you cancel?",
      "Will students see your brand, or the vendor’s?",
    ],
  },
  {
    type: "links",
    title: "Keep reading",
    keys: ["buyingGuide", "comparison", "pricing"],
  },
];

/* ---------------------------------------------------------------------- */
/* The five topics                                                         */
/* ---------------------------------------------------------------------- */

export const ARTICLES: Article[] = [
  {
    slug: "best-lms-software-for-coaching-institutes-in-india",
    pageKey: "bestLms",
    kind: "page",
    title: "Best LMS Software for Coaching Institutes in India",
    excerpt: "What makes an LMS the right fit for an Indian coaching institute — payments, GST, branding, evaluation, leads and cost — and a scorer where you set the weights.",
    category: "Buying guides",
    tags: ["Criteria", "GST & UPI", "Weighted scorer"],
    readingMinutes: 7,
    href: "/best-lms-software-india",
    cover: "best",
  },
  {
    slug: "how-to-choose-an-lms-for-a-coaching-institute",
    pageKey: "buyingGuide",
    kind: "page",
    title: "How to Choose an LMS for a Coaching Institute",
    excerpt: "A practical buying guide with a checklist you can score: payments, branding, evaluation, lead management, live classes, data and pricing model.",
    category: "Buying guides",
    tags: ["Checklist", "Red flags", "Demo questions"],
    readingMinutes: 6,
    href: "/lms-buying-guide",
    cover: "checklist",
  },
  {
    slug: "lms-vs-traditional-classroom-teaching",
    pageKey: "vsTraditional",
    kind: "page",
    title: "LMS vs Traditional Classroom Teaching",
    excerpt: "A day at the institute, twice: admissions, classes, tests, evaluation, fees and follow-up the traditional way, and with an LMS. Hybrid is a real mode.",
    category: "Teaching models",
    tags: ["Hybrid", "Day in the life"],
    readingMinutes: 6,
    href: "/lms-vs-traditional-teaching",
    cover: "classroom",
  },
  {
    slug: "how-ai-answer-evaluation-software-helps-institutes",
    pageKey: "blogAiEvaluation",
    kind: "article",
    title: "How AI Answer Evaluation Software Helps Institutes",
    excerpt: "AI can read a handwritten answer and draft marks against your rubric. The mentor still decides. How the workflow works and what to ask before you trust it.",
    category: "AI & assessment",
    tags: ["Handwritten answers", "Rubrics", "Mentor approval"],
    readingMinutes: readingMinutes(blockWords(aiEvaluation)),
    href: "/blog/how-ai-answer-evaluation-software-helps-institutes",
    cover: "ai",
    body: aiEvaluation,
  },
  {
    slug: "manage-courses-tests-payments-in-one-platform",
    pageKey: "blogOnePlatform",
    kind: "article",
    title: "Manage Courses, Tests & Payments in One Platform",
    excerpt: "Most institutes start with WhatsApp, Zoom, Google Forms and a spreadsheet. Where that stack starts to cost you, and what changes with one database.",
    category: "Operations",
    tags: ["One database", "Payments", "Migration"],
    readingMinutes: readingMinutes(blockWords(onePlatform)),
    href: "/blog/manage-courses-tests-payments-in-one-platform",
    cover: "platform",
    body: onePlatform,
  },
];

export const ARTICLE_CATEGORIES: ArticleCategory[] = ["Buying guides", "Teaching models", "AI & assessment", "Operations"];

/** Real articles only (those rendered by /blog/[slug]). */
export const REAL_ARTICLES = ARTICLES.filter((a) => a.kind === "article");

export const articleBySlug = (slug: string) => REAL_ARTICLES.find((a) => a.slug === slug);

/** Two other topics to read next. */
export function nextReads(slug: string): Article[] {
  const i = ARTICLES.findIndex((a) => a.slug === slug);
  const out: Article[] = [];
  for (let k = 1; out.length < 2 && k < ARTICLES.length; k++) out.push(ARTICLES[(i + k) % ARTICLES.length]);
  return out;
}
