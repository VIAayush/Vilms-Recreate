import type { Metadata } from "next";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How the VILMS website handles the details you share with us and the analytics we collect.",
  alternates: { canonical: "/privacy" },
};

// Plain-language notice for this marketing website. Have it reviewed by your
// legal advisor before relying on it.
export default function PrivacyPage() {
  return (
    <article className="wrap max-w-3xl pb-20 pt-32 sm:pb-28 sm:pt-40">
      <header>
        <p className="kicker">Privacy</p>
        <h1 className="display mt-5 text-[clamp(40px,6vw,72px)]">Privacy policy</h1>
        <p className="mt-4 text-[14px] text-fg-muted">For the VILMS website ({brand.domain}). Last updated October 2026.</p>
      </header>
      <div className="mt-12 border-t border-edge pt-12">
        <div className="space-y-10 text-[16px] leading-relaxed text-fg-muted [&_h2]:font-display [&_h2]:text-fg">
          <section>
            <h2 className="text-[22px] font-semibold tracking-tight">What we collect when you contact us</h2>
            <p className="mt-2">
              When you book a demo or ask to start a trial, we collect what you type into the form: your name, institute
              name, work email, phone number, city, institute type, number of students and any optional details you add.
              We also record when you submitted it and which page or advert brought you to us (for example a
              campaign tag in the link).
            </p>
          </section>
          <section>
            <h2 className="text-[22px] font-semibold tracking-tight">Why we use it</h2>
            <p className="mt-2">
              Only to respond to your enquiry: a member of the VILMS team may call, WhatsApp or email you about it.
              We do not sell your details. You agree to this contact when you tick the consent box on the form.
            </p>
          </section>
          <section>
            <h2 className="text-[22px] font-semibold tracking-tight">Website analytics</h2>
            <p className="mt-2">
              We measure how the site is used — pages viewed and buttons clicked — with a random identifier stored in
              your browser. We don&apos;t use fingerprinting and we don&apos;t store your IP address in readable form. If your
              browser sends a Global Privacy Control or Do Not Track signal, we don&apos;t record this activity.
            </p>
          </section>
          <section>
            <h2 className="text-[22px] font-semibold tracking-tight">Where it&apos;s stored and who can see it</h2>
            <p className="mt-2">
              Enquiries are stored in a database hosted in India (Mumbai region). Only signed-in members of the VILMS
              team can view them.
            </p>
          </section>
          <section>
            <h2 className="text-[22px] font-semibold tracking-tight">Your choices</h2>
            <p className="mt-2">
              To see, correct or delete the details you sent us, email{" "}
              <a href={`mailto:${brand.emails.general}`} className="link underline">
                {brand.emails.general}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
