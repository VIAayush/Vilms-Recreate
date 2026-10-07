import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site/seo";
import { pageList, type PageGroup } from "@/lib/site/pages";

// sitemap.xml is generated from the page registry, so a page exists in the
// sitemap exactly when it exists in the site structure. Placeholder pages
// (indexable: false) are left out, matching their noindex tag.
const built = new Date();

const PRIORITY: Record<PageGroup, number> = {
  home: 1,
  product: 0.9,
  solution: 0.85,
  business: 0.8,
  resource: 0.7,
  article: 0.6,
  legal: 0.2,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return pageList
    .filter((p) => p.indexable !== false)
    .map((p) => ({
      url: absoluteUrl(p.path) + (p.path === "/" ? "/" : ""),
      lastModified: built,
      changeFrequency: p.group === "legal" ? "yearly" : p.group === "home" ? "weekly" : "monthly",
      priority: PRIORITY[p.group],
    }));
}
