import Link from "next/link";
import { Glow, PageShell } from "@/components/layout";
import SignupForm from "@/components/newsletter/SignupForm";
import { buttonClass } from "@/components/ui";
import { HOME_CONTENT } from "@/content/home";

// Home page. Texts live in content/home.ts (editable without touching JSX).
export default function Home() {
  const { nav, hero, features, steps, finalCta } = HOME_CONTENT;

  return (
    <PageShell
      logoAsLink={false}
      footer
      headerActions={
        <>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted transition hover:text-text"
          >
            {nav.contact}
          </Link>
          <a href="#inscription" className={buttonClass({ variant: "outline" })}>
            {nav.join}
          </a>
        </>
      }
    >
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-20 text-center sm:px-6 sm:pt-24">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
          <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-accent" />
          {hero.badge}
        </div>

        <h1 className="mx-auto max-w-3xl text-4xl leading-tight font-extrabold sm:text-6xl">
          {hero.title} <span className="text-gradient">{hero.titleHighlight}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">{hero.subtitle}</p>

        <div id="inscription" className="mt-10 flex scroll-mt-24 flex-col items-center">
          <SignupForm />
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">{features.title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
          {features.subtitle}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.items.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-surface p-6 transition hover:border-brand"
            >
              <div aria-hidden="true" className="text-3xl">
                {f.emoji}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">{steps.title}</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.items.map((s, i) => (
            <li key={s.title} className="text-center">
              <div
                aria-hidden="true"
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-brand to-brand-2 text-xl font-bold text-white"
              >
                {i + 1}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-bg-soft px-4 py-14 text-center sm:px-6">
          <Glow
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
            <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">{finalCta.title}</h2>
            <p className="mt-4 max-w-xl text-muted">{finalCta.text}</p>
            <div className="mt-8 flex w-full flex-col items-center">
              <SignupForm />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
