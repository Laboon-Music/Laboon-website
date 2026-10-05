// Password recovery helpers for /reset-password. See docs/features/reset-password.md.

export const MIN_PASSWORD_LENGTH = 12;

export type RecoveryTokens = { accessToken: string; refreshToken: string };

/**
 * Extracts the Supabase recovery tokens from the URL hash
 * (`#access_token=…&refresh_token=…&type=recovery`). Null if not a valid recovery link.
 */
export function parseRecoveryHash(hash: string): RecoveryTokens | null {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");
  if (params.get("type") !== "recovery" || !accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
}

/** Returns the French error to display, or null when the new password is acceptable. */
export function validateNewPassword(password: string, confirm: string): string | null {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Le mot de passe doit faire au moins ${MIN_PASSWORD_LENGTH} caractères.`;
  }
  if (password !== confirm) return "Les mots de passe ne correspondent pas.";
  return null;
}

export const RESET_GENERIC_ERROR =
  "Impossible de mettre à jour le mot de passe pour le moment. Réessaie plus tard.";

const SESSION_EXPIRED_ERROR =
  "Ton lien a expiré. Demande un nouveau mail depuis l'app Laboon.";

/** French messages for the Supabase Auth error codes a user can hit here. */
const SUPABASE_ERRORS: Record<string, string> = {
  same_password: "Ton nouveau mot de passe doit être différent de l'ancien.",
  weak_password:
    "Ce mot de passe est trop faible. Mélange lettres, chiffres et caractères spéciaux.",
  session_expired: SESSION_EXPIRED_ERROR,
  session_not_found: SESSION_EXPIRED_ERROR,
  refresh_token_not_found: SESSION_EXPIRED_ERROR,
  refresh_token_already_used: SESSION_EXPIRED_ERROR,
  bad_jwt: SESSION_EXPIRED_ERROR,
  reauthentication_needed: SESSION_EXPIRED_ERROR,
  over_request_rate_limit: "Trop de tentatives. Patiente quelques minutes et réessaie.",
  request_timeout: RESET_GENERIC_ERROR,
};

/**
 * Supabase returns English messages: never show them as-is (the site is in
 * French). Known codes get a dedicated message, everything else a generic one.
 */
export function supabaseErrorMessage(error: unknown): string {
  const code =
    error && typeof error === "object" && "code" in error ? String(error.code) : "";
  return SUPABASE_ERRORS[code] ?? RESET_GENERIC_ERROR;
}
