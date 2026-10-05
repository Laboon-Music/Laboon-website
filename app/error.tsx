"use client";

import { PageShell } from "@/components/layout";
import { Button, ButtonLink, Card } from "@/components/ui";

// Error boundary for every page under the root layout (server errors are
// already reported to Sentry via instrumentation.ts onRequestError).
// See docs/features/error-pages.md.
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <PageShell>
      <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <Card className="text-center">
          <h1 className="text-2xl font-bold">Oups, une fausse note</h1>
          <p className="mt-4 text-muted">
            Quelque chose s&apos;est mal passé de notre côté. Réessaie dans un instant.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={reset}>Réessayer</Button>
            <ButtonLink href="/" variant="outline">
              Retour à l&apos;accueil
            </ButtonLink>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
