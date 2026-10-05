import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SITE_CONTENT } from "@/content/site";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_CONTENT.title,
  description: SITE_CONTENT.description,
  keywords: SITE_CONTENT.keywords,
  openGraph: {
    title: SITE_CONTENT.title,
    description: SITE_CONTENT.shareDescription,
    type: "website",
    locale: "fr_FR",
    siteName: SITE_CONTENT.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONTENT.title,
    description: SITE_CONTENT.shareDescription,
  },
};

// Mobile-first: device width, and the browser UI tinted with the page background.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        {children}
        {/* Vercel Web Analytics: cookieless, anonymous, aggregated. See docs/features/analytics.md */}
        <Analytics />
      </body>
    </html>
  );
}
