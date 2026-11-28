import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSection } from "@/components/faq-section";
import { JsonLd } from "@/components/json-ld";
import { MailtoCta } from "@/components/mailto-cta";
import {
  INDUSTRIES,
  INDUSTRIES_FAQS,
  NON_CERTIFICATION_NOTICE,
} from "@/lib/content";
import { CU_UPDATES_MAILTO } from "@/lib/copy";
import { industriesJsonLd } from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("industries");

export default function IndustriesPage() {
  return (
    <div className="container page-body">
      <JsonLd data={industriesJsonLd()} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Industries & Certifications" },
        ]}
      />

      <header className="page-head">
        <p className="kicker">For Institutions &amp; Risk Teams</p>
        <h1>Nine regulated sectors. One open compliance kernel.</h1>
        <p className="lede">
          This page is for operators, boards, compliance officers, and examiners
          who want to see how sovereign Bitcoin infrastructure can fit behind
          institutional walls. We are not selling software—every control profile
          is being designed in the open.
        </p>
        <p className="notice">{NON_CERTIFICATION_NOTICE}</p>
      </header>

      <section className="page-section">
        <h2>Target sectors in rollout order</h2>
        <p className="section-intro">
          Credit Unions and CDFIs always come first because live institutional
          testers are ready today. The remaining eight sectors follow in order
          of regulatory and operational difficulty.
        </p>

        <div className="sector-list">
          {INDUSTRIES.map((sector) => (
            <article
              key={sector.slug}
              id={sector.slug}
              className={
                sector.rank === 1
                  ? "sector-card sector-card-first"
                  : "sector-card"
              }
            >
              <div className="sector-card-head">
                <div>
                  <span className="sector-rank">
                    #{String(sector.rank).padStart(2, "0")} · {sector.readiness}
                  </span>
                  <h3>{sector.name}</h3>
                </div>
                <span className="pill">{sector.difficulty} difficulty</span>
              </div>

              <p className="sector-why">{sector.whyBehindTheWall}</p>

              <div className="sector-cols">
                <div>
                  <h4>Sample control themes</h4>
                  <ul className="list">
                    {sector.controlThemes.map((theme) => (
                      <li key={theme}>{theme}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Target crosswalk frameworks (design only)</h4>
                  <ul className="list">
                    {sector.targetFrameworks.map((fw) => (
                      <li key={fw}>{fw}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FaqSection
        heading="Questions about industries and crosswalks"
        intro="Plain-language answers on rollout order, non-custodial governance, and what a control crosswalk covers."
        items={INDUSTRIES_FAQS}
      />

      <section className="page-section callout-box">
        <h2>Ready to follow the Credit Union &amp; CDFI rollout?</h2>
        <p>
          Credit unions and CDFIs are proving the first profile right now. Reach
          out for release updates, or read the full technical breakdown and
          framework matrices.
        </p>
        <div className="cta-row">
          <MailtoCta
            href={CU_UPDATES_MAILTO}
            label="Credit union or CDFI executive? Email for updates"
          />
          <Link className="action action-secondary" href="/breakdown">
            Read the full breakdown
          </Link>
        </div>
      </section>
    </div>
  );
}
