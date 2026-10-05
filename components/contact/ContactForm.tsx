"use client";

import { useState } from "react";
import Turnstile from "@/components/antibot/Turnstile";
import {
  Button,
  ButtonLink,
  Card,
  Field,
  FormError,
  Honeypot,
  Input,
  Select,
  Textarea,
  TextLink,
} from "@/components/ui";
import { useProtectedForm } from "@/hooks/useProtectedForm";
import { trackEvent } from "@/lib/analytics";
import { CONTACT_LIMITS, CONTACT_SUBJECTS, DEFAULT_CONTACT_SUBJECT } from "@/lib/contact";

// Contact form (/contact). See docs/features/contact-form.md.
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<string>(DEFAULT_CONTACT_SUBJECT);
  const [message, setMessage] = useState("");
  const form = useProtectedForm("/api/contact");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (await form.submit({ name, email, subject, message })) {
      trackEvent("contact_sent", { subject });
    }
  }

  if (form.status === "success") {
    return (
      <Card tone="success">
        <p className="text-lg font-semibold text-accent">Message envoyé, merci ! 🎶</p>
        <p className="mt-2 text-sm break-words text-muted">
          On te répond dès que possible à l&apos;adresse {email}.
        </p>
        <ButtonLink href="/" className="mt-6">
          Retour à l&apos;accueil
        </ButtonLink>
      </Card>
    );
  }

  // noValidate: native browser bubbles use the browser language (often English);
  // the API returns our French messages instead.
  return (
    <Card>
      <form
        noValidate
        onSubmit={handleSubmit}
        {...form.formProps}
        className="flex flex-col gap-4"
      >
        <Honeypot {...form.honeypot} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom">
            <Input
              type="text"
              required
              maxLength={CONTACT_LIMITS.nameMax}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ton nom ou pseudo"
              autoComplete="name"
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              autoComplete="email"
            />
          </Field>
        </div>

        <Field label="Sujet">
          <Select value={subject} onChange={(e) => setSubject(e.target.value)}>
            {CONTACT_SUBJECTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Message">
          <Textarea
            required
            minLength={CONTACT_LIMITS.messageMin}
            maxLength={CONTACT_LIMITS.messageMax}
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Dis-nous tout…"
          />
        </Field>

        <Turnstile {...form.turnstile} />

        <FormError>{form.status === "error" && form.error}</FormError>

        <Button type="submit" disabled={form.status === "loading"}>
          {form.status === "loading" ? "Envoi…" : "Envoyer"}
        </Button>

        <p className="text-xs text-muted">
          Ton nom et ton email servent uniquement à te répondre.{" "}
          <TextLink href="/confidentialite" tone="inherit">
            Politique de confidentialité
          </TextLink>
        </p>
      </form>
    </Card>
  );
}
