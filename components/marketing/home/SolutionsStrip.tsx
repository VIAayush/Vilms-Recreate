import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site-ui/Reveal";
import { PAGES, type PageKey } from "@/lib/site/pages";

// "Built for every kind of institute": the five solution pages as a large
// typographic list. No cards — hairline rows that wake up on hover.
const ROWS: { key: PageKey; focus: string }[] = [
  { key: "coaching", focus: "Admissions · batches · tests · fees" },
  { key: "testPrep", focus: "Mock tests · evaluation · performance" },
  { key: "onlineCoaching", focus: "Courses · live classes · payments" },
  { key: "training", focus: "Programmes · assessments · certificates" },
  { key: "schoolsColleges", focus: "Paid programmes · assessments · faculty" },
];

export function SolutionsStrip() {
  return (
    <section id="solutions" className="scroll-mt-20 py-16 sm:py-24">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <Reveal>
          <p className="kicker">Solutions</p>
          <h2 className="mt-4 text-balance font-display text-[clamp(32px,4.4vw,56px)] font-medium leading-[1.04] tracking-[-0.035em]">Built for the way your institute teaches</h2>
          <p className="sub mt-5 max-w-[400px]">Coaching, test prep, online academies, training and schools — each with its own workflow, not a reskinned page.</p>
        </Reveal>

        <ul className="border-t border-edge">
          {ROWS.map((r, i) => {
            const p = PAGES[r.key];
            return (
              <Reveal as="li" key={r.key} delay={i * 60} className="border-b border-edge">
                <Link href={p.path} className="group flex items-center gap-5 py-6 transition-[padding,background-color] duration-300 hover:bg-canvas-alt/70 sm:py-7 lg:hover:pl-4">
                  <span className="w-7 font-mono text-[12px] tabular-nums text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[clamp(22px,2.8vw,34px)] font-medium leading-tight tracking-[-0.025em] transition-colors group-hover:text-primary">{p.name}</span>
                    <span className="mt-1 block text-[14px] text-fg-muted">{r.focus}</span>
                  </span>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-edge-strong transition duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white ">
                    <ArrowUpRight aria-hidden className="h-[18px] w-[18px] transition-transform duration-300 group-hover:rotate-12" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
