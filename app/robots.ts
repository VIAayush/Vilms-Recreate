import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/env";

// Everything public is crawlable. The CRM and the API are not: they are
// private tools, and /crm also sends its own noindex header (next.config.ts).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/crm", "/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
