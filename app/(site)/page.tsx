import { Audience } from "@/components/marketing/sections/Audience";
import { Evaluation } from "@/components/marketing/sections/Evaluation";
import { FinalCta } from "@/components/marketing/sections/FinalCta";
import { Hero } from "@/components/marketing/sections/Hero";
import { Lifecycle } from "@/components/marketing/sections/Lifecycle";
import { Pipeline } from "@/components/marketing/sections/Pipeline";
import { Pricing } from "@/components/marketing/sections/Pricing";
import { ProductExplorer } from "@/components/marketing/sections/ProductExplorer";
import { RevenueShare } from "@/components/marketing/sections/RevenueShare";
import { ToolsCollapse } from "@/components/marketing/sections/ToolsCollapse";
import { WhiteLabel } from "@/components/marketing/sections/WhiteLabel";
import { WhyVilms } from "@/components/marketing/sections/WhyVilms";
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

// The conversion journey: what it is → why it's different → how it works →
// what it does → who it's for → what it costs → book a demo.
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Hero />
      <ToolsCollapse />
      <Lifecycle />
      <ProductExplorer />
      <Evaluation />
      <Pipeline />
      <RevenueShare />
      <WhiteLabel />
      <Audience />
      <WhyVilms />
      <Pricing />
      <FinalCta />
    </>
  );
}
