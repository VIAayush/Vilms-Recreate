import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/site-ui/PageHero";
import { Section } from "@/components/site-ui/Section";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { CtaBand } from "@/components/site-ui/CtaBand";
import { FaqAccordion } from "@/components/site-ui/FaqAccordion";
import { Reveal } from "@/components/site-ui/Reveal";
import { JsonLd, faqLd, pageMetadata, softwareLd } from "@/lib/site/seo";
import { HeroSlider } from "@/components/pages/products-b/brand/HeroSlider";
import { Customiser } from "@/components/pages/products-b/brand/Customiser";
import { BrandStory } from "@/components/pages/products-b/brand/BrandStory";
import { WL_CLOSE, WL_FAQ, WL_FEATURES, WL_H1, WL_LEAD, WL_WHAT, WL_WHO, WL_WHY, WL_WHY_INTRO, WL_WHY_VILMS, WL_WHY_VILMS_INTRO } from "@/components/pages/products-b/brand/data";

export const metadata = pageMetadata("whiteLabel");

const Ticks = ({ items }: { items: string[] }) => (
  <ul className="grid gap-x-10 sm:grid-cols-2">
    {items.map((t) => (
      <li key={t} className="flex items-start gap-3 border-b border-edge py-3.5 text-[16px]">
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green-tint text-green">
          <Check aria-hidden className="h-3 w-3" />
        </span>
        {t}
      </li>
    ))}
  </ul>
);

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "VILMS White Label LMS", description: "A white label LMS for coaching institutes: your logo, colours, domain and certificates, so learners see your brand." })} />
      <JsonLd data={faqLd(WL_FAQ)} />

      <PageHero page="whiteLabel" kicker="White-label LMS" title={WL_H1} lead={WL_LEAD} visual={<HeroSlider />} />

      <Section
        id="customiser"
        kicker="Brand it yourself"
        title="Type your name. Watch VILMS disappear."
        lead="Pick a name, a colour, a logo mark and an address. The portal, the certificate, the email and the address bar all become yours."
      >
        <Customiser />
      </Section>

      <Section id="what-is" tone="alt" kicker="What is a white label LMS?">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <h2 className="text-balance font-display text-[clamp(30px,4.2vw,54px)] font-medium leading-[1.05] tracking-[-0.035em]">What Is a White Label LMS?</h2>
          </Reveal>
          <Reveal delay={80} className="space-y-5 text-[18px] leading-relaxed text-fg-muted">
            {WL_WHAT.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section id="story" kicker="How it looks" title="From VILMS to your institute, to your own domain" lead="Scroll through the five steps.">
        <BrandStory />
      </Section>

      <Section id="why-white-label" tone="alt" kicker="Why choose a white label LMS?" title="Why Choose a White Label LMS?" lead={WL_WHY_INTRO}>
        <p className="mb-4 text-[15px] font-medium">With a white label education platform, you can:</p>
        <Ticks items={WL_WHY} />
      </Section>

      <Section id="features" kicker="Key features of VILMS" title="Key Features of VILMS">
        <ol className="divide-y divide-edge border-y border-edge">
          {WL_FEATURES.map((f, i) => (
            <li key={f.t} className="group grid items-baseline gap-x-8 gap-y-1 py-6 sm:grid-cols-[48px_minmax(0,0.9fr)_minmax(0,1.1fr)] sm:py-7">
              <span className="font-mono text-[12px] text-fg-faint transition-colors group-hover:text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-[clamp(22px,2.5vw,30px)] font-medium tracking-[-0.025em] transition-transform duration-300 group-hover:translate-x-1">{f.t}</h3>
              <p className="text-[15.5px] leading-relaxed text-fg-muted">{f.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="who" tone="alt" kicker="Who can use a white label LMS?" title="Who Can Use a White Label LMS?">
        <ul className="divide-y divide-edge border-y border-edge">
          {WL_WHO.map((w) => (
            <li key={w.t} className="group grid items-baseline gap-x-8 gap-y-1 py-6 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto] sm:py-7">
              <h3 className="font-display text-[clamp(22px,2.5vw,32px)] font-medium tracking-[-0.025em] transition-transform duration-300 group-hover:translate-x-1">{w.t}</h3>
              <p className="text-[15.5px] leading-relaxed text-fg-muted">{w.d}</p>
              <ArrowUpRight aria-hidden className="hidden h-5 w-5 text-fg-faint transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="why-vilms" tone="navy" kicker="Why choose VILMS?" title="Why Choose VILMS?" lead={WL_WHY_VILMS_INTRO}>
        <p className="mb-4 text-[15px] font-medium">VILMS helps you:</p>
        <Ticks items={WL_WHY_VILMS} />
        <p className="mt-10 max-w-[760px] text-[17px] leading-relaxed text-fg-muted">{WL_CLOSE}</p>
      </Section>

      <Section id="faq" kicker="FAQs" title="White label LMS, answered">
        <FaqAccordion items={WL_FAQ} />
      </Section>

      <RelatedPages keys={["lmsPlatform", "onlineCourses", "coaching", "pricing"]} tone="alt" />
      <CtaBand />
    </>
  );
}
