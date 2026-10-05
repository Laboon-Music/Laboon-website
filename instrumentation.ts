import * as Sentry from "@sentry/nextjs";

// Next.js server start hook. See docs/features/monitoring.md.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initMonitoring } = await import("./lib/monitoring");
    initMonitoring();
  }
}

// Unhandled errors in route handlers / server components go to Sentry too.
export const onRequestError = Sentry.captureRequestError;
