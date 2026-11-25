import type { Metadata } from "next";
import { Poppins, Space_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { Shell } from "@/components/shell";
import { DESCRIPTION, SITE_URL } from "@/lib/copy";

import "./globals.css";

const display = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
});

const sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bitcoin Quay",
    template: "%s · Bitcoin Quay",
  },
  description: DESCRIPTION,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
