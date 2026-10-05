import { describe, expect, it } from "vitest";
import { getLegalDoc, isLegalSlug, LEGAL_SLUGS, normalizeLocale } from "./registry";

describe("legal registry", () => {
  it("exposes the five documents", () => {
    expect([...LEGAL_SLUGS].sort()).toEqual(
      ["cgu", "cgv", "charte", "confidentialite", "mentions-legales"].sort(),
    );
  });

  it("validates slugs", () => {
    expect(isLegalSlug("cgu")).toBe(true);
    expect(isLegalSlug("../etc")).toBe(false);
  });

  it("falls back to French for unknown or untranslated locales", () => {
    expect(normalizeLocale("de")).toBe("fr");
    expect(normalizeLocale(null)).toBe("fr");
    expect(getLegalDoc("en", "cgu").locale).toBe("fr");
  });

  it("gives every document a page title", () => {
    for (const slug of LEGAL_SLUGS) {
      expect(getLegalDoc("fr", slug).entry.metaTitle).toMatch(/— Laboon$/);
    }
  });
});
