import Link from "next/link";
import type { ReactNode } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/security", label: "Security" },
  { href: "/contact", label: "Contact" },
];

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <header className="bar">
        <Link className="wordmark" href="/">
          BITCOIN <span>QUAY</span>
        </Link>
        <nav>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="foot">
        <span>MIT. A fork of BTCDecoded/blvm.</span>
        <span>Under development. Not for production member data.</span>
      </footer>
    </div>
  );
}
