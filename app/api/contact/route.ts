import { NextResponse } from "next/server";
import {
  isTooFast,
  TOO_FAST_ERROR,
  TURNSTILE_ERROR,
  verifyTurnstile,
} from "@/lib/antibot";

// Validation simple d'une adresse email
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SEND_ERROR = "Envoi impossible pour le moment. Réessaie plus tard.";

// Sujets proposés dans le formulaire (le libellé apparaît dans l'objet du mail)
const SUBJECTS: Record<string, string> = {
  question: "Question",
  beta: "Beta / tests",
  partenariat: "Partenariat / presse",
  bug: "Signaler un problème",
  autre: "Autre",
};

const MAX_NAME = 100;
const MAX_MESSAGE = 5000;

// Échappe le texte saisi avant de l'insérer dans l'email HTML
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    website?: string;
    elapsedMs?: number;
    turnstileToken?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Champ piège (invisible pour les humains) : s'il est rempli, c'est un robot.
  // On répond "ok" sans rien envoyer pour ne pas lui donner d'indice.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  // Formulaire envoyé en moins de 3 secondes : sans doute un robot. On renvoie
  // une erreur visible (et non un faux "ok") pour qu'un humain très rapide
  // puisse simplement réessayer.
  if (isTooFast(body.elapsedMs)) {
    return NextResponse.json({ error: TOO_FAST_ERROR }, { status: 400 });
  }

  // Vérification Cloudflare Turnstile (ignorée si non configurée)
  if (!(await verifyTurnstile(body.turnstileToken, request))) {
    return NextResponse.json({ error: TURNSTILE_ERROR }, { status: 400 });
  }

  const name = (body.name || "").trim().slice(0, MAX_NAME);
  const email = (body.email || "").trim().toLowerCase();
  const subjectLabel = SUBJECTS[body.subject || ""] ?? SUBJECTS.autre;
  const message = (body.message || "").trim();

  if (!name) {
    return NextResponse.json({ error: "Indique ton nom." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Adresse email invalide." },
      { status: 400 }
    );
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Ton message est un peu court (10 caractères minimum)." },
      { status: 400 }
    );
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json(
      { error: `Ton message est trop long (${MAX_MESSAGE} caractères max).` },
      { status: 400 }
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  // En local uniquement : si Brevo n'est pas configuré, on affiche le message
  // dans le terminal pour pouvoir tester le formulaire sans clé API.
  // En ligne (Vercel), une config manquante est une vraie erreur : on ne doit
  // jamais afficher "Message envoyé" alors qu'il n'est parti nulle part.
  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] (Brevo non configuré) =>", {
        name,
        email,
        subject: subjectLabel,
        message,
      });
      return NextResponse.json({ ok: true, dryRun: true });
    }
    console.error("[contact] BREVO_API_KEY ou CONTACT_TO_EMAIL manquante");
    return NextResponse.json({ error: SEND_ERROR }, { status: 500 });
  }

  try {
    // Email transactionnel Brevo envoyé à l'équipe. Le "Répondre" de la
    // messagerie répond directement à la personne qui a écrit (replyTo).
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: "Laboon - Contact", email: "noreply@laboon-app.com" },
        to: [{ email: to }],
        replyTo: { email, name },
        subject: `[Contact Laboon] ${subjectLabel} — ${name}`,
        htmlContent: `
          <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
          <p><strong>Email :</strong> ${escapeHtml(email)}</p>
          <p><strong>Sujet :</strong> ${escapeHtml(subjectLabel)}</p>
          <hr />
          <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
        `,
        textContent: `Nom : ${name}\nEmail : ${email}\nSujet : ${subjectLabel}\n\n${message}`,
        tags: ["contact"],
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("[contact] Brevo error:", res.status, data);
      return NextResponse.json({ error: SEND_ERROR }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Network error:", err);
    return NextResponse.json(
      { error: "Erreur réseau. Réessaie plus tard." },
      { status: 500 }
    );
  }
}
