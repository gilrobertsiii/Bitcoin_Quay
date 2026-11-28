export type DifficultyTier = "First" | "Moderate" | "High" | "Very High";

export type IndustrySector = {
  rank: number;
  slug: string;
  name: string;
  shortName: string;
  difficulty: DifficultyTier;
  difficultyScore: number; // 1-9 visual meter
  readiness: string;
  whyBehindTheWall: string;
  controlThemes: string[];
  targetFrameworks: string[];
  matrix: {
    financial: string;
    privacy: string;
    publicSector: string;
    criticalInfra: string;
  };
};

export const NON_CERTIFICATION_NOTICE =
  "Control design only. Bitcoin Quay is under active development, is not for production member or customer data, and is not a SOC, PCI, NACHA, HIPAA, FERPA, FedRAMP, or CMMC certification.";

export const INDUSTRIES: IndustrySector[] = [
  {
    rank: 1,
    slug: "credit-unions-cdfis",
    name: "Credit Unions & CDFIs",
    shortName: "Credit Unions & CDFIs",
    difficulty: "First",
    difficultyScore: 2,
    readiness: "Live testers ready now",
    whyBehindTheWall:
      "Member-owned institutions can offer Bitcoin rail access without handing control of their audit trail or member records to a black-box vendor.",
    controlThemes: [
      "Maker / checker approval on every sensitive change",
      "Masked member data with zero raw member payloads in the log",
      "Named vendor decision IDs for sanctions and processor checks",
    ],
    targetFrameworks: [
      "NCUA exam evidence",
      "FFIEC IT handbook alignment",
      "SOC 1 / SOC 2 control crosswalk",
    ],
    matrix: {
      financial: "Crosswalk active (NCUA / FFIEC / SOC)",
      privacy: "Masked member data design",
      publicSector: "—",
      criticalInfra: "—",
    },
  },
  {
    rank: 2,
    slug: "nonprofits-ngos",
    name: "Nonprofits, Foundations & NGOs",
    shortName: "Nonprofits & NGOs",
    difficulty: "Moderate",
    difficultyScore: 3,
    readiness: "Planned after CU/CDFI",
    whyBehindTheWall:
      "Grantmakers and charities can accept or route Bitcoin with board-level dual control and clean donor-screening records.",
    controlThemes: [
      "Board or finance-committee dual approval on rail changes",
      "Allowlisted OFAC / sanctions screening connectors",
      "Read-only auditor export for grant and tax reviews",
    ],
    targetFrameworks: [
      "OMB grant audit trail",
      "OFAC screening records",
      "SOC 2 control crosswalk",
    ],
    matrix: {
      financial: "Crosswalk planned (grant / SOC)",
      privacy: "Donor PII stays outside log",
      publicSector: "Crosswalk planned (OMB)",
      criticalInfra: "—",
    },
  },
  {
    rank: 3,
    slug: "education",
    name: "Education (K-12 & Higher Ed)",
    shortName: "Education",
    difficulty: "Moderate",
    difficultyScore: 4,
    readiness: "Planned",
    whyBehindTheWall:
      "Schools and universities can run campus payment or treasury experiments without exposing student records or violating public-board oversight.",
    controlThemes: [
      "Strict separation between student data systems and Bitcoin infra",
      "Read-only connectors to campus ERP or SIS tools",
      "Append-only change history for state and trustee audits",
    ],
    targetFrameworks: [
      "FERPA data-boundary alignment",
      "State public-audit evidence",
      "SOC 2 control crosswalk",
    ],
    matrix: {
      financial: "Crosswalk planned (treasury / SOC)",
      privacy: "Crosswalk planned (FERPA boundary)",
      publicSector: "State university / district audit",
      criticalInfra: "—",
    },
  },
  {
    rank: 4,
    slug: "payments-msb",
    name: "Payments & Money Services (MSB)",
    shortName: "Payments & MSB",
    difficulty: "Moderate",
    difficultyScore: 5,
    readiness: "Planned",
    whyBehindTheWall:
      "Remittance firms and processors need repeatable BSA/AML evidence and strict connector allowlists without mixing compliance controls with key custody.",
    controlThemes: [
      "Required vendor decision IDs for sanctions and transaction monitoring",
      "Hard refusal of PAN storage and ACH file generation",
      "Examiner-ready append-only decision exports",
    ],
    targetFrameworks: [
      "FinCEN MSB exam evidence",
      "BSA / AML control mapping",
      "SOC 1 / SOC 2 control crosswalk",
    ],
    matrix: {
      financial: "Crosswalk planned (FinCEN / BSA)",
      privacy: "No PAN; masked subject IDs",
      publicSector: "—",
      criticalInfra: "—",
    },
  },
  {
    rank: 5,
    slug: "banking-insurance",
    name: "Banking & Insurance",
    shortName: "Banking & Insurance",
    difficulty: "High",
    difficultyScore: 6,
    readiness: "Planned",
    whyBehindTheWall:
      "Chartered banks and insurers face multi-agency exams where every infrastructure change needs a verifiable second sign-off and clear vendor boundaries.",
    controlThemes: [
      "Segregation of duties across operations, compliance, and examiners",
      "Environment-scoped integration allowlists (UAT vs production)",
      "Tamper-evident change logs tied to external risk tickets",
    ],
    targetFrameworks: [
      "OCC / FDIC / Fed exam evidence",
      "NAIC model law alignment",
      "SOC 1 / SOC 2 control crosswalk",
    ],
    matrix: {
      financial: "Crosswalk planned (FFIEC / NAIC)",
      privacy: "GLBA-aligned data minimization",
      publicSector: "—",
      criticalInfra: "—",
    },
  },
  {
    rank: 6,
    slug: "healthcare",
    name: "Healthcare (Primary Care & Hospitals)",
    shortName: "Healthcare",
    difficulty: "High",
    difficultyScore: 7,
    readiness: "Planned",
    whyBehindTheWall:
      "Clinics and hospital systems need billing and vendor controls that never touch protected health information while staying easy to audit.",
    controlThemes: [
      "Zero PHI allowed inside Quay ledgers or logs",
      "Allowlisted billing and clearinghouse connectors only",
      "Read-only compliance export for internal and external reviewers",
    ],
    targetFrameworks: [
      "HIPAA security control mapping",
      "HITRUST control crosswalk",
      "SOC 2 control crosswalk",
    ],
    matrix: {
      financial: "Crosswalk planned (billing controls)",
      privacy: "Crosswalk planned (HIPAA / HITRUST)",
      publicSector: "—",
      criticalInfra: "Hospital uptime posture",
    },
  },
  {
    rank: 7,
    slug: "energy-utilities",
    name: "Energy & Utilities",
    shortName: "Energy & Utilities",
    difficulty: "High",
    difficultyScore: 7,
    readiness: "Planned",
    whyBehindTheWall:
      "Grid operators and utilities exploring Bitcoin settlement or metering need strict change control that isolates financial rails from operational tech.",
    controlThemes: [
      "Strict allowlist boundary keeping OT and SCADA isolated",
      "Dual-control change intents for every infrastructure update",
      "Auditable history for public utility commission reviews",
    ],
    targetFrameworks: [
      "NERC CIP control mapping",
      "State PUC audit evidence",
      "SOC 2 control crosswalk",
    ],
    matrix: {
      financial: "Wholesale settlement logging",
      privacy: "Minimal customer exposure",
      publicSector: "State PUC reporting design",
      criticalInfra: "Crosswalk planned (NERC CIP)",
    },
  },
  {
    rank: 8,
    slug: "government-civil",
    name: "Government — Civil (Local, State, US Federal, International)",
    shortName: "Civil Government",
    difficulty: "Very High",
    difficultyScore: 8,
    readiness: "Long-horizon",
    whyBehindTheWall:
      "Public agencies answer to taxpayers and lawmakers—meaning every rule, approval, and connection must be open to inspection, not hidden in vendor code.",
    controlThemes: [
      "Publicly inspectable code with zero black-box compliance logic",
      "Jurisdiction overlays from city and state up to federal and international",
      "Exportable records suited for inspector-general and FOIA-style review",
    ],
    targetFrameworks: [
      "NIST SP 800-53 control mapping",
      "StateRAMP / FedRAMP alignment",
      "ISO 27001 international crosswalk",
    ],
    matrix: {
      financial: "Public treasury change logs",
      privacy: "Citizen PII kept out of log",
      publicSector: "Crosswalk planned (NIST 800-53 / FedRAMP)",
      criticalInfra: "Continuity & env separation",
    },
  },
  {
    rank: 9,
    slug: "us-military",
    name: "US Military",
    shortName: "US Military",
    difficulty: "Very High",
    difficultyScore: 9,
    readiness: "Long-horizon",
    whyBehindTheWall:
      "Defense environments demand verifiable, reproducible open-source builds with zero unapproved external connections and strict two-person integrity.",
    controlThemes: [
      "Reproducible open-source node and control binaries",
      "Zero CUI in Quay logs; strict allowlisted environment boundaries",
      "Two-person rule enforced in code for every control change",
    ],
    targetFrameworks: [
      "NIST SP 800-171 control mapping",
      "CMMC control crosswalk",
      "DoD Impact Level boundary design",
    ],
    matrix: {
      financial: "Two-person control integrity",
      privacy: "Zero CUI payload refusal",
      publicSector: "Crosswalk planned (CMMC / 800-171)",
      criticalInfra: "Crosswalk planned (air-gap friendly)",
    },
  },
];

