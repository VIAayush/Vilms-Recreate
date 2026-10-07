"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { ICONS } from "@/components/site-ui/icons";
import { EASE } from "@/components/site-ui/motion-tokens";
import { Cta } from "@/components/site/Cta";
import { MENU, PAGES } from "@/lib/site/pages";

// The mega menu on a phone: full-screen, one accordion per section, the two
// conversion actions pinned at the bottom.
export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const [section, setSection] = useState<string | null>("product");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div id="mobile-menu" hidden={!open} className="h-[calc(100dvh-56px)] overflow-y-auto bg-canvas lg:hidden">
      <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pb-8 pt-2">
        <ul className="divide-y divide-edge border-b border-edge">
          {MENU.map((m) => {
            const isOpen = section === m.id;
            return (
              <li key={m.id}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`m-${m.id}`}
                  onClick={() => setSection(isOpen ? null : m.id)}
                  className="flex w-full items-center justify-between py-4 text-left text-[22px] font-medium tracking-[-0.02em]"
                >
                  {m.label}
                  <ChevronDown aria-hidden className={clsx("h-5 w-5 text-fg-faint transition-transform duration-300", isOpen && "rotate-180")} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`m-${m.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pb-3">
                        {m.groups.map((g, gi) => (
                          <div key={gi}>
                            {g.label ? <p className="px-2 pb-1 pt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">{g.label}</p> : null}
                            <ul>
                              {g.keys.map((k) => {
                                const p = PAGES[k];
                                const Icon = ICONS[p.icon];
                                return (
                                  <li key={k}>
                                    <Link
                                      href={p.path}
                                      onClick={onClose}
                                      aria-current={pathname === p.path ? "page" : undefined}
                                      className="flex items-center gap-3 rounded-xl px-2 py-2.5 active:bg-canvas-alt"
                                    >
                                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-primary-tint text-primary">
                                        <Icon aria-hidden className="h-[18px] w-[18px]" />
                                      </span>
                                      <span className="min-w-0">
                                        <span className="block text-[15.5px] font-medium">{p.name}</span>
                                        <span className="block truncate text-[13px] text-fg-muted">{p.blurb}</span>
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
          <li>
            <Link href={PAGES.pricing.path} onClick={onClose} className="flex items-center justify-between py-4 text-[22px] font-medium tracking-[-0.02em]">
              Pricing
            </Link>
          </li>
        </ul>
        <div className="mt-auto grid gap-3 pt-8">
          <Cta intent="trial" location="mobile_menu" className="cta cta-primary cta-lg w-full" arrow>
            Start 14-Day Free Trial
          </Cta>
          <Link href={PAGES.demo.path} onClick={onClose} className="cta cta-ghost cta-lg w-full">
            Book a Demo
          </Link>
        </div>
      </nav>
    </div>
  );
}
