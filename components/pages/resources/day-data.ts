// Content for /lms-vs-traditional-teaching. Fair to the classroom: every
// stage says what the traditional way does well, and what stays in the room.
// Times are a storytelling device (a day at the institute), not data.

import type { PageKey } from "@/lib/site/pages";

export type StageId = "admissions" | "classes" | "tests" | "evaluation" | "fees" | "followup";

export type Stage = {
  id: StageId;
  time: string;
  label: string;
  traditional: { title: string; points: string[]; tools: string[]; strength: string };
  lms: { title: string; points: string[]; tools: string[] };
  stays: string;
  /** one short line per mode for the hero preview */
  hero: [string, string];
};

export const STAGES: Stage[] = [
  {
    id: "admissions",
    time: "9:00",
    label: "Admissions",
    traditional: {
      title: "Walk-ins, phone calls and a register",
      points: ["Enquiries arrive at the desk or by phone and are noted in a register or sheet.", "Forms and fee slips are filled on paper.", "Who enquired, and when, depends on whoever was at the desk."],
      tools: ["Register", "Phone", "Paper forms"],
      strength: "A face-to-face conversation builds trust with parents like nothing else.",
    },
    lms: {
      title: "One pipeline from enquiry to enrolment",
      points: ["Enquiries from ads, landing pages and webinars land in one pipeline.", "The course page takes enrolment and payment online.", "The counsellor still has the conversation, now with the lead’s history in front of them."],
      tools: ["Lead pipeline", "Course page"],
    },
    stays: "The counselling conversation with the family.",
    hero: ["Walk-ins and a register", "One lead pipeline"],
  },
  {
    id: "classes",
    time: "10:30",
    label: "Classes",
    traditional: {
      title: "A fixed timetable in a fixed room",
      points: ["Classes run at set times in set rooms.", "A missed class means borrowing a friend’s notes.", "Materials are handed out or photocopied."],
      tools: ["Timetable", "Photocopies"],
      strength: "In-person teaching makes doubt-solving immediate and keeps students focused.",
    },
    lms: {
      title: "The same classes, plus a record and a link",
      points: ["Recorded lessons sit inside the course, private to enrolled students.", "Live classes run on your Zoom or Meet link, with RSVPs and reminders.", "Notes and worksheets attach to each lesson; lessons can unlock on a schedule."],
      tools: ["Course", "Live link", "Recordings"],
    },
    stays: "Teaching and doubt-solving in the room. That is the hybrid model.",
    hero: ["Fixed timetable, fixed room", "Classroom plus recordings"],
  },
  {
    id: "tests",
    time: "13:00",
    label: "Tests",
    traditional: {
      title: "Paper tests on a set day",
      points: ["Question papers are printed and the hall is invigilated.", "Everyone sits the test at once, or a make-up date is arranged.", "Answer sheets are collected by hand."],
      tools: ["Printed papers", "Exam hall"],
      strength: "An exam hall is real practice for pen-and-paper exams.",
    },
    lms: {
      title: "Tests inside the course",
      points: ["Objective questions mark themselves the moment they are submitted.", "Long-form questions accept typed answers or handwritten uploads.", "Mock tests sit in the course alongside the lessons they cover."],
      tools: ["Online tests", "Handwritten upload"],
    },
    stays: "Writing by hand under time pressure. Students write on paper and upload a photo.",
    hero: ["Paper test, one day", "Online or handwritten upload"],
  },
  {
    id: "evaluation",
    time: "16:00",
    label: "Evaluation",
    traditional: {
      title: "Mentors mark every copy by hand",
      points: ["Each copy is read and annotated, which is thorough but slow with large batches.", "Marks are copied into a sheet afterwards.", "Feedback reaches students days later."],
      tools: ["Red pen", "Marks sheet"],
      strength: "A mentor reading every word catches what no checklist can.",
    },
    lms: {
      title: "Rubric grading with an AI first draft",
      points: ["Mentors score against clear criteria in a rubric.", "AI drafts the evaluation; the mentor edits and approves before the student sees it.", "Marks, comments and the rubric appear in one evaluated copy, saved to the student’s profile."],
      tools: ["Rubric", "AI draft", "Evaluated copy"],
    },
    stays: "The mentor’s judgement. Nothing is released without their approval.",
    hero: ["Marked by hand", "AI draft, mentor approves"],
  },
  {
    id: "fees",
    time: "17:30",
    label: "Fee collection",
    traditional: {
      title: "A desk, receipts and month-end reconciliation",
      points: ["Fees are taken at the desk and a paper receipt is written.", "Payments are entered into a spreadsheet and reconciled later.", "GST paperwork is prepared separately."],
      tools: ["Cash desk", "Receipt book", "Spreadsheet"],
      strength: "Some families simply prefer to pay in person and be handed a receipt.",
    },
    lms: {
      title: "Checkout straight to your own account",
      points: ["Fees are paid at checkout to your own Razorpay account.", "Manual UPI or bank transfer is accepted too.", "GST-aware invoices and receipts are generated, and every order and refund is on record."],
      tools: ["Razorpay checkout", "GST invoices"],
    },
    stays: "A family that prefers to pay offline can still use manual UPI or bank transfer.",
    hero: ["Desk and spreadsheet", "Checkout and GST invoice"],
  },
  {
    id: "followup",
    time: "19:00",
    label: "Follow-up",
    traditional: {
      title: "Calls and chats from personal phones",
      points: ["Counsellors follow up from their own phones and notebooks.", "Who called whom lives in someone’s memory.", "When a counsellor leaves, their leads often leave with them."],
      tools: ["Personal phones", "Notebooks"],
      strength: "A personal call from someone who knows the family is hard to beat.",
    },
    lms: {
      title: "A pipeline everyone can see",
      points: ["Each lead moves from new enquiry to webinar RSVP to checkout to enrolled.", "WhatsApp follow-up runs through your own Wati account.", "The whole list exports to CSV whenever you want it."],
      tools: ["Pipeline", "WhatsApp"],
    },
    stays: "The human call. The pipeline just makes sure nobody is forgotten.",
    hero: ["Phones and memory", "Pipeline and WhatsApp"],
  },
];

