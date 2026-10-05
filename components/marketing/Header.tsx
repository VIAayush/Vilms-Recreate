"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ArrowRight, Menu, X } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { nav } from "@/lib/content";
import { Wordmark } from "./BrandMark";
import { ThemeToggle } from "./ThemeToggle";
import { useScrolledPast } from "./motion";

// Minimal and sticky. On the home page it starts transparent with light type
// over the dark hero; once you scroll it turns white and picks up a hairline.
export function Header() {
  const scrolled = useScrolledPast(12);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const overHero = usePathname() === "/";
  const solid = scrolled || menuOpen || !overHero;
  const light = !solid; // white type over the hero

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300",
        solid ? "border-b border-edge bg-canvas/85 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent",
      )}
    >
      <div className={clsx("wrap flex items-center gap-6 transition-[height] duration-300", solid ? "h-14" : "h-[72px]")}>
        <Link href="/" aria-label="VILMS home" className="rounded-lg" onClick={closeMenu}>
          <Wordmark variant={light ? "dark" : "auto"} />
        </Link>

        <nav aria-label="Main" className="mx-auto hidden items-center gap-1 md:flex">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className={clsx("nav-link rounded-full px-4 py-2 text-[14.5px] font-medium transition-colors", light ? "text-white/80 hover:text-white" : "text-fg-muted hover:text-fg")}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <div className={clsx("contents", light && "[&>button:first-child]:text-white [&>button:first-child]:hover:bg-white/10")}>
            <ThemeToggle />
          </div>
          <Cta intent="demo" location="nav" className={clsx("cta cta-sm hidden lg:inline-flex", light ? "text-white hover:bg-white/10" : "cta-ghost border-transparent bg-transparent")}>
            Book a Demo
          </Cta>
          <Cta
            intent="trial"
            location="nav"
            className={clsx("cta cta-sm hidden min-[400px]:inline-flex", light ? "bg-white text-[rgb(0_48_86)] hover:bg-[rgb(220_234_250)]" : "cta-primary")}
          >
            Start Free Trial
          </Cta>
          <button
            type="button"
            className={clsx("grid h-10 w-10 place-items-center rounded-full transition md:hidden", light ? "text-white hover:bg-white/10" : "text-fg hover:bg-sunken")}
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

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
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
    <div id="mobile-menu" hidden={!open} className="h-[calc(100dvh-56px)] overflow-y-auto bg-canvas md:hidden">
      <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pb-8 pt-4">
        <ul className="divide-y divide-edge border-y border-edge">
          {nav.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={onClose} className="flex items-center justify-between py-5 font-display text-[28px] font-semibold tracking-tight">
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
