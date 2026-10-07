import type { Metadata } from "next";
import { SITE_URL } from "@/lib/env";
import { PAGES, type PageKey } from "./pages";

// Metadata and structured data for every page, built from the registry.

export function pageMetadata(key: PageKey, overrides: Partial<Metadata> = {}): Metadata {
  const p = PAGES[key];
  const indexable = p.indexable !== false;
  return {
    // The home page keeps the root layout's full title; others use "%s · VILMS".
    title: key === "home" ? { absolute: p.title } : p.title,
    description: p.description,
    keywords: [p.keyword, ...p.keywords],
    alternates: { canonical: p.path },
    openGraph: {
      type: p.group === "article" ? "article" : "website",
      siteName: "VILMS",
      locale: "en_IN",
      title: key === "home" ? "VILMS — Your students pay you. Not your software." : `${p.title} · VILMS`,
      description: p.description,
      url: p.path,
    },
    twitter: {
      card: "summary_large_image",
      title: key === "home" ? "VILMS — Your students pay you. Not your software." : `${p.title} · VILMS`,
      description: p.description,
    },
    robots: indexable ? undefined : { index: false, follow: true },
    ...overrides,
  };
}

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/* ---------------- JSON-LD builders ---------------- */

export function JsonLd({ data }: { data: object | object[] }) {
  // "<" is escaped so no string in the data can close the script tag.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VILMS",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo-light.png`,
  email: "hello@vilms.in",
  description: "VILMS is an all-in-one learning platform for coaching institutes.",
});

export const breadcrumbLd = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: absoluteUrl(t.path),
  })),
});

export const faqLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
});

/** SoftwareApplication with real plan prices — no ratings or reviews. */
export const softwareLd = (opts: { name?: string; description: string; offers?: { name: string; price: string; description: string }[] }) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: opts.name ?? "VILMS",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web, Android, iOS",
  url: SITE_URL,
  description: opts.description,
  ...(opts.offers
    ? {
        offers: opts.offers.map((o) => ({
          "@type": "Offer",
          name: o.name,
          price: o.price.replace(/[^\d]/g, ""),
          priceCurrency: "INR",
          description: o.description,
        })),
      }
    : {}),
});

export const articleLd = (key: PageKey) => {
  const p = PAGES[key];
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    mainEntityOfPage: absoluteUrl(p.path),
    publisher: { "@type": "Organization", name: "VILMS", logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/logo-light.png` } },
  };
};

/** Breadcrumb trail for a page: Home › [Blog ›] Page. */
export function trailFor(key: PageKey): { name: string; path: string }[] {
  const p = PAGES[key];
  const trail = [{ name: "Home", path: "/" }];
  if (p.group === "article") trail.push({ name: PAGES.blog.name, path: PAGES.blog.path });
  trail.push({ name: p.name, path: p.path });
  return trail;
}
