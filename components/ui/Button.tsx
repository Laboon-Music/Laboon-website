import Link from "next/link";
import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

// Design system — buttons. `Button` for actions, `ButtonLink` for navigation
// styled as a button. See docs/design-system.md.

export type ButtonVariant = "primary" | "outline";

type StyleProps = { variant?: ButtonVariant; fullWidth?: boolean };

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "rounded-xl bg-linear-to-r from-brand to-brand-2 px-6 py-3 font-semibold text-white hover:opacity-90",
  outline:
    "rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-brand",
};

export function buttonClass({ variant = "primary", fullWidth }: StyleProps = {}) {
  return cx(
    "inline-flex items-center justify-center text-center transition disabled:cursor-not-allowed disabled:opacity-60",
    VARIANTS[variant],
    fullWidth && "w-full",
  );
}

export function Button({
  variant,
  fullWidth,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return (
    <button
      type={type}
      className={cx(buttonClass({ variant, fullWidth }), className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant,
  fullWidth,
  className,
  ...props
}: ComponentProps<typeof Link> & StyleProps) {
  return (
    <Link className={cx(buttonClass({ variant, fullWidth }), className)} {...props} />
  );
}
