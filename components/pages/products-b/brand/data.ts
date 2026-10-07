import type { StoryStep } from "@/components/site-ui/ScrollStory";
import type { FaqItem } from "@/components/site-ui/FaqAccordion";

// Copy for /white-label-lms, taken from the White-Label section of
// docs/content-source.md (verbatim apart from grammar).

export const WL_H1 = "White Label LMS for Coaching Institutes";
export const WL_LEAD =
  "Launch your own branded learning platform with VILMS. Our white label LMS for coaching institutes helps coaching centers, educators, training institutes, and businesses offer online learning under their own brand.";

export const WL_WHAT = [
  "A white label LMS is a learning management platform that can be customized with your brand identity. You can provide courses, learning content, assessments, and learner access through a platform that represents your organization.",
  "VILMS helps you create an own branded LMS without building an LMS platform from scratch.",
];

export const WL_WHY_INTRO = "A branded learning platform gives your organization a more consistent learning experience. It also allows learners to access courses through a platform designed around your brand.";
export const WL_WHY = [
  "Use your brand name and identity",
  "Create a branded learning environment",
  "Manage courses and learners",
  "Deliver online training",
  "Track learner progress",
  "Conduct online assessments",
  "Manage learning content",
  "Support multiple learning programs",
];

export const WL_FEATURES = [
  { t: "Your Own Brand", d: "Create a learning environment that reflects your organization's branding and identity." },
  { t: "Course Management", d: "Create and manage courses, lessons, videos, documents, and other learning resources." },
  { t: "Learner Management", d: "Manage learners, groups, batches, and course access from one centralized platform." },
  { t: "Online Assessments", d: "Create quizzes, tests, assignments, and assessments to evaluate learner progress." },
  { t: "Progress Tracking", d: "Monitor course completion, learner activities, and learning progress." },
  { t: "Reports & Analytics", d: "Get useful insights into learner activities, course performance, and training progress." },
];

export const WL_WHO = [
  { t: "Coaching Institutes", d: "Launch a white label online academy for your students and manage courses, batches, assessments, and learning content." },
  { t: "Educational Institutions", d: "Create a branded digital learning environment for students and educators." },
  { t: "Training Institutes", d: "Deliver professional training programs through your own branded platform." },
  { t: "Businesses & Corporate Teams", d: "Use a branded LMS platform for employee onboarding, training, upskilling, and continuous learning." },
  { t: "Education Businesses", d: "Build an own branded LMS to deliver and manage online courses under your business identity." },
];

export const WL_WHY_VILMS_INTRO =
  "VILMS combines learning management and branding in one platform. Instead of managing multiple tools, you can bring courses, learners, assessments, and progress tracking together.";
export const WL_WHY_VILMS = [
  "Build a professional learning experience",
  "Manage courses and learners easily",
  "Deliver online training under your brand",
  "Track learning progress",
  "Organize assessments and content",
  "Support growing learning programs",
];

export const WL_CLOSE =
  "If you are looking for a branded LMS platform, VILMS provides the tools needed to manage and deliver online learning under your organization's identity. Whether you run a coaching institute, training organization, educational institution, or business, a white label LMS can help you create a consistent digital learning experience.";

export const WL_FAQ: FaqItem[] = [
  { q: "What is a white label LMS for coaching institutes?", a: "A white label LMS allows coaching institutes to offer online courses and learning services through a platform customized with their own brand identity." },
  { q: "Can I create my own branded LMS with VILMS?", a: "Yes. VILMS helps organizations create a branded learning platform for managing courses, learners, assessments, and learning content." },
  { q: "Who can use a white label education platform?", a: "Coaching institutes, educational institutions, training organizations, businesses, educators, and online academies can use a white label education platform." },
  { q: "Can a white label LMS support employee training?", a: "Yes. Businesses can use a branded LMS for employee onboarding, training, upskilling, assessments, and learning programs." },
  { q: "What can I manage with VILMS?", a: "VILMS can help manage courses, learners, learning content, assessments, progress tracking, trainers, and reports from one platform." },
];

/* ---- scroll story ---- */
export const BRAND_STEPS: StoryStep[] = [
  { title: "Start as VILMS", text: "Out of the box the portal carries the VILMS name and colours." },
  { title: "Add your logo, name and colours", text: "The portal becomes your institute's: your mark, your name, your colour." },
  { title: "Your certificates and emails follow", text: "Certificates are issued in your institute's name, and emails carry your brand." },
  { title: "Your own address: yourname.vilms.in", text: "Your own web address on every plan." },
  { title: "Or your own domain", text: "Point your own domain at it, so the address carries only your name." },
];
