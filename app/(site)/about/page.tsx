import Link from "next/link";
import { PageHero } from "@/components/site-ui/PageHero";
import { Section } from "@/components/site-ui/Section";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { CtaBand } from "@/components/site-ui/CtaBand";
import { Reveal } from "@/components/site-ui/Reveal";
import { LiveDot } from "@/components/marketing/screens/primitives";
import { PatchworkVisual } from "@/components/pages/business/about/PatchworkVisual";
import { ScrollStatement } from "@/components/pages/business/about/ScrollStatement";
import { StackTimeline } from "@/components/pages/business/about/StackTimeline";
import { Principles } from "@/components/pages/business/about/Principles";
import { WhoStrip } from "@/components/pages/business/about/WhoStrip";
import { ABOUT_QA, ABOUT_RESOLUTION, ABOUT_STATEMENT, ABOUT_STEPS, PRINCIPLES, WHO_KEYS } from "@/components/pages/business/data";
import { JsonLd, organizationLd, pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationLd()} />
      <PageHero
        page="about"
        kicker="About VILMS"
        title={
          <>
            One platform. <span className="serif-accent text-fg-muted">Not a patchwork.</span>
          </>
        }
        lead="VILMS is a learning platform for coaching institutes, educational institutions and businesses: courses, assessments, payments and leads on one database, under your own brand. Not a share of your fees."
        visual={<PatchworkVisual />}
      />

      {/* what it is */}
      <section className="py-16 sm:py-24">
        <div className="wrap">
          <Reveal>
            <p className="kicker">What VILMS is</p>
          </Reveal>
          <div className="mt-6 max-w-[1020px]">
            <ScrollStatement phrases={ABOUT_STATEMENT} />
          </div>
          <dl className="mt-14 grid gap-x-12 border-t border-edge sm:mt-20 md:grid-cols-2">
            {ABOUT_QA.map((x, i) => (
              <Reveal key={x.q} delay={(i % 2) * 70} className="border-b border-edge py-6 md:py-8">
                <dt className="font-mono text-[11.5px] font-medium uppercase tracking-[0.14em] text-primary">{x.q}</dt>
                <dd className="mt-3 max-w-[460px] text-[17px] leading-relaxed">{x.a}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* why it exists */}
      <Section tone="alt" id="why-it-exists">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="kicker">Why it exists</p>
            <h2 className="mt-4 text-balance font-display text-[clamp(30px,4.2vw,54px)] font-medium leading-[1.05] tracking-[-0.035em]">
              Every gap in the stack costs time, students or money.
            </h2>
            <p className="sub mt-5 max-w-[460px]">
              Most coaching institutes stitch together separate apps for leads, classes, tests and payments. Four or five tools that don&apos;t talk to each other mean lost leads, re-typed data, slow grading and a software bill that can grow with every enrolment.
            </p>
          </Reveal>
          <StackTimeline steps={ABOUT_STEPS} resolution={ABOUT_RESOLUTION} />
        </div>
      </Section>

      {/* principles */}
      <Section
        tone="navy"
        id="principles"
        kicker="Principles"
        title="Six things we won't trade away."
        lead="They decide how VILMS is priced, built and run. They are also easy to check: each one shows up in the product and on the pricing page."
      >
        <Principles items={PRINCIPLES} />
      </Section>

      {/* who it's for */}
      <Section
        id="who-its-for"
        kicker="Who it serves"
        title="One LMS for every kind of learning."
        lead="Coaching and training institutes are the core fit, especially in India. VILMS also serves educational institutions, and businesses that run corporate training, onboarding and HR & L&D programmes."
      >
        <WhoStrip keys={WHO_KEYS} />
        <Reveal>
          <p className="mt-8 max-w-[640px] text-[16px] leading-relaxed text-fg-muted">
            <b className="font-semibold text-fg">Corporate training and HR &amp; L&amp;D teams.</b> Organise employee training, onboarding and learning programmes, and monitor completion, under your own brand.{" "}
            <Link href="/book-a-demo" className="link">
              Book a demo to see it
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      {/* the only proof there is */}
      <section className="bg-canvas-alt py-16 sm:py-24">
        <div className="wrap">
          <Reveal className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <p className="flex items-center gap-2.5 font-mono text-[11.5px] font-medium uppercase tracking-[0.16em] text-fg-muted">
              <LiveDot /> In production
            </p>
            <div className="lg:col-start-1 lg:row-start-2">
              <h2 className="text-balance font-display text-[clamp(30px,4.2vw,54px)] font-medium leading-[1.05] tracking-[-0.035em]">VILMS already runs a live coaching institute.</h2>
            </div>
            <p className="max-w-[520px] text-[17px] leading-relaxed text-fg-muted lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              That is the proof we offer, and we don&apos;t dress it up: no customer logos, no borrowed numbers. The platform you would be buying is the one a real institute teaches, enrols and collects fees on, with real students and real classes.
            </p>
          </Reveal>
        </div>
      </section>

      <RelatedPages keys={["why", "pricing", "lmsPlatform", "whiteLabel"]} title="Go deeper" />
      <CtaBand />
    </>
  );
}
