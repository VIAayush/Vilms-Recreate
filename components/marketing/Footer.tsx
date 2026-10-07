import Link from "next/link";
import { brand } from "@/lib/content";
import { MENU, PAGES, type PageKey } from "@/lib/site/pages";
import { BrandMark } from "./BrandMark";

// Footer: the whole site map in six columns, the legal row, and the name set
// huge across the page. Links come from the page registry.
const col = (id: string) => MENU.find((m) => m.id === id)!.groups.flatMap((g) => g.keys);

const COLUMNS: { title: string; keys: PageKey[] }[] = [
  { title: "Product", keys: col("product") },
  { title: "Solutions", keys: col("solutions") },
  { title: "Business", keys: ["pricing", "demo", "faq", "why"] },
  { title: "Resources", keys: col("resources") },
  { title: "Company", keys: ["about", "why", "contact"] },
];

const LEGAL: PageKey[] = ["privacy", "terms", "refund", "cookies"];

export function Footer() {
  return (
    <footer className="border-t border-edge pb-6 pt-14">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_3fr]">
          <div>
            <Link href="/" aria-label="VILMS home" className="inline-block rounded-lg">
              <span className="inline-flex items-center gap-3">
                <BrandMark className="h-9 w-12" />
                <span className="font-logo text-[24px] font-semibold tracking-[0.06em] text-[rgb(0_48_86)] ">VILMS</span>
              </span>
            </Link>
            <p className="mt-5 max-w-[300px] text-[15px] leading-relaxed text-fg-muted">
              The all-in-one learning platform for coaching institutes — courses, live classes, answer evaluation, payments and leads under your own brand.
            </p>
            <p className="mt-4 text-[15px] font-medium">Your students pay you. Not your software.</p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {COLUMNS.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <p className="text-[13.5px] font-semibold">{c.title}</p>
                <ul className="mt-4 space-y-2.5 text-[14px]">
                  {c.keys.map((k) => (
                    <li key={`${c.title}-${k}`}>
                      <Link href={PAGES[k].path} className="text-fg-muted transition-colors hover:text-primary">
                        {PAGES[k].name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <p className="text-[13.5px] font-semibold">Contact</p>
              <ul className="mt-4 space-y-2.5 text-[14px] text-fg-muted">
                <li>
                  <span className="block text-[12px] text-fg-faint">General &amp; support</span>
                  <a href={`mailto:${brand.emails.general}`} className="transition-colors hover:text-primary">
                    {brand.emails.general}
                  </a>
                </li>
                <li>
                  <span className="block text-[12px] text-fg-faint">Billing</span>
                  <a href={`mailto:${brand.emails.billing}`} className="transition-colors hover:text-primary">
                    {brand.emails.billing}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-16 select-none overflow-hidden border-t border-edge pt-8 font-logo text-[clamp(56px,17vw,260px)] font-semibold leading-[0.8] tracking-[0.02em] text-[rgb(0_48_86/0.08)] "
        >
          VILMS
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-edge pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[13px] text-fg-muted">
            © {new Date().getFullYear()} VILMS · Built for Indian coaching institutes · Prices exclude 18% GST · Interface visuals are illustrative
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2 font-mono text-[11.5px] uppercase tracking-[0.08em]">
            {LEGAL.map((k) => (
              <li key={k}>
                <Link href={PAGES[k].path} className="text-fg-muted transition-colors hover:text-primary">
                  {PAGES[k].name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
