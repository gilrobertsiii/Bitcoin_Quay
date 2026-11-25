import type { Metadata } from "next";

import { CONTACT_EMAIL } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write Bitcoin Quay about a briefing or a question on this fork.",
};

export default function ContactPage() {
  return (
    <>
      <p className="kicker">Contact</p>
      <h1>Briefings and questions.</h1>
      <p className="lede">
        Write about an institutional briefing, the credit-union profile, or a
        question on this fork. The address below is the public contact for
        Bitcoin Quay.
      </p>
      <p>
        <a className="action" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </p>
    </>
  );
}
