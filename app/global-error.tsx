"use client";

import "./globals.css";

// Last-resort error page, used when the root layout itself fails. It replaces
// the whole document, so it renders its own <html> and stays dependency-free.
// See docs/features/error-pages.md.
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen items-center justify-center px-4">
        <main className="max-w-md text-center">
          <h1 className="text-2xl font-bold">Oups, une fausse note</h1>
          <p className="mt-4 text-muted">
            Le site a rencontré un problème. Réessaie dans un instant.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 rounded-xl bg-linear-to-r from-brand to-brand-2 px-6 py-3 font-semibold text-white"
          >
            Réessayer
          </button>
        </main>
      </body>
    </html>
  );
}
