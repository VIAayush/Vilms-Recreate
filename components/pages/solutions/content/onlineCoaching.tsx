import { BarChart3, BookOpen, ClipboardCheck, TrendingUp, Users } from "lucide-react";
import { OnlineCoachingHero } from "../heroes/OnlineCoachingHero";
import type { SolutionData } from "../types";
import { AdminScreen } from "../visuals/admin";
import { CoursePhone } from "../visuals/phones";
import { AssessmentKinds, ContentLibrary, CourseOutline, PeopleDirectory, ProgressTracker, ReportsPanel } from "../visuals/shared";

export const onlineCoachingData: SolutionData = {
  key: "onlineCoaching",
  kicker: "LMS for online coaching",
  title: (
    <>
      LMS for <span className="text-primary">Online Coaching</span>
    </>
  ),
  lead: "An LMS for online coaching helps coaching providers manage courses, learners, classes, assessments, study materials, and learner progress from one platform. It makes online learning easier to organize and gives learners a simple way to access their training.",
  hero: <OnlineCoachingHero />,
  schemaDescription:
    "VILMS is an LMS for online coaching: manage online courses, learners, assessments, learning content and progress for coaching providers, training organizations and businesses.",

  what: {
    title: "What Is an LMS for Online Coaching?",
    paragraphs: [
      "An LMS for online coaching is a learning management system designed to deliver and manage online courses and training programs.",
      "Instead of managing courses, learners, tests, and learning materials across different tools, an LMS brings everything together in one place.",
      "VILMS provides an online learning environment for coaching providers, training organizations, educational institutions, and businesses that want to deliver structured online training.",
    ],
    bulletsLead: "With an online coaching LMS, you can:",
    bullets: [
      "Create and manage online courses",
      "Organize learning materials",
      "Manage learners and batches",
      "Conduct online tests and assessments",
      "Track learner progress",
      "Monitor course completion",
      "Generate learning reports",
      "Support online and blended learning",
    ],
  },

  why: {
    title: "Why Is an LMS Important for Online Coaching?",
    paragraphs: [
      "Managing an online coaching business manually can become difficult as the number of learners and courses grows. An LMS helps simplify daily learning and training management.",
      "It can help coaching providers create a more organized learning experience while giving administrators better visibility into learner activity and progress.",
      "An LMS can also support businesses and organizations that need structured employee learning, onboarding, and professional training.",
    ],
    visual: {
      tools: ["Course folders", "Chat groups", "Test forms", "Spreadsheets", "Video links"],
      before: "Courses, learners, tests and learning materials spread across different tools.",
      after: "Everything together in one place.",
    },
  },

  features: {
    title: "Key Features of an Online Coaching LMS",
    lead: "Pick a feature to see it from the administrator's side.",
    variant: "top",
    flip: true,
    items: [
      {
        id: "courses",
        icon: "book",
        title: "Course Management",
        text: "Create, organize, and manage courses from a centralized platform. You can structure learning content based on courses, subjects, programs, or learner groups.",
        url: "yourinstitute.vilms.in/admin/courses",
        visual: (
          <CourseOutline
            course="Foundation Course"
            meta="Online"
            modules={[
              { t: "Getting started", items: [{ t: "Welcome and course map", kind: "video" }, { t: "How to use this course", kind: "doc" }] },
              { t: "Core concepts", items: [{ t: "Concept walkthrough", kind: "video" }, { t: "Worked examples", kind: "slides" }, { t: "Module quiz", kind: "quiz" }] },
              { t: "Practice", items: [{ t: "Practice problems", kind: "doc" }, { t: "Review session", kind: "video" }] },
            ]}
          />
        ),
      },
      {
        id: "learners",
        icon: "users",
        title: "Learner Management",
        text: "Manage learner profiles, enrollments, batches, and course access from one place. This makes it easier to organize different groups of learners.",
        url: "yourinstitute.vilms.in/admin/learners",
        visual: (
          <PeopleDirectory
            noun="Learner"
            groupLabel="Batch"
            people={[
              { n: "Rahul Kumar", group: "Evening batch", courses: ["Foundation Course"], activity: "Finished Lesson 3" },
              { n: "Sneha Patel", group: "Weekend batch", courses: ["Foundation Course", "Practice course"], activity: "Took Module quiz 2" },
              { n: "Aman Verma", group: "Evening batch", courses: ["Foundation Course"], activity: "Enrolled in the course" },
              { n: "Isha Mehta", group: "Weekend batch", courses: ["Practice course"], activity: "Opened Worked examples" },
            ]}
          />
        ),
      },
      {
        id: "tests",
        icon: "tests",
        title: "Online Tests and Assessments",
        text: "Create quizzes, tests, and assessments to evaluate learner understanding. Online assessments can also help trainers monitor learning outcomes.",
        url: "yourinstitute.vilms.in/admin/assessments",
        visual: <AssessmentKinds kinds={["Quiz", "Mock test", "Assignment"]} subject="Foundation Course" question="Which of these best describes a learning objective?" options={["A list of topics covered", "What a learner can do afterwards", "The length of a lesson", "The order of the modules"]} />,
      },
      {
        id: "progress",
        icon: "trend",
        title: "Progress Tracking",
        text: "Track course progress, completion, assessments, and learner activity. This helps trainers and administrators understand how learners are progressing.",
        url: "yourinstitute.vilms.in/admin/progress",
        visual: (
          <ProgressTracker
            noun="Learner"
            course="Foundation Course"
            rows={[
              { n: "Rahul Kumar", pct: 74, score: "80%", last: "today" },
              { n: "Sneha Patel", pct: 100, score: "92%", last: "yesterday" },
              { n: "Aman Verma", pct: 38, score: "55%", last: "last week" },
              { n: "Isha Mehta", pct: 61, score: "70%", last: "2 days ago" },
              { n: "Karan Shah", pct: 100, score: "88%", last: "today" },
              { n: "Divya Rao", pct: 27, score: "none yet", last: "last week" },
            ]}
          />
        ),
      },
      {
        id: "content",
        icon: "play",
        title: "Learning Content Management",
        text: "Organize videos, documents, lessons, study materials, and other digital learning resources in a structured learning environment.",
        url: "yourinstitute.vilms.in/admin/content",
        visual: (
          <ContentLibrary
            title="Foundation Course · content"
            items={[
              { t: "Welcome and course map", type: "Videos", meta: "Lesson 1 · 6 min" },
              { t: "Concept walkthrough", type: "Videos", meta: "Lesson 2 · 24 min" },
              { t: "How to use this course", type: "Documents", meta: "PDF · 3 pages" },
              { t: "Worked examples", type: "Presentations", meta: "28 slides" },
              { t: "Study notes", type: "Notes", meta: "Module 2" },
              { t: "Practice problems", type: "Documents", meta: "PDF · 6 pages" },
            ]}
          />
        ),
      },
      {
        id: "reports",
        icon: "chart",
        title: "Reports and Analytics",
        text: "Use learning reports to understand learner activity, course progress, assessments, and completion. These insights can support better training decisions.",
        url: "yourinstitute.vilms.in/admin/reports",
        visual: (
          <ReportsPanel
            title="Reports · by batch"
            series={[
              { id: "activity", label: "Learner activity", unit: "%", values: [{ k: "Evening", v: 86 }, { k: "Weekend", v: 71 }, { k: "Morning", v: 64 }] },
              { id: "progress", label: "Course progress", unit: "%", values: [{ k: "Evening", v: 68 }, { k: "Weekend", v: 54 }, { k: "Morning", v: 47 }] },
              { id: "completion", label: "Completion", unit: "%", values: [{ k: "Evening", v: 41 }, { k: "Weekend", v: 33 }, { k: "Morning", v: 25 }] },
            ]}
          />
        ),
      },
    ],
  },

  how: {
    kicker: "Benefits",
    title: "Benefits of Using an Online Coaching Platform",
    lead: "VILMS helps bring important learning activities into one platform. Instead of separate systems for courses, assessments, learner management, and progress tracking, organizations can manage these activities together.",
    variant: "stairs",
    steps: [
      { icon: "book", title: "Simplified course management" },
      { icon: "users", title: "Organized learner management" },
      { icon: "globe", title: "Easy online training delivery" },
      { icon: "play", title: "Centralized learning content" },
      { icon: "tests", title: "Online assessments and tests" },
      { icon: "trend", title: "Learner progress tracking" },
      { icon: "chart", title: "Training reports and insights" },
      { icon: "layers", title: "Support for different learner groups" },
    ],
  },

  who: {
    title: "Who Can Use VILMS?",
    lead: "VILMS can support different types of organizations that provide online learning and training, including:",
    items: [
      "Online coaching providers",
      "Coaching and training institutes",
      "Educational institutions",
      "Professional training organizations",
      "Corporate learning teams",
      "HR and L&D departments",
      "Businesses providing employee training",
      "Online academies and educators",
    ],
    closing: "For companies, VILMS can also work as an employee training software, corporate learning management system, or employee learning platform.",
  },

  tips: {
    title: "Tips for Choosing the Right Online Teaching LMS",
    lead: "Before selecting an online coaching management software, consider the needs of your learners and trainers. Look for a platform that offers:",
    items: [
      "Easy course and content management",
      "Learner enrollment and management",
      "Online assessments and tests",
      "Progress tracking and reporting",
      "Support for different training programs",
      "A simple experience for learners and administrators",
    ],
    closing: "Choose a platform that can support your current learning needs while allowing your training programs to grow.",
  },

  showcase: {
    kicker: "Inside the platform",
    title: "The administrator's view and the learner's",
    lead: "Both read from the same course and the same progress.",
    admin: {
      url: "yourinstitute.vilms.in/admin/courses/foundation",
      w: 720,
      h: 420,
      label: "A course: learners, progress and assessment scores.",
      node: (
        <AdminScreen
          org="Your Academy"
          nav={[
            { label: "Courses", icon: BookOpen },
            { label: "Learners", icon: Users },
            { label: "Assessments", icon: ClipboardCheck },
            { label: "Progress", icon: TrendingUp },
            { label: "Reports", icon: BarChart3 },
          ]}
          active={0}
          crumb="Courses / Foundation Course"
          title="Foundation Course · learners"
          action="Add learners"
          stats={[
            ["Learners", "126"],
            ["Active this week", "88"],
            ["Completed", "41"],
            ["Assessments", "5"],
          ]}
          head={["Learner", "Batch", "Progress", "Assessment"]}
          rows={[
            ["Rahul Kumar", "Evening", { pct: 74 }, "80%"],
            ["Sneha Patel", "Weekend", { pct: 100 }, "92%"],
            ["Aman Verma", "Evening", { pct: 38 }, "55%"],
            ["Isha Mehta", "Weekend", { pct: 61 }, "70%"],
            ["Karan Shah", "Morning", { pct: 100 }, "88%"],
            ["Divya Rao", "Morning", { pct: 27 }, "—"],
          ]}
        />
      ),
    },
    student: { w: 280, h: 560, label: "The course player: lessons, tests and progress.", node: <CoursePhone /> },
  },

  choose: {
    title: "Why Choose VILMS?",
    paragraphs: [
      "VILMS provides a flexible learning environment for organizations that want to manage online courses and training programs from one platform.",
      "Whether you are building an online academy platform, managing employee training, or delivering professional education, VILMS can help organize courses, learners, assessments, and learning progress.",
    ],
  },

  cta: {
    title: "Build a Better Online Learning Experience",
    lead: "With the right platform, you can deliver courses, manage learners, conduct assessments, and track progress from one place. Ready to simplify online coaching and training? Explore VILMS and build a better learning experience.",
  },

  faq: {
    kicker: "FAQs",
    title: "Online coaching questions",
    items: [
      { q: "What is an LMS for online coaching?", a: "An LMS for online coaching is software that helps manage online courses, learners, learning content, assessments, and learner progress from one platform." },
      { q: "Can VILMS be used for online coaching?", a: "Yes. VILMS can support online courses, learner management, assessments, learning content, and progress tracking for coaching and training organizations." },
      { q: "What is online coaching management software?", a: "Online coaching management software helps organizations manage courses, learners, classes, assessments, training content, and learning activities digitally." },
      { q: "Can businesses use VILMS for employee training?", a: "Yes. VILMS can support corporate learning, employee training, onboarding, and professional development programs." },
      { q: "What is an online academy platform?", a: "An online academy platform provides tools to create, organize, and deliver online courses while managing learners and their learning progress." },
    ],
  },

  related: ["onlineCourses", "lmsPlatform", "pricing", "bestLms"],
};
