# Decision log

Structural decisions, newest last. Add an entry for every decision that
changes the stack, the architecture or a convention.

## 2026-06-14 — Initial setup

- **Next.js (App Router, TypeScript)**: standard on Vercel, Node.js-based, fast.
- **Tailwind CSS, dark & modern theme**: chosen by the owner (dark / light / colourful).
- **Brevo for emails** (vs Supabase / Resend): EU (GDPR), free plan, campaigns
  can be sent from the same tool.
- **Two lists, "launch" and "beta"**: the visitor picks with checkboxes (at
  least one required).
- **Environments**: prod (`main`) + staging (`staging`) on Vercel.

## 2026-06-28 → 2026-07-17 — App companion pages

- **`/reset-password` web fallback** using the app's Supabase instance.
- **Legal documents as React components with a registry**, served both as
  public pages and as bare `/legal/<slug>` pages for the app WebView.
- **Deep link files served by Next routes** (`/.well-known/*`) rather than
  static files, to control content-type and keep them typed.

## 2026-09-27 — Brevo wired

- **Separate lists per environment**: prod 5/6, staging 7/8 — staging tests
  never pollute real lists.
- **Double opt-in**: contacts join lists only after confirming by email
  (GDPR + no signing someone up without consent).
- **Fail loudly online**: a missing config returns an error instead of a fake
  "Merci" (bug found the same day: variables were missing on Vercel).

## 2026-10-04 — Contact, anti-bot, social, SEO, first production release

- **Contact form via Brevo transactional email** with `replyTo` = visitor.
- **French form errors**: `noValidate` on forms, messages come from the API.
- **Three invisible anti-bot layers** (honeypot, 3 s delay, Turnstile
  interaction-only) instead of a visible CAPTCHA, to keep conversion high.
- **Only production is indexable** (robots by Host header).
- **Vercel Web Analytics** (cookieless, no consent banner).

## 2026-10-05 — Clean-up, design system, tests, docs

- **Design system** (`components/ui`, `components/layout`) + `useProtectedForm`
  hook: page chrome, buttons, inputs and the anti-bot submit logic were
  duplicated across 4–5 files.
- **Feature folders** in `components/` mirroring `docs/features/`.
- **Logic in `lib/` as pure functions** (validation, anti-bot, Brevo, robots,
  password rules) so it is unit-testable; route handlers stay thin.
- **Vitest + Testing Library**, tests next to the code, **mandatory with every
  change**; CI runs lint (0 warnings) → typecheck → tests → build.
- **Documentation in English in `/docs`** (single source of truth, replaces
  `.claude/context/`); **website content stays in French**; code and comments
  in English.
- **Responsive is a requirement**: mobile-first, checked at 375 px and desktop.
- **Dependency policy**: minor/patch updates applied; TypeScript 7 and ESLint
  10 majors deferred until `eslint-config-next` / Next.js officially support
  them. `@types/node` pinned to the runtime major (24).
- **Baseline security headers** in `next.config.ts`.

## 2026-10-05 — Reliability, conversion, accessibility, tooling

- **Sentry for alerting** (server-side only, EU region, no personal data
  collected): a failed signup must be noticed immediately. Chosen over Vercel
  alerts (paid plans) and custom email alerts (would depend on Brevo, the
  very service that may be failing).
- **`lib/env.ts` as the single entry point** for environment variables, with
  per-feature requirements reported at server start.
- **Turnstile loaded on first interaction** and submit **waits for the
  token** instead of erroring: fewer Cloudflare calls, no lost early clicks.
- **Conversion events** via Vercel Analytics custom events, behind
  `trackEvent()` (works once on the Pro plan; no-op before).
- **Website texts in `content/`** so the owner can edit them on GitHub
  without touching JSX.
- **Accessibility target: Lighthouse 100** — muted colour lightened to
  `#a6a6ba` (contrast over glows), underlined text links (`TextLink`), skip
  link, `<main>` landmark, reduced-motion support. French 404/error pages.
- **Prettier** (with Tailwind class sorting) enforced in CI; **Dependabot**
  weekly grouped updates on `staging`; PR template with the definition of
  done; branch protection documented.
- **Favicon / icons deferred** until a logo exists; share image generated
  from text meanwhile.
- **Single legal contact address** `laboon.app@gmail.com` (`CONTACT_EMAIL` in
  `lib/site.ts`), replacing `contact@laboon.fr` (wrong domain) in the CGV,
  privacy policy and legal notice.

## 2026-10-05 — Repo moved to the `Laboon-Music` organization

- **GitHub organization `Laboon-Music`** owned by the owner's personal
  account (no dedicated Laboon account): repos grouped under the brand,
  contact email `laboon.app@gmail.com`.
- **Public repo**: Vercel Hobby cannot deploy private repos owned by an
  organization, and branch protection is free on public repos. No secret is
  versioned (they live in Vercel env variables); outside users can read the
  code but cannot push, and interactions are limited to collaborators.
- **History restarted** (one production commit on `main`, one staging commit
  on top) to drop personal emails from the public history. The old private
  repo `Algodrill/Laboon-website` is archived and keeps the full history.
