import Link from "next/link";
import { brand, explorer } from "@/lib/content";
import { SIGNIN_URL } from "@/lib/env";
import { Wordmark } from "./BrandMark";

const COLUMNS = [
  {
    title: "Product",
    links: explorer.tabs.map((t) => ({ href: `/#product-${t.id}`, label: t.label })),
  },
  {
    title: "VILMS",
    links: [
      { href: "/#solutions", label: "Who it's for" },
      { href: "/#why", label: "0% revenue share" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/demo", label: "Book a demo" },
      { href: SIGNIN_URL, label: "Customer sign-in" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <Link href="/" aria-label="VILMS home" className="inline-block rounded-lg">
            <Wordmark />
          </Link>
          <p className="mt-5 max-w-[280px] text-[14.5px] leading-relaxed text-fg-muted">The all-in-one learning platform for coaching institutes.</p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">{col.title}</p>
            <ul className="mt-4 space-y-2.5 text-[14.5px]">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="inline-block text-fg-muted transition duration-300 hover:translate-x-1 hover:text-primary">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">Contact</p>
          <ul className="mt-4 space-y-2.5 text-[14.5px] text-fg-muted">
            <li>
              General &amp; support ·{" "}
              <a href={`mailto:${brand.emails.general}`} className="link">
                {brand.emails.general}
              </a>
            </li>
            <li>
              Billing ·{" "}
              <a href={`mailto:${brand.emails.billing}`} className="link">
                {brand.emails.billing}
              </a>
            </li>
            <li>
              <Link href="/privacy" className="transition hover:text-primary">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap">
        <p aria-hidden className="select-none border-t border-edge pt-8 whitespace-nowrap font-display text-[clamp(30px,8.4vw,120px)] font-semibold leading-[0.9] tracking-[-0.055em] text-fg/[0.07]">
          Your students pay you.
        </p>
      </div>

      <div className="wrap flex flex-col gap-2 py-8 text-[12.5px] text-fg-faint sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} VILMS · Built for Indian coaching institutes.</p>
        <p>All prices exclude 18% GST. Interface visuals are illustrative.</p>
      </div>
    </footer>
  );
}
