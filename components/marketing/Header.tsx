"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { explorer, nav, type ExplorerTabId } from "@/lib/content";
import { Wordmark } from "./BrandMark";
import { ThemeToggle } from "./ThemeToggle";
import { useScrolledPast } from "./motion";
import { openExplorerTab } from "./explore-link";

export function Header() {
  const scrolled = useScrolledPast(8);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || menuOpen ? "border-b border-edge bg-canvas-alt backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent",
      )}
    >
      <div className="wrap flex h-16 items-center gap-6">
        <Link href="/" aria-label="VILMS home" className="rounded-lg" onClick={closeMenu}>
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 lg:flex">
          <ProductMenu />
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="nav-link rounded-full px-3.5 py-2 text-[14.5px] font-medium text-fg-muted transition hover:text-primary">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Cta intent="demo" location="nav" className="cta cta-outline cta-sm hidden md:inline-flex">
            Book a Demo
          </Cta>
          <Cta intent="trial" location="nav" className="cta cta-primary cta-sm hidden min-[400px]:inline-flex">
            Start Free Trial
          </Cta>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-fg transition hover:bg-sunken lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </header>
  );
}

function ProductMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <div ref={ref} className="relative" onPointerEnter={(e) => e.pointerType === "mouse" && show()} onPointerLeave={(e) => e.pointerType === "mouse" && hide()}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={(e) => {
          // A mouse has already opened it on hover, so a click shouldn't close
          // it again; touch and keyboard toggle.
          const mouse = (e.nativeEvent as PointerEvent).pointerType === "mouse";
          setOpen((v) => (mouse ? true : !v));
        }}
        className={clsx("flex items-center gap-1 rounded-full px-3.5 py-2 text-[14.5px] font-medium transition hover:bg-sunken hover:text-fg", open ? "text-fg" : "text-fg-muted")}
      >
        Product
        <ChevronDown aria-hidden className={clsx("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")} />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute left-0 top-full w-[560px] pt-3"
      >
        <div className="grid animate-pop-in grid-cols-[1fr_200px] overflow-hidden rounded-2xl border border-edge bg-panel shadow-soft">
          <ul className="p-2">
            {explorer.tabs.map((t, i) => (
              <li key={t.id}>
                <a
                  href={`/#product-${t.id}`}
                  onClick={(e) => {
                    setOpen(false);
                    if (pathname === "/") {
                      e.preventDefault();
                      openExplorerTab(t.id as ExplorerTabId);
                    }
                  }}
                  className="group flex items-baseline gap-3 rounded-xl px-3 py-2.5 transition hover:bg-sunken"
                >
                  <span className="font-mono text-[11px] text-fg-faint">0{i + 1}</span>
                  <span>
                    <span className="block text-[15px] font-semibold">{t.label}</span>
                    <span className="block text-[13px] text-fg-muted">{t.line}</span>
                  </span>
                  <ArrowRight aria-hidden className="ml-auto h-4 w-4 -translate-x-1 self-center text-fg-faint opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col justify-between border-l border-edge bg-canvas-alt p-5">
            <p className="font-display text-[19px] font-semibold leading-tight tracking-tight">
              See it on your institute&apos;s setup.
            </p>
            <div>
              <p className="mb-3 text-[13px] text-fg-muted">A 30-minute walkthrough of what moves over.</p>
              <Cta intent="demo" location="nav_product_menu" className="cta cta-outline cta-sm w-full" arrow>
                Book a Demo
              </Cta>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

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
    <div id="mobile-menu" hidden={!open} className="h-[calc(100dvh-64px)] overflow-y-auto bg-canvas lg:hidden">
      <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pb-8 pt-4">
        <p className="kicker">Product</p>
        <ul className="mt-3 grid grid-cols-2 gap-2">
          {explorer.tabs.map((t) => (
            <li key={t.id}>
              <a
                href={`/#product-${t.id}`}
                onClick={(e) => {
                  onClose();
                  if (pathname === "/") {
                    e.preventDefault();
                    openExplorerTab(t.id as ExplorerTabId);
                  }
                }}
                className="block rounded-2xl border border-edge bg-panel px-4 py-3"
              >
                <span className="block text-[16px] font-semibold">{t.label}</span>
                <span className="mt-0.5 line-clamp-2 text-[12.5px] text-fg-muted">{t.line}</span>
              </a>
            </li>
          ))}
        </ul>
        <ul className="mt-6 divide-y divide-edge border-y border-edge">
          {nav.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={onClose} className="flex items-center justify-between py-4 font-display text-[24px] font-semibold tracking-tight">
                {l.label}
                <ArrowRight aria-hidden className="h-5 w-5 text-fg-faint" />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto grid gap-3 pt-8">
          <Cta intent="trial" location="mobile_menu" className="cta cta-primary cta-lg w-full" arrow>
            Start 14-Day Free Trial
          </Cta>
          <Cta intent="demo" location="mobile_menu" className="cta cta-outline cta-lg w-full">
            Book a Demo
          </Cta>
        </div>
      </nav>
    </div>
  );
}
