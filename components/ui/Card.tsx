import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

// Design system — surface container. `success` highlights a confirmation.

export function Card({
  tone = "default",
  className,
  ...props
}: ComponentProps<"div"> & { tone?: "default" | "success" }) {
  return (
    <div
      className={cx(
        "rounded-2xl border bg-surface p-6 sm:p-8",
        tone === "success" ? "border-accent/40 text-center" : "border-border",
        className,
      )}
      {...props}
    />
  );
}
