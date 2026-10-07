import { CtaBand } from "@/components/site-ui/CtaBand";
import { FaqAccordion } from "@/components/site-ui/FaqAccordion";
import { PageHero } from "@/components/site-ui/PageHero";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { Section } from "@/components/site-ui/Section";
import { Benefits } from "@/components/pages/products-a/Benefits";
import { CourseBuilder } from "@/components/pages/products-a/CourseBuilder";
import { CourseJourney } from "@/components/pages/products-a/CourseJourney";
import { FeatureIndex } from "@/components/pages/products-a/FeatureIndex";
import { HybridBlock } from "@/components/pages/products-a/HybridBlock";
import { InsideLesson } from "@/components/pages/products-a/InsideLesson";
import { SplitSection } from "@/components/pages/products-a/SplitSection";
import { COURSE_CREATE, COURSE_FAQ, COURSE_WHO, COURSE_WHY } from "@/components/pages/products-a/courses-data";
import { TrackView } from "@/components/site/TrackView";
import { JsonLd, faqLd, pageMetadata, softwareLd } from "@/lib/site/seo";

export const metadata = pageMetadata("onlineCourses");

export default function OnlineCoursePlatformPage() {
  return (
    <>
      <JsonLd
        data={softwareLd({
          description:
            "An online course platform for educators: create, manage and deliver online courses, learning content, assessments and learner progress from one place.",
        })}
      />
      <JsonLd data={faqLd(COURSE_FAQ)} />

      <PageHero
        page="onlineCourses"
        layout="stack"
        kicker="Online Courses & Live Classes"
        title="Online Course Platform for Educators"
        lead="Create, manage, and deliver online courses with VILMS. Our online course platform for educators helps teachers, trainers, coaching institutes, and education businesses create engaging courses and manage learners from one place."
        visual={<CourseBuilder />}
      />

      <Section
        id="what-is"
        kicker="Online courses"
        title="What Is an Online Course Platform?"
        lead={
          <>
            An online course platform helps educators create, organize, publish, and manage courses digitally. It provides tools to upload learning content, manage students, conduct assessments, and
            track learner progress.
            <span className="mt-3 block">VILMS makes online course management simple for educators and training professionals.</span>
          </>
        }
      >
        <TrackView name="feature_view" label="course_journey" />
        <CourseJourney />
      </Section>

      <Section
        id="create"
        tone="alt"
        kicker="Course management"
        title="Create and Manage Online Courses"
        lead="VILMS provides the tools you need to build and manage structured online courses."
      >
        <FeatureIndex items={COURSE_CREATE} />
        <div className="mt-14">
          <InsideLesson />
        </div>
      </Section>

      <Section id="who" kicker="Educators and trainers" title="Who Can Use VILMS?">
        <FeatureIndex items={COURSE_WHO} />
      </Section>

      <SplitSection
        id="why"
        tone="navy"
        kicker="Online course management platform"
        title="Why Choose VILMS?"
        lead="VILMS brings course creation, learner management, content delivery, and progress tracking together in one online course management platform."
        aside={<p className="font-medium">With VILMS, you can:</p>}
      >
        <Benefits items={COURSE_WHY} />
      </SplitSection>

      <Section id="programs" kicker="Learning programs" title="Support different learning programs" lead="Pick a format to see which modules belong to it.">
        <HybridBlock />
      </Section>

      <Section
        id="india"
        tone="alt"
        kicker="Course creation platform for teachers"
        title="Online Teaching Platform for India"
        lead={
          <>
            Whether you are an independent teacher, trainer, coaching institute, or education business, VILMS provides an online teaching platform in India to help you manage and deliver courses
            digitally.
            <span className="mt-3 block">You can create structured learning experiences without managing multiple tools separately.</span>
          </>
        }
      >
        <div className="max-w-[760px] border-l-2 border-primary pl-6">
          <h3 className="font-display text-[clamp(22px,2.6vw,30px)] font-medium tracking-[-0.03em]">Start Creating Online Courses</h3>
          <p className="mt-3 text-[16.5px] leading-relaxed text-fg-muted">
            Looking for a course creation platform for teachers or a complete online course management solution? VILMS helps you create, manage, and deliver online learning from one centralized
            platform.
          </p>
        </div>
      </Section>

      <Section id="faq" kicker="Questions" title="Frequently Asked Questions">
        <FaqAccordion items={COURSE_FAQ} />
      </Section>

      <RelatedPages keys={["onlineExams", "coaching", "onlineCoaching", "lmsPlatform"]} title="Keep exploring" />
      <CtaBand title="Ready to take your courses online?" lead="Create, manage, and deliver online learning from one centralized platform." />
    </>
  );
}
