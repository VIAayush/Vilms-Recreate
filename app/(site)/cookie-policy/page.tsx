import Link from "next/link";
import { CookieTable, EVENTS } from "@/components/pages/legal/CookieTable";
import { LegalLayout, LegalSection } from "@/components/pages/legal/LegalLayout";
import { StorageInspector } from "@/components/pages/legal/StorageInspector";
import { brand } from "@/lib/content";
import { href } from "@/lib/site/pages";
import { pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("cookies");

const TOC = [
  { id: "short", label: "The short version" },
  { id: "storage", label: "What is stored" },
  { id: "events", label: "Analytics events" },
  { id: "third-party", label: "Optional third-party tools" },
  { id: "signals", label: "Privacy signals" },
  { id: "control", label: "Check and clear it" },
];

// Every statement here is read from the code (lib/client/tracking.ts,
// components/marketing/ThemeToggle.tsx, components/site/ThirdPartyAnalytics.tsx,
// app/api/track). Keep it in step with them.
export default function CookiePolicyPage() {
  return (
    <LegalLayout
      page="cookies"
      summary="What the VILMS website keeps in your browser, why, and how to control it. No fine print: it is a short list."
      meta="Reflects the website as of October 2026"
      glance={[
        "This website does not set cookies of its own for visitors.",
        "It uses your browser’s local and session storage for five small items.",
        "No fingerprinting. A privacy signal switches analytics off.",
        "You can see and clear everything at the bottom of this page.",
      ]}
      toc={TOC}
    >
      <LegalSection id="short" n={1} title="The short version">
        <p>
          This website does not set cookies of its own for visitors. Instead it keeps a few small items in your browser’s <strong>local storage</strong> and <strong>session storage</strong>, listed below. They hold a theme choice, a random identifier for our own analytics and the campaign tags of the link you arrived through.
        </p>
        <p>
          Nothing in them is your name or contact details. If your browser sends Global Privacy Control or Do Not Track, the analytics items are not created. See <Link href={href("privacy")}>the Privacy policy</Link> for how we handle the details you type into a form.
        </p>
      </LegalSection>

      <LegalSection id="storage" n={2} title="What is stored in your browser">
        <p>If your browser blocks storage, these values live only in memory until you leave the page.</p>
        <div className="!mt-6">
          <CookieTable />
        </div>
      </LegalSection>

      <LegalSection id="events" n={3} title="Analytics events sent to us">
        <p>
          We count how the site is used with a small first-party system: your browser sends events to <code className="rounded bg-sunken px-1.5 py-0.5 font-mono text-[14px] text-fg">/api/track</code> on this website. The events are:
        </p>
        <ul className="!mt-4 divide-y divide-edge border-y border-edge">
          {EVENTS.map((e) => (
            <li key={e.name} className="grid gap-x-6 py-3.5 sm:grid-cols-[170px_minmax(0,1fr)]">
              <span className="font-medium text-fg">{e.name}</span>
              <span>{e.text}</span>
            </li>
          ))}
        </ul>
        <p>
          Each event carries the page path, the session ID, the visitor ID, your landing page, the external site you came from and any campaign tags. Your IP address is not stored in readable form, and automated traffic is ignored.
        </p>
      </LegalSection>

      <LegalSection id="third-party" n={4} title="Optional third-party analytics">
        <p>
          Google Analytics 4 and the Meta Pixel load on this website <strong>only if the VILMS team has enabled them</strong>. When they are enabled, events such as button clicks, and the submission of the enquiry form, are also passed to them. They may set their own cookies, which are covered by their own privacy policies. They never load when your browser sends a privacy signal.
        </p>
      </LegalSection>

      <LegalSection id="signals" n={5} title="Privacy signals">
        <p>
          If your browser sends <strong>Global Privacy Control</strong> or <strong>Do Not Track</strong>, then: no analytics events are sent, no visitor ID is created, and Google Analytics and the Meta Pixel are not loaded. Campaign tags are kept for the current tab only (session storage), so that an enquiry you choose to send can still say which link brought you.
        </p>
      </LegalSection>

      <LegalSection id="control" n={6} title="Check it and clear it">
        <p>
          The panel below shows what is on <em>your</em> device right now and lets you remove it. You can also clear it in your browser: open the site settings for {brand.domain} and choose to clear site data. Removing the items resets your theme to your system setting and starts a new random ID next time you browse.
        </p>
        <div className="!mt-6">
          <StorageInspector />
        </div>
        <p>
          Questions about any of this? Write to <a href={`mailto:${brand.emails.general}`}>{brand.emails.general}</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
