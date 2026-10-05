import { Audience } from "@/components/marketing/sections/Audience";
import { Brand } from "@/components/marketing/sections/Brand";
import { Crm } from "@/components/marketing/sections/Crm";
import { Evaluate } from "@/components/marketing/sections/Evaluate";
import { Explore } from "@/components/marketing/sections/Explore";
import { FinalCta } from "@/components/marketing/sections/FinalCta";
import { Hero } from "@/components/marketing/sections/Hero";
import { Journey } from "@/components/marketing/sections/Journey";
import { Pricing } from "@/components/marketing/sections/Pricing";
import { Revenue } from "@/components/marketing/sections/Revenue";
import { Showcase } from "@/components/marketing/sections/Showcase";
import { pricing } from "@/lib/content";
import { SITE_URL } from "@/lib/env";

// Structured data from the published price list — no ratings or reviews.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VILMS",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web, Android, iOS",
  url: SITE_URL,
  description:
    "All-in-one learning platform for coaching institutes — courses, live classes, answer evaluation, payments and leads, under your own brand, with 0% revenue share.",
  offers: pricing.plans.map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: p.price.replace(/[^\d]/g, ""),
    priceCurrency: "INR",
    description: `${p.students}. Price per month, excluding GST.`,
  })),
};

// A product to explore, not a page to read: see it → explore it → follow a
// student → watch it run → AI → admissions → the money → your brand → who
// it's for → price → start.
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Hero />
      <Explore />
      <Journey />
      <Showcase />
      <Evaluate />
      <Crm />
      <Revenue />
      <Brand />
      <Audience />
      <Pricing />
      <FinalCta />
    </>
  );
}
