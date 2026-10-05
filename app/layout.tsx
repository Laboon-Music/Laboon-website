import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Laboon — Trouve tes partenaires de musique",
  description:
    "Laboon met en relation les musiciens : trouve des partenaires de jeu, monte ton groupe, rencontre des musiciens près de chez toi. Inscris-toi pour le lancement et la beta.",
  keywords: [
    "musiciens",
    "groupe de musique",
    "rencontre musiciens",
    "jouer de la musique",
    "Laboon",
  ],
  openGraph: {
    title: "Laboon — Trouve tes partenaires de musique",
    description:
      "L'application qui met en relation les musiciens. Inscris-toi pour le lancement et la beta.",
    type: "website",
    locale: "fr_FR",
    siteName: "Laboon",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laboon — Trouve tes partenaires de musique",
    description:
      "L'application qui met en relation les musiciens. Inscris-toi pour le lancement et la beta.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        {children}
        {/* Mesure d'audience Vercel : sans cookie, données anonymes et agrégées */}
        <Analytics />
      </body>
    </html>
  );
}
