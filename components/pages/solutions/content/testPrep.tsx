import { BarChart3, BookOpen, ClipboardCheck, Layers, Users } from "lucide-react";
import { TestPrepHero } from "../heroes/TestPrepHero";
import type { SolutionData } from "../types";
import { AdminScreen } from "../visuals/admin";
import { TestsPhone } from "../visuals/phones";
import { ContentLibrary, PeopleDirectory, ReportsPanel } from "../visuals/shared";
import { MockTestRoom, ScoreHistory, TestSeriesList } from "../visuals/specific";

export const testPrepData: SolutionData = {
  key: "testPrep",
  kicker: "LMS for test preparation institutes",
  title: (
    <>
      LMS for <span className="text-primary">Test Preparation</span> Institutes
    </>
  ),
  lead: "Help students prepare for competitive and academic exams with VILMS. Our LMS for test preparation institutes helps coaching centers manage courses, test series, mock exams, study materials, assessments, and student progress from one platform.",
  hero: <TestPrepHero />,
  schemaDescription:
    "VILMS for test preparation institutes: manage courses, test series, mock exams, study materials, assessments and student performance from one platform.",

  what: {
    title: "What Is an LMS for Test Preparation Institutes?",
    paragraphs: [
      "An exam preparation LMS is a digital platform designed to manage learning and test preparation programs. It helps institutes deliver study materials, conduct tests, manage students, and track performance.",
      "VILMS provides a centralized platform for managing test preparation and online learning.",
    ],
  },

  why: {
    title: "Why Do Test Preparation Institutes Need an LMS?",
    paragraphs: ["Managing multiple courses, test series, students, and assessments can become difficult. Test preparation software helps institutes organize learning and testing activities in one place."],
    bulletsLead: "With VILMS, you can:",
    bullets: [
      "Manage test preparation courses",
      "Upload study materials and videos",
      "Create mock tests and quizzes",
      "Manage test series",
      "Track student performance",
      "Monitor course and test progress",
      "Generate reports and results",
    ],
    visual: {
      tools: ["Test papers", "Spreadsheets", "Chat groups", "Separate video links"],
      before: "Courses, test series and results, each handled in a different system.",
      after: "Learning and testing in one place, without managing multiple systems.",
    },
  },

  features: {
    title: "Key Features of VILMS",
    lead: "Choose a feature to see it working.",
    variant: "top",
    items: [
      {
        id: "materials",
        icon: "file",
        title: "Course & Study Material Management",
        text: "Create courses and organize videos, PDFs, presentations, notes, and other preparation materials for students.",
        url: "yourinstitute.vilms.in/admin/courses",
        visual: (
          <ContentLibrary
            title="Prelims Test Series · study materials"
            items={[
              { t: "Polity: Fundamental Rights", type: "Videos", meta: "Lesson 3 · 31 min" },
              { t: "Economy basics", type: "Videos", meta: "Lesson 5 · 28 min" },
              { t: "Previous papers, 2019 to 2023", type: "Documents", meta: "PDF · 4 files" },
              { t: "Geography revision", type: "Presentations", meta: "42 slides" },
              { t: "Current affairs · March", type: "Notes", meta: "Monthly notes" },
              { t: "Answer-writing tips", type: "Documents", meta: "PDF · 2 pages" },
            ]}
          />
        ),
      },
      {
        id: "series",
        icon: "target",
        title: "Test Series Management",
        text: "Create and manage multiple tests, practice exams, quizzes, and test series for different subjects or courses.",
        url: "yourinstitute.vilms.in/admin/test-series",
        visual: <TestSeriesList />,
      },
      {
        id: "mock",
        icon: "tests",
        title: "Online Mock Tests",
        text: "Conduct online mock tests to help students practice and understand their performance.",
        url: "yourinstitute.vilms.in/admin/tests/mock-8",
        visual: <MockTestRoom />,
      },
      {
        id: "students",
        icon: "users",
        title: "Student Management",
        text: "Manage students, batches, course access, and learning activities from one centralized platform.",
        url: "yourinstitute.vilms.in/admin/students",
        visual: (
          <PeopleDirectory
            noun="Student"
            groupLabel="Batch"
            people={[
              { n: "Rahul Kumar", group: "Prelims Batch A", courses: ["Prelims Test Series", "Study materials"], activity: "Took Mock test 8" },
              { n: "Sneha Patel", group: "Prelims Batch A", courses: ["Prelims Test Series"], activity: "Opened Polity notes" },
              { n: "Aman Verma", group: "Prelims Batch B", courses: ["General Studies Practice"], activity: "Finished Economy practice set" },
              { n: "Isha Mehta", group: "Aptitude Batch", courses: ["Aptitude Quizzes"], activity: "Took Quant quiz 1" },
            ]}
          />
        ),
      },
      {
        id: "performance",
        icon: "trend",
        title: "Performance Tracking",
        text: "Track test scores, course completion, and student progress to identify areas that need improvement.",
        url: "yourinstitute.vilms.in/admin/students/rahul-kumar",
        visual: <ScoreHistory />,
      },
      {
        id: "reports",
        icon: "chart",
        title: "Reports & Analytics",
        text: "Access useful reports to understand test performance, learner activity, and preparation progress.",
        url: "yourinstitute.vilms.in/admin/reports",
        visual: (
          <ReportsPanel
            title="Reports · by test"
            series={[
              { id: "scores", label: "Test performance", unit: "%", values: [{ k: "Mock 5", v: 59 }, { k: "Mock 6", v: 61 }, { k: "Mock 7", v: 65 }, { k: "Mock 8", v: 69 }] },
              { id: "activity", label: "Learner activity", unit: "%", values: [{ k: "Mock 5", v: 82 }, { k: "Mock 6", v: 78 }, { k: "Mock 7", v: 88 }, { k: "Mock 8", v: 91 }] },
              { id: "progress", label: "Preparation progress", unit: "%", values: [{ k: "Mock 5", v: 40 }, { k: "Mock 6", v: 52 }, { k: "Mock 7", v: 63 }, { k: "Mock 8", v: 74 }] },
            ]}
          />
        ),
      },
    ],
  },

  how: {
    kicker: "How VILMS helps",
    title: "How VILMS Helps Test Preparation Institutes",
    lead: "A coaching test platform can make test management easier for administrators, trainers, and students. VILMS helps institutes:",
    variant: "loop",
    steps: [
      { icon: "book", title: "Organize courses and study resources" },
      { icon: "target", title: "Create structured test series" },
      { icon: "tests", title: "Conduct online mock exams" },
      { icon: "trend", title: "Track student scores and progress" },
      { icon: "layers", title: "Manage multiple batches" },
      { icon: "chart", title: "Review assessment performance" },
      { icon: "play", title: "Deliver learning and testing through one platform" },
    ],
  },

  who: {
    title: "Who Can Use VILMS?",
    lead: "VILMS is suitable for:",
    items: [
      "Competitive Exam Coaching Institutes",
      "Entrance Exam Preparation Centers",
      "Academic Test Preparation Institutes",
      "Online Coaching Platforms",
      "Training Institutes",
      "Educational Institutions",
      "Professional Certification Training Providers",
    ],
  },

  showcase: {
    kicker: "Inside the platform",
    title: "The test series desk and the student's phone",
    lead: "Both read from the same results.",
    admin: {
      url: "yourinstitute.vilms.in/admin/test-series/prelims",
      w: 720,
      h: 420,
      label: "A test series: scores and completion for each student.",
      node: (
        <AdminScreen
          org="Your Institute"
          nav={[
            { label: "Courses", icon: BookOpen },
            { label: "Test series", icon: ClipboardCheck },
            { label: "Students", icon: Users },
            { label: "Batches", icon: Layers },
            { label: "Reports", icon: BarChart3 },
          ]}
          active={1}
          crumb="Test series / Prelims Test Series"
          title="Mock test 8 · results"
          action="Create test"
          stats={[
            ["Students", "48"],
            ["Tests taken", "8"],
            ["Average score", "69%"],
            ["Completion", "74%"],
          ]}
          head={["Student", "Batch", "Test progress", "Score"]}
          rows={[
            ["Rahul Kumar", "Prelims A", { pct: 100 }, "138/200"],
            ["Sneha Patel", "Prelims A", { pct: 100 }, "146/200"],
            ["Karan Shah", "Prelims B", { pct: 88 }, "137/200"],
            ["Divya Rao", "Prelims B", { pct: 75 }, "133/200"],
            ["Aman Verma", "Prelims B", { pct: 63 }, "129/200"],
            ["Isha Mehta", "Prelims A", { pct: 50 }, "124/200"],
          ]}
        />
      ),
    },
    student: { w: 280, h: 560, label: "Scores, history and the next mock test.", node: <TestsPhone /> },
  },

  choose: {
    title: "Why Choose VILMS?",
    paragraphs: [
      "VILMS brings learning, test management, assessments, and performance tracking together in one platform. It helps institutes create a structured digital preparation experience without managing multiple systems.",
      "Whether you need an exam preparation LMS, test series management solution, or online coaching platform, VILMS can support your test preparation programs.",
    ],
  },

  cta: {
    title: "Build a Better Test Preparation Experience",
    lead: "Give students easy access to courses, study materials, mock tests, and assessments through one centralized platform. Ready to simplify test preparation management?",
  },

  faq: {
    kicker: "FAQs",
    title: "Test preparation questions",
    items: [
      { q: "What is an LMS for test preparation institutes?", a: "An LMS for test preparation institutes helps manage courses, study materials, mock tests, test series, assessments, students, and performance tracking." },
      { q: "Can VILMS manage test series?", a: "Yes. VILMS can help institutes create and manage multiple tests, quizzes, practice exams, and test series." },
      { q: "Can students take online mock tests?", a: "Yes. VILMS can support online mock tests and assessments to help students practice and track their performance." },
      { q: "Is VILMS suitable for competitive exam coaching?", a: "Yes. VILMS can be used by competitive exam coaching institutes to manage learning content, tests, students, and performance." },
      { q: "Can VILMS track student performance?", a: "Yes. VILMS can help track test scores, course progress, completion, and learner activity." },
    ],
  },

  related: ["onlineExams", "lmsPlatform", "pricing", "buyingGuide"],
};
