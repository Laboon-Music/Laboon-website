import { NextResponse } from "next/server";
import {
  isTooFast,
  TOO_FAST_ERROR,
  TURNSTILE_ERROR,
  verifyTurnstile,
} from "@/lib/antibot";

// Validation simple d'une adresse email
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CONFIG_ERROR =
  "Inscription impossible pour le moment. Réessaie plus tard.";

// Lit un id Brevo (liste, template) depuis l'env : null s'il est absent ou invalide
function readIdEnv(name: string): number | null {
  const id = Number(process.env[name]);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function POST(request: Request) {
  let body: {
    email?: string;
    wantsLaunch?: boolean;
    wantsBeta?: boolean;
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
  // On répond "ok" sans rien enregistrer pour ne pas lui donner d'indice.
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

  const email = (body.email || "").trim().toLowerCase();
  const { wantsLaunch, wantsBeta } = body;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Adresse email invalide." },
      { status: 400 }
    );
  }

  if (!wantsLaunch && !wantsBeta) {
    return NextResponse.json(
      { error: "Choisis au moins une option (lancement ou beta)." },
      { status: 400 }
    );
  }

  const apiKey = process.env.BREVO_API_KEY;

  // En local uniquement : si Brevo n'est pas configuré, on enregistre dans le
  // terminal pour pouvoir tester le formulaire sans clé API.
  // En ligne (Vercel), une config manquante est une vraie erreur : on ne doit
  // jamais afficher "Merci" alors que l'email n'est enregistré nulle part.
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[subscribe] (Brevo non configuré) =>", {
        email,
        wantsLaunch,
        wantsBeta,
      });
      return NextResponse.json({ ok: true, dryRun: true });
    }
    console.error("[subscribe] BREVO_API_KEY manquante");
    return NextResponse.json({ error: CONFIG_ERROR }, { status: 500 });
  }

  // Construit la liste des listes Brevo à associer selon les cases cochées
  const listIds: number[] = [];
  for (const [wanted, envName] of [
    [wantsLaunch, "BREVO_LIST_ID_LAUNCH"],
    [wantsBeta, "BREVO_LIST_ID_BETA"],
  ] as const) {
    if (!wanted) continue;
    const id = readIdEnv(envName);
    if (id === null) {
      console.error(`[subscribe] ${envName} manquant ou invalide`);
      return NextResponse.json({ error: CONFIG_ERROR }, { status: 500 });
    }
    listIds.push(id);
  }

  const templateId = readIdEnv("BREVO_DOI_TEMPLATE_ID");
  if (templateId === null) {
    console.error("[subscribe] BREVO_DOI_TEMPLATE_ID manquant ou invalide");
    return NextResponse.json({ error: CONFIG_ERROR }, { status: 500 });
  }

  try {
    // Double opt-in : Brevo envoie un email de confirmation. Le contact n'est
    // ajouté aux listes qu'après le clic sur le lien, puis redirigé vers
    // /inscription-confirmee sur le même site (prod ou staging).
    const res = await fetch(
      "https://api.brevo.com/v3/contacts/doubleOptinConfirmation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          email,
          includeListIds: listIds,
          templateId,
          redirectionUrl: `${new URL(request.url).origin}/inscription-confirmee`,
          attributes: {
            SOURCE: "landing",
          },
        }),
      }
    );

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("[subscribe] Brevo error:", res.status, data);
      return NextResponse.json({ error: CONFIG_ERROR }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] Network error:", err);
    return NextResponse.json(
      { error: "Erreur réseau. Réessaie plus tard." },
      { status: 500 }
    );
  }
}
