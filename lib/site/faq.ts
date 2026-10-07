import { brand, pricing } from "@/lib/content";

// Product, solution and business questions are the project owner's own FAQ
// text (docs/content-source.md), word for word. Pricing, payments, AI
// evaluation, security and trial answers are grounded in the product brochure
// and lib/content.ts. Every FAQ answer on the site lives here, so the /faq page, the pricing page,
// the home page and the FAQPage structured data all say the same thing. Each
// answer is one to three plain sentences, grounded in the product brochure and
// in lib/content.ts (plan names, limits and prices are read from `pricing`,
// never retyped).

export type FaqGroup = { id: string; label: string; items: { q: string; a: string }[] };

const [base, , , institute] = pricing.plans;
const topLimit = institute.limit.toLocaleString("en-IN");

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "product",
    label: "Product",
    items: [
      {
        q: "What is VILMS?",
        a: "VILMS is a hosted learning platform for coaching institutes, educational institutions and businesses. You manage courses, learners, assessments, payments and leads from one login, under your own brand.",
      },
      {
        q: "What is an LMS for coaching institutes?",
        a: "An LMS for coaching institutes is a digital platform that helps manage courses, learners, trainers, assessments, learning content, and learner progress in one place.",
      },
      {
        q: "What features does VILMS offer?",
        a: "VILMS offers course management, learner management, online assessments, progress tracking, reports and analytics, learning content management, trainer management, and certificates.",
      },
      {
        q: "Can VILMS be used by educational institutions?",
        a: "Yes. VILMS helps educational institutions manage online and blended learning, courses, assessments, learning content, and learner progress.",
      },
    ],
  },
  {
    id: "courses",
    label: "Courses",
    items: [
      {
        q: "What is an online course platform for educators?",
        a: "An online course platform helps educators create, manage, and deliver courses, learning content, assessments, and student activities online.",
      },
      {
        q: "Can teachers create courses with VILMS?",
        a: "Yes. Teachers and educators can use VILMS to organize courses, lessons, learning resources, assessments, and learners.",
      },
      {
        q: "Can VILMS be used to sell online courses?",
        a: "Yes. VILMS can support organizations and educators that want to offer and manage paid or free online courses.",
      },
      {
        q: "Is VILMS suitable for coaching institutes?",
        a: "Yes. Coaching institutes can use VILMS to manage courses, learners, batches, assessments, and learning content.",
      },
    ],
  },
  {
    id: "exams",
    label: "Exams",
    items: [
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
    ],
  },
  {
    id: "lead-crm",
    label: "Lead CRM",
    items: [
      {
        q: "What is lead management software for coaching institutes?",
        a: "It is software that helps coaching institutes capture, organize, track, and follow up with prospective student enquiries throughout the admission process.",
      },
      {
        q: "Can VILMS manage student leads?",
        a: "Yes. VILMS can help institutes organize student enquiries, track lead status, manage follow-ups, and monitor admission progress.",
      },
      {
        q: "What is a CRM coaching institute?",
        a: "A coaching institute CRM helps manage prospective students, enquiries, counsellor activities, follow-ups, and admissions from one platform.",
      },
      {
        q: "Can VILMS help with admission management?",
        a: "Yes. VILMS can help teams track the journey from initial enquiry and counselling to admission.",
      },
      {
        q: "Who can use VILMS lead management software?",
        a: "Coaching institutes, educational institutions, training institutes, education businesses, and counselling teams can use VILMS for lead management.",
      },
    ],
  },
  {
    id: "white-label",
    label: "White-label",
    items: [
      {
        q: "What is a white label LMS for coaching institutes?",
        a: "A white label LMS allows coaching institutes to offer online courses and learning services through a platform customized with their own brand identity.",
      },
      {
        q: "Can I create my own branded LMS with VILMS?",
        a: "Yes. VILMS helps organizations create a branded learning platform for managing courses, learners, assessments, and learning content.",
      },
      {
        q: "Who can use a white label education platform?",
        a: "Coaching institutes, educational institutions, training organizations, businesses, educators, and online academies can use a white label education platform.",
      },
      {
        q: "What can I manage with VILMS?",
        a: "VILMS can help manage courses, learners, learning content, assessments, progress tracking, trainers, and reports from one platform.",
      },
    ],
  },
  {
    id: "coaching",
    label: "Coaching institutes",
    items: [
      {
        q: "What is an LMS for coaching institutes in India?",
        a: "An LMS helps coaching institutes manage courses, students, batches, learning content, assessments, and student progress through one digital platform.",
      },
      {
        q: "Can VILMS manage coaching institute students?",
        a: "Yes. VILMS can help manage student profiles, batches, courses, learning activities, assessments, and progress.",
      },
      {
        q: "Can coaching institutes conduct online exams with VILMS?",
        a: "Yes. Institutes can use VILMS to create quizzes, mock tests, assignments, and online assessments.",
      },
      {
        q: "Is VILMS suitable for online and classroom coaching?",
        a: "Yes. VILMS can support online and blended learning, making it suitable for different coaching models.",
      },
      {
        q: "What is coaching institute management software?",
        a: "Coaching institute management software helps institutes manage courses, students, batches, trainers, assessments, and other learning activities from one platform.",
      },
    ],
  },
  {
    id: "test-prep",
    label: "Test preparation",
    items: [
      {
        q: "What is an LMS for test preparation institutes?",
        a: "An LMS for test preparation institutes helps manage courses, study materials, mock tests, test series, assessments, students, and performance tracking.",
      },
      {
        q: "Can VILMS manage test series?",
        a: "Yes. VILMS can help institutes create and manage multiple tests, quizzes, practice exams, and test series.",
      },
      {
        q: "Can students take online mock tests?",
        a: "Yes. VILMS can support online mock tests and assessments to help students practice and track their performance.",
      },
      {
        q: "Is VILMS suitable for competitive exam coaching?",
        a: "Yes. VILMS can be used by competitive exam coaching institutes to manage learning content, tests, students, and performance.",
      },
      {
        q: "Can VILMS track student performance?",
        a: "Yes. VILMS can help track test scores, course progress, completion, and learner activity.",
      },
    ],
  },
  {
    id: "online-coaching",
    label: "Online coaching",
    items: [
      {
        q: "What is an LMS for online coaching?",
        a: "An LMS for online coaching is software that helps manage online courses, learners, learning content, assessments, and learner progress from one platform.",
      },
      {
        q: "Can VILMS be used for online coaching?",
        a: "Yes. VILMS can support online courses, learner management, assessments, learning content, and progress tracking for coaching and training organizations.",
      },
      {
        q: "What is online coaching management software?",
        a: "Online coaching management software helps organizations manage courses, learners, classes, assessments, training content, and learning activities digitally.",
      },
      {
        q: "What is an online academy platform?",
        a: "An online academy platform provides tools to create, organize, and deliver online courses while managing learners and their learning progress.",
      },
    ],
  },
  {
    id: "training",
    label: "Training institutes",
    items: [
      {
        q: "Is VILMS suitable for training institutes?",
        a: "Yes. Training institutes can use VILMS to manage courses, learners, trainers, learning content, assessments, and training progress.",
      },
      {
        q: "What is an LMS for training institutes in India?",
        a: "An LMS for training institutes is software that helps manage courses, learners, trainers, assessments, learning materials, and training progress from one platform.",
      },
      {
        q: "What is training institute management software?",
        a: "Training institute management software helps organizations manage training programs, learners, batches, courses, assessments, and related learning activities digitally.",
      },
      {
        q: "Can VILMS support online training?",
        a: "Yes. VILMS can support online courses, digital learning content, assessments, learner management, and progress tracking.",
      },
      {
        q: "What is a training centre LMS?",
        a: "A training centre LMS is a learning management platform used by training centres to manage courses, learners, learning content, assessments, and training progress.",
      },
    ],
  },
  {
    id: "schools-colleges",
    label: "Schools & colleges",
    items: [
      {
        q: "What is an LMS for schools and colleges?",
        a: "An LMS for schools and colleges is software that helps manage courses, students, learning materials, assessments, and academic progress from one platform.",
      },
      {
        q: "What is a school LMS platform?",
        a: "A school LMS platform helps schools deliver digital learning, organize course content, manage students, conduct assessments, and track learning progress.",
      },
      {
        q: "Can colleges use VILMS?",
        a: "Yes. VILMS can support colleges and other educational institutions with course management, student learning, assessments, digital content, and progress tracking.",
      },
      {
        q: "What is college LMS software?",
        a: "College LMS software is a learning management system designed to help colleges manage courses, students, learning resources, assessments, and academic activities digitally.",
      },
    ],
  },
  {
    id: "business",
    label: "Business & corporate",
    items: [
      {
        q: "Can VILMS be used for employee training?",
        a: "Yes. VILMS can help businesses manage employee onboarding, training programs, assessments, learning activities, and employee development.",
      },
      {
        q: "Can a white label LMS support employee training?",
        a: "Yes. Businesses can use a branded LMS for employee onboarding, training, upskilling, assessments, and learning programs.",
      },
      {
        q: "Can HR and L&D teams use VILMS?",
        a: "Yes. HR and L&D teams can use VILMS to organize employee training, monitor completion, and manage learning programs.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    items: [
      {
        q: "How much does VILMS cost?",
        a: `There are four monthly plans, ${pricing.plans.map((p) => p.name).join(", ")}, chosen by how many students you teach. Plans start at ${base.price} a month for up to ${base.limit} students.`,
      },
      {
        q: "Does VILMS take a share of my fees?",
        a: "No. VILMS has 0% revenue share on every plan. Students pay your own Razorpay account, and you pay only the flat monthly plan price.",
      },
      {
        q: "Do the prices include GST?",
        a: "No. All prices exclude 18% GST.",
      },
      {
        q: "What happens if I outgrow my plan?",
        a: "You move up to the next plan when you need to. Usage meters warn you at 80% and 100% of a limit, and nothing switches off: your site and classes keep running at a limit.",
      },
      {
        q: `What if I teach more than ${topLimit} students?`,
        a: `Write to ${brand.emails.general} for a custom quote.`,
      },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    items: [
      {
        q: "Where do my students' fees go?",
        a: "Straight to your own Razorpay account. Student payments go directly to your institute, and VILMS never takes a cut.",
      },
      {
        q: "Can students pay by UPI or bank transfer?",
        a: "Yes. Razorpay checkout handles online payments, and you can also accept manual UPI or bank transfers as a fallback.",
      },
      {
        q: "Does VILMS create GST invoices?",
        a: "Yes. VILMS issues GST-aware invoices and receipts in your institute's name, and every order and refund is logged.",
      },
      {
        q: "Does VILMS store my students' card details?",
        a: "No. Card details stay with your payment provider and never touch VILMS.",
      },
    ],
  },
  {
    id: "ai-evaluation",
    label: "AI Evaluation",
    items: [
      {
        q: "How does AI answer evaluation work?",
        a: "Students upload handwritten or typed answers. AI drafts an evaluation against your rubric, and a mentor reviews it before the student sees anything.",
      },
      {
        q: "Does AI mark my students without a teacher?",
        a: "No. Mentors approve every AI draft and can edit it first. The student sees only what the mentor has approved.",
      },
      {
        q: "Who pays for the AI?",
        a: "You can connect your own Anthropic or OpenAI key and pay them at cost, with no markup from VILMS.",
      },
      {
        q: "Is my students' data used to train AI models?",
        a: "No. Your students' data is never used to train AI models, and it is never sold.",
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    items: [
      {
        q: "Where is my data stored?",
        a: "Primary data is stored in India, in the Mumbai region.",
      },
      {
        q: "Is my data encrypted?",
        a: "Yes, in transit and at rest. Integration keys are stored encrypted and used only on the server.",
      },
      {
        q: "Can other institutes see my data?",
        a: "No. Each institute is separated at the database level, and your own team sees only what their role needs: owner or admin, teacher, or sales and counsellor.",
      },
      {
        q: "Can I take my data with me?",
        a: "Yes. You can export students, enrolments and orders to CSV at any time, even after you cancel.",
      },
    ],
  },
  {
    id: "trial",
    label: "Trial",
    items: [
      {
        q: "How does the free trial work?",
        a: "You start free for 14 days. Your institute is ready in about a minute.",
      },
      {
        q: "Do I need a credit card to start?",
        a: "No. The 14-day free trial needs no card.",
      },
      {
        q: "What happens after the 14 days?",
        a: "You choose the plan that fits the number of students you teach. Plans are monthly, and prices exclude 18% GST.",
      },
      {
        q: "Can I see VILMS on my own setup before starting?",
        a: "Yes. Book a 30-minute demo and we walk through your current setup and show exactly what moves over: courses, students, tests, payments and leads.",
      },
    ],
  },
];

const item = (group: string, index: number) => {
  const g = FAQ_GROUPS.find((x) => x.id === group);
  const it = g?.items[index];
  if (!it) throw new Error(`FAQ item ${group}[${index}] does not exist`);
  return it;
};

/** Six answers for the home page, picked from the groups above. */
export const FEATURED_FAQ: { q: string; a: string }[] = [
  item("product", 1),
  item("product", 3),
  item("business", 0),
  item("product", 2),
  item("training", 0),
  item("pricing", 1),
];

/** Every question and answer, flat (for FAQPage structured data and search). */
export const ALL_FAQ = FAQ_GROUPS.flatMap((g) => g.items);

export const faqGroup = (id: string) => {
  const g = FAQ_GROUPS.find((x) => x.id === id);
  if (!g) throw new Error(`FAQ group ${id} does not exist`);
  return g;
};
