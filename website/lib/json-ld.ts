import {
  BREAKDOWN_FAQS,
  GLOSSARY_TERMS,
  INDUSTRIES,
  INDUSTRIES_FAQS,
  PROJECT_FAQS,
  type FaqItem,
} from "@/lib/content";
import {
  CONTACT_EMAIL,
  DESCRIPTION,
  MIT_LICENSE_URL,
  SITE_DATE_MODIFIED,
  SITE_DATE_PUBLISHED,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  UPSTREAM_REPO_URL,
  absoluteUrl,
} from "@/lib/copy";
import { getRouteConfig } from "@/lib/seo";

type JsonLdNode = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const SOFTWARE_ID = `${SITE_URL}/#software`;

export function organizationNode(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/apple-icon"),
      width: 180,
      height: 180,
    },
    description: DESCRIPTION,
    email: CONTACT_EMAIL,
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "institutional updates",
        email: CONTACT_EMAIL,
        url: absoluteUrl("/contact"),
        areaServed: "US",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "security",
        email: CONTACT_EMAIL,
        url: absoluteUrl("/project#security"),
        availableLanguage: ["English"],
      },
    ],
    knowsAbout: [
      "Sovereign Bitcoin full node operations",
      "Bitcoin Commons BLVM fork",
      "Credit union and CDFI Bitcoin compliance controls",
      "Dual-control maker/checker governance",
      "Append-only compliance evidence logs",
      "Integration allowlists",
      "NCUA and FFIEC exam evidence design",
      "SOC 1 and SOC 2 control crosswalks",
      "HIPAA, FERPA, NERC CIP, FedRAMP, and CMMC control mapping",
    ],
  };
}

export function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_TAGLINE,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function softwareSourceCodeNode(): JsonLdNode {
  return {
    "@type": "SoftwareSourceCode",
    "@id": SOFTWARE_ID,
    name: "Bitcoin Quay",
    description:
      "Open-source MIT compliance fork of BTCDecoded/blvm providing a separate Rust compliance kernel for dual control, append-only evidence logs, integration allowlists, examiner read-only exports, and hard safety refusals (no key custody, freeform wallet sends, PAN storage, or ACH file generation).",
    programmingLanguage: "Rust",
    runtimePlatform: "Linux, macOS, Windows (separate process alongside BLVM)",
    license: MIT_LICENSE_URL,
    isBasedOn: UPSTREAM_REPO_URL,
    isAccessibleForFree: true,
    url: absoluteUrl("/project"),
    author: { "@id": ORG_ID },
    maintainer: { "@id": ORG_ID },
    keywords:
      "Bitcoin, BLVM, Bitcoin Commons, compliance controls, dual control, maker checker, append-only evidence, credit union, CDFI, Rust",
  };
}

export function breadcrumbNode(
  crumbs: readonly { name: string; path: string }[],
  id: string,
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

function industryItemListNode(id: string): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": id,
    name: "Bitcoin Quay target regulated industries in rollout order",
    numberOfItems: INDUSTRIES.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: INDUSTRIES.map((sector) => ({
      "@type": "ListItem",
      position: sector.rank,
      name: sector.name,
      description: sector.whyBehindTheWall,
      url: absoluteUrl(`/industries#${sector.slug}`),
    })),
  };
}

function faqPageNode(id: string, faqs: readonly FaqItem[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function glossaryNode(): JsonLdNode {
  const url = absoluteUrl("/breakdown#glossary");
  return {
    "@type": "DefinedTermSet",
    "@id": `${url}-set`,
    name: "Bitcoin Quay Plain-English Compliance Glossary",
    url,
    inDefinedTermSet: url,
    hasDefinedTerm: GLOSSARY_TERMS.map((item) => ({
      "@type": "DefinedTerm",
      "@id": absoluteUrl(`/breakdown#term-${item.slug}`),
      name: item.term,
      description: item.definition,
      url: absoluteUrl(`/breakdown#term-${item.slug}`),
    })),
  };
}

export function homeJsonLd(): JsonLdNode {
  const config = getRouteConfig("home");
  const url = absoluteUrl(config.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      softwareSourceCodeNode(),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: config.title,
        description: config.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": SOFTWARE_ID },
        publisher: { "@id": ORG_ID },
        datePublished: SITE_DATE_PUBLISHED,
        dateModified: SITE_DATE_MODIFIED,
        inLanguage: "en-US",
      },
      industryItemListNode(`${url}#target-sectors`),
    ],
  };
}

export function industriesJsonLd(): JsonLdNode {
  const config = getRouteConfig("industries");
  const url = absoluteUrl(config.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: config.title,
        description: config.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": SOFTWARE_ID },
        datePublished: SITE_DATE_PUBLISHED,
        dateModified: SITE_DATE_MODIFIED,
        inLanguage: "en-US",
      },
      breadcrumbNode(
        [
          { name: "Home", path: "/" },
          { name: "Industries & Certifications", path: "/industries" },
        ],
        `${url}#breadcrumb`,
      ),
      industryItemListNode(`${url}#sector-list`),
      faqPageNode(`${url}#faq`, INDUSTRIES_FAQS),
    ],
  };
}

export function projectJsonLd(): JsonLdNode {
  const config = getRouteConfig("project");
  const url = absoluteUrl(config.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      softwareSourceCodeNode(),
      {
        "@type": "AboutPage",
        "@id": `${url}#webpage`,
        url,
        name: config.title,
        description: config.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": SOFTWARE_ID },
        datePublished: SITE_DATE_PUBLISHED,
        dateModified: SITE_DATE_MODIFIED,
        inLanguage: "en-US",
      },
      breadcrumbNode(
        [
          { name: "Home", path: "/" },
          { name: "The Project", path: "/project" },
        ],
        `${url}#breadcrumb`,
      ),
      faqPageNode(`${url}#faq`, PROJECT_FAQS),
    ],
  };
}

export function breakdownJsonLd(): JsonLdNode {
  const config = getRouteConfig("breakdown");
  const url = absoluteUrl(config.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      softwareSourceCodeNode(),
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        url,
        headline: "How Bitcoin Quay splits the node, the rules, and the apps",
        description: config.description,
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": SOFTWARE_ID },
        datePublished: SITE_DATE_PUBLISHED,
        dateModified: SITE_DATE_MODIFIED,
        inLanguage: "en-US",
        proficiencyLevel: "Beginner to Institutional Architect",
      },
      breadcrumbNode(
        [
          { name: "Home", path: "/" },
          { name: "Full Breakdown", path: "/breakdown" },
        ],
        `${url}#breadcrumb`,
      ),
      glossaryNode(),
      faqPageNode(`${url}#faq`, BREAKDOWN_FAQS),
    ],
  };
}

export function contactJsonLd(): JsonLdNode {
  const config = getRouteConfig("contact");
  const url = absoluteUrl(config.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      {
        "@type": "ContactPage",
        "@id": `${url}#webpage`,
        url,
        name: config.title,
        description: config.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        datePublished: SITE_DATE_PUBLISHED,
        dateModified: SITE_DATE_MODIFIED,
        inLanguage: "en-US",
      },
      breadcrumbNode(
        [
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ],
        `${url}#breadcrumb`,
      ),
    ],
  };
}
