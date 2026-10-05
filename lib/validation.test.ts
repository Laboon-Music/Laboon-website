import { describe, expect, it } from "vitest";
import { cleanText, escapeHtml, isValidEmail, normalizeEmail } from "./validation";

describe("isValidEmail", () => {
  it.each(["a@b.co", "jane.doe+tag@laboon-app.com"])("accepts %s", (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  it.each(["", "plain", "a@b", "a b@c.d", "@b.co", "a@.co "])("rejects %j", (email) => {
    expect(isValidEmail(email)).toBe(false);
  });
});

describe("normalizeEmail", () => {
  it("trims and lowercases", () => {
    expect(normalizeEmail("  Jane@Example.COM ")).toBe("jane@example.com");
  });

  it("returns an empty string for non-strings", () => {
    expect(normalizeEmail(undefined)).toBe("");
    expect(normalizeEmail(42)).toBe("");
  });
});

describe("cleanText", () => {
  it("trims strings and ignores other types", () => {
    expect(cleanText("  hi ")).toBe("hi");
    expect(cleanText({})).toBe("");
  });
});

describe("escapeHtml", () => {
  it("escapes every HTML-significant character", () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;",
    );
  });
});
