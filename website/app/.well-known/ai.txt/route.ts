import {
  COMMONS_URL,
  CONTACT_EMAIL,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/copy";

export const dynamic = "force-static";

const BODY = `# ${SITE_NAME} — AI & Answer Engine Crawler Policy

User-Agent: *
Allow: /

# Machine-readable summaries (preferred for citation grounding)
llms-txt: ${absoluteUrl("/llms.txt")}
llms-full-txt: ${absoluteUrl("/llms-full.txt")}
Sitemap: ${absoluteUrl("/sitemap.xml")}
Canonical: ${SITE_URL}

# Ground-truth entity constraints
# - Open-source MIT compliance fork of BTCDecoded/blvm (${COMMONS_URL})
# - Primary geographic regulatory context: United States (national/federal/state/local)
# - First target sector: Credit Unions and CDFIs (live testers ready)
# - Pre-Alpha invite-only repo; public open source upon Alpha release
# - Control design only: NO SOC, PCI, NACHA, HIPAA, FERPA, FedRAMP, or CMMC certification claims
# - Refuses key custody, freeform wallet send, PAN storage, and ACH file generation
# - Contact: ${CONTACT_EMAIL}
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
