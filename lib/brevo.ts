import { reportError } from "@/lib/monitoring";

// Minimal Brevo (ex-Sendinblue) API client. See docs/integrations/brevo.md.

const BREVO_API_URL = "https://api.brevo.com/v3";

/** Verified sender domain in Brevo (DKIM + DMARC). */
export const BREVO_SENDER_EMAIL = "noreply@laboon-app.com";

/**
 * POSTs a JSON payload to the Brevo API. Returns true on 2xx; a refusal is
 * reported (Sentry) with Brevo's error code. Throws on network errors so
 * callers can tell "Brevo said no" apart from "Brevo unreachable".
 */
export async function brevoPost(
  path: string,
  apiKey: string,
  payload: unknown,
  feature: string,
): Promise<boolean> {
  const res = await fetch(`${BREVO_API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    reportError(feature, "Brevo refused the request", {
      path,
      status: res.status,
      code: data?.code,
    });
  }
  return res.ok;
}
