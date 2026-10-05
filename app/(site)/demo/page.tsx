import type { Metadata } from "next";
import { Check } from "lucide-react";
import { LeadForm } from "@/components/site/LeadForm";
import { finalCta, hero } from "@/lib/content";
import type { Interest } from "@/lib/lead-options";

export const metadata: Metadata = {
  title: "Book a VILMS demo",
  description:
    "Book a 30-minute VILMS demo. We'll walk through your current setup and show exactly what moves over — courses, students and all.",
  alternates: { canonical: "/demo" },
};

const POINTS = [
  "Courses, live classes, tests and answer evaluation in one place",
  "Fees straight to your own Razorpay — 0% revenue share",
  "Your brand, your domain — students never see VILMS",
  "Plans from ₹499/month · 14-day free trial, no card",
];

// A direct landing page for ad campaigns that should open straight onto the
// form: /demo?utm_source=google&utm_medium=cpc&... (and ?intent=trial).
export default async function DemoPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const interest: Interest = sp.intent === "trial" ? "free_trial" : "book_demo";
  const trial = interest === "free_trial";

  return (
    <section className="relative isolate overflow-x-clip pb-20 pt-28 sm:pb-28 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[46%] border-l border-edge bg-canvas-alt lg:block" />
      <div className="wrap grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <p className="kicker">{trial ? "Start your 14-day trial" : finalCta.demo.kicker}</p>
          <h1 className="display mt-5 text-[clamp(40px,5.4vw,76px)]">
            {trial ? (
              "Get your institute online."
            ) : (
              <>
                See VILMS on <span className="serif-accent text-fg-muted">your institute&apos;s setup.</span>
              </>
            )}
          </h1>
          <p className="sub mt-6 max-w-[500px]">{finalCta.demo.text}</p>
          <ul className="mt-9 space-y-3.5 border-t border-edge pt-8">
            {POINTS.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[15.5px]">
                <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-green" strokeWidth={3} />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-10 font-display text-[22px] font-semibold tracking-tight">
            {hero.titleTop} <span className="serif-accent text-fg-muted">{hero.titleBottom}</span>
          </p>
        </div>

        <div className="rounded-[28px] border border-edge bg-panel p-5 shadow-window sm:p-9">
          <LeadForm interest={interest} location={trial ? "demo_page_trial" : "demo_page"} />
        </div>
      </div>
    </section>
  );
}
