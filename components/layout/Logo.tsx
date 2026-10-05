import Link from "next/link";

/** Laboon wordmark. Links to the home page unless `asLink` is false. */
export function Logo({ asLink = true }: { asLink?: boolean }) {
  const content = (
    <>
      <span aria-hidden="true" className="text-2xl">
        🐳
      </span>
      <span>Laboon</span>
    </>
  );
  const className = "flex items-center gap-2 text-xl font-bold";

  return asLink ? (
    <Link href="/" className={className} aria-label="Laboon — accueil">
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}
