import {
  COMMONS_SECURITY_URL,
  CONTACT_EMAIL,
  absoluteUrl,
} from "@/lib/copy";

export const dynamic = "force-static";

const BODY = `# Bitcoin Quay security disclosure contact (RFC 9116)
# Quay-authored code (quay/ and website/): report privately via the contact below.
# Upstream BLVM node / consensus bugs: report to Bitcoin Commons (${COMMONS_SECURITY_URL}).

Contact: mailto:${CONTACT_EMAIL}
Policy: ${absoluteUrl("/project#security")}
Canonical: ${absoluteUrl("/.well-known/security.txt")}
Preferred-Languages: en
Expires: 2027-11-28T00:00:00.000Z
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
