import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/cx";

// Design system — form controls. See docs/design-system.md.
// `tone="page"` for a control sitting directly on the page background,
// `tone="card"` (default) for a control inside a Card.

type Tone = "page" | "card";

export function controlClass(tone: Tone = "card") {
  return cx(
    "w-full rounded-xl border border-border px-4 py-3 text-base text-text outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/40",
    tone === "page" ? "bg-surface" : "bg-bg",
  );
}

export function Input({
  tone,
  className,
  ...props
}: ComponentProps<"input"> & { tone?: Tone }) {
  return <input className={cx(controlClass(tone), className)} {...props} />;
}

export function Textarea({
  tone,
  className,
  ...props
}: ComponentProps<"textarea"> & { tone?: Tone }) {
  return (
    <textarea className={cx(controlClass(tone), "resize-y", className)} {...props} />
  );
}

export function Select({
  tone,
  className,
  ...props
}: ComponentProps<"select"> & { tone?: Tone }) {
  return <select className={cx(controlClass(tone), className)} {...props} />;
}

/** Visible label wrapping its control (no id/htmlFor wiring needed). */
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      {label}
      {children}
    </label>
  );
}

export function Checkbox({
  label,
  accent = "brand",
  ...props
}: Omit<ComponentProps<"input">, "type"> & {
  label: ReactNode;
  accent?: "brand" | "brand-2";
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
      <input
        type="checkbox"
        className={cx("h-4 w-4", accent === "brand" ? "accent-brand" : "accent-brand-2")}
        {...props}
      />
      {label}
    </label>
  );
}

/** Error line under a form; announced by screen readers. */
export function FormError({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="text-sm text-brand-2">
      {children}
    </p>
  );
}

/**
 * Anti-bot honeypot: off-screen and skipped by keyboard / screen readers, so
 * only bots fill it in. See docs/features/antibot.md.
 */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type="text"
      name="website"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute -left-[9999px] h-px w-px opacity-0"
    />
  );
}
