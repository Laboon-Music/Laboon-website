import { track } from "@vercel/analytics";

// Conversion events (Vercel Web Analytics custom events). Event names are
// listed here only, so the funnel stays consistent across the site.
// Custom events require a Vercel Pro plan; on Hobby they are silently ignored.
// See docs/features/analytics.md.

type Events = {
  /** Signup form accepted (confirmation email sent). */
  signup_submitted: { launch: boolean; beta: boolean };
  /** Visitor clicked the double opt-in link (landed on /inscription-confirmee). */
  signup_confirmed: Record<string, never>;
  /** Contact message sent. */
  contact_sent: { subject: string };
};

export function trackEvent<E extends keyof Events>(name: E, props: Events[E]) {
  try {
    track(name, props);
  } catch {
    // Analytics must never break a form.
  }
}
