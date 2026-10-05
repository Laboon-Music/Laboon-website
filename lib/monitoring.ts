import * as Sentry from "@sentry/nextjs";
import { envReport, readEnv } from "@/lib/env";

// Error reporting. Every server-side failure that loses a signup or a message
// goes through reportError(): logged in Vercel AND sent to Sentry (which
// emails the team). Without SENTRY_DSN, it only logs.
// See docs/features/monitoring.md.

/** Sentry environment from the Vercel branch: main → production, staging → staging. */
export function sentryEnvironment(): string {
  const branch = process.env.VERCEL_GIT_COMMIT_REF;
  if (!branch) return "local";
  return branch === "main" ? "production" : branch;
}

/** Called once at server start (instrumentation.ts). */
export function initMonitoring() {
  const dsn = readEnv("SENTRY_DSN");
  if (dsn) {
    Sentry.init({
      dsn,
      environment: sentryEnvironment(),
      // Errors only, no performance tracing.
      tracesSampleRate: 0,
      // GDPR: form bodies contain emails, names and messages. Collect none of
      // it — only the context we pass explicitly to reportError().
      dataCollection: {
        userInfo: false,
        cookies: false,
        httpHeaders: false,
        httpBodies: [],
        urlQueryParams: false,
        stackFrameVariables: false,
      },
    });
  }

  if (process.env.NODE_ENV === "production") {
    for (const line of envReport()) console.warn(`[env] ${line}`);
  }
}

/**
 * Reports a server failure. `context` must not contain personal data
 * (no emails, names or messages).
 */
export function reportError(
  feature: string,
  message: string,
  context: Record<string, unknown> = {},
  error?: unknown,
) {
  console.error(`[${feature}] ${message}`, context, error ?? "");
  Sentry.withScope((scope) => {
    scope.setTag("feature", feature);
    scope.setContext("details", context);
    if (error instanceof Error) {
      scope.setExtra("message", message);
      Sentry.captureException(error);
    } else {
      Sentry.captureMessage(`[${feature}] ${message}`, "error");
    }
  });
}
