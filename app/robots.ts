import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { robotsFor } from "@/lib/site";

// robots.txt — only production is indexable; staging and Vercel preview URLs
// (*.vercel.app) are fully blocked to avoid duplicate content.
// See docs/features/seo.md.
export default async function robots(): Promise<MetadataRoute.Robots> {
  return robotsFor((await headers()).get("host"));
}
