import { BarChart3, BookOpen, ClipboardCheck, TrendingUp, Users } from "lucide-react";
import { SchoolsHero } from "../heroes/SchoolsHero";
import type { SolutionData } from "../types";
import { AdminScreen } from "../visuals/admin";
import { SubjectsPhone } from "../visuals/phones";
import { AssessmentKinds, ContentLibrary, CourseOutline, PeopleDirectory, ProgressTracker, ReportsPanel } from "../visuals/shared";

export const schoolsCollegesData: SolutionData = {
  key: "schoolsColleges",
  kicker: "LMS for schools and colleges",
  title: (
    <>
      LMS for <span className="text-primary">Schools and Colleges</span>
    </>
  ),
  lead: "An LMS for schools and colleges helps educational institutions manage courses, students, learning materials, assessments, and academic progress from one platform. It supports online, classroom, and blended learning with a more organized digital learning experience.",
  hero: <SchoolsHero />,
  schemaDescription:
    "VILMS is an LMS for schools and colleges: manage courses, students, learning materials, assessments and academic progress from one platform, for online, classroom and blended learning.",

  what: {
    title: "What Is an LMS for Schools and Colleges?",
    paragraphs: [
      "A Learning Management System (LMS) is software that helps schools and colleges create, manage, and deliver learning programs online. It brings course content, students, assessments, and learning activities together in one place.",
      "VILMS provides a centralized platform for schools, colleges, training organizations, and businesses that need to manage learning and development activities digitally.",
    ],
    bulletsLead: "With VILMS, educational institutions can manage:",
    bullets: ["Courses and subjects", "Student enrollment", "Learning materials", "Online classes and lessons", "Tests and assessments", "Student progress", "Course completion", "Learning reports"],
  },

  why: {
    title: "Why Do Schools and Colleges Need an LMS?",
    paragraphs: [
      "Managing digital learning across multiple classes, subjects, teachers, and students can be challenging. An LMS helps organize learning activities and gives educators a central place to manage courses and student learning.",
      "It can also support blended learning, allowing students to access digital resources alongside classroom teaching.",
      "For organizations beyond education, similar LMS features can support employee training, corporate learning, onboarding, and professional development.",
    ],
    visual: {
      tools: ["Chat groups", "Spreadsheets", "Video links", "Paper tests", "Shared folders"],
      before: "Digital learning spread across classes, subjects, teachers and students.",
      after: "A central place to manage courses and student learning.",
    },
  },

  features: {
    title: "Key Features of a School and College LMS",
    lead: "Choose a feature to see how it works for educators.",
    variant: "top",
    items: [
      {
        id: "courses",
        icon: "school",
        title: "Course and Subject Management",
        text: "Create and organize courses, subjects, lessons, and learning programs. Educators can structure learning content according to classes, departments, or learner groups.",
        url: "yourschool.vilms.in/admin/courses",
        visual: (
          <CourseOutline
            course="Class 9 · Science"
            meta="3 units"
            modules={[
              { t: "Force and motion", items: [{ t: "Introduction to force", kind: "video" }, { t: "Chapter notes", kind: "doc" }, { t: "Unit quiz", kind: "quiz" }] },
              { t: "Matter and its states", items: [{ t: "States of matter", kind: "video" }, { t: "Revision slides", kind: "slides" }] },
              { t: "Life processes", items: [{ t: "Cells and tissues", kind: "video" }, { t: "Diagram sheet", kind: "doc" }] },
            ]}
          />
        ),
      },
      {
        id: "students",
        icon: "users",
        title: "Student Management",
        text: "Manage student profiles, enrollments, course access, and learning activities from one platform. This helps institutions keep student learning information organized.",
        url: "yourschool.vilms.in/admin/students",
        visual: (
          <PeopleDirectory
            noun="Student"
            groupLabel="Class"
            people={[
              { n: "Rahul Kumar", group: "Class 9-A", courses: ["Science", "Mathematics", "English"], activity: "Finished the Force and motion quiz" },
              { n: "Sneha Patel", group: "Class 9-B", courses: ["Science", "Mathematics"], activity: "Opened Chapter notes" },
              { n: "Aman Verma", group: "Class 10-A", courses: ["Science", "Social studies"], activity: "Enrolled in Revision group" },
              { n: "Isha Mehta", group: "Class 11-C", courses: ["Physics", "Chemistry", "Maths"], activity: "Submitted an assignment" },
            ]}
          />
        ),
      },
      {
        id: "materials",
        icon: "file",
        title: "Online Learning Materials",
        text: "Provide students with access to digital learning resources such as videos, documents, presentations, notes, and other course materials.",
        url: "yourschool.vilms.in/admin/materials",
        visual: (
          <ContentLibrary
            title="Class 9 · learning materials"
            items={[
              { t: "Introduction to force", type: "Videos", meta: "Science · 14 min" },
              { t: "States of matter", type: "Videos", meta: "Science · 18 min" },
              { t: "Chapter notes", type: "Documents", meta: "PDF · 6 pages" },
              { t: "Revision slides", type: "Presentations", meta: "24 slides" },
              { t: "Algebra notes", type: "Notes", meta: "Mathematics" },
              { t: "Reading list", type: "Documents", meta: "English · PDF" },
            ]}
          />
        ),
      },
      {
        id: "tests",
        icon: "tests",
        title: "Online Tests and Assessments",
        text: "Create quizzes, tests, assignments, and assessments to evaluate student understanding. Digital assessments can make evaluation easier to organize.",
        url: "yourschool.vilms.in/admin/assessments",
        visual: <AssessmentKinds kinds={["Quiz", "Assignment", "Online exam"]} subject="Class 9 · Science" question="Which of these is a unit of force?" options={["Joule", "Newton", "Watt", "Pascal"]} />,
      },
      {
        id: "progress",
        icon: "trend",
        title: "Student Progress Tracking",
        text: "Monitor course activity, assessment performance, completion, and learning progress. Teachers and administrators can use this information to understand learner engagement.",
        url: "yourschool.vilms.in/admin/progress",
        visual: (
          <ProgressTracker
            noun="Student"
            course="Class 9 · Science"
            rows={[
              { n: "Rahul Kumar", pct: 78, score: "78%", last: "today" },
              { n: "Sneha Patel", pct: 100, score: "84%", last: "yesterday" },
              { n: "Aman Verma", pct: 41, score: "58%", last: "last week" },
              { n: "Isha Mehta", pct: 66, score: "66%", last: "2 days ago" },
              { n: "Karan Shah", pct: 100, score: "90%", last: "today" },
              { n: "Divya Rao", pct: 33, score: "none yet", last: "last week" },
            ]}
          />
        ),
      },
      {
        id: "reports",
        icon: "chart",
        title: "Reports and Analytics",
        text: "Access learning reports to review course activity, student progress, assessments, and completion. These insights can help educators make better learning decisions.",
        url: "yourschool.vilms.in/admin/reports",
        visual: (
          <ReportsPanel
            title="Reports · by class"
            series={[
              { id: "activity", label: "Course activity", unit: "%", values: [{ k: "9-A", v: 84 }, { k: "9-B", v: 71 }, { k: "10-A", v: 77 }, { k: "11-C", v: 66 }] },
              { id: "progress", label: "Student progress", unit: "%", values: [{ k: "9-A", v: 72 }, { k: "9-B", v: 58 }, { k: "10-A", v: 64 }, { k: "11-C", v: 49 }] },
              { id: "assess", label: "Assessments", unit: "%", values: [{ k: "9-A", v: 78 }, { k: "9-B", v: 64 }, { k: "10-A", v: 71 }, { k: "11-C", v: 59 }] },
            ]}
          />
        ),
      },
    ],
  },

  how: {
    kicker: "Benefits",
    title: "Benefits of Using an Education Management Software",
    lead: "An effective education management software solution can help institutions:",
    variant: "loop",
    steps: [
      { icon: "book", title: "Organize courses and learning content" },
      { icon: "users", title: "Simplify student enrollment" },
      { icon: "file", title: "Manage digital learning materials" },
      { icon: "tests", title: "Conduct online assessments" },
      { icon: "trend", title: "Track student progress" },
      { icon: "award", title: "Monitor course completion" },
      { icon: "roles", title: "Manage different learner groups" },
      { icon: "chart", title: "Generate learning reports" },
      { icon: "globe", title: "Support online and blended learning" },
    ],
  },

  who: {
    title: "Who Can Use VILMS?",
    lead: "A school LMS platform or college LMS software can support different types of educational and learning organizations, including:",
    items: [
      "Schools",
      "Colleges and universities",
      "Educational institutions",
      "Professional training institutes",
      "Coaching centres",
      "Skill development organizations",
      "Corporate learning teams",
      "HR and L&D departments",
      "Online education providers",
    ],
    closing: "VILMS can also serve as a student learning platform for organizations that want to deliver structured digital learning.",
  },

  tips: {
    title: "How to Choose the Right School LMS Platform",
    lead: "Before selecting an LMS, schools and colleges should consider their specific teaching and learning requirements. Look for a platform that offers:",
    items: [
      "Simple course and content management",
      "Student and learner management",
      "Online assessments and tests",
      "Progress tracking and reports",
      "Support for different courses and learner groups",
      "Easy access for teachers and students",
      "Features that can grow with the institution",
    ],
    closing: "The right LMS should simplify learning management without making everyday tasks complicated.",
  },

  showcase: {
    kicker: "Inside the platform",
    title: "A class on the teacher's screen, subjects on the student's",
    lead: "Both read from the same courses and assessments.",
    admin: {
      url: "yourschool.vilms.in/admin/classes/9a",
      w: 720,
      h: 420,
      label: "A class: course progress and last assessment for each student.",
      node: (
        <AdminScreen
          org="Your School"
          nav={[
            { label: "Courses", icon: BookOpen },
            { label: "Students", icon: Users },
            { label: "Assessments", icon: ClipboardCheck },
            { label: "Progress", icon: TrendingUp },
            { label: "Reports", icon: BarChart3 },
          ]}
          active={3}
          crumb="Classes / Class 9-A"
          title="Science · student progress"
          action="Add students"
          stats={[
            ["Students", "32"],
            ["Course completion", "72%"],
            ["Assessments", "4"],
            ["Teacher", "Dr. Iyer"],
          ]}
          head={["Student", "Subject", "Progress", "Last assessment"]}
          rows={[
            ["Rahul Kumar", "Science", { pct: 78 }, "78%"],
            ["Sneha Patel", "Science", { pct: 100 }, "84%"],
            ["Aman Verma", "Science", { pct: 41 }, "58%"],
            ["Isha Mehta", "Science", { pct: 66 }, "66%"],
            ["Karan Shah", "Science", { pct: 100 }, "90%"],
            ["Divya Rao", "Science", { pct: 33 }, "—"],
          ]}
        />
      ),
    },
    student: { w: 280, h: 560, label: "Subjects, progress and learning materials.", node: <SubjectsPhone /> },
  },

  choose: {
    title: "Why Choose VILMS?",
    paragraphs: [
      "VILMS provides a centralized digital learning platform for organizations that want to manage courses, learners, assessments, and learning activities.",
      "It can support educational institutions as well as businesses managing employee learning, corporate training, onboarding, and professional development programs.",
    ],
  },

  cta: {
    title: "Build a Better Digital Learning Experience",
    lead: "From course management and digital content to assessments and progress tracking, an LMS brings important learning activities together. Ready to improve digital learning at your institution? Explore VILMS and manage learning smarter.",
  },

  faq: {
    kicker: "FAQs",
    title: "Schools and colleges questions",
    items: [
      { q: "What is an LMS for schools and colleges?", a: "An LMS for schools and colleges is software that helps manage courses, students, learning materials, assessments, and academic progress from one platform." },
      { q: "What is a school LMS platform?", a: "A school LMS platform helps schools deliver digital learning, organize course content, manage students, conduct assessments, and track learning progress." },
      { q: "Can colleges use VILMS?", a: "Yes. VILMS can support colleges and other educational institutions with course management, student learning, assessments, digital content, and progress tracking." },
      { q: "What is college LMS software?", a: "College LMS software is a learning management system designed to help colleges manage courses, students, learning resources, assessments, and academic activities digitally." },
      { q: "Can businesses use VILMS for employee training?", a: "Yes. VILMS can also support employee training, corporate learning, onboarding, and professional development programs." },
    ],
  },

  related: ["onlineCourses", "onlineExams", "pricing", "buyingGuide"],
};
