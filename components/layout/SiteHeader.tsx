import type { ReactNode } from "react";
import { Logo } from "./Logo";

/** Top bar: logo on the left, optional actions (links, CTA) on the right. */
export function SiteHeader({
  actions,
  logoAsLink = true,
}: {
  actions?: ReactNode;
  logoAsLink?: boolean;
}) {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-6 sm:px-6">
      <Logo asLink={logoAsLink} />
      {actions && <nav className="flex items-center gap-4">{actions}</nav>}
    </header>
  );
}
