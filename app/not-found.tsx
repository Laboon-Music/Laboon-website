import type { Metadata } from "next";
import { PageShell } from "@/components/layout";
import { ButtonLink, Card } from "@/components/ui";

export const metadata: Metadata = { title: "Page introuvable — Laboon" };

// 404 page (unknown URL or notFound()). See docs/features/error-pages.md.
export default function NotFound() {
  return (
    <PageShell footer>
      <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <Card className="text-center">
          <p className="text-gradient text-5xl font-extrabold">404</p>
          <h1 className="mt-4 text-2xl font-bold">Cette page joue en sourdine</h1>
          <p className="mt-4 text-muted">
            La page que tu cherches n&apos;existe pas ou a été déplacée.
          </p>
          <ButtonLink href="/" className="mt-8">
            Retour à l&apos;accueil
          </ButtonLink>
        </Card>
      </section>
    </PageShell>
  );
}
