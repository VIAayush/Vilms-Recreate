// Content for /lms-buying-guide. Vendor-neutral on purpose: the checklist is
// written so an institute can score ANY vendor, including VILMS.

export type CheckItem = { id: string; text: string; must?: boolean };
export type CheckGroup = { id: string; title: string; why: string; items: CheckItem[] };

export const CHECK_GROUPS: CheckGroup[] = [
  {
    id: "payments",
    title: "Payments",
    why: "Fees are the lifeblood. Know whose account the money lands in and whether the paperwork keeps up.",
    items: [
      { id: "p1", must: true, text: "Student fees go straight to my own payment account, not through the vendor first" },
      { id: "p2", text: "UPI, cards and net banking at checkout, with a manual UPI or bank-transfer fallback" },
      { id: "p3", must: true, text: "GST-aware invoices and receipts in my institute’s name" },
      { id: "p4", text: "Every order and refund is logged in one place" },
    ],
  },
  {
    id: "branding",
    title: "Branding and domain",
    why: "Students enrol with an institute they trust. Whose name do they see?",
    items: [
      { id: "b1", must: true, text: "My logo, colours and emails on every student-facing screen and message" },
      { id: "b2", text: "A web address that is mine (my own domain, or at least my own sub-domain). Students never see the vendor’s name" },
      { id: "b3", text: "Certificates and receipts are issued in my institute’s name" },
    ],
  },
  {
    id: "evaluation",
    title: "Tests and evaluation",
    why: "Multiple-choice is easy. The tests that matter to many institutes are written and handwritten.",
    items: [
      { id: "e1", must: true, text: "Long-form and handwritten answers, not only multiple-choice" },
      { id: "e2", text: "Rubric grading, with marks, comments and the rubric in one evaluated-copy view" },
      { id: "e3", must: true, text: "AI drafts are approved by a mentor before the student sees them" },
      { id: "e4", text: "The vendor states that student answers are not used to train AI models" },
    ],
  },
  {
    id: "leads",
    title: "Lead management",
    why: "If you buy students with ads or webinars, an unfollowed lead is money wasted.",
    items: [
      { id: "l1", must: true, text: "Enquiries from ads, landing pages and webinars land in one pipeline" },
      { id: "l2", text: "Follow-up on calls or WhatsApp is tracked against each lead" },
      { id: "l3", text: "A lead becomes a student record without anyone re-typing it" },
    ],
  },
  {
    id: "live",
    title: "Live classes",
    why: "What matters is that the class is tied to the course and the student who paid.",
    items: [
      { id: "v1", text: "Live classes sit inside the course, with RSVPs and reminders" },
      { id: "v2", text: "Recordings stay private to enrolled students, not on a public channel" },
      { id: "v3", text: "It works with the video tool I already use, such as Zoom or Google Meet" },
    ],
  },
  {
    id: "data",
    title: "Data",
    why: "Student records and payments are sensitive. Know where they live and whether you can leave with them.",
    items: [
      { id: "d1", must: true, text: "My data is stored in India" },
      { id: "d2", must: true, text: "I can export students, enrolments and orders to CSV at any time, even after I cancel" },
      { id: "d3", text: "Encrypted in transit and at rest, with each institute isolated from the others" },
    ],
  },
  {
    id: "pricing",
    title: "Pricing model",
    why: "A percentage of fee income grows with every enrolment. A flat plan steps up by tier. Know which you are buying.",
    items: [
      { id: "m1", must: true, text: "No percentage of my fee income, only a flat, published price" },
      { id: "m2", text: "Limits are published, and I am warned before I reach one" },
      { id: "m3", text: "I can try it without entering a card" },
    ],
  },
  {
    id: "team",
    title: "Team and support",
    why: "The first month decides whether a platform sticks.",
    items: [
      { id: "t1", text: "Owner, teacher and counsellor roles, each seeing only what they need" },
      { id: "t2", text: "Email support and a clear onboarding path, not just a help-centre article" },
    ],
  },
];

export const PRINCIPLES = [
  {
    title: "Start from the money flow, not the feature list.",
    text: "Ask where a student’s payment lands, who issues the invoice and what the vendor earns when you grow. Everything else is secondary to that.",
  },
  {
    title: "Test with the thing you actually do.",
    text: "Bring one real handwritten answer, one real batch and one real enquiry. A demo on the vendor’s sample data proves very little.",
  },
  {
    title: "Price the second year, not the first.",
    text: "Compare what the bill looks like with more students, not on day one. A share of fee income grows with every enrolment; a flat plan steps up by tier.",
  },
];

