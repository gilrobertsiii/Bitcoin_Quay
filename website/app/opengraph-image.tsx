import { ImageResponse } from "next/og";

import { SITE_NAME } from "@/lib/copy";

export const alt =
  "Bitcoin Quay — Open-source compliance controls for sovereign Bitcoin behind institutional walls";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 64px",
          background: "#0d1b2a",
          color: "#f4f1ea",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          borderTop: "8px solid #ffa500",
          borderBottom: "8px solid #0088cc",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: "0.14em",
              fontWeight: 700,
              fontFamily: "ui-monospace, monospace",
            }}
          >
            <span>BITCOIN&nbsp;</span>
            <span style={{ color: "#ffa500" }}>QUAY</span>
          </div>
          <div
            style={{
              fontSize: 18,
              padding: "8px 16px",
              border: "2px solid #0088cc",
              color: "#0088cc",
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.08em",
            }}
          >
            MIT · BLVM FORK
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.08,
              maxWidth: 980,
              fontFamily: "ui-monospace, monospace",
            }}
          >
            Bitcoin behind institutional walls.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              maxWidth: 960,
              color: "#b7c3ce",
            }}
          >
            Open-source dual control, append-only evidence, and allowlists for
            9 regulated sectors—starting with Credit Unions &amp; CDFIs.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 165, 0, 0.4)",
            paddingTop: 20,
            fontSize: 20,
            color: "#b7c3ce",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          <span>{SITE_NAME} · Control design only (not a certification)</span>
          <span style={{ color: "#ff1a75", fontWeight: 700 }}>
            bitcoinquay.com
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
