import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSection } from "@/components/faq-section";
import { JsonLd } from "@/components/json-ld";
import { MailtoCta } from "@/components/mailto-cta";
import {
  BREAKDOWN_FAQS,
  GLOSSARY_TERMS,
  INDUSTRIES,
  NON_CERTIFICATION_NOTICE,
  OUT_OF_SCOPE,
  SHARED_CONTROLS,
} from "@/lib/content";
import {
  COMMONS_URL,
  CONTRIBUTE_INVITE_MAILTO,
  CU_UPDATES_MAILTO,
} from "@/lib/copy";
import { breakdownJsonLd } from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("breakdown");

export default function BreakdownPage() {
  return (
    <div className="container page-body">
      <JsonLd data={breakdownJsonLd()} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Full Breakdown" },
        ]}
      />

      <header className="page-head">
        <p className="kicker">Full Project Breakdown</p>
        <h1>How Bitcoin Quay splits the node, the rules, and the apps.</h1>
        <p className="lede">
          A complete, plain-language map of what every regulated institution
          shares at the node level, what stays modular per industry, and which
          framework crosswalks we are designing toward.
        </p>
        <p className="notice">{NON_CERTIFICATION_NOTICE}</p>
      </header>

      {/* Architecture layered figure */}
      <section className="page-section">
        <h2>1. Architecture: Node, Profiles, and SDK</h2>
        <p className="section-intro">
          Instead of building nine separate forks for nine industries, Quay
          separates the universal mechanics from the industry-specific rules and
          human workflows.
        </p>

        <figure
          className="arch-diagram"
          aria-label="Three-layer Bitcoin Quay architecture: Node kernel, Industry Profiles, and SDK applications"
        >
          <div className="arch-tier arch-tier-sdk">
            <div className="arch-tier-head">
              <span className="arch-badge">Layer 3 · Modular Apps</span>
              <h3>SDK Applications (Human Workflows &amp; Adapters)</h3>
            </div>
            <div className="arch-chips">
              <span>Operator Console</span>
              <span>LSP / Rail Selection</span>
              <span>Exam Binder Exporter</span>
              <span>Allowlisted Connectors</span>
            </div>
            <p className="arch-note">
              Talks only through the kernel allowlist. Never touches raw keys or
              bypass paths.
            </p>
          </div>

          <div className="arch-connector" aria-hidden="true">
            ↑ reads rules &amp; submits intents ↓
          </div>

          <div className="arch-tier arch-tier-profiles">
            <div className="arch-tier-head">
              <span className="arch-badge">Layer 2 · Industry Packs</span>
              <h3>Profiles &amp; Crosswalk Configs (TOML)</h3>
            </div>
            <div className="arch-chips">
              <span>Credit Union / CDFI (#1)</span>
              <span>Nonprofit / NGO</span>
              <span>Education</span>
              <span>Payments / MSB</span>
              <span>Banking &amp; Insurance</span>
              <span>Healthcare</span>
              <span>Energy &amp; Utilities</span>
              <span>Civil Government</span>
              <span>US Military</span>
            </div>
            <p className="arch-note">
              Swaps in sector connectors, masking rules, and auditor criteria.
              Rejects <code>attestation = true</code> at load time.
            </p>
          </div>

          <div className="arch-connector" aria-hidden="true">
            ↑ configures kernel behavior ↓
          </div>

          <div className="arch-tier arch-tier-node">
            <div className="arch-tier-head">
              <span className="arch-badge">Layer 1 · Shared Kernel</span>
              <h3>Upstream BLVM Node + Quay Compliance Process</h3>
            </div>
            <div className="arch-chips">
              <span>BLVM Consensus (Upstream)</span>
              <span>Dual Control Engine</span>
              <span>Append-Only Evidence</span>
              <span>Allowlist Gate</span>
              <span>Examiner Export</span>
              <span>Hard Refusals</span>
            </div>
            <p className="arch-note">
              Consensus stays upstream at{" "}
              <a href={COMMONS_URL} target="_blank" rel="noopener noreferrer">
                The Bitcoin Commons ↗
              </a>
              . Quay runs as a separate process—never patched into consensus.
            </p>
          </div>
        </figure>
      </section>

      {/* Industry x Difficulty chart/table */}
      <section className="page-section">
        <h2>2. Target industries ranked by difficulty</h2>
        <p className="section-intro">
          Credit Unions &amp; CDFIs always sit at #1 because live institutional
          testers are ready right now. From there, complexity climbs as data
          sensitivity, multi-agency oversight, and critical-infrastructure rules
          stack up.
        </p>

        <div className="table-wrap">
          <table className="data-table">
            <caption className="sr-only">
              Nine regulated sectors targeted by Bitcoin Quay ranked by rollout
              order and difficulty
            </caption>
            <thead>
              <tr>
                <th>Order</th>
                <th>Sector</th>
                <th>Difficulty meter</th>
                <th>Status</th>
                <th>Why behind their own walls</th>
              </tr>
            </thead>
            <tbody>
              {INDUSTRIES.map((sector) => (
                <tr key={sector.slug}>
                  <td>
                    <code>#{String(sector.rank).padStart(2, "0")}</code>
                  </td>
                  <td>
                    <strong>
                      <Link href={`/industries#${sector.slug}`}>
                        {sector.name}
                      </Link>
                    </strong>
                  </td>
                  <td>
                    <div className="meter-cell">
                      <span className="meter-label">{sector.difficulty}</span>
                      <div
                        className="meter-track"
                        role="img"
                        aria-label={`Difficulty ${sector.difficultyScore} out of 9`}
                      >
                        <div
                          className="meter-fill"
                          style={{
                            width: `${Math.round((sector.difficultyScore / 9) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{sector.readiness}</td>
                  <td>{sector.whyBehindTheWall}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Certification / framework targets matrix */}
      <section className="page-section">
        <h2>3. Certification &amp; framework crosswalk targets</h2>
        <p className="section-intro">
          Every cell below describes <strong>control-design crosswalks</strong>{" "}
          (mapping Quay&apos;s controls to criteria an auditor already knows how
          to test). Loading a profile never certifies an institution—formal
          certification always happens between the organization and its
          independent auditor.
        </p>

        <div className="table-wrap">
          <table className="data-table matrix-table">
            <caption className="sr-only">
              Control-design crosswalk targets across financial, privacy, public
              sector, and critical infrastructure frameworks
            </caption>
            <thead>
              <tr>
                <th>Sector</th>
                <th>Financial / Audit</th>
                <th>Privacy / Data Boundary</th>
                <th>Public Sector / Defense</th>
                <th>Critical Infrastructure</th>
              </tr>
            </thead>
            <tbody>
              {INDUSTRIES.map((sector) => (
                <tr key={sector.slug}>
                  <td>
                    <strong>{sector.shortName}</strong>
                  </td>
                  <td>{sector.matrix.financial}</td>
                  <td>{sector.matrix.privacy}</td>
                  <td>{sector.matrix.publicSector}</td>
                  <td>{sector.matrix.criticalInfra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Shared node-level controls */}
      <section id="controls" className="page-section">
        <h2>4. Shared node-level controls</h2>
        <p className="section-intro">
          No matter the industry, the Quay kernel enforces these five core rules
          the same way every time.
        </p>

        <div className="table-wrap">
          <table className="data-table">
            <caption className="sr-only">
              Five shared node-level governance controls enforced by the Quay
              kernel
            </caption>
            <thead>
              <tr>
                <th>Control</th>
                <th>What the code enforces</th>
                <th>Why examiners care</th>
              </tr>
            </thead>
            <tbody>
              {SHARED_CONTROLS.map((ctrl) => (
                <tr key={ctrl.name}>
                  <td>
                    <strong>{ctrl.name}</strong>
                  </td>
                  <td>{ctrl.whatItDoes}</td>
                  <td>{ctrl.whyItMatters}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Hard refusals / Out of scope */}
      <section className="page-section">
        <h2>5. What Quay refuses by design (out of scope)</h2>
        <p className="section-intro">
          Good compliance software is defined as much by what it refuses to
          touch as by what it allows.
        </p>

        <dl className="def-list">
          {OUT_OF_SCOPE.map((entry) => (
            <div key={entry.item} className="def-row">
              <dt>{entry.item}</dt>
              <dd>{entry.reason}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Plain-English Glossary (DefinedTermSet) */}
      <section id="glossary" className="page-section">
        <p className="kicker">Plain-English Definitions</p>
        <h2>6. Compliance &amp; architecture glossary</h2>
        <p className="section-intro">
          Short, jargon-free definitions for the core terms used across Bitcoin
          Quay&apos;s code and profile files.
        </p>

        <dl className="glossary-grid">
          {GLOSSARY_TERMS.map((item) => (
            <div
              key={item.slug}
              id={`term-${item.slug}`}
              className="glossary-item"
            >
              <dt>{item.term}</dt>
              <dd>{item.definition}</dd>
            </div>
          ))}
        </dl>
      </section>

      <FaqSection
        heading="Technical &amp; governance questions"
        intro="Straight answers on how the Node, Profiles, and SDK split works in practice."
        items={BREAKDOWN_FAQS}
      />

      <section className="page-section callout-box">
        <h2>Want to help build this—or test it at your institution?</h2>
        <p>
          Join the Pre-Alpha contributor invite list or sign up for Credit Union
          and CDFI release updates.
        </p>
        <div className="cta-row">
          <MailtoCta
            href={CONTRIBUTE_INVITE_MAILTO}
            label="Request Pre-Alpha contributor invite"
          />
          <MailtoCta
            href={CU_UPDATES_MAILTO}
            label="CU / CDFI executive release updates"
            variant="secondary"
          />
          <Link className="action action-secondary" href="/project">
            Explore the project
          </Link>
        </div>
      </section>
    </div>
  );
}
