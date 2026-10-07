import { BarChart3, BookOpen, ClipboardCheck, Layers, Users } from "lucide-react";
import { CoachingHero } from "../heroes/CoachingHero";
import type { SolutionData } from "../types";
import { AdminScreen } from "../visuals/admin";
import { BatchPhone } from "../visuals/phones";
import { AssessmentKinds, CourseOutline, PeopleDirectory, ProgressTracker, ReportsPanel } from "../visuals/shared";
import { BatchWeek } from "../visuals/specific";

export const coachingData: SolutionData = {
  key: "coaching",
  kicker: "LMS for coaching institutes",
  title: (
    <>
      LMS for <span className="text-primary">Coaching Institutes</span> in India
    </>
  ),
  lead: "Manage courses, students, batches, trainers, exams, and learning content with VILMS. Our LMS for coaching institutes in India helps coaching centers simplify daily operations and deliver a better learning experience.",
  hero: <CoachingHero />,
  schemaDescription:
    "VILMS is an LMS for coaching institutes in India: manage courses, students, batches, trainers, exams and learning content, with online assessments, progress tracking and reports.",

  what: {
    title: "What Is an LMS for Coaching Institutes?",
    paragraphs: [
      "An LMS helps coaching institutes manage learning and training activities from one platform. It allows institutes to organize courses, manage students, conduct assessments, and track learner progress.",
      "VILMS provides a centralized coaching institute management system for managing both online and blended learning.",
    ],
  },

  why: {
    title: "Why Do Coaching Institutes Need an LMS?",
    paragraphs: ["Managing students, courses, batches, and assessments manually can be time-consuming. A digital coaching management software solution helps bring these activities together and makes daily management easier."],
    bulletsLead: "With VILMS, institutes can:",
    bullets: [
      "Manage courses and learning content",
      "Organize students and batches",
      "Manage trainers and instructors",
      "Conduct online tests and assessments",
      "Track student progress",
      "Manage certificates",
      "View reports and learning activity",
    ],
    visual: {
      tools: ["Spreadsheets", "Chat groups", "Paper registers", "Separate test tools"],
      before: "Students, courses, batches and assessments, each managed in a different place.",
      after: "Courses, students, batches and assessments brought together in one platform.",
    },
  },

  features: {
    title: "Key Features of VILMS",
    lead: "Choose a feature to see how it looks inside the platform.",
    variant: "side",
    items: [
      {
        id: "courses",
        icon: "book",
        title: "Course Management",
        text: "Create and organize courses, lessons, videos, documents, and other learning resources in one place.",
        url: "yourinstitute.vilms.in/admin/courses",
        visual: (
          <CourseOutline
            course="JEE Crash Course"
            meta="Batch A"
            modules={[
              { t: "Mechanics", items: [{ t: "Motion in one dimension", kind: "video" }, { t: "Formula sheet", kind: "doc" }, { t: "Chapter quiz", kind: "quiz" }] },
              { t: "Organic chemistry basics", items: [{ t: "Naming compounds", kind: "video" }, { t: "Reaction map", kind: "slides" }] },
              { t: "Calculus", items: [{ t: "Limits and continuity", kind: "video" }, { t: "Practice set", kind: "doc" }] },
            ]}
          />
        ),
      },
      {
        id: "students",
        icon: "users",
        title: "Student Management",
        text: "Manage student profiles, batches, course access, and learning activities through a centralized system.",
        url: "yourinstitute.vilms.in/admin/students",
        visual: (
          <PeopleDirectory
            noun="Student"
            groupLabel="Batch"
            people={[
              { n: "Rahul Kumar", group: "JEE Crash Course · Batch A", courses: ["JEE Crash Course"], activity: "Completed Lesson 3 · Mechanics" },
              { n: "Sneha Patel", group: "NEET Foundation · Batch B", courses: ["NEET Foundation", "Biology practice"], activity: "Submitted Weekly quiz 6" },
              { n: "Aman Verma", group: "Prelims Foundation · Batch C", courses: ["Prelims Foundation"], activity: "Joined the batch" },
              { n: "Isha Mehta", group: "JEE Crash Course · Batch A", courses: ["JEE Crash Course"], activity: "Opened Formula sheet" },
            ]}
          />
        ),
      },
      {
        id: "exams",
        icon: "tests",
        title: "Online Exams & Assessments",
        text: "Create quizzes, mock tests, assignments, and online exams to evaluate student performance.",
        url: "yourinstitute.vilms.in/admin/assessments",
        visual: <AssessmentKinds kinds={["Quiz", "Mock test", "Assignment", "Online exam"]} subject="JEE Crash Course" question="A body moves with constant acceleration. Which graph is a straight line?" options={["Position against time", "Velocity against time", "Acceleration against distance", "Speed against position"]} />,
      },
      {
        id: "batches",
        icon: "layers",
        title: "Batch Management",
        text: "Organize students into different batches and manage their courses, schedules, and learning activities.",
        url: "yourinstitute.vilms.in/admin/batches/a",
        visual: <BatchWeek />,
      },
      {
        id: "progress",
        icon: "trend",
        title: "Progress Tracking",
        text: "Monitor course completion, student activity, test results, and overall learning progress.",
        url: "yourinstitute.vilms.in/admin/progress",
        visual: (
          <ProgressTracker
            noun="Student"
            course="JEE Crash Course"
            rows={[
              { n: "Rahul Kumar", pct: 78, score: "78%", last: "today" },
              { n: "Sneha Patel", pct: 100, score: "84%", last: "2 days ago" },
              { n: "Aman Verma", pct: 41, score: "58%", last: "last week" },
              { n: "Isha Mehta", pct: 66, score: "66%", last: "yesterday" },
              { n: "Karan Shah", pct: 100, score: "90%", last: "today" },
              { n: "Divya Rao", pct: 33, score: "none yet", last: "last week" },
            ]}
          />
        ),
      },
      {
        id: "reports",
        icon: "chart",
        title: "Reports & Analytics",
        text: "Access useful reports to understand student performance, course activity, and training progress.",
        url: "yourinstitute.vilms.in/admin/reports",
        visual: (
          <ReportsPanel
            title="Reports · by batch"
            series={[
              { id: "completion", label: "Course completion", unit: "%", values: [{ k: "Batch A", v: 62 }, { k: "Batch B", v: 48 }, { k: "Batch C", v: 71 }, { k: "Batch D", v: 55 }] },
              { id: "tests", label: "Test results", unit: "%", values: [{ k: "Batch A", v: 74 }, { k: "Batch B", v: 66 }, { k: "Batch C", v: 79 }, { k: "Batch D", v: 61 }] },
              { id: "activity", label: "Student activity", unit: "%", values: [{ k: "Batch A", v: 88 }, { k: "Batch B", v: 72 }, { k: "Batch C", v: 91 }, { k: "Batch D", v: 64 }] },
            ]}
          />
        ),
      },
    ],
  },

  how: {
    kicker: "How VILMS helps",
    title: "How VILMS Helps Coaching Institutes",
    lead: "A coaching centre LMS can make learning management simpler for administrators, trainers, and students. VILMS helps institutes:",
    variant: "rail",
    steps: [
      { icon: "file", title: "Keep student and course information organized" },
      { icon: "play", title: "Deliver learning content online" },
      { icon: "tests", title: "Manage tests and assessments" },
      { icon: "trend", title: "Track student performance" },
      { icon: "clock", title: "Reduce manual management work" },
      { icon: "layers", title: "Manage multiple courses and batches" },
      { icon: "graduation", title: "Provide a structured learning experience" },
    ],
  },

  who: {
    title: "Who Can Use VILMS?",
    lead: "VILMS is suitable for:",
    items: ["Coaching Institutes", "Coaching Centres", "Training Institutes", "Educational Institutions", "Competitive Exam Institutes", "Professional Training Organizations", "Online Coaching Businesses"],
    closing: "Whether you provide classroom learning, online courses, or blended education, VILMS can help organize your learning operations.",
  },

  showcase: {
    kicker: "Inside the platform",
    title: "The team's screen and the student's",
    lead: "Both read from the same records: courses, batches, tests and progress.",
    admin: {
      url: "yourinstitute.vilms.in/admin/batches/a",
      w: 720,
      h: 420,
      label: "A batch: students, course progress and last test.",
      node: (
        <AdminScreen
          org="Your Institute"
          nav={[
            { label: "Courses", icon: BookOpen },
            { label: "Students", icon: Users },
            { label: "Batches", icon: Layers },
            { label: "Assessments", icon: ClipboardCheck },
            { label: "Reports", icon: BarChart3 },
          ]}
          active={2}
          crumb="Batches / JEE Crash Course"
          title="Batch A · Online + classroom"
          action="Add student"
          stats={[
            ["Students", "38"],
            ["Course completion", "62%"],
            ["Next test", "Sat · Mock 4"],
            ["Trainers", "2"],
          ]}
          head={["Student", "Course", "Progress", "Last test"]}
          rows={[
            ["Rahul Kumar", "JEE Crash Course", { pct: 78 }, "78%"],
            ["Sneha Patel", "JEE Crash Course", { pct: 100 }, "84%"],
            ["Aman Verma", "JEE Crash Course", { pct: 41 }, "58%"],
            ["Isha Mehta", "JEE Crash Course", { pct: 66 }, "66%"],
            ["Karan Shah", "JEE Crash Course", { pct: 100 }, "90%"],
            ["Divya Rao", "JEE Crash Course", { pct: 33 }, "—"],
          ]}
        />
      ),
    },
    student: { w: 280, h: 560, label: "Today's class, the next test and course progress.", node: <BatchPhone /> },
  },

  choose: {
    title: "Why Choose VILMS?",
    paragraphs: [
      "VILMS brings course management, student management, assessments, learning content, and reporting together in one platform.",
      "If you are looking for software for coaching institutes, VILMS provides a centralized solution to manage learning and training activities more efficiently.",
    ],
  },

  cta: {
    title: "Manage Your Coaching Institute Smarter",
    lead: "From student management and course delivery to online exams and progress tracking, VILMS helps coaching institutes manage learning from one platform. Ready to simplify your coaching institute management?",
  },

  faq: {
    kicker: "FAQs",
    title: "Coaching institute questions",
    items: [
      { q: "What is an LMS for coaching institutes in India?", a: "An LMS helps coaching institutes manage courses, students, batches, learning content, assessments, and student progress through one digital platform." },
      { q: "Can VILMS manage coaching institute students?", a: "Yes. VILMS can help manage student profiles, batches, courses, learning activities, assessments, and progress." },
      { q: "Can coaching institutes conduct online exams with VILMS?", a: "Yes. Institutes can use VILMS to create quizzes, mock tests, assignments, and online assessments." },
      { q: "Is VILMS suitable for online and classroom coaching?", a: "Yes. VILMS can support online and blended learning, making it suitable for different coaching models." },
      { q: "What is coaching institute management software?", a: "Coaching institute management software helps institutes manage courses, students, batches, trainers, assessments, and other learning activities from one platform." },
    ],
  },

  related: ["lmsPlatform", "onlineExams", "pricing", "buyingGuide"],
};
