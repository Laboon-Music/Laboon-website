import Link from "next/link";
import SocialLinks from "@/components/social/SocialLinks";
import { CurrentYear } from "./CurrentYear";

const FOOTER_LINKS = [
  { href: "/contact", label: "Contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-center text-sm text-muted sm:px-6 md:flex-row md:text-left">
        <div className="flex items-center gap-2 font-semibold text-text">
          <span aria-hidden="true">🐳</span> Laboon
        </div>
        <SocialLinks />
        <p>
          © <CurrentYear /> Laboon. Tous droits réservés.
        </p>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-text">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
