import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getLegalDoc,
  isLegalSlug,
  LEGAL_SLUGS,
  normalizeLocale,
} from "@/components/legal/registry";

/**
 * Bare "embed" variant of each legal document, loaded by the mobile app in a
 * WebView at `/legal/<slug>?lang=<locale>`. No site chrome (no nav/footer/back
 * link), tighter padding, inherits the dark theme from the root layout. The
 * language falls back to French when the requested one has no translation yet.
 * `noindex` so these duplicates of the public `/<slug>` pages are not indexed.
 */

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

function readLang(value: string | string[] | undefined): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const { lang } = await searchParams;
  const robots = { index: false, follow: false };
  if (!isLegalSlug(slug)) return { title: "Document légal — Laboon", robots };
  const { entry } = getLegalDoc(normalizeLocale(readLang(lang)), slug);
  return { title: entry.metaTitle, robots };
}

export default async function LegalEmbedPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const { lang } = await searchParams;
  if (!isLegalSlug(slug)) notFound();

  const { entry } = getLegalDoc(normalizeLocale(readLang(lang)), slug);
  const { Component } = entry;
  return (
    <main className="mx-auto max-w-3xl px-5 py-8">
      <Component />
    </main>
  );
}
