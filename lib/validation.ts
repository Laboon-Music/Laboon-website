// Shared input validation helpers used by the API routes.

// Pragmatic email check: something@something.tld, no whitespace.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value);
}

/** Trims and lowercases an untrusted email value (non-strings become ""). */
export function normalizeEmail(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

/** Trims an untrusted text value (non-strings become ""). */
export function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Escapes user input before inserting it into an HTML email. */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
