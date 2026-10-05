import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { PageShell } from "@/components/layout";
import SocialLinks from "@/components/social/SocialLinks";

export const metadata: Metadata = {
  title: "Contact — Laboon",
  description: "Une question, une idée, un partenariat ? Écris à l'équipe Laboon.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <h1 className="text-center text-3xl font-bold sm:text-4xl">
          <span className="text-gradient">Contacte-nous</span>
        </h1>
        <p className="mt-4 text-center text-muted">
          Une question, une idée, un partenariat ? Écris-nous, on lit tout.
        </p>
        <div className="mt-10">
          <ContactForm />
        </div>
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-sm text-muted">Ou retrouve-nous sur les réseaux</p>
          <SocialLinks />
        </div>
      </section>
    </PageShell>
  );
}
