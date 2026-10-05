import Link from "next/link";
import { brand } from "@/lib/content";
import { BrandMark } from "./BrandMark";

// Labs-style footer: a hairline, the link columns, the name set huge across
// the page, another hairline, and a row of small mono links.
const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/#product", label: "All products" },
      { href: "/#solutions", label: "Student lifecycle" },
      { href: "/#product", label: "Courses & live classes" },
      { href: "/#evaluation", label: "AI evaluation" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/#solutions", label: "Coaching institutes" },
      { href: "/#crm", label: "Lead CRM" },
      { href: "/#product", label: "White-label app" },
    ],
  },
  {
    title: "Pricing",
    links: [
      { href: "/#pricing", label: "Plans" },
      { href: "/#pricing", label: "Compare features" },
      { href: "/#revenue", label: "0% revenue share" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/VILMS-Brochure.pdf", label: "Brochure (PDF)" },
      { href: "/demo", label: "Book a demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#about", label: "About" },
      { href: `mailto:${brand.emails.general}`, label: "Contact" },
      { href: `mailto:${brand.emails.billing}`, label: "Billing" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="pb-6">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-fg/70 pt-10 sm:grid-cols-3 lg:grid-cols-5">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-[14px] font-semibold">{col.title}</p>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-fg-muted transition-colors hover:text-primary">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Link href="/" aria-label="VILMS home" className="group mt-14 flex items-center gap-[3vw] sm:mt-20">
          <BrandMark className="h-[clamp(52px,13vw,190px)] w-[clamp(70px,17.5vw,256px)] transition-transform duration-500 group-hover:-rotate-3" />
          <span className="font-logo text-[clamp(64px,19vw,290px)] font-semibold leading-[0.8] tracking-[0.02em] text-[rgb(0_48_86)] dark:text-[rgb(220_224_230)]">VILMS</span>
        </Link>

        <div className="mt-10 flex flex-col gap-4 border-t border-fg/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-fg-muted">© {new Date().getFullYear()} VILMS · Prices exclude 18% GST · Interface visuals are illustrative</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11.5px] uppercase tracking-[0.08em]">
            <li>
              <Link href="/privacy" className="hover:text-primary">
                Privacy
              </Link>
            </li>
            <li>
              <a href={`mailto:${brand.emails.general}`} className="hover:text-primary">
                Contact
              </a>
            </li>
            <li>
              <Link href="/demo" className="hover:text-primary">
                Book a demo
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
