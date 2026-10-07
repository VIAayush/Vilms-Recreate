import { CtaBand } from "@/components/site-ui/CtaBand";
import { FaqAccordion } from "@/components/site-ui/FaqAccordion";
import { PageHero } from "@/components/site-ui/PageHero";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { Section } from "@/components/site-ui/Section";
import { Benefits } from "@/components/pages/products-a/Benefits";
import { LmsHero } from "@/components/pages/products-a/LmsHero";
import { PlatformEcosystem } from "@/components/pages/products-a/PlatformEcosystem";
import { SplitSection } from "@/components/pages/products-a/SplitSection";
import { ToolsToOne } from "@/components/pages/products-a/ToolsToOne";
import { UseCaseMatrix } from "@/components/pages/products-a/UseCaseMatrix";
import { BENEFITS, LMS_FAQ } from "@/components/pages/products-a/lms-data";
import { TrackView } from "@/components/site/TrackView";
import { JsonLd, faqLd, pageMetadata, softwareLd } from "@/lib/site/seo";

export const metadata = pageMetadata("lmsPlatform");

export default function LmsPlatformPage() {
  return (
    <>
      <JsonLd
        data={softwareLd({
          description:
            "VILMS is an LMS platform for coaching institutes, educational institutions, training organizations and businesses: courses, learners, trainers, assessments, progress, reports and certificates in one place.",
        })}
      />
      <JsonLd data={faqLd(LMS_FAQ)} />

      <PageHero
        page="lmsPlatform"
        kicker="Learning management system for institutes"
        title="LMS Platform for Coaching Institutes"
        lead="Simplify courses, training, assessments, and learner management with VILMS. Our LMS platform for coaching institutes helps coaching centers, educational institutions, training organizations, and businesses manage learning from one centralized platform."
        visual={<LmsHero />}
      />

      <Section
        id="what-is"
        kicker="Learning management"
        title="What Is an LMS Platform for Coaching Institutes?"
        lead={
          <>
            An LMS helps institutes create, manage, and deliver courses online. It allows administrators and trainers to manage learners, learning content, assessments, and progress in one place.
            <span className="mt-3 block">VILMS provides a simple learning management system for institutes to organize online and blended learning.</span>
          </>
        }
      >
        <TrackView name="feature_view" label="lms_platform_features" />
        <h3 className="mb-8 font-display text-[clamp(26px,3vw,38px)] font-medium tracking-[-0.03em]">Key Features</h3>
        <PlatformEcosystem />
      </Section>

      <Section
        id="who"
        tone="alt"
        kicker="Learning and training needs"
        title="Who Can Use VILMS?"
        lead="VILMS supports different learning and training needs."
      >
        <UseCaseMatrix />
      </Section>

      <SplitSection
        id="why"
        tone="navy"
        kicker="Why choose VILMS?"
        title="Courses, learners, trainers, assessments, and reports together"
        lead="VILMS brings courses, learners, trainers, assessments, and reports together in one easy-to-manage platform."
        aside={<p className="font-medium">With VILMS, you can:</p>}
      >
        <Benefits items={BENEFITS} />
      </SplitSection>

      <Section
        id="choose"
        kicker="Education management platform"
        title="Choose the Right Online LMS Platform"
        lead={
          <>
            When choosing an online LMS platform, look for easy course management, learner tracking, assessments, reporting, content management, and scalability.
            <span className="mt-3 block">VILMS helps organizations manage their learning requirements through one centralized education management platform.</span>
          </>
        }
      >
        <ToolsToOne />
      </Section>

      <Section
        id="manage"
        tone="alt"
        title="Manage Learning Smarter with VILMS"
        lead="Whether you need an LMS for coaching institutes, LMS software for institutes, employee training software, or a corporate learning platform, VILMS helps simplify learning and training management."
      />

      <Section id="faq" kicker="Questions" title="FAQs">
        <FaqAccordion items={LMS_FAQ} />
      </Section>

      <RelatedPages keys={["coaching", "onlineCourses", "onlineExams", "training"]} title="Keep exploring" />
      <CtaBand title="Ready to simplify your learning management?" lead="Courses, learners, trainers, assessments, and reports in one easy-to-manage platform." />
    </>
  );
}
