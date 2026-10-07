import { Award, BarChart3, BookOpen, ClipboardCheck, Layers, Users } from "lucide-react";
import { TrainingHero } from "../heroes/TrainingHero";
import type { SolutionData } from "../types";
import { AdminScreen } from "../visuals/admin";
import { CertificatePhone } from "../visuals/phones";
import { AssessmentKinds, ContentLibrary, CourseOutline, PeopleDirectory, ProgressTracker, ReportsPanel } from "../visuals/shared";

export const trainingData: SolutionData = {
  key: "training",
  kicker: "LMS for training institutes",
  title: (
    <>
      LMS for <span className="text-primary">Training Institutes</span> in India
    </>
  ),
  lead: "An LMS for training institutes in India helps organizations manage courses, learners, trainers, assessments, learning materials, and progress from one platform. It makes online and blended training easier to organize and deliver.",
  hero: <TrainingHero />,
  schemaDescription:
    "VILMS is an LMS for training institutes in India: manage courses, learners, trainers, batches, assessments, learning materials and progress from one platform, for institutes and businesses.",

  what: {
    title: "What Is an LMS for Training Institutes?",
    paragraphs: [
      "An LMS, or Learning Management System, is software used to create, manage, and deliver training programs online. A training institute LMS brings courses, learners, assessments, and learning content together in one centralized platform.",
      "VILMS provides a flexible learning environment for training institutes, educational organizations, professional trainers, and businesses that need a structured way to manage learning and development.",
    ],
    bulletsLead: "With VILMS, training organizations can manage activities such as:",
    bullets: [
      "Course and training program management",
      "Learner enrollment and management",
      "Trainer and batch management",
      "Online tests and assessments",
      "Learning material management",
      "Learner progress tracking",
      "Course completion tracking",
      "Training reports and analytics",
    ],
  },

  why: {
    title: "Why Do Training Institutes Need an LMS?",
    paragraphs: [
      "Managing training programs manually can become difficult when an institute has multiple courses, trainers, batches, and learners. A digital learning platform helps organize these activities and provides a better learning experience.",
      "An LMS can also help institutes deliver training online while supporting classroom or blended learning programs.",
      "For businesses, the same type of platform can support employee training software, corporate learning, onboarding, and professional development.",
    ],
    visual: {
      tools: ["Sign-up sheets", "Chat groups", "Attendance sheets", "Content folders", "Test forms"],
      before: "Courses, trainers, batches and learners tracked in separate places.",
      after: "Those activities organized in one learning platform.",
    },
  },

  features: {
    title: "Key Features of Training Institute Management Software",
    lead: "Choose a feature to see it from the training team's side.",
    variant: "side",
    flip: true,
    items: [
      {
        id: "courses",
        icon: "book",
        title: "Course Management",
        text: "Create and organize training courses, lessons, programs, and learning materials. Trainers can structure content according to different subjects or learner groups.",
        url: "yourinstitute.vilms.in/admin/courses",
        visual: (
          <CourseOutline
            course="Sales Fundamentals"
            meta="6 weeks"
            modules={[
              { t: "Orientation", items: [{ t: "Welcome to the programme", kind: "video" }, { t: "Programme guide", kind: "doc" }] },
              { t: "Prospecting basics", items: [{ t: "Finding the right customer", kind: "video" }, { t: "Call script", kind: "doc" }, { t: "Module quiz", kind: "quiz" }] },
              { t: "Handling objections", items: [{ t: "Common objections", kind: "slides" }, { t: "Role-play brief", kind: "doc" }] },
              { t: "Closing and follow-up", items: [{ t: "Closing techniques", kind: "video" }, { t: "Final assignment", kind: "quiz" }] },
            ]}
          />
        ),
      },
      {
        id: "learners",
        icon: "users",
        title: "Learner Management",
        text: "Manage learner profiles, enrollments, batches, and course access from one place. This helps institutes keep learner information organized.",
        url: "yourinstitute.vilms.in/admin/learners",
        visual: (
          <PeopleDirectory
            noun="Learner"
            groupLabel="Batch"
            people={[
              { n: "Rahul Kumar", group: "Sales Fundamentals · Batch 2", courses: ["Sales Fundamentals"], activity: "Finished Module 3" },
              { n: "Sneha Patel", group: "Advanced Excel · Batch 1", courses: ["Advanced Excel"], activity: "Submitted the final assignment" },
              { n: "Aman Verma", group: "Spoken English Pro · Batch 2", courses: ["Spoken English Pro"], activity: "Joined the batch" },
              { n: "Isha Mehta", group: "Sales Fundamentals · Batch 2", courses: ["Sales Fundamentals", "Workplace Safety"], activity: "Took Module quiz 2" },
            ]}
          />
        ),
      },
      {
        id: "assessments",
        icon: "tests",
        title: "Online Assessments",
        text: "Create quizzes, tests, and assessments to evaluate learner understanding. Institutes can use assessments as part of regular training or course completion.",
        url: "yourinstitute.vilms.in/admin/assessments",
        visual: <AssessmentKinds kinds={["Quiz", "Assignment", "Online exam"]} subject="Sales Fundamentals" question="Which question best opens a discovery call?" options={["Are you ready to buy today?", "What is the biggest challenge you face?", "Can I send you our price list?", "Who else are you talking to?"]} />,
      },
      {
        id: "progress",
        icon: "trend",
        title: "Progress Tracking",
        text: "Monitor learner activity, course progress, assessment performance, and completion. This helps trainers identify learners who may need additional support.",
        url: "yourinstitute.vilms.in/admin/progress",
        visual: (
          <ProgressTracker
            noun="Learner"
            course="Sales Fundamentals"
            rows={[
              { n: "Rahul Kumar", pct: 83, score: "82%", last: "today" },
              { n: "Sneha Patel", pct: 100, score: "91%", last: "2 days ago" },
              { n: "Aman Verma", pct: 36, score: "52%", last: "last week" },
              { n: "Isha Mehta", pct: 64, score: "68%", last: "yesterday" },
              { n: "Karan Shah", pct: 100, score: "89%", last: "today" },
              { n: "Divya Rao", pct: 30, score: "none yet", last: "last week" },
            ]}
          />
        ),
      },
      {
        id: "content",
        icon: "play",
        title: "Learning Content Management",
        text: "Store and organize videos, documents, presentations, study materials, and other digital resources for easy learner access.",
        url: "yourinstitute.vilms.in/admin/content",
        visual: (
          <ContentLibrary
            title="Sales Fundamentals · learning content"
            items={[
              { t: "Welcome to the programme", type: "Videos", meta: "Module 1 · 5 min" },
              { t: "Finding the right customer", type: "Videos", meta: "Module 2 · 18 min" },
              { t: "Programme guide", type: "Documents", meta: "PDF · 8 pages" },
              { t: "Common objections", type: "Presentations", meta: "32 slides" },
              { t: "Trainer notes", type: "Notes", meta: "Module 3" },
              { t: "Call script", type: "Documents", meta: "PDF · 2 pages" },
            ]}
          />
        ),
      },
      {
        id: "reports",
        icon: "chart",
        title: "Reports and Analytics",
        text: "Track important learning activities through reports and analytics. Training teams can use these insights to understand learner progress and training outcomes.",
        url: "yourinstitute.vilms.in/admin/reports",
        visual: (
          <ReportsPanel
            title="Reports · by programme"
            series={[
              { id: "progress", label: "Learner progress", unit: "%", values: [{ k: "Sales", v: 68 }, { k: "Excel", v: 74 }, { k: "English", v: 52 }, { k: "Safety", v: 81 }] },
              { id: "completion", label: "Course completion", unit: "%", values: [{ k: "Sales", v: 61 }, { k: "Excel", v: 70 }, { k: "English", v: 44 }, { k: "Safety", v: 78 }] },
              { id: "assess", label: "Assessment performance", unit: "%", values: [{ k: "Sales", v: 77 }, { k: "Excel", v: 82 }, { k: "English", v: 69 }, { k: "Safety", v: 88 }] },
            ]}
          />
        ),
      },
    ],
  },

  how: {
    kicker: "Benefits",
    title: "Benefits of Using a Training LMS in India",
    lead: "A well-organized training LMS in India can help organizations:",
    variant: "zigzag",
    steps: [
      { icon: "layers", title: "Manage multiple training programs" },
      { icon: "play", title: "Centralize learning content" },
      { icon: "users", title: "Simplify learner enrollment" },
      { icon: "tests", title: "Conduct online assessments" },
      { icon: "trend", title: "Track learner progress" },
      { icon: "roles", title: "Manage different learner groups" },
      { icon: "award", title: "Monitor course completion" },
      { icon: "chart", title: "Access training reports" },
      { icon: "globe", title: "Support online and blended learning" },
    ],
  },

  who: {
    title: "Who Can Use a Training Centre LMS?",
    lead: "A training centre LMS can be useful for different organizations, including:",
    items: [
      "Professional training institutes",
      "Skill development centres",
      "Educational institutions",
      "Coaching and learning centres",
      "Corporate training teams",
      "HR and L&D departments",
      "Professional certification providers",
      "Online training businesses",
      "Employee learning teams",
    ],
    closing: "VILMS can support both education-focused organizations and businesses looking for a structured online training platform.",
  },

  tips: {
    title: "How to Choose the Right LMS for Your Training Institute",
    lead: "Before choosing training institute management software, consider your organization's learning requirements. Look for a platform that offers:",
    items: [
      "Easy course and content management",
      "Learner and batch management",
      "Online tests and assessments",
      "Progress tracking and reports",
      "Support for online and classroom training",
      "A simple experience for trainers and learners",
      "Features that can support future growth",
    ],
    closing: "The right LMS should make training easier to manage without creating unnecessary complexity.",
  },

  showcase: {
    kicker: "Inside the platform",
    title: "A batch on the trainer's screen, a certificate on the learner's",
    lead: "Both read from the same learner record.",
    admin: {
      url: "yourinstitute.vilms.in/admin/batches/sales-2",
      w: 720,
      h: 420,
      label: "A batch: progress and completion for each learner.",
      node: (
        <AdminScreen
          org="Your Training"
          nav={[
            { label: "Programmes", icon: BookOpen },
            { label: "Batches", icon: Layers },
            { label: "Learners", icon: Users },
            { label: "Assessments", icon: ClipboardCheck },
            { label: "Certificates", icon: Award },
            { label: "Reports", icon: BarChart3 },
          ]}
          active={1}
          crumb="Batches / Sales Fundamentals"
          title="Batch 2 · Online"
          action="Add learners"
          stats={[
            ["Learners", "18"],
            ["Finished", "6"],
            ["Trainer", "Meera Iyer"],
            ["Next session", "Sat 10 AM"],
          ]}
          head={["Learner", "Programme", "Progress", "Status"]}
          rows={[
            ["Rahul Kumar", "Sales Fundamentals", { pct: 100 }, { pill: "Completed", tone: "green" }],
            ["Sneha Patel", "Sales Fundamentals", { pct: 100 }, { pill: "Completed", tone: "green" }],
            ["Aman Verma", "Sales Fundamentals", { pct: 82 }, { pill: "In progress", tone: "primary" }],
            ["Isha Mehta", "Sales Fundamentals", { pct: 64 }, { pill: "In progress", tone: "primary" }],
            ["Karan Shah", "Sales Fundamentals", { pct: 100 }, { pill: "Completed", tone: "green" }],
            ["Divya Rao", "Sales Fundamentals", { pct: 38 }, { pill: "Needs support", tone: "yellow" }],
          ]}
        />
      ),
    },
    student: { w: 280, h: 560, label: "A certificate after successful course completion.", node: <CertificatePhone /> },
  },

  choose: {
    title: "Why Choose VILMS?",
    paragraphs: [
      "VILMS provides a centralized learning platform for organizations that want to manage courses, learners, assessments, and training activities digitally.",
      "It can support training institutes as well as companies managing employee learning, corporate training, onboarding, and professional development programs.",
    ],
  },

  cta: {
    title: "Manage Your Training Programs Smarter",
    lead: "From course management to learner progress tracking, the right platform can simplify everyday training operations. Ready to improve your training management? Explore VILMS and build a better learning experience.",
  },

  faq: {
    kicker: "FAQs",
    title: "Training institute questions",
    items: [
      { q: "What is an LMS for training institutes in India?", a: "An LMS for training institutes is software that helps manage courses, learners, trainers, assessments, learning materials, and training progress from one platform." },
      { q: "What is training institute management software?", a: "Training institute management software helps organizations manage training programs, learners, batches, courses, assessments, and related learning activities digitally." },
      { q: "Can VILMS support online training?", a: "Yes. VILMS can support online courses, digital learning content, assessments, learner management, and progress tracking." },
      { q: "Can businesses use VILMS for employee training?", a: "Yes. Businesses can use VILMS to support employee training, corporate learning, onboarding, and professional development." },
      { q: "What is a training centre LMS?", a: "A training centre LMS is a learning management platform used by training centres to manage courses, learners, learning content, assessments, and training progress." },
    ],
  },

  related: ["onlineCourses", "lmsPlatform", "whiteLabel", "pricing"],
};
