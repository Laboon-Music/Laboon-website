"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Turnstile, {
  TURNSTILE_PENDING,
  turnstileEnabled,
  type TurnstileHandle,
} from "@/components/Turnstile";

type Status = "idle" | "loading" | "success" | "error";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [wantsLaunch, setWantsLaunch] = useState(true);
  const [wantsBeta, setWantsBeta] = useState(false);
  // Champ piège anti-robots : invisible pour les humains, rempli par les bots
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);
  // Heure d'affichage du formulaire : un envoi trop rapide trahit un robot
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!wantsLaunch && !wantsBeta) {
      setStatus("error");
      setMessage("Choisis au moins une option (lancement ou beta).");
      return;
    }

    if (turnstileEnabled && !turnstileToken) {
      setStatus("error");
      setMessage(TURNSTILE_PENDING);
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          wantsLaunch,
          wantsBeta,
          website,
          elapsedMs: Date.now() - startedAt.current,
          turnstileToken,
        }),
      });

      const data = await res.json().catch(() => ({}));
      // Un jeton Turnstile ne sert qu'une fois : on en redemande un nouveau
      turnstileRef.current?.reset();

      if (!res.ok) {
        throw new Error(data.error || "Une erreur est survenue.");
      }

      setStatus("success");
      setMessage("Presque fini ! Vérifie ta boîte mail 📬");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Une erreur est survenue."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/40 bg-surface p-6 text-center">
        <p className="text-lg font-semibold text-accent">
          {message}
        </p>
        <p className="mt-2 text-sm text-muted">
          On vient de t&apos;envoyer un email : clique sur le lien pour
          confirmer ton inscription (pense à regarder dans les spams).
        </p>
      </div>
    );
  }

  // noValidate : les bulles d'erreur natives du navigateur s'affichent dans sa
  // langue (souvent en anglais). On laisse l'API renvoyer nos messages en français.
  return (
    <form noValidate onSubmit={handleSubmit} className="w-full max-w-md">
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.com"
          className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-base text-text outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/40"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl bg-linear-to-r from-brand to-brand-2 px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Je m'inscris"}
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={wantsLaunch}
            onChange={(e) => setWantsLaunch(e.target.checked)}
            className="h-4 w-4 accent-brand"
          />
          Me prévenir du lancement
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={wantsBeta}
            onChange={(e) => setWantsBeta(e.target.checked)}
            className="h-4 w-4 accent-brand-2"
          />
          Devenir beta testeur·euse
        </label>
      </div>

      <div className="mt-3">
        <Turnstile ref={turnstileRef} onToken={setTurnstileToken} />
      </div>

      {status === "error" && (
        <p className="mt-3 text-sm text-brand-2">{message}</p>
      )}

      <p className="mt-3 text-xs text-muted">
        On ne t&apos;enverra que des nouvelles de Laboon. Désinscription en un clic.{" "}
        <Link href="/confidentialite" className="underline hover:text-text">
          Politique de confidentialité
        </Link>
      </p>
    </form>
  );
}
