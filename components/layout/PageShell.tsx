import type { ReactNode } from "react";
import { GlowBackground } from "./Glow";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export const MAIN_CONTENT_ID = "contenu";

/**
 * Standard page frame: skip link + glow decor + header + <main> (+ footer).
 * Every public page should use it so the chrome stays consistent.
 */
export function PageShell({
  children,
  headerActions,
  logoAsLink,
  footer = false,
}: {
  children: ReactNode;
  headerActions?: ReactNode;
  logoAsLink?: boolean;
  footer?: boolean;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Keyboard / screen reader users jump straight past the header. */}
      <a
        href={`#${MAIN_CONTENT_ID}`}
        className="sr-only z-50 rounded-lg bg-surface px-4 py-2 focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
      >
        Aller au contenu
      </a>
      <GlowBackground />
      <SiteHeader actions={headerActions} logoAsLink={logoAsLink} />
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="relative z-10 flex-1 outline-none"
      >
        {children}
      </main>
      {footer && <SiteFooter />}
    </div>
  );
}