export const HOME_CONTENT = {
  hero: {
    kicker: "Open-source compliance for sovereign Bitcoin",
    title: "Bitcoin behind institutional walls.",
    subtitle: "Open controls for the world's highest-compliance sectors.",
    catchphrase:
      "We are bridging Bitcoin into credit unions, hospitals, utilities, and public institutions by giving them free, inspectable tools to run it themselves—without handing the keys or the audit trail to a closed vendor.",
    ctaUsers: {
      label: "Explore industries & certifications",
      href: "/industries",
    },
    ctaContributors: {
      label: "Explore the project",
      href: "/project",
    },
  },
  helloWorld: {
    kicker: "Hello World",
    heading: "Why should high-compliance software be open source?",
    paragraphs: [
      "Right now, if a credit union, hospital, or city office wants to touch Bitcoin, they face an ugly trade-off. They either stay on the sidelines, or they sign a contract with a closed-source vendor and tell their examiner, 'Trust us, the vendor handles it.'",
      "Examiners hate black boxes. When rules are hidden inside proprietary software, nobody—not the risk officer, not the auditor, and not the public—can verify how approvals actually work or prove that a single person could not bypass them.",
      "Bitcoin Quay flips that model. Every compliance control—dual approval, append-only evidence logs, and strict connection allowlists—lives in plain, readable open-source code. We are not selling a SaaS subscription; we are building a public-good bridge so regulated institutions can run Bitcoin on their own hardware and prove every step of how they operate.",
    ],
    peekAhead:
      "Next up: the real-world group we are proving this with first—and why starting behind credit union walls unlocks everything that follows.",
  },
  sneakPeek: {
    kicker: "Sneak Peek · Sector #1",
    heading: "Starting with Credit Unions and CDFIs.",
    body: "Credit unions and Community Development Financial Institutions (CDFIs) exist to serve real people—not Wall Street shareholders. They are also among the most carefully examined institutions in America, with members, volunteer boards, federal or state examiners, and payment partners all watching every move. Giving credit unions and CDFIs compliant access to Bitcoin behind their own walls means their members can participate in an open monetary network without leaving the trusted institution that serves their neighborhood. Because live credit-union testers are ready to put these controls through real scrutiny today, this is where Bitcoin Quay starts.",
    ctaLabel: "Credit union or CDFI executive? Email for release updates",
  },
  deeperDive: {
    kicker: "The Big Picture",
    heading: "One shared kernel. Modular rules for nine regulated sectors.",
    intro:
      "Compliance looks wildly different from a local credit union to a hospital to the US military—on the surface. Underneath, almost every regulated organization needs the exact same safety mechanics: two people on sensitive changes, an uneditable record of what happened, a short allowlist of approved outside connections, and a read-only view for examiners.",
    orderNote:
      "We are mapping nine sectors in order of regulatory and operational difficulty—always keeping Credit Unions & CDFIs first because live testers are ready now, followed by Nonprofits, Education, Payments/MSB, Banking & Insurance, Healthcare, Energy & Utilities, Civil Government, and US Military.",
    layers: [
      {
        name: "1. Node (Shared Kernel)",
        gloss:
          "Tracks the upstream Bitcoin Commons BLVM node and pairs it with the Quay control engine: dual control, append-only evidence, connection allowlists, and hard safety refusals.",
      },
      {
        name: "2. Profiles (Industry Packs)",
        gloss:
          "Plain text configuration files that swap in each sector's allowed connectors, data-masking rules, and auditor crosswalk criteria—without ever forking the core engine.",
      },
      {
        name: "3. SDK (Modular Apps)",
        gloss:
          "Separate tools built on top—like operator consoles, Lightning provider selectors, and exam-packet exporters—that only ever talk through the kernel's allowlist.",
      },
    ],
    ctaLabel: "Read the full breakdown & charts",
    ctaHref: "/breakdown",
  },
  commonsStrip: {
    kicker: "Upstream Foundation",
    heading: "Built on Bitcoin Decoded & The Bitcoin Commons.",
    // Exactly 5 tight sentences per spec
    paragraph:
      "Bitcoin Quay is an independent compliance fork of the BTCDecoded/blvm full node. The Bitcoin Commons maintains the upstream Bitcoin validation engine, node binary, and release tooling in the open. Quay keeps that consensus and node foundation untouched and adds a separate compliance layer for regulated operators. As upstream ships new BLVM releases, Quay merges those tags so institutions stay aligned with open Bitcoin infrastructure. Quay is downstream only—we never push fork changes back to BTCDecoded remotes.",
    ctaLabel: "Visit TheBitcoinCommons.org",
  },
  contribute: {
    kicker: "Join the Cause",
    heading: "Invite-only in Pre-Alpha. Public open source at Alpha.",
    body: "Bitcoin Quay is an open-source mission, not a closed startup. During Pre-Alpha we are keeping active contributor access invite-only while we lock down the first credit-union control profile with live testers. Upon our Alpha release, the full project opens publicly under the MIT license for anyone to inspect, fork, and build on.",
    ctaInviteLabel: "Request a Pre-Alpha invite",
    ctaProjectLabel: "See how the project is organized",
  },
};

