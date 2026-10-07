import { CtaBand } from "@/components/site-ui/CtaBand";
import { Evaluation } from "@/components/marketing/labs/Evaluation";
import { Pipeline } from "@/components/marketing/labs/Pipeline";
import { Pricing } from "@/components/marketing/labs/Pricing";
import { Revenue } from "@/components/marketing/labs/Revenue";
import { HomeFaq } from "@/components/marketing/home/HomeFaq";
import { HomeHero } from "@/components/marketing/home/HomeHero";
import { Lifecycle } from "@/components/marketing/home/Lifecycle";
import { LmsFeatures } from "@/components/marketing/home/LmsFeatures";
import { ProductShowcase } from "@/components/marketing/home/ProductShowcase";
import { SolutionsStrip } from "@/components/marketing/home/SolutionsStrip";
import { pricing } from "@/lib/content";
import { JsonLd, organizationLd, pageMetadata, softwareLd } from "@/lib/site/seo";

export const metadata = pageMetadata("home");

// Structured data from the published price list — no ratings or reviews.
const software = softwareLd({
  description:
    "All-in-one learning platform for coaching institutes — courses, live classes, answer evaluation, payments and leads, under your own brand, with 0% revenue share.",
  offers: pricing.plans.map((p) => ({ name: p.name, price: p.price, description: `${p.students}. Price per month, excluding GST.` })),
});

// Home: hero with the living product → pick a product → the statement → one
// student's lifecycle → AI evaluation → CRM → 0% → solutions → pricing → CTA.
export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationLd(), software]} />
      <HomeHero />
      <ProductShowcase />
      <Lifecycle />
      <LmsFeatures />
      <Evaluation />
      <Pipeline />
      <Revenue />
      <SolutionsStrip />
      <Pricing />
      <HomeFaq />
      <CtaBand />
    </>
  );
}
