"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lazily instantiated Supabase client. A module-level instantiation runs during
// prerender (next build) and breaks the build when the NEXT_PUBLIC_SUPABASE_*
// variables are not set. Creating it on demand (client-side only: effect /
// submit) keeps the build passing.
let supabaseClient: SupabaseClient | null = null;
function getSupabase(): SupabaseClient {
  if (!supabaseClient) {
    supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return supabaseClient;
}

const MIN_PASSWORD_LENGTH = 12;

type Status = "loading" | "ready" | "invalid" | "success";

export default function ResetPasswordPage() {
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const type = params.get("type");

    if (type !== "recovery" || !accessToken || !refreshToken) {
      queueMicrotask(() => setStatus("invalid"));
      return;
    }

    // With Universal Links (iOS) / App Links (Android), the OS opens the app
    // directly from the https link: this page is only the web fallback (app not
    // installed, or link opened outside a context that triggers App Links). So
    // we just show the password reset form.
    getSupabase()
      .auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
      .then(({ error }) => {
        setStatus(error ? "invalid" : "ready");
      });
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(
        `Le mot de passe doit faire au moins ${MIN_PASSWORD_LENGTH} caractères.`,
      );
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setSubmitting(true);
    const { error } = await getSupabase().auth.updateUser({ password });
    setSubmitting(false);

    if (error) {
      setError(error.message);
    } else {
      setStatus("success");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Décor lumineux */}
      <div
        className="glow"
        style={{
          top: "-120px",
          left: "-80px",
          width: "420px",
          height: "420px",
          background: "var(--color-brand)",
        }}
      />
      <div
        className="glow"
        style={{
          top: "120px",
          right: "-120px",
          width: "380px",
          height: "380px",
          background: "var(--color-brand-2)",
        }}
      />

      {/* Barre de navigation */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-2xl">🐳</span>
          <span>Laboon</span>
        </Link>
      </header>

      <section className="relative z-10 mx-auto max-w-md px-6 py-16">
        <div className="rounded-2xl border border-border bg-surface p-8">
          {status === "loading" && (
            <p className="text-center text-muted">Chargement…</p>
          )}

          {status === "invalid" && (
            <>
              <h1 className="text-2xl font-bold">Lien invalide ou expiré</h1>
              <p className="mt-4 text-muted">
                Le lien de réinitialisation n&apos;est plus valide. Demande un
                nouveau mail depuis l&apos;app Laboon.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <h1 className="text-2xl font-bold">
                Mot de passe mis à jour <span className="text-accent">✓</span>
              </h1>
              <p className="mt-4 text-muted">
                Tu peux maintenant te connecter dans l&apos;app Laboon avec ton
                nouveau mot de passe.
              </p>
            </>
          )}

          {status === "ready" && (
            <>
              <h1 className="text-2xl font-bold">Nouveau mot de passe</h1>
              <p className="mt-2 text-sm text-muted">
                Choisis un mot de passe d&apos;au moins {MIN_PASSWORD_LENGTH}{" "}
                caractères.
              </p>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nouveau mot de passe"
                  required
                  className="w-full rounded-xl border border-border bg-bg-soft px-4 py-3 text-base text-text outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/40"
                />
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirmer le mot de passe"
                  required
                  className="w-full rounded-xl border border-border bg-bg-soft px-4 py-3 text-base text-text outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/40"
                />
                {error && <p className="text-sm text-brand-2">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-linear-to-r from-brand to-brand-2 px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "…" : "Valider"}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