export const SHARED_CONTROLS = [
  {
    name: "Dual control (Maker / Checker)",
    whatItDoes:
      "A Maker or Compliance officer proposes a sensitive change. A Checker approves or rejects it. The code blocks anyone from approving their own request.",
    whyItMatters:
      "Segregation of duties is the single most common requirement across financial, healthcare, utility, and government audits.",
  },
  {
    name: "Append-only evidence log",
    whatItDoes:
      "Every intent creation and decision appends an uneditable record containing the actor, action, timestamp, and any external vendor decision ID.",
    whyItMatters:
      "Examiners do not have to take anyone's word for it—they can replay the exact timeline of every change.",
  },
  {
    name: "Integration allowlist",
    whatItDoes:
      "External connections must match a connector explicitly named in the active industry profile. Unknown connectors are refused automatically.",
    whyItMatters:
      "Stops shadow integrations and enforces a clean third-party boundary (like SOC 2 CC9.2).",
  },
  {
    name: "Examiner read-only posture",
    whatItDoes:
      "Viewer and Examiner roles can inspect and export structured JSON evidence, but are hard-blocked from creating or deciding changes.",
    whyItMatters:
      "Lets an auditor inspect real system evidence directly without creating operational risk.",
  },
  {
    name: "Hard safety refusals",
    whatItDoes:
      "The Quay crate refuses key custody, freeform wallet sends, card numbers (PAN), ACH file generation, and raw member or patient data payloads.",
    whyItMatters:
      "Keeps the compliance layer tiny, auditable, and strictly out of scope for high-risk custody or card-data liabilities.",
  },
];

