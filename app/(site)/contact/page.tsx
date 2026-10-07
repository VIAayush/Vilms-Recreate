import { Breadcrumbs } from "@/components/site-ui/Breadcrumbs";
import { Reveal } from "@/components/site-ui/Reveal";
import { LeadForm } from "@/components/site/LeadForm";
import { EmailHelper } from "@/components/pages/business/contact/EmailHelper";
import { brand } from "@/lib/content";
import { PAGES } from "@/lib/site/pages";
import { JsonLd, absoluteUrl, pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("contact");

// Only contact details that exist: the website and two email addresses.
const DETAILS: { label: string; value: string; href: string }[] = [
  { label: "General & support", value: brand.emails.general, href: `mailto:${brand.emails.general}` },
  { label: "Billing", value: brand.emails.billing, href: `mailto:${brand.emails.billing}` },
  { label: "Website", value: brand.domain, href: `https://${brand.domain}` },
];

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-x-clip pb-20 pt-24 sm:pb-28 sm:pt-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact VILMS",
          url: absoluteUrl(PAGES.contact.path),
          mainEntity: {
            "@type": "Organization",
            name: "VILMS",
            url: absoluteUrl("/"),
            contactPoint: [
              { "@type": "ContactPoint", contactType: "customer support", email: brand.emails.general },
              { "@type": "ContactPoint", contactType: "billing support", email: brand.emails.billing },
            ],
          },
        }}
      />
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]" />

      <div className="wrap grid items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-x-20">
        <div className="min-w-0">
          <Breadcrumbs page="contact" />
          <p className="kicker mt-7">Contact</p>
          <h1 className="mt-5 text-balance font-display text-[clamp(38px,5.2vw,68px)] font-medium leading-[1.02] tracking-[-0.04em]">
            Write to the <span className="serif-accent text-fg-muted">VILMS team.</span>
          </h1>
          <p className="sub mt-6 max-w-[520px]">
            About the platform, pricing, billing or how your institute would set up. Pick the right inbox below, or use the form and your message reaches the same team.
          </p>

          <Reveal className="mt-12">
            <EmailHelper />
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="font-display text-[22px] font-medium tracking-[-0.025em]">Business details</h2>
            <dl className="mt-4 divide-y divide-edge border-y border-edge">
              {DETAILS.map((d) => (
                <div key={d.label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5">
                  <dt className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-fg-faint">{d.label}</dt>
                  <dd>
                    <a href={d.href} className="link text-[16px]" {...(d.href.startsWith("https") ? { target: "_blank", rel: "noopener" } : {})}>
                      {d.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="min-w-0">
          <div className="rounded-[28px] border border-edge bg-panel p-5 shadow-window sm:p-8 lg:sticky lg:top-24">
            <p className="kicker">Send a message</p>
            <h2 className="mt-3 font-display text-[26px] font-medium leading-tight tracking-[-0.03em] sm:text-[30px]">How can we help?</h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-fg-muted">We reply by email. The details below tell us who is writing.</p>
            <div className="mt-6">
              <LeadForm interest="other" location="contact_page" variant="contact" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
