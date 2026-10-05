import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// sitemap.xml : liste des pages publiques à proposer à Google.
// Ajouter ici toute nouvelle page publique du site.
const PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/contact", priority: 0.5 },
  { path: "/mentions-legales", priority: 0.2 },
  { path: "/confidentialite", priority: 0.2 },
  { path: "/cgu", priority: 0.2 },
  { path: "/cgv", priority: 0.2 },
  { path: "/charte", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    priority,
  }));
}
