import Link from "next/link";
import type { ReactNode } from "react";

import { NON_CERTIFICATION_NOTICE } from "@/lib/content";
import { COMMONS_URL, UPSTREAM_REPO_URL } from "@/lib/copy";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/industries", label: "Industries" },
  { href: "/project", label: "Project" },
  { href: "/breakdown", label: "Breakdown" },
  { href: "/contact", label: "Contact" },
];

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="bar">
        <div className="container bar-inner">
          <Link className="wordmark" href="/">
            BITCOIN <span>QUAY</span>
          </Link>
          <nav aria-label="Primary">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="foot">
        <div className="container foot-inner">
          <div className="foot-meta">
            <p className="foot-brand">
              <strong>MIT License.</strong> Independent compliance fork of{" "}
              <a
                href={UPSTREAM_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                BTCDecoded/blvm ↗
              </a>
              . Pre-Alpha contributor access is invite-only; public open source
              at Alpha.
            </p>
            <p className="foot-notice">{NON_CERTIFICATION_NOTICE}</p>
          </div>
          <nav className="foot-links" aria-label="Footer">
            <Link href="/industries">Industries</Link>
            <Link href="/project">Project</Link>
            <Link href="/breakdown">Breakdown</Link>
            <Link href="/contact">Contact</Link>
            <a
              href={COMMONS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              The Bitcoin Commons ↗
            </a>
            <a href="/sitemap.xml">Sitemap</a>
            <a href="/llms.txt">LLM Summary</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
