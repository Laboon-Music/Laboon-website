import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { PROD_HOSTS, SITE_URL } from "@/lib/site";

// robots.txt : indique aux moteurs de recherche ce qu'ils peuvent indexer.
// Seul le vrai site (prod) est indexable : staging et les URLs de preview
// Vercel (*.vercel.app) sont entièrement bloqués pour ne pas créer de doublons.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") ?? "";

  if (!PROD_HOSTS.includes(host)) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/legal/", "/reset-password", "/inscription-confirmee"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
