import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/site-ui/CtaBand";
import { FaqAccordion } from "@/components/site-ui/FaqAccordion";
import { PageHero } from "@/components/site-ui/PageHero";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { Section } from "@/components/site-ui/Section";
import { Benefits } from "@/components/pages/products-a/Benefits";
import { ExamDemo } from "@/components/pages/products-a/ExamDemo";
import { ExamFlow } from "@/components/pages/products-a/ExamFlow";
import { FeatureIndex } from "@/components/pages/products-a/FeatureIndex";
import { GradeHistory } from "@/components/pages/products-a/GradeHistory";
import { MentorRubric } from "@/components/pages/products-a/MentorRubric";
import { SplitSection } from "@/components/pages/products-a/SplitSection";
import { EXAM_FAQ, EXAM_FEATURES, EXAM_WHO, EXAM_WHY } from "@/components/pages/products-a/exams-data";
import { TrackView } from "@/components/site/TrackView";
import { PAGES } from "@/lib/site/pages";
import { JsonLd, faqLd, pageMetadata, softwareLd } from "@/lib/site/seo";

export const metadata = pageMetadata("onlineExams");

export default function OnlineExamPlatformPage() {
  return (
    <>
      <JsonLd
        data={softwareLd({
          description:
            "Online exam software for coaching institutes: conduct online tests, mock exams, quizzes and assessments, and review results, scores and learner performance from one platform.",
        })}
      />
      <JsonLd data={faqLd(EXAM_FAQ)} />

      <PageHero
        page="onlineExams"
        kicker="Online Exam & Test Platform"
        title="Online Exam Software for Coaching Institutes"
        lead={
          <>
            Conduct online tests, mock exams, quizzes, and assessments with VILMS. Our online exam software for coaching institutes helps coaching centers, educational institutions, training institutes, and
            businesses manage exams from one centralized platform.
          </>
        }
        visual={<ExamDemo />}
      />

      <Section
        id="what-is"
        kicker="Online exams"
        title="What Is Online Exam Software?"
        lead={
          <>
            Online exam software helps organizations create, conduct, and manage exams digitally. It allows administrators and trainers to create questions, schedule tests, manage candidates, and track
            results.
            <span className="mt-3 block">VILMS provides an easy online test platform for coaching institutes to simplify digital examinations and assessments.</span>
          </>
        }
      >
        <TrackView name="feature_view" label="exam_flow" />
        <ExamFlow />
      </Section>

      <Section id="features" tone="alt" kicker="Online exam software" title="Key Features">
        <FeatureIndex items={EXAM_FEATURES} />
      </Section>

      <Section id="performance" kicker="Performance Tracking" title="Track scores, completion, and learner performance" lead="Every result is kept on the learner's profile, so it is clear which areas need improvement.">
        <GradeHistory />
      </Section>

      <SplitSection
        id="evaluate"
        tone="alt"
        kicker="Trainers"
        title="Evaluate learner performance"
        lead="For long answers, a trainer reviews each rubric criterion, adjusts the score and approves it before the learner sees it."
        aside={
          <Link href={PAGES.aiEvaluation.path} className="cta cta-outline group">
            See AI answer evaluation
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        }
      >
        <MentorRubric />
      </SplitSection>

      <Section id="who" kicker="Examination and assessment needs" title="Who Can Use VILMS?" lead="VILMS can support different examination and assessment needs.">
        <FeatureIndex items={EXAM_WHO} />
      </Section>

      <SplitSection
        id="why"
        tone="navy"
        kicker="Exam management software"
        title="Why Use VILMS for Online Exams?"
        lead="Managing exams manually can take time and make result tracking difficult. An exam management software solution helps bring test creation, assessments, results, and reporting into one platform."
        aside={<p className="font-medium">With VILMS, you can:</p>}
      >
        <Benefits items={EXAM_WHY} />
      </SplitSection>

      <Section
        id="india"
        title="Online Assessment Platform for India"
        lead={
          <>
            VILMS provides an online assessment platform in India for organizations that need a simple way to conduct tests and evaluate learners.
            <span className="mt-3 block">Whether you need mock test software for a coaching institute or an assessment solution for employee training, VILMS helps simplify the process.</span>
          </>
        }
      >
        <div className="max-w-[760px] border-l-2 border-primary pl-6">
          <h3 className="font-display text-[clamp(22px,2.6vw,30px)] font-medium tracking-[-0.03em]">Why Choose VILMS?</h3>
          <p className="mt-3 text-[16.5px] leading-relaxed text-fg-muted">
            VILMS brings learning, testing, assessment, and performance tracking together in one centralized platform. It helps administrators and trainers manage online examinations while giving learners
            an organized testing experience.
          </p>
        </div>
      </Section>

      <Section id="faq" tone="alt" kicker="Questions" title="Frequently Asked Questions">
        <FaqAccordion items={EXAM_FAQ} />
      </Section>

      <RelatedPages keys={["aiEvaluation", "testPrep", "onlineCourses", "coaching"]} title="Keep exploring" />
      <CtaBand title="Ready to simplify your online exams?" lead="Conduct mock tests and quizzes, track learner performance and review results and reports from one centralized platform." />
    </>
  );
}
