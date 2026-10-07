import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/marketing/BrandMark";
import { PAGES, type PageKey } from "@/lib/site/pages";
import "@/components/marketing/site.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const SUGGESTED: PageKey[] = ["lmsPlatform", "pricing", "demo", "blog", "faq", "contact"];

// Shown for any URL that doesn't exist. Self-contained (no header/providers),
// so it works even for paths outside the marketing layout.
export default function NotFound() {
  return (
    <div className="site min-h-screen">
      <main className="wrap flex min-h-screen flex-col items-center justify-center py-20 text-center">
        <BrandMark className="h-14 w-[76px]" />
        <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.16em] text-fg-muted">404</p>
        <h1 className="mt-3 text-balance text-[clamp(34px,5vw,56px)] font-medium leading-[1.05] tracking-[-0.035em]">That page isn&apos;t here</h1>
        <p className="mt-4 max-w-[420px] text-[17px] leading-relaxed text-fg-muted">The link may be old, or the page may have moved. These might help:</p>
        <ul className="mt-8 flex max-w-[560px] flex-wrap justify-center gap-2.5">
          {SUGGESTED.map((k) => (
            <li key={k}>
              <Link href={PAGES[k].path} className="inline-block rounded-full border border-edge-strong px-4 py-2 text-[14.5px] font-medium transition hover:border-navy hover:bg-navy hover:text-white">
                {PAGES[k].name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/" className="cta cta-primary cta-lg mt-10">
          Back to VILMS home
        </Link>
      </main>
    </div>
  );
}
