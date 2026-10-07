import type { StoryStep } from "@/components/site-ui/ScrollStory";
import type { FaqItem } from "@/components/site-ui/FaqAccordion";

// Sample data for illustrative interfaces. The stage names match the CRM's
// real lead statuses.
export const STAGES = ["New", "Contacted", "Demo Scheduled", "Demo Completed", "Follow-up", "Interested", "Trial Started", "Converted"] as const;
export type StageName = (typeof STAGES)[number];

export type SourceId = "meta" | "google" | "landing" | "pdf" | "webinar";

export type Source = {
  id: SourceId;
  label: string;
  /** what the visitor did to become a lead */
  how: string;
  lead: { name: string; course: string; utm: { source: string; medium: string; campaign: string } };
};

export const SOURCES: Source[] = [
  { id: "meta", label: "Meta Ads", how: "Instant form", lead: { name: "Neha Verma", course: "Prelims Foundation", utm: { source: "meta", medium: "paid_social", campaign: "prelims-june" } } },
  { id: "google", label: "Google Ads", how: "Search ad click", lead: { name: "Rahul Kumar", course: "JEE crash course", utm: { source: "google", medium: "cpc", campaign: "jee-crash-search" } } },
  { id: "landing", label: "Landing page", how: "Course page form", lead: { name: "Isha Menon", course: "Spoken English", utm: { source: "website", medium: "landing_page", campaign: "spoken-english" } } },
  { id: "pdf", label: "Free PDF", how: "Lead-magnet download", lead: { name: "Arjun Thakur", course: "UPSC prelims", utm: { source: "website", medium: "lead_magnet", campaign: "polity-notes-pdf" } } },
  { id: "webinar", label: "Webinar", how: "RSVP, no login", lead: { name: "Sana Pillai", course: "NEET foundation", utm: { source: "website", medium: "webinar", campaign: "masterclass-sun" } } },
];

/** The chain, left to right. Captions say what the product does at that point. */
export const CHAIN = [
  { id: "lead", label: "Lead", text: "Every enquiry, checkout and webinar RSVP becomes a lead record, with the source it came from." },
  { id: "crm", label: "CRM", text: "One pipeline: status, owner, next follow-up and notes on every lead." },
  { id: "calling", label: "Calling", text: "Call from the lead card and log how it went, so the next person knows." },
  { id: "whatsapp", label: "WhatsApp", text: "Follow up through your own Wati account. The message is logged on the lead." },
  { id: "demo", label: "Demo", text: "Schedule it, mark it completed, set the follow-up before you close the card." },
  { id: "trial", label: "Trial", text: "Move interested leads into a trial and keep following them while it runs." },
  { id: "conversion", label: "Conversion", text: "A paid enrolment, still tied to the ad, page or webinar that started it." },
] as const;

export const SOURCE_CAPTIONS: Record<SourceId, string> = {
  meta: "Meta Ads leads arrive with their campaign attached.",
  google: "Google Ads clicks land on a course page built for paid traffic.",
  landing: "Course landing pages capture the lead and its source in one step.",
  pdf: "A free PDF in exchange for contact details builds your lead list.",
  webinar: "Webinar sign-up needs no login, and every RSVP becomes a lead.",
};

/* ---- the lead-card story ---- */
export const LEAD = {
  name: "Neha Verma",
  course: "Prelims Foundation Batch",
  fee: 15000,
  source: "Meta Ads",
  utm: { source: "meta", medium: "paid_social", campaign: "prelims-june" },
  owner: "Karan Mehta",
  ownerRole: "Sales",
  phone: "98•••• ••210",
};

export const LEAD_STEPS: StoryStep[] = [
  { title: "A lead enters", text: "A Meta ad is clicked, the form is filled, and the lead lands in New with its campaign attached." },
  { title: "You call and send a WhatsApp", text: "Call from the card, then follow up through your own Wati account. Both are logged on the lead." },
  { title: "A demo is scheduled", text: "The lead moves to Demo Scheduled and the next follow-up is set to the demo time." },
  { title: "Demo done, follow-up set", text: "Mark the demo completed. The lead moves on to Follow-up, with the next date already on the card." },
  { title: "The lead becomes interested", text: "A note on the fee plan, a new date. Nothing is held in someone's head or chat." },
  { title: "A trial starts", text: "Move the lead to Trial Started and keep following it while it runs." },
  { title: "The lead converts", text: "Paid, enrolled, counted. The enrolment still knows which ad it came from." },
];

/** Column the lead sits in at the END of each step. */
export const END_COL = [0, 1, 2, 4, 5, 6, 7];

export const NEXT_FOLLOW_UP = ["Call today, 10:30 AM", "Offer a demo class", "Demo · Thu 5:00 PM", "Follow-up · Sat 11:00 AM", "Share fee plan · Mon", "Day-3 check-in · Tue", "None. Enrolled."];
export const CONVERSION = ["Open", "Open", "Open", "Open", "Open", "In trial", "Converted"];

