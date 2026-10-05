"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Turnstile, {
  TURNSTILE_PENDING,
  turnstileEnabled,
  type TurnstileHandle,
} from "@/components/Turnstile";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-border bg-bg px-4 py-3 text-base text-text outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/40";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("question");
  const [message, setMessage] = useState("");
  // Champ piège anti-robots : invisible pour les humains, rempli par les bots
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);
  // Heure d'affichage du formulaire : un envoi trop rapide trahit un robot
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (turnstileEnabled && !turnstileToken) {
      setStatus("error");
      setError(TURNSTILE_PENDING);
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
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
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/40 bg-surface p-8 text-center">
        <p className="text-lg font-semibold text-accent">
          Message envoyé, merci ! 🎶
        </p>
        <p className="mt-2 text-sm text-muted">
          On te répond dès que possible à l&apos;adresse {email}.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-linear-to-r from-brand to-brand-2 px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  // noValidate : les bulles d'erreur natives du navigateur s'affichent dans sa
  // langue (souvent en anglais). On laisse l'API renvoyer nos messages en français.
  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
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

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Nom
          <input
            type="text"
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ton nom ou pseudo"
            autoComplete="name"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.com"
            autoComplete="email"
            className={inputClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Sujet
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClass}
        >
          <option value="question">Une question</option>
          <option value="beta">Beta / tests</option>
          <option value="partenariat">Partenariat / presse</option>
          <option value="bug">Signaler un problème</option>
          <option value="autre">Autre</option>
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Message
        <textarea
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Dis-nous tout…"
          className={`${inputClass} resize-y`}
        />
      </label>

      <Turnstile ref={turnstileRef} onToken={setTurnstileToken} />

      {status === "error" && <p className="text-sm text-brand-2">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl bg-linear-to-r from-brand to-brand-2 px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Envoi…" : "Envoyer"}
      </button>

      <p className="text-xs text-muted">
        Ton nom et ton email servent uniquement à te répondre.{" "}
        <Link href="/confidentialite" className="underline hover:text-text">
          Politique de confidentialité
        </Link>
      </p>
    </form>
  );
}
