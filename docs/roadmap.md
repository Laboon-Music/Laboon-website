# Roadmap & known gaps

Things deliberately left for later. Move an item to `decisions.md` once done.

## Before public launch

- [ ] Fill `[à compléter]` placeholders in the legal documents.
- [ ] Deep links: real Apple Team ID + Android release SHA-256 (ticket APP-19,
      [deep-links.md](features/deep-links.md)).
- [ ] Finish the manual setup checklist in [deployment.md](deployment.md)
      (Sentry, branch protection, Turnstile, contact inbox…).

## Brand assets (waiting for a logo)

- [ ] **Favicon & app icons**: `app/icon.png` (or `.svg`), `app/apple-icon.png`
      (180×180), and a web manifest — Next.js picks them up automatically.
      Today browsers show a generic icon and `/favicon.ico` returns 404.
- [ ] Replace the text-only share image (`app/opengraph-image.tsx`) with a
      designed visual including the logo.

## Technical follow-ups

- [ ] **Content-Security-Policy** header (needs an allowlist for
      `challenges.cloudflare.com` and Vercel Analytics; test on staging first).
- [ ] **Rate limiting** on `/api/subscribe` and `/api/contact` (e.g. Vercel
      Firewall rule or Upstash) if spam gets past the anti-bot layers.
- [ ] **E2E tests** (Playwright) for the two forms at mobile and desktop
      sizes, run against the staging deployment.
- [ ] Conversion events are wired but need the **Vercel Pro** plan to be
      recorded ([analytics.md](features/analytics.md)) — decide when traffic
      justifies it.
- [ ] Brand **web font** (`next/font`) once the visual identity is set
      (system fonts today).
- [ ] Upgrade to **TypeScript 7** and **ESLint 10** once supported by
      `eslint-config-next`.

## Known dependency advisories

- `braces` (via `eslint-config-next` → `fast-glob` → `micromatch`): high
  severity ReDoS advisory with **no patched version** published. Dev-only
  (lint tooling), not shipped to production — `npm audit --omit=dev` is clean.
  Re-check on each dependency update.
