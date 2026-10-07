import type { StoryStep } from "@/components/site-ui/ScrollStory";
import type { FaqItem } from "@/components/site-ui/FaqAccordion";

// Sample rubric for the illustrative interface. Same numbers everywhere on the
// page: the AI draft totals 14/20, the mentor corrects Examples, final 16/20.
export type Criterion = {
  key: "content" | "structure" | "examples" | "language";
  label: string;
  max: number;
  ai: number;
  final: number;
  evidence: string;
};

export const RUBRIC: Criterion[] = [
  { key: "content", label: "Content", max: 8, ai: 6, final: 6, evidence: "Core idea stated, second point is thin" },
  { key: "structure", label: "Structure", max: 4, ai: 3, final: 3, evidence: "Clear opening, no closing line" },
  { key: "examples", label: "Examples", max: 4, ai: 2, final: 4, evidence: "Art. 38 matched, Art. 39 not read" },
  { key: "language", label: "Language", max: 4, ai: 3, final: 3, evidence: "Clear and easy to follow" },
];

export const AI_TOTAL = RUBRIC.reduce((t, r) => t + r.ai, 0); // 14
export const FINAL_TOTAL = RUBRIC.reduce((t, r) => t + r.final, 0); // 16
export const MAX_TOTAL = RUBRIC.reduce((t, r) => t + r.max, 0); // 20

export const EVAL_STEPS: StoryStep[] = [
  { title: "A student uploads a handwritten answer", text: "A photo from the phone, two pages, one tap. It lands in the test's submissions." },
  { title: "AI reads it", text: "The handwriting becomes text. The original page stays attached, so nobody has to trust the transcript." },
  { title: "AI checks it against your rubric", text: "Every criterion you set is matched to evidence on the page, and the page is marked up." },
  { title: "A draft evaluation appears", text: "Marks per criterion and a comment. It is a draft, and the student cannot see it." },
  { title: "A mentor reviews it", text: "Change any mark, rewrite any comment. The page and the draft sit side by side." },
  { title: "The mentor approves", text: "One click releases it. Until that click, the student sees nothing." },
  { title: "The student gets the evaluated copy", text: "Marks, comments and rubric in one view, saved to the student's profile." },
];

export const STATUS_BY_STEP = ["Uploaded", "AI reading", "AI evaluating", "AI draft", "Mentor review", "Approved", "Delivered"];

export const AI_FAQ: FaqItem[] = [
  {
    q: "Does AI grade my students without a mentor?",
    a: "No. AI writes a draft evaluation against your rubric. A mentor reviews it, can change any mark or comment, and approves it. Until a mentor approves, the student sees nothing.",
  },
  {
    q: "Can it read handwritten answers?",
    a: "Students upload photos of their handwritten pages. AI reads the handwriting and drafts the evaluation, and the original page stays attached so the mentor can check the draft against what the student actually wrote. Clearer photos give better drafts, which is why a mentor reviews every one.",
  },
  {
    q: "Can I use my own rubric?",
    a: "Yes. Evaluation is rubric-based: you set the criteria and the marks for each, mentors score against them, and the AI draft is written against the same rubric.",
  },
  {
    q: "Whose AI account does it use?",
    a: "Yours. Connect your own Anthropic or OpenAI key and pay that provider directly, at cost, with no markup from VILMS.",
  },
  {
    q: "Is my students' data used to train AI models?",
    a: "No. Your students' data is not used to train AI models.",
  },
  {
    q: "How many AI evaluations can I run?",
    a: "Each plan includes a yearly allowance of AI evaluations; the pricing page shows the allowance for every plan. Live usage meters warn you at 80% and 100% of a limit, and your site and classes keep running.",
  },
  {
    q: "What about multiple-choice questions?",
    a: "Objective questions mark themselves, in the same test as long-form and handwritten answers. Only the answers that need a human reader go to a mentor.",
  },
  {
    q: "What does the student see, and where is the grade saved?",
    a: "The student gets an evaluated copy: marks, comments and the rubric in one view. Every result is also saved to the student's profile alongside their other grades.",
  },
];
