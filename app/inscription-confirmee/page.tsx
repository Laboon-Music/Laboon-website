import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

export const metadata = { title: "Inscription confirmée — Laboon" };

// Page d'arrivée après le clic sur le lien de l'email de confirmation Brevo
// (double opt-in). Brevo redirige ici une fois le contact ajouté aux listes.
export default function InscriptionConfirmeePage() {
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
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <h1 className="text-2xl font-bold">
            Inscription confirmée <span className="text-accent">✓</span>
          </h1>
          <p className="mt-4 text-muted">
            Merci ! Ton adresse est validée. On te tiendra au courant du
            lancement de Laboon 🎶
          </p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-sm text-muted">
              En attendant, suis-nous pour ne rien rater :
            </p>
            <SocialLinks size="lg" />
          </div>
          <Link
            href="/"
            className="mt-8 inline-block rounded-xl bg-linear-to-r from-brand to-brand-2 px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </main>
  );
}
