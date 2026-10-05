import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";

export const metadata = {
  title: "Contact — Laboon",
  description: "Une question, une idée, un partenariat ? Écris à l'équipe Laboon.",
};

export default function ContactPage() {
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

      <section className="relative z-10 mx-auto max-w-2xl px-6 py-12">
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
    </main>
  );
}
