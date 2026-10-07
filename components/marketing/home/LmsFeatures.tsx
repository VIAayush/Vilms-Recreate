"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowRight, Award, BarChart3, BookOpen, ClipboardCheck, FileVideo, GraduationCap, LineChart, Smartphone, Users } from "lucide-react";
import { Reveal } from "@/components/site-ui/Reveal";
import { swap } from "@/components/site-ui/motion-tokens";
import { PAGES, type PageKey } from "@/lib/site/pages";

// Two compact pieces from the content document: who VILMS serves (a selector
// that swaps its panel) and the nine LMS features (a hairline matrix).

const AUDIENCES: { id: string; label: string; text: string; features: string[]; page: PageKey }[] = [
  {
    id: "institutes",
    label: "Coaching & Training Institutes",
    text: "Manage courses, learners, trainers, assessments, and learning content from one platform.",
    features: ["Courses & batches", "Trainer management", "Online assessments"],
    page: "coaching",
  },
  {
    id: "education",
    label: "Educational Institutions",
    text: "Deliver structured online and blended learning while tracking learner progress.",
    features: ["Online & blended learning", "Progress tracking", "Reports & analytics"],
    page: "schoolsColleges",
  },
  {
    id: "corporate",
    label: "Corporate Training",
    text: "Train employees, manage onboarding, and support continuous learning across teams.",
    features: ["Employee onboarding", "Learning content", "Certificates"],
    page: "lmsPlatform",
  },
  {
    id: "hr",
    label: "HR & L&D Teams",
    text: "Organize employee training, monitor completion, and manage learning programs efficiently.",
    features: ["Training programs", "Completion monitoring", "Reports & analytics"],
    page: "lmsPlatform",
  },
];

const FEATURES = [
  { Icon: BookOpen, name: "Course Management", text: "Create and organize courses and learning programs." },
  { Icon: Users, name: "Learner Management", text: "Manage users, groups, batches, and learning access." },
  { Icon: ClipboardCheck, name: "Online Assessments", text: "Create quizzes, tests, assignments, and evaluations." },
  { Icon: LineChart, name: "Progress Tracking", text: "Monitor learner activity, completion, and performance." },
  { Icon: BarChart3, name: "Reports & Analytics", text: "Get useful insights into learning and training results." },
  { Icon: FileVideo, name: "Learning Content", text: "Manage videos, documents, presentations, and other resources." },
  { Icon: GraduationCap, name: "Trainer Management", text: "Organize trainers and their learning activities." },
  { Icon: Award, name: "Certificates", text: "Provide certificates after successful course completion." },
  { Icon: Smartphone, name: "Mobile-Friendly Learning", text: "Give learners convenient access across devices." },
];

export function LmsFeatures() {
  const [aud, setAud] = useState(0);
  const a = AUDIENCES[aud];

  return (
    <section id="features" className="scroll-mt-20 py-16 sm:py-24">
      <div className="wrap">
        <Reveal className="max-w-[760px]">
          <p className="kicker">One LMS for all your learning needs</p>
          <h2 className="mt-4 text-balance font-display text-[clamp(30px,4.2vw,54px)] font-medium leading-[1.05] tracking-[-0.035em]">Create, manage, deliver and track learning — with ease.</h2>
        </Reveal>

        {/* who it's for */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <LayoutGroup id="aud">
            <div role="tablist" aria-label="Who uses VILMS" className="flex flex-wrap gap-2 self-start">
              {AUDIENCES.map((x, i) => (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={i === aud}
                  onClick={() => setAud(i)}
                  className={clsx("relative rounded-full border px-4 py-2.5 text-[14.5px] font-medium transition-colors", i === aud ? "border-transparent text-white" : "border-edge text-fg-muted hover:border-edge-strong hover:text-fg")}
                >
                  {i === aud ? <motion.span layoutId="aud-pill" className="absolute inset-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 400, damping: 34 }} /> : null}
                  <span className="relative">{x.label}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
          <div role="tabpanel" className="min-h-[150px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={a.id} {...swap}>
                <p className="text-[19px] leading-snug tracking-[-0.01em] sm:text-[22px]">{a.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {a.features.map((f) => (
                    <li key={f} className="tag">
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={PAGES[a.page].path} className="link mt-5 inline-flex items-center gap-1.5 text-[15px]">
                  {PAGES[a.page].name} <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* the nine features */}
        <ul className="mt-14 grid border-l border-t border-edge sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ Icon, name, text }, i) => (
            <Reveal as="li" key={name} delay={(i % 3) * 70} className="group border-b border-r border-edge">
              <div className="flex h-full gap-4 p-5 transition-colors duration-300 hover:bg-canvas-alt sm:p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-edge bg-panel text-primary transition duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[16.5px] font-medium tracking-[-0.01em]">{name}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-fg-muted">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
