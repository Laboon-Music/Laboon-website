import { checkAntibot, type AntibotFields } from "@/lib/antibot";
import { BREVO_SENDER_EMAIL, brevoPost } from "@/lib/brevo";
import { CONTACT_LIMITS, subjectEmailLabel } from "@/lib/contact";
import { FEATURE_ENV, missingEnv, readEnv } from "@/lib/env";
import {
  INVALID_REQUEST_ERROR,
  isProduction,
  jsonError,
  jsonOk,
  NETWORK_ERROR,
  readJsonBody,
} from "@/lib/http";
import { reportError } from "@/lib/monitoring";
import { cleanText, escapeHtml, isValidEmail, normalizeEmail } from "@/lib/validation";

// POST /api/contact — sends the contact form message to the team by email
// (Brevo transactional email). See docs/features/contact-form.md.

const SEND_ERROR = "Envoi impossible pour le moment. Réessaie plus tard.";

type ContactBody = AntibotFields & {
  name: unknown;
  email: unknown;
  subject: unknown;
  message: unknown;
};

export async function POST(request: Request) {
  const body = await readJsonBody<ContactBody>(request);
  if (!body) return jsonError(INVALID_REQUEST_ERROR, 400);

  const blocked = await checkAntibot(body, request);
  if (blocked) return blocked;

  const name = cleanText(body.name).slice(0, CONTACT_LIMITS.nameMax);
  const email = normalizeEmail(body.email);
  const subject = subjectEmailLabel(body.subject);
  const message = cleanText(body.message);

  if (!name) return jsonError("Indique ton nom.", 400);
  if (!isValidEmail(email)) return jsonError("Adresse email invalide.", 400);
  if (message.length < CONTACT_LIMITS.messageMin) {
    return jsonError(
      `Ton message est un peu court (${CONTACT_LIMITS.messageMin} caractères minimum).`,
      400,
    );
  }
  if (message.length > CONTACT_LIMITS.messageMax) {
    return jsonError(
      `Ton message est trop long (${CONTACT_LIMITS.messageMax} caractères max).`,
      400,
    );
  }

  // Locally, a missing Brevo config is a "dry run" (logged in the terminal) so
  // the form can be tested without an API key. Online it is a real error: never
  // show "Message envoyé" when the message went nowhere.
  const missing = missingEnv(FEATURE_ENV["contact form"]);
  if (missing.length) {
    if (!isProduction()) {
      console.log("[contact] dry run (Brevo not configured):", {
        name,
        email,
        subject,
        message,
      });
      return jsonOk({ dryRun: true });
    }
    reportError("contact", "Brevo is not configured", { missing });
    return jsonError(SEND_ERROR, 500);
  }

  const apiKey = readEnv("BREVO_API_KEY")!;
  const to = readEnv("CONTACT_TO_EMAIL")!;

  try {
    // replyTo = the visitor: hitting "Reply" in the mailbox answers them directly.
    const sent = await brevoPost(
      "/smtp/email",
      apiKey,
      {
        sender: { name: "Laboon - Contact", email: BREVO_SENDER_EMAIL },
        to: [{ email: to }],
        replyTo: { email, name },
        subject: `[Contact Laboon] ${subject} — ${name}`,
        htmlContent: `
          <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
          <p><strong>Email :</strong> ${escapeHtml(email)}</p>
          <p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
          <hr />
          <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
        `,
        textContent: `Nom : ${name}\nEmail : ${email}\nSujet : ${subject}\n\n${message}`,
        tags: ["contact"],
      },
      "contact",
    );
    return sent ? jsonOk() : jsonError(SEND_ERROR, 502);
  } catch (err) {
    reportError("contact", "Brevo unreachable", {}, err);
    return jsonError(NETWORK_ERROR, 500);
  }
}
