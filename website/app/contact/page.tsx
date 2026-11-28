import type { Metadata } from "next";

import { MailtoCta } from "@/components/mailto-cta";
import { NON_CERTIFICATION_NOTICE } from "@/lib/content";
import {
  CONTACT_EMAIL,
  CONTRIBUTE_INVITE_MAILTO,
  CU_UPDATES_MAILTO,
  GENERAL_MAILTO,
} from "@/lib/copy";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Bitcoin Quay for Credit Union / CDFI release updates, Pre-Alpha contributor invites, or general questions.",
};

export default function ContactPage() {
  return (
    <div className="container page-body">
      <header className="page-head">
        <p className="kicker">Contact</p>
        <h1>Get in touch with Bitcoin Quay.</h1>
        <p className="lede">
          This site does not collect forms or store member data. Pick the email
          option that fits what you need—your mail app will open with a ready
          subject line to <code>{CONTACT_EMAIL}</code>.
        </p>
      </header>

      <div className="grid">
        <article className="card">
          <h3>Credit Union &amp; CDFI executives</h3>
          <p>
            Get release updates as we test and harden our first institutional
            profile.
          </p>
          <MailtoCta href={CU_UPDATES_MAILTO} label="Request release updates" />
        </article>

        <article className="card">
          <h3>Pre-Alpha contributors</h3>
          <p>
            Ask for an invite to the pre-alpha repository before public Alpha
            opens.
          </p>
          <MailtoCta
            href={CONTRIBUTE_INVITE_MAILTO}
            label="Request contributor invite"
          />
        </article>

        <article className="card">
          <h3>Briefings &amp; general questions</h3>
          <p>
            Questions about our open-source roadmap, industry crosswalks, or
            fork policy.
          </p>
          <MailtoCta
            href={GENERAL_MAILTO}
            label={CONTACT_EMAIL}
            variant="secondary"
          />
        </article>
      </div>

      <p className="notice" style={{ marginTop: "2rem" }}>
        {NON_CERTIFICATION_NOTICE}
      </p>
    </div>
  );
}
