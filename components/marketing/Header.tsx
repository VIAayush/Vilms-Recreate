"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { MENU, PAGES } from "@/lib/site/pages";
import { Wordmark } from "./BrandMark";
import { MegaPanel } from "./nav/MegaMenu";
import { MobileMenu } from "./nav/MobileMenu";
import { useScrolledPast } from "./motion";

// Logo · Product · Solutions · Business · Resources ........ Pricing · Book a
// Demo · Start Free Trial. No public sign-in (the CRM keeps its own login).
//
// Panels open on hover for a mouse and on click / Enter / Space for everyone
// else; Escape closes and returns focus to the trigger. The bar is
// transparent at the top of the page and turns white with a hairline once you
// scroll or open a panel.
export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolledPast(8);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const root = useRef<HTMLElement>(null);

  const closeAll = useCallback(() => {
    setOpen(null);
    setMobile(false);
  }, []);

  // Close whatever is open when the route changes (state adjusted during
  // render, the React-recommended alternative to an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const trigger = root.current?.querySelector<HTMLElement>(`[data-trigger="${open}"]`);
      setOpen(null);
      trigger?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const hoverOpen = (id: string) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(id), 70);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  };
  const keepOpen = () => window.clearTimeout(closeTimer.current);

  const groupOf = (menuId: string) => MENU.find((m) => m.id === menuId)!.groups.some((g) => g.keys.some((k) => PAGES[k].path === pathname));
  const solid = scrolled || open !== null || mobile;

  return (
    <header
      ref={root}
      onPointerLeave={hoverClose}
      onPointerEnter={keepOpen}
      onBlur={(e) => {
        if (open && !e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
      }}
      className={clsx(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        solid ? "border-b border-edge bg-canvas/90 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent",
        open && "border-transparent",
      )}
    >
      <div className={clsx("wrap flex items-center gap-4 transition-[height] duration-300 lg:gap-6", solid ? "h-14" : "h-[68px]")}>
        <Link href="/" aria-label="VILMS home" className="rounded-lg" onClick={closeAll}>
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="ml-2 hidden items-center lg:flex">
          {MENU.map((m) => {
            const active = groupOf(m.id);
            const isOpen = open === m.id;
            return (
              <div key={m.id} onPointerEnter={hoverOpen(m.id)}>
                <button
                  type="button"
                  data-trigger={m.id}
                  aria-expanded={isOpen}
                  aria-controls={`mega-${m.id}`}
                  onClick={() => setOpen(isOpen ? null : m.id)}
                  className={clsx(
                    "nav-link group inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors",
                    isOpen || active ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {m.label}
                  <ChevronDown aria-hidden className={clsx("h-3.5 w-3.5 transition-transform duration-300", isOpen && "rotate-180")} />
                </button>
              </div>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <Link
            href={PAGES.pricing.path}
            aria-current={pathname === PAGES.pricing.path ? "page" : undefined}
            className="nav-link hidden rounded-full px-3.5 py-2 text-[14.5px] font-medium text-fg-muted transition-colors hover:text-fg lg:inline-block"
          >
            Pricing
          </Link>
          <Link href={PAGES.demo.path} className="cta cta-ghost cta-sm hidden lg:inline-flex">
            Book a Demo
          </Link>
          <Cta intent="trial" location="nav" className="cta cta-primary cta-sm hidden lg:inline-flex">
            Start Free Trial
          </Cta>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-fg transition hover:bg-sunken lg:hidden"
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            aria-label={mobile ? "Close menu" : "Open menu"}
            onClick={() => setMobile((v) => !v)}
          >
            {mobile ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* a soft veil over the page while a panel is open */}
      <AnimatePresence>
        {open ? (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none fixed inset-x-0 bottom-0 top-14 -z-10 hidden bg-[rgb(14_27_44/0.14)] backdrop-blur-[2px] lg:block"
          />
        ) : null}
      </AnimatePresence>

      <div className="hidden lg:block" onPointerEnter={keepOpen}>
        <AnimatePresence mode="wait">{open ? <MegaPanel key={open} menuId={open} pathname={pathname} onNavigate={closeAll} /> : null}</AnimatePresence>
      </div>

      <MobileMenu open={mobile} onClose={closeAll} pathname={pathname} />
    </header>
  );
}
