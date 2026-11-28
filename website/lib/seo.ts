import type { Metadata } from "next";

import {
  DESCRIPTION,
  SITE_DATE_MODIFIED,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/copy";

export type RouteKey =
  | "home"
  | "industries"
  | "project"
  | "breakdown"
  | "contact";

export type RouteSeoConfig = {
  key: RouteKey;
  path: string;
  navLabel: string;
  title: string;
  ogTitle: string;
  description: string;
  keywords: readonly string[];
  sitemapPriority: number;
  changeFrequency: "weekly" | "monthly";
};

const HOME_CONFIG: RouteSeoConfig = {
  key: "home",
  path: "/",
  navLabel: "Home",
  title: `${SITE_NAME} — Open Controls for Sovereign Bitcoin`,
  ogTitle: "Bitcoin behind institutional walls — open controls for sovereign Bitcoin",
  description: DESCRIPTION,
  keywords: [
    "Bitcoin Quay",
    "sovereign Bitcoin compliance",
    "open-source Bitcoin governance",
    "Bitcoin behind institutional walls",
    "BLVM compliance fork",
    "Bitcoin Commons fork",
    "credit union Bitcoin node",
    "CDFI Bitcoin infrastructure",
    "dual-control Bitcoin approvals",
  ],
  sitemapPriority: 1.0,
  changeFrequency: "weekly",
};

const INDUSTRIES_CONFIG: RouteSeoConfig = {
  key: "industries",
  path: "/industries",
  navLabel: "Industries",
  title: "Industries & Certifications",
  ogTitle: "Nine high-compliance sectors on one open Bitcoin kernel",
  description:
    "Explore the nine regulated sectors Bitcoin Quay targets—starting with credit unions and CDFIs—plus control crosswalks for NCUA, SOC, FERPA, FinCEN, HIPAA, NERC CIP, FedRAMP, and CMMC. Control design only.",
  keywords: [
    "Bitcoin for credit unions",
    "CDFI Bitcoin infrastructure",
    "NCUA exam evidence Bitcoin node",
    "nonprofit Bitcoin governance",
    "education FERPA Bitcoin boundary",
    "MSB FinCEN Bitcoin compliance controls",
    "banking insurance Bitcoin dual control",
    "healthcare HIPAA Bitcoin control crosswalk",
    "energy NERC CIP Bitcoin governance",
    "government FedRAMP CMMC Bitcoin control mapping",
  ],
  sitemapPriority: 0.9,
  changeFrequency: "monthly",
};

const PROJECT_CONFIG: RouteSeoConfig = {
  key: "project",
  path: "/project",
  navLabel: "Project",
  title: "The Project",
  ogTitle: "Why high-compliance Bitcoin software belongs in the open",
  description:
    "Why regulated Bitcoin controls should be open source, how the Bitcoin Quay repository tracks BTCDecoded/blvm under the MIT license, and how to join Pre-Alpha ahead of public Alpha.",
  keywords: [
    "open-source compliance software",
    "Rust Bitcoin compliance crate",
    "Bitcoin Commons BLVM fork",
    "dual-control audit log code",
    "MIT licensed Bitcoin compliance",
    "open-source financial exam evidence",
    "contribute to Bitcoin Quay",
  ],
  sitemapPriority: 0.85,
  changeFrequency: "monthly",
};

const BREAKDOWN_CONFIG: RouteSeoConfig = {
  key: "breakdown",
  path: "/breakdown",
  navLabel: "Breakdown",
  title: "Full Breakdown",
  ogTitle: "Node, Profiles, and SDK — full Bitcoin Quay technical breakdown",
  description:
    "Full architectural breakdown of Bitcoin Quay: Node kernel vs. TOML industry profiles vs. SDK apps, nine-sector difficulty rankings, framework crosswalk matrix, shared controls, hard refusals, and glossary.",
  keywords: [
    "maker checker Bitcoin governance",
    "append-only evidence log",
    "Bitcoin integration allowlist",
    "node profiles SDK architecture",
    "examiner read-only Bitcoin export",
    "SOC 1 SOC 2 Bitcoin crosswalk",
    "non-custodial Bitcoin compliance layer",
    "BLVM separate compliance process",
  ],
  sitemapPriority: 0.9,
  changeFrequency: "monthly",
};

const CONTACT_CONFIG: RouteSeoConfig = {
  key: "contact",
  path: "/contact",
  navLabel: "Contact",
  title: "Contact",
  ogTitle: "Contact Bitcoin Quay — CU/CDFI updates and Pre-Alpha invites",
  description:
    "Reach Bitcoin Quay by email for Credit Union and CDFI release updates, Pre-Alpha contributor invites, or institutional briefings. No form storage or member data.",
  keywords: [
    "Credit Union Bitcoin release updates",
    "CDFI Bitcoin pilot updates",
    "Bitcoin Quay contributor invite",
    "institutional Bitcoin briefing",
    "Bitcoin Quay contact",
  ],
  sitemapPriority: 0.6,
  changeFrequency: "monthly",
};

export function getRouteConfig(key: RouteKey): RouteSeoConfig {
  switch (key) {
    case "home":
      return HOME_CONFIG;
    case "industries":
      return INDUSTRIES_CONFIG;
    case "project":
      return PROJECT_CONFIG;
    case "breakdown":
      return BREAKDOWN_CONFIG;
    case "contact":
      return CONTACT_CONFIG;
    default: {
      const _exhaustive: never = key;
      return _exhaustive;
    }
  }
}

export const ALL_ROUTES: readonly RouteSeoConfig[] = [
  HOME_CONFIG,
  INDUSTRIES_CONFIG,
  PROJECT_CONFIG,
  BREAKDOWN_CONFIG,
  CONTACT_CONFIG,
] as const;

export function buildRootMetadata(): Metadata {
  const ogImageUrl = absoluteUrl("/opengraph-image");
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: HOME_CONFIG.title,
      template: `%s · ${SITE_NAME}`,
    },
    description: DESCRIPTION,
    applicationName: SITE_NAME,
    authors: [{ name: `${SITE_NAME} Contributors` }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    keywords: [...HOME_CONFIG.keywords],
    alternates: {
      canonical: absoluteUrl("/"),
      languages: {
        "en-US": absoluteUrl("/"),
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: absoluteUrl("/"),
      siteName: SITE_NAME,
      title: HOME_CONFIG.ogTitle,
      description: DESCRIPTION,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — open-source compliance controls for sovereign Bitcoin`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: HOME_CONFIG.ogTitle,
      description: DESCRIPTION,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    other: {
      "article:modified_time": SITE_DATE_MODIFIED,
    },
  };
}

export function buildPageMetadata(key: RouteKey): Metadata {
  const config = getRouteConfig(key);
  const url = absoluteUrl(config.path);
  const ogImageUrl = absoluteUrl("/opengraph-image");

  return {
    title:
      key === "home"
        ? {
            absolute: config.title,
          }
        : config.title,
    description: config.description,
    keywords: [...config.keywords],
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
      },
    },
    openGraph: {
      type: key === "breakdown" ? "article" : "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: config.ogTitle,
      description: config.description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${config.ogTitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.ogTitle,
      description: config.description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    other: {
      "article:modified_time": SITE_DATE_MODIFIED,
    },
  };
}
