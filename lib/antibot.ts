// Protections anti-robots partagées par les formulaires (inscription, contact).

// Un humain met plusieurs secondes à remplir un formulaire ; un robot,
// quelques millisecondes. En dessous de ce délai, l'envoi est refusé.
const MIN_FILL_MS = 3000;

export function isTooFast(elapsedMs: unknown): boolean {
  return typeof elapsedMs !== "number" || elapsedMs < MIN_FILL_MS;
}

export const TOO_FAST_ERROR =
  "Oups, c'était un peu rapide ! Réessaie dans quelques secondes.";

export const TURNSTILE_ERROR =
  "La vérification anti-robot a échoué. Recharge la page et réessaie.";

// Vérifie auprès de Cloudflare le jeton Turnstile envoyé par le formulaire.
// Si TURNSTILE_SECRET_KEY n'est pas configurée, la vérification est ignorée :
// les formulaires continuent de fonctionner (avec le champ piège et le délai).
export async function verifyTurnstile(
  token: unknown,
  request: Request
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  if (typeof token !== "string" || !token) return false;

  const form = new URLSearchParams({ secret, response: token });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (ip) form.set("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: form }
    );
    const data = await res.json();
    if (!data.success) {
      console.warn("[turnstile] échec:", data["error-codes"]);
    }
    return data.success === true;
  } catch (err) {
    console.error("[turnstile] Network error:", err);
    return false;
  }
}
