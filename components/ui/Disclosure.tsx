import type { ReactNode } from "react";

// Design system — expandable question/answer row (native <details>: keyboard
// and screen reader friendly, works without JavaScript).

export function Disclosure({
  summary,
  children,
}: {
  summary: string;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-2xl border border-border bg-surface">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-4 py-4 font-medium text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-6 [&::-webkit-details-marker]:hidden">
        {summary}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 shrink-0 text-muted transition group-open:rotate-180"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>
      <div className="px-4 pb-4 text-muted sm:px-6">{children}</div>
    </details>
  );
}
