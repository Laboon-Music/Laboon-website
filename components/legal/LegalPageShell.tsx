import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Public-page wrapper for a legal document: site chrome (container + back link).
 * The bare embed variant (app WebView) does NOT use this shell.
 */
export function LegalPageShell({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm text-muted hover:text-text">
        ← Retour
      </Link>
      <div className="mt-8">{children}</div>
    </main>
  );
}
