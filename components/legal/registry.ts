import type { ComponentType } from "react";
import Cgu from "./content/fr/Cgu";
import Cgv from "./content/fr/Cgv";
import Charte from "./content/fr/Charte";
import Confidentialite from "./content/fr/Confidentialite";
import MentionsLegales from "./content/fr/MentionsLegales";

/**
 * Registry of legal documents, keyed by locale then slug. The slug is used both
 * in the public route (`/<slug>`) and the app WebView embed route
 * (`/legal/<slug>?lang=<locale>`), and must stay in sync with
 * `legal_document.slug` in Supabase.
 *
 * Only French exists today. Adding a language = create `content/<locale>/*.tsx`
 * and register it in `LEGAL_CONTENT`. Missing translations fall back to
 * `DEFAULT_LOCALE`.
 */
export type Locale = "fr" | "en";
export const DEFAULT_LOCALE: Locale = "fr";

export type LegalSlug = "cgu" | "cgv" | "charte" | "confidentialite" | "mentions-legales";

type LegalEntry = { metaTitle: string; Component: ComponentType };

const FR: Record<LegalSlug, LegalEntry> = {
  cgu: { metaTitle: "Conditions Générales d'Utilisation — Laboon", Component: Cgu },
  cgv: { metaTitle: "Conditions Générales de Vente — Laboon", Component: Cgv },
  charte: { metaTitle: "Charte de Bonne Conduite — Laboon", Component: Charte },
  confidentialite: {
    metaTitle: "Politique de confidentialité — Laboon",
    Component: Confidentialite,
  },
  "mentions-legales": {
    metaTitle: "Mentions légales — Laboon",
    Component: MentionsLegales,
  },
};

export const LEGAL_CONTENT: Partial<Record<Locale, Record<LegalSlug, LegalEntry>>> = {
  fr: FR,
};

export const LEGAL_SLUGS = Object.keys(FR) as LegalSlug[];

export function isLegalSlug(value: string): value is LegalSlug {
  return (LEGAL_SLUGS as string[]).includes(value);
}

/** Coerce an arbitrary `?lang` value to a locale we actually serve. */
export function normalizeLocale(value?: string | null): Locale {
  return value && LEGAL_CONTENT[value as Locale] ? (value as Locale) : DEFAULT_LOCALE;
}

/**
 * Resolve a document for a locale, falling back to [DEFAULT_LOCALE] when the
 * requested language has no translation yet. Returns the entry and the locale
 * actually used.
 */
export function getLegalDoc(
  locale: Locale,
  slug: LegalSlug,
): { entry: LegalEntry; locale: Locale } {
  const resolved = LEGAL_CONTENT[locale] ? locale : DEFAULT_LOCALE;
  return { entry: LEGAL_CONTENT[resolved]![slug], locale: resolved };
}