/** at = step + fraction through the step at which the event appears */
export type Evt = { at: number; icon: "form" | "phone" | "chat" | "cal" | "check" | "note" | "flag" | "rupee"; text: string; time: string };
export const EVENTS: Evt[] = [
  { at: 0.25, icon: "form", text: "Enquiry from Meta Ads · course page form", time: "Mon 10:02" },
  { at: 1.2, icon: "phone", text: "Called · spoke for 4 min", time: "Mon 10:31" },
  { at: 1.6, icon: "chat", text: "WhatsApp sent · course details", time: "Mon 10:36" },
  { at: 2.4, icon: "cal", text: "Demo scheduled for Thu 5:00 PM", time: "Mon 11:05" },
  { at: 3.3, icon: "check", text: "Demo completed · attended all of it", time: "Thu 6:00 PM" },
  { at: 3.7, icon: "flag", text: "Moved to Follow-up · call Sat 11 AM", time: "Thu 6:05 PM" },
  { at: 4.4, icon: "note", text: "Interested · asked about the fee plan", time: "Sat 11:20 AM" },
  { at: 5.4, icon: "flag", text: "Trial started · 14 days", time: "Mon 9:40 AM" },
  { at: 6.4, icon: "rupee", text: "Paid ₹15,000 · enrolled in Prelims Foundation", time: "Tue 4:12 PM" },
];

// Copy from the Lead Management section of docs/content-source.md.
export const CRM_H1 = "Lead Management Software for Coaching Institutes";
export const CRM_LEAD =
  "Manage student enquiries, follow-ups, admissions, and lead activities with VILMS. Our lead management software for coaching institutes helps coaching centers and educational organizations organize leads and improve the admission process from one platform.";
export const CRM_WHAT = [
  "Lead management software helps coaching institutes capture, organize, track, and follow up with potential students. It keeps lead information and communication in one centralized system.",
  "VILMS helps institutes manage enquiries from the first interaction through follow-ups and admission.",
];
export const CRM_WHY_INTRO = "Managing enquiries through spreadsheets, calls, or messages can make follow-ups difficult. A coaching institute CRM helps teams organize leads and stay on top of every enquiry.";
export const CRM_WHY = ["Capture and organize student leads", "Track enquiry status", "Assign leads to counsellors", "Manage follow-ups", "Record communication and activities", "Track admission progress", "View lead and admission reports"];
export const CRM_FEATURES = [
  { t: "Student Lead Management", d: "Keep student enquiries organized with important lead details, requirements, and follow-up information." },
  { t: "Lead Tracking", d: "Track leads through different stages, from new enquiry to counselling, follow-up, and admission." },
  { t: "Follow-Up Management", d: "Manage follow-up activities so counsellors can stay connected with potential students at the right time." },
  { t: "Counsellor Management", d: "Assign leads to team members and monitor their activities and follow-up progress." },
  { t: "Admission Tracking", d: "Track the admission journey and understand which leads have moved from enquiry to admission." },
  { t: "Reports & Insights", d: "Review lead activity, follow-ups, and admission progress through useful reports." },
];
export const CRM_WHO = [
  { t: "Coaching Institutes", d: "Manage student enquiries and admission leads." },
  { t: "Educational Institutions", d: "Organize prospective student information." },
  { t: "Training Institutes", d: "Track course enquiries and follow-ups." },
  { t: "Education Businesses", d: "Manage leads across different courses and programs." },
  { t: "Counselling Teams", d: "Organize daily lead activities and follow-ups." },
];
export const CRM_HELPS_INTRO = "An education CRM software solution can make lead management more organized and easier to monitor.";
export const CRM_HELPS = ["Respond to enquiries efficiently", "Keep lead information organized", "Reduce missed follow-ups", "Track counsellor activities", "Monitor admission pipeline", "Understand lead sources and progress"];
export const CRM_WHY_VILMS = [
  "VILMS brings lead management, follow-ups, counselling activities, and admission tracking together in one platform.",
  "Whether you need student lead management software or an admission CRM for coaching institutes, VILMS helps your team manage the complete lead journey more efficiently.",
];

export const CRM_FAQ: FaqItem[] = [
  { q: "What is lead management software for coaching institutes?", a: "It is software that helps coaching institutes capture, organize, track, and follow up with prospective student enquiries throughout the admission process." },
  { q: "Can VILMS manage student leads?", a: "Yes. VILMS can help institutes organize student enquiries, track lead status, manage follow-ups, and monitor admission progress." },
  { q: "What is a CRM coaching institute?", a: "A coaching institute CRM helps manage prospective students, enquiries, counsellor activities, follow-ups, and admissions from one platform." },
  { q: "Can VILMS help with admission management?", a: "Yes. VILMS can help teams track the journey from initial enquiry and counselling to admission." },
  { q: "Who can use VILMS lead management software?", a: "Coaching institutes, educational institutions, training institutes, education businesses, and counselling teams can use VILMS for lead management." },
];
