// Round buttons to Laboon's social networks (icon only, label for screen
// readers). To add a network: add an entry to SOCIALS.
// See docs/features/social-links.md.

export const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/laboon.app.music/",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/LaboonAPPMUSIC/61595076662122/",
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
];

export default function SocialLinks({ size = "md" }: { size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const icon = size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <ul className="flex items-center gap-3">
      {SOCIALS.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Laboon sur ${s.name}`}
            title={s.name}
            className={`${box} flex items-center justify-center rounded-full border border-border bg-surface text-muted transition hover:border-brand hover:text-text`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={icon}
              aria-hidden="true"
            >
              {s.icon}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
