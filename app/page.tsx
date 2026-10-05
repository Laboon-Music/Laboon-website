import Link from "next/link";
import SignupForm from "@/components/SignupForm";
import SocialLinks from "@/components/SocialLinks";

const FEATURES = [
  {
    emoji: "🎯",
    title: "Le bon match musical",
    text: "Trouve des musiciens selon l'instrument, le style, le niveau et tes envies. Fini les annonces qui ne mènent à rien.",
  },
  {
    emoji: "📍",
    title: "Près de chez toi",
    text: "Découvre les musiciens de ta ville prêts à jouer, répéter ou monter un projet ensemble.",
  },
  {
    emoji: "🎸",
    title: "Monte ton groupe",
    text: "Tu cherches un batteur, un·e chanteur·euse, un bassiste ? Compose ton groupe en quelques swipes.",
  },
  {
    emoji: "🤝",
    title: "Une vraie communauté",
    text: "Échange, organise des sessions, et rejoins une communauté de passionnés qui jouent vraiment.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Crée ton profil",
    text: "Tes instruments, tes styles, ton niveau et ce que tu recherches.",
  },
  {
    n: "2",
    title: "Découvre des musiciens",
    text: "Laboon te propose des profils compatibles autour de toi.",
  },
  {
    n: "3",
    title: "Connecte et joue",
    text: "Discute, organise une session, et lance ton prochain projet musical.",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
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
        <div className="flex items-center gap-2 text-xl font-bold">
          <span className="text-2xl">🐳</span>
          <span>Laboon</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="text-sm font-medium text-muted transition hover:text-text"
          >
            Contact
          </Link>
          <a
            href="#inscription"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:border-brand"
          >
            Rejoindre
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-16 text-center sm:pt-24">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Bientôt disponible — inscris-toi en avant-première
        </div>

        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
          Trouve les bons musiciens.{" "}
          <span className="text-gradient">Fais de la musique.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          Laboon, c&apos;est l&apos;application qui met en relation les musiciens. Trouve
          des partenaires de jeu, monte ton groupe et rencontre des passionnés
          autour de toi.
        </p>

        <div
          id="inscription"
          className="mt-10 flex scroll-mt-24 flex-col items-center"
        >
          <SignupForm />
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Pensé pour les musiciens
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
          Tout ce qu&apos;il faut pour passer de « je cherche » à « on joue ».
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-surface p-6 transition hover:border-brand"
            >
              <div className="text-3xl">{f.emoji}</div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Comment ça marche
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-brand to-brand-2 text-xl font-bold text-white">
                {s.n}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-bg-soft px-6 py-14 text-center">
          <div
            className="glow"
            style={{
              bottom: "-140px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "500px",
              height: "300px",
              background: "var(--color-brand)",
              opacity: 0.35,
            }}
          />
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">
              Sois là dès le premier accord
            </h2>
            <p className="mt-4 max-w-xl text-muted">
              Inscris-toi pour être prévenu·e du lancement, ou rejoins la beta
              pour tester Laboon en avant-première et façonner l&apos;appli avec nous.
            </p>
            <div className="mt-8 flex flex-col items-center">
              <SignupForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
          <div className="flex items-center gap-2 font-semibold text-text">
            <span>🐳</span> Laboon
          </div>
          <SocialLinks />
          <p>© {new Date().getFullYear()} Laboon. Tous droits réservés.</p>
          <div className="flex gap-5">
            <Link href="/contact" className="transition hover:text-text">
              Contact
            </Link>
            <Link href="/mentions-legales" className="transition hover:text-text">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="transition hover:text-text">
              Confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
