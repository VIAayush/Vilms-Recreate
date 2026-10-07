"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ICONS } from "@/components/site-ui/icons";
import { EASE } from "@/components/site-ui/motion-tokens";
import { Cta } from "@/components/site/Cta";
import { MENU, PAGES, type PageKey } from "@/lib/site/pages";

// The panel under a header trigger: icon, title and one line for each page,
// in the same grid the page registry defines. Items glide in one after
// another; each has its own hover state (icon fills, arrow slides in).

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.04 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE } },
};

function MenuItem({ pageKey, current, onNavigate }: { pageKey: PageKey; current: boolean; onNavigate: () => void }) {
  const p = PAGES[pageKey];
  const Icon = ICONS[p.icon];
  return (
    <motion.li variants={item}>
      <Link
        href={p.path}
        onClick={onNavigate}
        aria-current={current ? "page" : undefined}
        className="group flex items-start gap-3.5 rounded-xl p-3 transition-colors duration-200 hover:bg-canvas-alt focus-visible:bg-canvas-alt"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border border-edge bg-panel text-primary transition duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white group-hover:[transform:translateY(-1px)] ">
          <Icon aria-hidden className="h-[18px] w-[18px]" />
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-1.5 text-[15px] font-medium text-fg">
            {p.name}
            <ArrowRight aria-hidden className="h-3.5 w-3.5 -translate-x-1 text-primary opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
          </span>
          <span className="mt-0.5 block text-[13.5px] leading-snug text-fg-muted">{p.blurb}</span>
        </span>
      </Link>
    </motion.li>
  );
}

export function MegaPanel({ menuId, pathname, onNavigate }: { menuId: string; pathname: string; onNavigate: () => void }) {
  const menu = MENU.find((m) => m.id === menuId)!;
  const cols = menu.groups.reduce((n, g) => n + g.keys.length, 0) > 5 ? 2 : 1;

  return (
    <motion.div
      id={`mega-${menuId}`}
      role="region"
      aria-label={menu.label}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE } }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.14 } }}
      className="absolute inset-x-0 top-full"
    >
      <div className="wrap">
        <div className="overflow-hidden rounded-b-[28px] border border-t-0 border-edge bg-canvas shadow-[0_40px_80px_-30px_rgb(14_27_44/0.35)]">
          <div className="grid gap-2 p-3 lg:grid-cols-[minmax(0,1fr)_300px] lg:p-4">
            <div className={cols === 2 || menu.groups.length > 1 ? "grid gap-x-2 gap-y-1 md:grid-cols-2" : "grid"}>
              {menu.groups.map((g, gi) => (
                <motion.ul key={gi} variants={list} initial="hidden" animate="show" className={cols === 2 && menu.groups.length === 1 ? "contents" : "space-y-0.5"}>
                  {g.label ? <li className="px-3 pb-1 pt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">{g.label}</li> : null}
                  {g.keys.map((k) => (
                    <MenuItem key={k} pageKey={k} current={pathname === PAGES[k].path} onNavigate={onNavigate} />
                  ))}
                </motion.ul>
              ))}
            </div>

            {/* the standing offer, same in every menu */}
            <div className="band-navy relative flex flex-col justify-between overflow-hidden rounded-[20px] p-6">
              <div aria-hidden className="grid-bg-dark pointer-events-none absolute inset-0" />
              <div className="relative">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">Your students pay you</p>
                <p className="mt-3 text-[22px] font-medium leading-tight tracking-[-0.02em] text-white">Not your software.</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">0% revenue share. 14-day free trial, no card.</p>
              </div>
              <div className="relative mt-6 flex flex-col gap-2">
                <Cta intent="trial" location="mega_menu" className="cta cta-sm w-full bg-white text-[rgb(0_48_86)] hover:bg-[rgb(220_234_250)]">
                  Start Free Trial
                </Cta>
                <Link
                  href={PAGES.demo.path}
                  onClick={onNavigate}
                  className="group inline-flex items-center justify-center gap-1.5 rounded-full py-2 text-[13.5px] font-medium text-white/85 transition-colors hover:text-white"
                >
                  Book a demo
                  <ArrowUpRight aria-hidden className="h-3.5 w-3.5 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
