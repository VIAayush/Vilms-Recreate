import type { Viewport } from "next";
import { Caveat, Figtree, Geist_Mono, Instrument_Serif, Montserrat } from "next/font/google";
import { CursorFx } from "@/components/marketing/CursorFx";
import { Footer } from "@/components/marketing/Footer";
import { Header } from "@/components/marketing/Header";
import { MobileCtaBar } from "@/components/marketing/MobileCtaBar";
import { SiteProviders } from "@/components/site/SiteProviders";
import { ThirdPartyAnalytics } from "@/components/site/ThirdPartyAnalytics";
import { getSiteAnalyticsIds } from "@/lib/integrations/dispatch";
import "@/components/marketing/site.css";

// The public site's type: Figtree (open, round, light at large sizes) for
// interface and headlines, Instrument Serif
// for the occasional editorial accent, Geist Mono for labels, Caveat for the
// handwritten answer sheet. Same variable names as the root layout, redefined
// on this wrapper, so the CRM keeps its own fonts.
const sans = Figtree({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const hand = Caveat({ subsets: ["latin"], weight: ["500"], variable: "--font-hand", display: "swap" });
// The wordmark's wide geometric letters, as in the VILMS logo.
const logo = Montserrat({ subsets: ["latin"], weight: ["600"], variable: "--font-logo", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  // GA4 / Meta Pixel IDs from enabled CRM integrations (cached 5 minutes).
  const analytics = await getSiteAnalyticsIds();
  return (
    <div className={`site min-h-screen font-sans antialiased ${sans.variable} ${mono.variable} ${serif.variable} ${hand.variable} ${logo.variable}`}>
      <SiteProviders>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:font-semibold focus:text-primary-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />
        <CursorFx />
        <ThirdPartyAnalytics ga4Id={analytics.ga4} pixelId={analytics.pixel} />
      </SiteProviders>
    </div>
  );
}
