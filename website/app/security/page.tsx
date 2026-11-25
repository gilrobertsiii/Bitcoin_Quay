import type { Metadata } from "next";

import { CONTACT_EMAIL } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Quay publishes control design for dual control, evidence, and an integration allowlist. It is not a certification.",
};

export default function SecurityPage() {
  return (
    <>
      <p className="kicker">Security</p>
      <h1>Control design an examiner can follow.</h1>
      <p className="lede">
        Quay publishes the shape of the controls. A certification is a separate
        engagement between an institution and its auditor. This software does
        not claim SOC, PCI, or NACHA certification.
      </p>
      <h2>Controls</h2>
      <ul className="list">
        <li>Segregation of duties. Checker and Compliance decide. The maker cannot decide their own intent.</li>
        <li>An append-only evidence log with the actor, the action, the time, and the vendor decision id.</li>
        <li>An integration allowlist. Connectors have to be named in the profile.</li>
        <li>Viewer and Examiner roles cannot create or decide. Examiner is the read-only posture for the export.</li>
      </ul>
      <h2>Crosswalk</h2>
      <p>
        The SOC 1 / SOC 2 profile is a crosswalk from those controls to criteria
        an auditor already knows how to test. Loading the profile does not mark
        the system certified. The credit-union profile records that member data
        stays masked, and the crate refuses member-data payloads.
      </p>
      <h2>Reports</h2>
      <p>
        Questions about this fork go to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Vulnerabilities
        in the upstream node follow the{" "}
        <a href="https://github.com/BTCDecoded/blvm/blob/main/SECURITY.md">
          Bitcoin Commons security policy
        </a>
        .
      </p>
    </>
  );
}
