import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <p className="kicker">BLVM fork</p>
      <h1>A Bitcoin node an institution can account for.</h1>
      <p className="lede">
        Bitcoin Quay tracks the Bitcoin Commons BLVM node and adds the controls
        a credit union needs around it: a second person on each sensitive
        change, an evidence log, and a list of named connections.
      </p>
      <p className="notice">
        Under development. The credit-union profile is the first use case. This
        site is not for production member data, and it is not a SOC, PCI, or
        NACHA certification.
      </p>
      <div className="grid">
        <article className="card">
          <h2>Dual control</h2>
          <p>A checker decides a maker&apos;s intent. The maker cannot decide their own.</p>
        </article>
        <article className="card">
          <h2>Evidence</h2>
          <p>Each create and decision stays in an append-only log with the vendor decision id.</p>
        </article>
        <article className="card">
          <h2>Named connections</h2>
          <p>Integrations are an allowlist. An unknown connector is refused.</p>
        </article>
      </div>
      <p>
        <Link className="action" href="/product">
          Read the product
        </Link>
      </p>
    </>
  );
}