export const RED_FLAGS = [
  "Student fees pass through the vendor’s account before they reach you.",
  "Your students see the vendor’s name in the address or the emails.",
  "“AI grading” with no point where a mentor approves the result.",
  "No clear way to export your data, or an export that stops when you cancel.",
];

export const YELLOW_FLAGS = [
  "Every price, including the basics, is “contact sales”.",
  "A trial that asks for a card before you have seen the product.",
  "“Unlimited” with no published terms behind it.",
  "A long lock-in before you have run a real batch.",
];

export const DEMO_QUESTIONS = [
  {
    q: "Show me a student paying, start to finish.",
    a: "A good answer: you see the checkout, the receipt and the GST invoice, and you are told which account the money goes to.",
  },
  {
    q: "Grade one of my handwritten answers.",
    a: "A good answer: it is uploaded from a phone, scored against a rubric you set, and a mentor can edit it before anything is released.",
  },
  {
    q: "What happens when someone enquires on WhatsApp and then pays?",
    a: "A good answer: the lead and the student are the same record, with the history attached.",
  },
  {
    q: "Where is our data, and how do we take it out?",
    a: "A good answer: a named region, and an export you can run yourself: students, enrolments and orders.",
  },
  {
    q: "What does the bill look like if we double our students?",
    a: "A good answer: a published number for each tier, or a plain percentage you can multiply. No surprises.",
  },
  {
    q: "What do my students see?",
    a: "A good answer: your name, your logo and your address, never the vendor’s.",
  },
];

export const BUYING_FAQ = [
  {
    q: "What should a coaching institute look for in an LMS?",
    a: "Start with the money flow: whose account student fees go to, whether GST invoices are issued in your name, and whether the vendor takes a share of fee income. Then check answer evaluation for written and handwritten tests, lead management, live-class support, where data is stored and whether you can export it, and a pricing model you can predict as you grow.",
  },
  {
    q: "How do I compare two or more vendors fairly?",
    a: "Use the checklist on this page once per vendor. Type the vendor’s name in the box, tick what they genuinely offer, and copy each result. Compare the scores, and look closely at the must-haves each vendor misses.",
  },
  {
    q: "Is a free trial enough to judge an LMS?",
    a: "It is enough if you test with your own material: set up one real course, run one real test and follow one real enquiry through the system. If you cannot do that within the trial period, ask for more time before you decide.",
  },
  {
    q: "Should I choose the cheapest LMS?",
    a: "Compare the total cost as you grow, including any share of fee income, add-ons and the staff time lost to re-typing. The lowest sticker price is not always the lowest bill.",
  },
  {
    q: "Can businesses use VILMS for employee training?",
    a: "Yes. VILMS is built for coaching institutes and also suits training institutes, educational institutions and businesses, including corporate training and HR and L&D teams that manage onboarding, training programmes, assessments and employee development. The checklist above applies to them too; weigh the areas that match how you train.",
  },
  {
    q: "Does VILMS take a percentage of student fees?",
    a: "No. VILMS charges a flat monthly plan and takes 0% revenue share on every plan. Students pay into your own Razorpay account.",
  },
];

/** Tips for choosing, by type of organisation (wording follows the VILMS content source). */
export const BY_TYPE = [
  {
    type: "Online coaching",
    items: ["Easy course and content management", "Learner enrolment and management", "Online assessments and tests", "Progress tracking and reporting", "Support for different training programmes", "A simple experience for learners and administrators"],
    close: "Choose a platform that supports your current needs and lets your programmes grow.",
  },
  {
    type: "Training institutes",
    items: ["Easy course and content management", "Learner and batch management", "Online tests and assessments", "Progress tracking and reports", "Support for online and classroom training", "A simple experience for trainers and learners", "Features that support future growth"],
    close: "The right LMS makes training easier to manage without adding complexity.",
  },
  {
    type: "Schools and colleges",
    items: ["Simple course and content management", "Student and learner management", "Online assessments and tests", "Progress tracking and reports", "Support for different courses and learner groups", "Easy access for teachers and students", "Features that can grow with the institution"],
    close: "The right LMS simplifies learning management without complicating everyday tasks.",
  },
];
