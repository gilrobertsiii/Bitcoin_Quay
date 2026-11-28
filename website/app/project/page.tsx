import type { Metadata } from "next";
import Link from "next/link";

import { MailtoCta } from "@/components/mailto-cta";
import { NON_CERTIFICATION_NOTICE, REPO_MAP } from "@/lib/content";
import {
  COMMONS_SECURITY_URL,
  COMMONS_URL,
  CONTRIBUTE_INVITE_MAILTO,
} from "@/lib/copy";

export const metadata: Metadata = {
  title: "The Project",
  description:
    "Why high-compliance Bitcoin software must be open source, how the Bitcoin Quay repository is organized, and how to join as a contributor.",
};

export default function ProjectPage() {
  return (
    <div className="container page-body">
      <header className="page-head">
        <p className="kicker">For Contributors &amp; Builders</p>
        <h1>Why compliance software belongs in the open.</h1>
        <p className="lede">
          Bitcoin works because anyone can verify the rules. Compliance controls
          around Bitcoin should work the same way—plain code that engineers,
          boards, and examiners can actually read and test.
        </p>
        <p className="notice">{NON_CERTIFICATION_NOTICE}</p>
      </header>

      <section className="page-section">
        <h2>Three reasons we build this as open source</h2>
        <div className="grid">
          <article className="card">
            <h3>No trust-me binaries</h3>
            <p>
              If a compliance rule says a maker cannot approve their own change,
              anyone should be able to read the exact line of Rust and run the
              test that proves it.
            </p>
          </article>
          <article className="card">
            <h3>Exam replay</h3>
            <p>
              Auditors care about repeatable evidence. Open schemas and
              append-only JSON logs let institutions show their work without
              vendor lock-in.
            </p>
          </article>
          <article className="card">
            <h3>Shared safety floor</h3>
            <p>
              A credit union in Ohio and a rural hospital share 80% of the same
              governance needs. Building one audited kernel beats reinventing
              closed wrappers nine times.
            </p>
          </article>
        </div>
      </section>

      <section className="page-section">
        <h2>How the repository is laid out</h2>
        <p className="section-intro">
          Quay tracks upstream{" "}
          <a href={COMMONS_URL} target="_blank" rel="noopener noreferrer">
            The Bitcoin Commons (BTCDecoded/blvm)
          </a>{" "}
          and keeps Quay&apos;s own code isolated in clean directories so
          upstream node upgrades stay simple.
        </p>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Path</th>
                <th>Role</th>
                <th>What lives there</th>
              </tr>
            </thead>
            <tbody>
              {REPO_MAP.map((row) => (
                <tr key={row.path}>
                  <td>
                    <code>{row.path}</code>
                  </td>
                  <td>
                    <strong>{row.role}</strong>
                  </td>
                  <td>{row.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="muted-note">
          Upstream rule: Quay merges upstream BLVM release tags and drops local
          path overrides so crates build cleanly from crates.io. We never push
          fork code back to BTCDecoded remotes.
        </p>
      </section>

      <section id="contribute" className="page-section callout-box">
        <p className="kicker">Contributor Access</p>
        <h2>Invite-only in Pre-Alpha. Public open source at Alpha.</h2>
        <p>
          Right now we are working in an invite-only Pre-Alpha while live credit
          union testers review the first profile. At Alpha release, the full
          project opens for public MIT contributions.
        </p>
        <h3>Good first areas once Alpha opens (or during Pre-Alpha)</h3>
        <ul className="list">
          <li>
            <strong>Rust kernel &amp; tests (<code>quay/</code>):</strong>{" "}
            strengthening dual-control invariants, evidence export checks, and
            refusal tests.
          </li>
          <li>
            <strong>Industry profiles (<code>quay/profiles/</code>):</strong>{" "}
            drafting clean TOML crosswalks for Nonprofits, Education, MSB,
            Banking, Healthcare, Energy, Civil Gov, and Military.
          </li>
          <li>
            <strong>SDK &amp; workflow tools:</strong> read-only examiner
            exporters, allowlisted connector adapters, and operator UX.
          </li>
          <li>
            <strong>Plain-language documentation:</strong> translating regulatory
            criteria into clear, testable engineering guides.
          </li>
        </ul>
        <div className="cta-row">
          <MailtoCta
            href={CONTRIBUTE_INVITE_MAILTO}
            label="Request a Pre-Alpha invite"
          />
          <Link className="action action-secondary" href="/breakdown">
            Read the full technical breakdown
          </Link>
        </div>
      </section>

      <section className="page-section">
        <h2>Security reporting</h2>
        <p>
          Report vulnerabilities in Quay-authored code (<code>quay/</code> or{" "}
          <code>website/</code>) privately to the Bitcoin Quay maintainers via
          GitHub private vulnerability reporting or our{" "}
          <Link href="/contact">contact address</Link>. Consensus, P2P, or node
          bugs in upstream BLVM belong directly with{" "}
          <a
            href={COMMONS_SECURITY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Bitcoin Commons Security ↗
          </a>
          .
        </p>
      </section>
    </div>
  );
}