export const OUT_OF_SCOPE = [
  {
    item: "Key custody",
    reason:
      "Quay records governance and evidence. Private keys stay in dedicated custody or hardware architectures outside Quay.",
  },
  {
    item: "Freeform wallet send",
    reason:
      "Operators cannot type an address and fire off funds. Sensitive actions stay structured, reviewable intents.",
  },
  {
    item: "PAN (payment card number) storage",
    reason:
      "Keeping card numbers completely out of Quay prevents accidental PCI cardholder-data scope.",
  },
  {
    item: "ACH file generation",
    reason:
      "Legacy bank-rail files stay in the institution's existing core or processor—Quay records vendor decision IDs, not NACHA batches.",
  },
  {
    item: "Certification claims",
    reason:
      "Software cannot certify an organization. Quay profiles reject `attestation = true` at load time so control design is never confused with an audit sign-off.",
  },
];

export const REPO_MAP = [
  {
    path: "quay/",
    role: "Standalone Rust compliance crate",
    details:
      "Implements roles, dual-control intents, append-only evidence export, allowlist enforcement, and hard refusals. Runs as a separate process—not linked into the default BLVM binary.",
  },
  {
    path: "quay/profiles/",
    role: "Industry profile packs (TOML)",
    details:
      "Starts with `credit-union.toml` and `soc-crosswalk.toml`. Each profile defines allowed connectors, masking rules, and auditor criteria.",
  },
  {
    path: "website/",
    role: "Public mission site (Next.js)",
    details:
      "This site (`bitcoinquay.com`). Static-friendly, zero member data, zero credentials.",
  },
  {
    path: "Root BLVM tree",
    role: "Upstream Bitcoin Commons node",
    details:
      "Tracks `BTCDecoded/blvm` release tags and builds from crates.io. Consensus stays upstream.",
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export type GlossaryTerm = {
  slug: string;
  term: string;
  definition: string;
};

export const INDUSTRIES_FAQS: readonly FaqItem[] = [
  {
    question: "Why does Bitcoin Quay start with Credit Unions and CDFIs first?",
    answer:
      "Credit unions and Community Development Financial Institutions (CDFIs) are member-owned, strictly examined, and already have live institutional testers ready to review Quay's controls. Proving dual control, masked member records, and exam evidence with credit unions first establishes a tested foundation for the other eight sectors.",
  },
  {
    question:
      "Can a regulated institution run Bitcoin behind its own walls without a custodial vendor?",
    answer:
      "Yes, that is Bitcoin Quay's goal. Quay gives institutions open-source governance controls around an upstream BLVM Bitcoin full node so they can verify approvals, keep an append-only audit trail, and restrict outside connections on their own hardware—while keeping private key custody separate outside Quay.",
  },
  {
    question:
      "Does using a Bitcoin Quay industry profile certify an institution for SOC, NCUA, HIPAA, FedRAMP, or CMMC?",
    answer:
      "No. Bitcoin Quay publishes control design and auditor crosswalk criteria only. Software cannot certify an organization; formal examination or certification always happens between an institution and its independent regulator or auditor.",
  },
  {
    question:
      "How does Bitcoin Quay protect member, patient, student, or citizen data?",
    answer:
      "By keeping sensitive personal data out of the compliance ledger completely. Quay profiles enforce data-masking flags and refuse raw member payloads, payment card numbers (PAN), protected health information (PHI), and controlled unclassified information (CUI) inside Quay logs.",
  },
  {
    question:
      "Why are the nine sectors ordered from Credit Unions to US Military?",
    answer:
      "Credit Unions and CDFIs sit at number one because live testers are ready now. The remaining eight sectors—Nonprofits, Education, Payments/MSB, Banking & Insurance, Healthcare, Energy & Utilities, Civil Government, and US Military—follow in order of increasing data sensitivity, multi-agency oversight, and critical-infrastructure requirements.",
  },
] as const;

export const PROJECT_FAQS: readonly FaqItem[] = [
  {
    question: "Why should high-compliance Bitcoin software be open source?",
    answer:
      "Closed-source compliance tools force risk officers and examiners to trust a vendor's claims without checking the code. Open-source controls let any engineer, board member, or auditor read the exact Rust logic, run the tests, and verify that dual control and allowlists cannot be silently bypassed.",
  },
  {
    question:
      "How does Bitcoin Quay relate to Bitcoin Decoded and The Bitcoin Commons?",
    answer:
      "Bitcoin Quay is an independent compliance fork of the BTCDecoded/blvm full node maintained by The Bitcoin Commons. Quay keeps upstream consensus and node code untouched, merges upstream release tags, adds a separate compliance crate under quay/, and never pushes fork changes back to BTCDecoded remotes.",
  },
  {
    question: "How can developers or compliance reviewers contribute right now?",
    answer:
      "During Pre-Alpha, active repository collaboration is invite-only while live credit union testers harden the first profile. Contributors can email to request a Pre-Alpha invite, and the full project opens publicly under the MIT license upon Alpha release.",
  },
  {
    question: "Where should security vulnerabilities be reported?",
    answer:
      "Report bugs in Quay-authored code (quay/ or website/) privately to Bitcoin Quay maintainers via GitHub private vulnerability reporting or our public contact email. Consensus, P2P, or node vulnerabilities in upstream BLVM should be reported directly to Bitcoin Commons Security.",
  },
] as const;

export const BREAKDOWN_FAQS: readonly FaqItem[] = [
  {
    question: "What is the difference between the Node, Profiles, and SDK layers?",
    answer:
      "The Node layer pairs the upstream BLVM full node with the shared Quay compliance kernel (dual control, append-only evidence, allowlists, and hard refusals). Profiles are plain TOML files that swap in each industry's approved connectors and auditor crosswalk criteria. SDK apps are optional human workflows—such as consoles or exam-packet exporters—that only talk through the kernel's allowlist.",
  },
  {
    question: "How does maker/checker dual control work in Bitcoin Quay?",
    answer:
      "A Maker or Compliance role creates a structured intent for a sensitive change, and a separate Checker approves or rejects it. The Quay kernel enforces in code that the maker of an intent can never decide their own request, while Viewer and Examiner roles stay strictly read-only.",
  },
  {
    question: "What happens if an app tries to connect to an unapproved vendor?",
    answer:
      "The kernel refuses it automatically. Every external integration must name a connector explicitly listed on the active industry profile's allowlist, blocking shadow or ad-hoc connections before they run.",
  },
  {
    question:
      "Why does Bitcoin Quay refuse key custody, freeform sends, PAN storage, and ACH files?",
    answer:
      "Refusing those surfaces by design keeps the compliance layer small, testable, and free of high-risk custodial or cardholder-data scope. Private keys, core banking, card processing, and ACH origination stay in dedicated institutional systems while Quay tracks governance intents and vendor decision IDs.",
  },
  {
    question: "How do examiners or auditors review Bitcoin Quay evidence?",
    answer:
      "Examiners receive a read-only export of the append-only JSON evidence log containing each actor, action, timestamp, and external vendor decision ID. Because profiles reject attestation = true at load time, crosswalk criteria serve strictly as testable design maps for independent review.",
  },
] as const;

export const GLOSSARY_TERMS: readonly GlossaryTerm[] = [
  {
    slug: "dual-control",
    term: "Dual Control (Maker / Checker)",
    definition:
      "A two-person rule enforced in code: one authorized person proposes a sensitive change (Maker) and a different person approves or rejects it (Checker). Nobody can approve their own request.",
  },
  {
    slug: "append-only-evidence-log",
    term: "Append-Only Evidence Log",
    definition:
      "An uneditable timeline where every proposal and decision adds a new record showing who acted, what happened, when it occurred, and any linked external vendor decision ID.",
  },
  {
    slug: "integration-allowlist",
    term: "Integration Allowlist",
    definition:
      "A short, explicit list of approved external systems declared in an industry profile. Any connector not on that list is refused automatically.",
  },
  {
    slug: "industry-profile-pack",
    term: "Industry Profile Pack",
    definition:
      "A plain-text TOML configuration file that adapts the shared Quay kernel to a specific regulated sector by naming its allowed connectors, masking settings, and crosswalk criteria.",
  },
  {
    slug: "regulatory-control-crosswalk",
    term: "Regulatory Control Crosswalk",
    definition:
      "A written map showing how technical controls correspond to criteria auditors already test (such as NCUA, SOC 2, HIPAA, or CMMC). It describes control design and is never a certification.",
  },
  {
    slug: "hard-safety-refusal",
    term: "Hard Safety Refusal",
    definition:
      "A built-in boundary where the software explicitly rejects out-of-scope operations—including key custody, freeform wallet sends, payment card numbers (PAN), ACH file generation, and raw personal data payloads.",
  },
] as const;

