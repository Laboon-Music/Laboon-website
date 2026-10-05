import Link from "next/link";
import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

// Design system — link inside running text. Always underlined so it is not
// distinguished by colour alone (WCAG "link in text block").
// Internal paths use next/link; mailto:, tel: and external URLs a plain <a>.

const TONES = {
  brand: "text-brand hover:text-brand-2",
  inherit: "hover:text-text",
};

export function TextLink({
  href,
  tone = "brand",
  className,
  ...props
}: Omit<ComponentProps<"a">, "href"> & {
  href: string;
  tone?: keyof typeof TONES;
}) {
  const classes = cx("underline underline-offset-2", TONES[tone], className);
  if (href.startsWith("/")) {
    return <Link href={href} className={classes} {...props} />;
  }
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={classes}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    />
  );
}
