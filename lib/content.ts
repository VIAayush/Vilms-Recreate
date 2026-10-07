// Every word of marketing copy on the public site lives next to its page
// (components/pages/*, lib/site/*). This file keeps what is shared everywhere:
// the brand and the published price list. Product facts come from the VILMS
// brochure and the content document (docs/content-source.md); names, amounts
// and counts inside interface illustrations are sample data.

export const brand = {
  name: "VILMS",
  domain: "vilms.in",
  tagline: "Your students pay you. Not your software.",
  emails: { general: "hello@vilms.in", billing: "billing@vilms.in" },
};

/* ---------------- Pricing ---------------- */

export type Plan = {
  id: "base" | "growth" | "scale" | "institute";
  name: string;
  price: string;
  limit: number;
  students: string;
  bestFor: string;
};

export const pricing = {
  title: "Simple plans. 0% of your fees.",
  plans: [
    { id: "base", name: "Base", price: "₹499", limit: 50, students: "Up to 50 students", bestFor: "Starting out" },
    { id: "growth", name: "Growth", price: "₹1,199", limit: 200, students: "Up to 200 students", bestFor: "Growing institutes" },
    { id: "scale", name: "Scale", price: "₹2,499", limit: 500, students: "Up to 500 students", bestFor: "Established institutes" },
    { id: "institute", name: "Institute", price: "₹4,999", limit: 1500, students: "Up to 1,500 students", bestFor: "Large operations" },
  ] satisfies Plan[],
  compare: [
    { label: "Full platform + your own website", values: [true, true, true, true] },
    { label: "0% commission on your fees", values: [true, true, true, true] },
    { label: "Unlimited recorded & live courses", values: [true, true, true, true] },
    { label: "Tests & AI-assisted grading", values: [true, true, true, true] },
    { label: "Your Razorpay + GST invoices", values: [true, true, true, true] },
    { label: "Leads CRM with WhatsApp follow-up", values: [true, true, true, true] },
    { label: "Multiple branches", values: [false, true, true, true] },
    { label: "Your branded Android app", values: [false, true, true, true] },
    { label: "Your branded iOS app", values: [false, false, true, true] },
    { label: "Bigger library · Priority support", values: [false, false, true, true] },
    { label: "Unlimited staff · 2 TB library", values: [false, false, false, true] },
    { label: "Dedicated manager", values: [false, false, false, true] },
    { label: "Onboarding", values: ["Guided setup call", "Done-for-you migration", "Done-for-you migration", "Migration + faculty training"] },
  ] as { label: string; values: (string | boolean)[] }[],
  notes: ["14-day free trial", "No credit card required", "0% revenue share", "Prices exclude 18% GST"],
  custom: { title: "Teaching 1,500+ students?", text: "Write to us for a custom quote." },
};
