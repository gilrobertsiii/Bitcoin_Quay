import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d1b2a",
          border: "8px solid #ffa500",
          fontFamily: "ui-monospace, monospace",
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            color: "#ffa500",
            lineHeight: 1,
          }}
        >
          Q
        </div>
        <div
          style={{
            marginTop: 10,
            width: 64,
            height: 6,
            background: "#ff1a75",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
