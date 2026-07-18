import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "BETWEEN · AI care between appointments",
  description: "A clinician-bounded AI care loop that notices plan drift, finds one achievable next step, and connects the care team when human attention is needed.",
  applicationName: "BETWEEN",
  category: "health",
  openGraph: {
    type: "website",
    title: "BETWEEN · AI care between appointments",
    description: "Notice drift. Adapt the next step. Connect the human.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BETWEEN · AI care between appointments",
    description: "Notice drift. Adapt the next step. Connect the human.",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#07110f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