export type ModeId = "room" | "hybrid" | "online";

export const MODES: {
  id: ModeId;
  label: string;
  line: string;
  does: string[];
  stays: string;
  links: PageKey[];
}[] = [
  {
    id: "room",
    label: "In the room",
    line: "Your classes stay in the building. The LMS quietly runs the admin behind them.",
    does: ["Admissions and a lead pipeline, instead of a register", "Fee collection with GST-aware invoices and receipts", "Tests and answer evaluation, including handwritten uploads", "Student records, grades and certificates in one place"],
    stays: "Everything that happens in front of the board.",
    links: ["coaching", "leadCrm", "onlineExams"],
  },
  {
    id: "hybrid",
    label: "Hybrid",
    line: "Some students in the room, some at home. Recordings and live links fill the gaps.",
    does: ["Everything in the first mode", "Live class links with RSVPs and reminders", "Recordings kept private to enrolled students", "Lessons that unlock on a schedule, with notes and worksheets attached"],
    stays: "In-person teaching for those who attend, and the batch rhythm.",
    links: ["onlineCourses", "testPrep", "lmsPlatform"],
  },
  {
    id: "online",
    label: "Fully online",
    line: "Everything runs through the platform, under your own brand and domain.",
    does: ["Recorded, live and hybrid courses sold from your own course pages", "Public webinar sign-up and a one-click upsell into the paired course", "Checkout, branded certificates and renewal into the next batch", "Your logo, colours and emails on every screen"],
    stays: "The teaching itself: your faculty, your pace, your syllabus.",
    links: ["onlineCoaching", "whiteLabel", "pricing"],
  },
];

export const VS_FAQ = [
  {
    q: "Does an LMS replace classroom teaching?",
    a: "No. An LMS handles the admin around teaching (admissions, fees, tests, evaluation, follow-up) and lets you add recordings or live classes. Many institutes run hybrid, with the classroom as the core.",
  },
  {
    q: "Can I use an LMS if my students sit exams on paper?",
    a: "Yes. Students can write answers on paper and upload a photo. Mentors grade them against a rubric, with an AI draft they review and approve before the student sees anything.",
  },
  {
    q: "Which is better for my institute, classroom or online?",
    a: "It depends on your students, your subjects and your budget, and neither is better in general. That is why hybrid exists. A good starting point is the part of your institute that costs your team the most time, then check whether software helps there.",
  },
  {
    q: "What is the first thing to move onto an LMS?",
    a: "For many institutes it is payments or leads, because that is where re-typing hurts most. Run one batch end to end before you move the rest.",
  },
  {
    q: "What do my students see when I use VILMS?",
    a: "Your brand: your logo, colours, address, emails and certificates. Students never see VILMS.",
  },
];
