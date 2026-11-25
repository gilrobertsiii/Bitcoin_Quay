import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Quay keeps the BLVM node and adds a separate compliance crate: dual control, evidence, and an integration allowlist.",
};

export default function ProductPage() {
  return (
    <>
      <p className="kicker">Product</p>
      <h1>The node stays BLVM. The controls are Quay.</h1>
      <p className="lede">
        This repository tracks BTCDecoded/blvm release tags. The node binary is
        upstream BLVM, built from crates.io. Quay does not vendor the consensus
        crates and does not patch them.
      </p>
      <h2>Separate crate</h2>
      <p>
        The <code>quay</code> package is a separate process, on the same pattern
        as <code>blvm-payment</code>. It is not linked into the default node
        binary. An operator can copy the <code>quay</code> binary into a node
        modules directory later. The default registry URL still points at
        Bitcoin Commons.
      </p>
      <h2>First profile</h2>
      <p>
        Credit unions and CDFIs are the first profile: exam evidence, masked
        member data, and vendor decision ids for sanctions and payment
        decisions. A SOC 1 / SOC 2 profile maps those same controls to criteria
        an auditor can test.
      </p>
      <h2>Outside the crate</h2>
      <ul className="list">
        <li>Key custody</li>
        <li>Freeform wallet send</li>
        <li>Card numbers</li>
        <li>ACH file generation</li>
      </ul>
    </>
  );
}
