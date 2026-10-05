"use client";

import { useState } from "react";
import Turnstile from "@/components/antibot/Turnstile";
import {
  Button,
  Card,
  Checkbox,
  FormError,
  Honeypot,
  Input,
  TextLink,
} from "@/components/ui";
import { useProtectedForm } from "@/hooks/useProtectedForm";
import { trackEvent } from "@/lib/analytics";
import { NO_LIST_ERROR } from "@/lib/newsletter";

// Newsletter signup (launch and/or beta lists). See docs/features/newsletter-signup.md.
export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [wantsLaunch, setWantsLaunch] = useState(true);
  const [wantsBeta, setWantsBeta] = useState(false);
  const form = useProtectedForm("/api/subscribe");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!wantsLaunch && !wantsBeta) return form.fail(NO_LIST_ERROR);
    if (await form.submit({ email, wantsLaunch, wantsBeta })) {
      trackEvent("signup_submitted", { launch: wantsLaunch, beta: wantsBeta });
      setEmail("");
    }
  }

  if (form.status === "success") {
    return (
      <Card tone="success" className="w-full max-w-md">
        <p className="text-lg font-semibold text-accent">
          Presque fini ! Vérifie ta boîte mail 📬
        </p>
        <p className="mt-2 text-sm text-muted">
          On vient de t&apos;envoyer un email : clique sur le lien pour confirmer ton
          inscription (pense à regarder dans les spams).
        </p>
      </Card>
    );
  }

  // noValidate: native browser bubbles use the browser language (often English);
  // the API returns our French messages instead.
  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      {...form.formProps}
      className="w-full max-w-md"
    >
      <Honeypot {...form.honeypot} />
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          tone="page"
          type="email"
          required
          aria-label="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.com"
          autoComplete="email"
          className="flex-1"
        />
        <Button type="submit" disabled={form.status === "loading"}>
          {form.status === "loading" ? "…" : "Je m'inscris"}
        </Button>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
        <Checkbox
          label="Me prévenir du lancement"
          checked={wantsLaunch}
          onChange={(e) => setWantsLaunch(e.target.checked)}
        />
        <Checkbox
          label="Devenir beta testeur·euse"
          accent="brand-2"
          checked={wantsBeta}
          onChange={(e) => setWantsBeta(e.target.checked)}
        />
      </div>

      <div className="mt-3">
        <Turnstile {...form.turnstile} />
      </div>

      <div className="mt-3">
        <FormError>{form.status === "error" && form.error}</FormError>
      </div>

      <p className="mt-3 text-xs text-muted">
        On ne t&apos;enverra que des nouvelles de Laboon. Désinscription en un clic.{" "}
        <TextLink href="/confidentialite" tone="inherit">
          Politique de confidentialité
        </TextLink>
      </p>
    </form>
  );
}
