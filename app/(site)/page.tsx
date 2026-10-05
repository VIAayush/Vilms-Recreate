import { About } from "@/components/marketing/labs/About";
import { Discover } from "@/components/marketing/labs/Discover";
import { Ecosystem } from "@/components/marketing/labs/Ecosystem";
import { Evaluation } from "@/components/marketing/labs/Evaluation";
import { HeroCarousel } from "@/components/marketing/labs/HeroCarousel";
import { Pipeline } from "@/components/marketing/labs/Pipeline";
import { Pricing } from "@/components/marketing/labs/Pricing";
import { ProductGrid } from "@/components/marketing/labs/ProductGrid";
import { Revenue } from "@/components/marketing/labs/Revenue";
import { StayConnected } from "@/components/marketing/labs/StayConnected";
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

// The Google Labs flow: featured carousel → discover → every product →
// about → the student lifecycle → CRM, AI evaluation, 0% → pricing → stay connected.
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <HeroCarousel />
      <Discover />
      <ProductGrid />
      <About />
      <Ecosystem />
      <Pipeline />
      <Evaluation />
      <Revenue />
      <Pricing />
      <StayConnected />
    </>
  );
}
