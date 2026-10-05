import type { ReactNode } from "react";

/**
 * Shared building blocks for legal document bodies. Each document component
 * (Cgu, Cgv, …) renders one <article> composed of these primitives so the same
 * content can be served both as a public page (with site chrome) and as a bare
 * "embed" page loaded by the mobile app WebView.
 */

export function DocHeader({
  title,
  version,
  effectiveDate,
}: {
  title: string;
  version: string;
  effectiveDate: string;
}) {
  return (
    <header>
      <h1 className="text-3xl font-bold text-text">{title}</h1>
      <p className="mt-2 text-sm text-muted">
        Version {version} — en vigueur à compter du {effectiveDate}
      </p>
    </header>
  );
}

/** Editorial reminder for the "[à compléter]" placeholders still in the V1 text. */
export function TodoNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-border bg-surface p-4 text-sm text-muted">
      ⚠️ {children}
    </p>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-text">{title}</h2>
      {children}
    </section>
  );
}

export function Subheading({ children }: { children: ReactNode }) {
  return <h3 className="font-medium text-text">{children}</h3>;
}

export function List({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1 pl-5">{children}</ul>;
}
