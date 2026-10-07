import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/site-ui/Breadcrumbs";
import { Reveal } from "@/components/site-ui/Reveal";
import { LeadForm } from "@/components/site/LeadForm";
import { DemoTimeline } from "@/components/pages/business/demo/DemoTimeline";
import { DEMO_BRING, DEMO_STEPS } from "@/components/pages/business/data";
import { PLANS } from "@/components/pages/business/plans";
import type { Interest } from "@/lib/lead-options";
import { pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("demo");

// A direct landing page for ad campaigns that should open straight onto the
// form: /book-a-demo?utm_source=google&utm_medium=cpc&… (and ?intent=trial).
// The old /demo URL redirects here and keeps its query string; UTM tags are
// picked up by the lead form's attribution, not by this page.
export default async function BookDemoPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const interest: Interest = sp.intent === "trial" ? "free_trial" : "book_demo";
  const trial = interest === "free_trial";

  return (
    <section className="relative isolate overflow-x-clip pb-20 pt-24 sm:pb-28 sm:pt-32">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[46%] border-l border-edge bg-canvas-alt lg:block" />

      <div className="wrap grid items-start gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-x-20">
        {/* intro */}
        <div className="min-w-0">
          <Breadcrumbs page="demo" />
          <p className="kicker mt-7">{trial ? "Start your 14-day trial" : "30-minute walkthrough"}</p>
          <h1 className="mt-5 text-balance font-display text-[clamp(38px,5.2vw,68px)] font-medium leading-[1.02] tracking-[-0.04em]">
            {trial ? (
              <>
                Get your institute <span className="serif-accent text-fg-muted">online.</span>
              </>
            ) : (
              <>
                See VILMS on <span className="serif-accent text-fg-muted">your institute&apos;s setup.</span>
              </>
            )}
          </h1>
          <p className="sub mt-6 max-w-[520px]">
            {trial
              ? "Tell us about your institute and we'll point you to the trial and help you set up. Free for 14 days, no card needed."
              : "We walk through how you run things today and show exactly what moves over: courses, students, tests, payments and leads."}
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-fg-muted">
            {["0% revenue share", "No credit card required", `Plans from ${PLANS[0].price}/month`].map((m) => (
              <li key={m} className="flex items-center gap-1.5">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green" />
                {m}
              </li>
            ))}
          </ul>
        </div>

        {/* the one lead form */}
        <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="rounded-[28px] border border-edge bg-panel p-5 shadow-window sm:p-8">
            <p className="kicker">{trial ? "Free trial" : "Book your demo"}</p>
            <h2 className="mt-3 font-display text-[26px] font-medium leading-tight tracking-[-0.03em] sm:text-[30px]">Tell us about your institute</h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-fg-muted">
              {trial ? "Our team will check in to help you set up." : "One person from our team will reach out to set a time."}
            </p>
            <div className="mt-6">
              <LeadForm interest={interest} location={trial ? "demo_page_trial" : "demo_page"} expanded />
            </div>
          </div>
        </div>

        {/* what happens, what to bring */}
        <div className="min-w-0 space-y-12 lg:col-start-1 lg:row-start-2 lg:pt-6">
          <Reveal>
            <h2 className="font-display text-[26px] font-medium tracking-[-0.03em]">What happens in the 30 minutes</h2>
            <div className="mt-6">
              <DemoTimeline steps={DEMO_STEPS} />
            </div>
          </Reveal>

          <Reveal className="border-t border-edge pt-10">
            <h2 className="font-display text-[22px] font-medium tracking-[-0.03em]">What to bring</h2>
            <ul className="mt-5 space-y-3">
              {DEMO_BRING.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15.5px] leading-snug">
                  <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-green" strokeWidth={3} />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[480px] text-[14.5px] leading-relaxed text-fg-muted">
              Nothing to prepare beyond that. It is a walkthrough, not a sales script: one person from our team, your setup, and plain answers.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
