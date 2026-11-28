export const SITE_NAME = "Bitcoin Quay";

export const SITE_URL = "https://www.bitcoinquay.com";

export const SITE_TAGLINE =
  "Open-source compliance controls for sovereign Bitcoin behind institutional walls.";

export const CONTACT_EMAIL = "gil@gilroberts.net";

export const COMMONS_URL = "https://thebitcoincommons.org";

export const UPSTREAM_REPO_URL = "https://github.com/BTCDecoded/blvm";

export const COMMONS_SECURITY_URL =
  "https://github.com/BTCDecoded/blvm/blob/main/SECURITY.md";

export const MIT_LICENSE_URL = "https://opensource.org/license/mit";

export const SITE_DATE_PUBLISHED = "2026-11-25";

export const SITE_DATE_MODIFIED = "2026-11-28";

export const DESCRIPTION =
  "Bitcoin Quay is an open-source fork of the Bitcoin Commons BLVM node. It gives high-compliance industries—starting with credit unions and CDFIs—the open controls they need to run Bitcoin sovereignly behind their own walls.";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}

export function buildMailto(subject: string, body: string): string {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${CONTACT_EMAIL}?${params.toString().replace(/\+/g, "%20")}`;
}

export const CU_UPDATES_MAILTO = buildMailto(
  "Bitcoin Quay — Credit Union / CDFI Release Updates",
  "Hello Bitcoin Quay team,\n\nI am a Credit Union or CDFI leader interested in release updates as the project moves toward Alpha.\n\nOrganization:\nRole:\n",
);

export const CONTRIBUTE_INVITE_MAILTO = buildMailto(
  "Bitcoin Quay — Pre-Alpha Contributor Invite Request",
  "Hello Bitcoin Quay team,\n\nI would like to request an invite to the pre-alpha repository.\n\nGitHub handle:\nBackground / area of interest (Rust kernel, compliance profiles, SDK, docs):\n",
);

export const GENERAL_MAILTO = buildMailto(
  "Bitcoin Quay — Question or Briefing",
  "Hello Bitcoin Quay team,\n\n",
);
