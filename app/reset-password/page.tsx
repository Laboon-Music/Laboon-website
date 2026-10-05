"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout";
import { Button, Card, FormError, Input } from "@/components/ui";
import {
  MIN_PASSWORD_LENGTH,
  parseRecoveryHash,
  supabaseErrorMessage,
  validateNewPassword,
} from "@/lib/password";
import { getSupabase } from "@/lib/supabase";

// Web fallback of the app's password recovery link. With Universal Links (iOS) /
// App Links (Android) the OS opens the app directly; this page is shown when the
// app is not installed or the link is opened elsewhere.
// See docs/features/reset-password.md.

type Status = "loading" | "ready" | "invalid" | "success";

export default function ResetPasswordPage() {
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const tokens = parseRecoveryHash(window.location.hash);
    if (!tokens) {
      queueMicrotask(() => setStatus("invalid"));
      return;
    }
    // Any failure (expired link, network down, Supabase not configured) must
    // end on "invalid link", never on an endless "Chargement…".
    Promise.resolve()
      .then(() =>
        getSupabase().auth.setSession({
          access_token: tokens.accessToken,
          refresh_token: tokens.refreshToken,
        }),
      )
      .then(({ error }) => setStatus(error ? "invalid" : "ready"))
      .catch(() => setStatus("invalid"));
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validateNewPassword(password, confirm);
    setError(validationError);
    if (validationError) return;

    setSubmitting(true);
    try {
      const { error } = await getSupabase().auth.updateUser({ password });
      if (error) setError(supabaseErrorMessage(error));
      else setStatus("success");
    } catch (err) {
      setError(supabaseErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <Card>
          {status === "loading" && <p className="text-center text-muted">Chargement…</p>}

          {status === "invalid" && (
            <>
              <h1 className="text-2xl font-bold">Lien invalide ou expiré</h1>
              <p className="mt-4 text-muted">
                Le lien de réinitialisation n&apos;est plus valide. Demande un nouveau
                mail depuis l&apos;app Laboon.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <h1 className="text-2xl font-bold">
                Mot de passe mis à jour <span className="text-accent">✓</span>
              </h1>
              <p className="mt-4 text-muted">
                Tu peux maintenant te connecter dans l&apos;app Laboon avec ton nouveau
                mot de passe.
              </p>
            </>
          )}

          {status === "ready" && (
            <>
              <h1 className="text-2xl font-bold">Nouveau mot de passe</h1>
              <p className="mt-2 text-sm text-muted">
                Choisis un mot de passe d&apos;au moins {MIN_PASSWORD_LENGTH} caractères.
              </p>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nouveau mot de passe"
                  aria-label="Nouveau mot de passe"
                  autoComplete="new-password"
                  required
                />
                <Input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirmer le mot de passe"
                  aria-label="Confirmer le mot de passe"
                  autoComplete="new-password"
                  required
                />
                <FormError>{error}</FormError>
                <Button type="submit" fullWidth disabled={submitting}>
                  {submitting ? "…" : "Valider"}
                </Button>
              </form>
            </>
          )}
        </Card>
      </section>
    </PageShell>
  );
}
