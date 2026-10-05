# Conventions

These rules apply to every change (human or AI). They are mirrored in
[`CLAUDE.md`](../CLAUDE.md).

## Language

| What                                                                      | Language                  |
| ------------------------------------------------------------------------- | ------------------------- |
| Website content (UI text, error messages, metadata, emails sent to users) | **French**, informal "tu" |
| Documentation (`docs/`, `README.md`, `CLAUDE.md`)                         | **English**               |
| Code: identifiers, comments, commit messages, PR descriptions             | **English**               |

`<html lang="fr">` and `locale: "fr_FR"` stay as they are. Inclusive writing
already used on the site ("prévenu·e", "testeur·euse") is kept.

## Responsive

The site must be **fully usable on mobile and desktop**. Mobile-first Tailwind
classes, no horizontal scroll at 375 px, checked at 375 px and ≥ 1280 px for
every UI change. Details in [design-system.md](design-system.md#responsive-rules).

## Accessibility

Lighthouse accessibility **100** on every page; rules in
[design-system.md](design-system.md#accessibility-rules) (contrast tokens,
`TextLink`, labels, `aria-hidden` on decoration, reduced motion).

## Code

- TypeScript strict; no `any` (use `unknown` for untrusted input and narrow it).
- Reuse the design system ([design-system.md](design-system.md)); never
  duplicate styling of buttons, inputs, cards or page chrome.
- Logic goes in `lib/` as small pure functions; components and route handlers
  stay thin (see [architecture.md](architecture.md#layering-rules)).
- Values shared by client and server (limits, labels, messages) are defined
  once in `lib/`.
- `route.ts` files export only HTTP handlers (Next.js restriction).
- Imports use the `@/` alias.
- Comments explain _why_, not _what_. Link the relevant doc page in the
  header comment of a feature file (`// See docs/features/x.md.`).
- Environment variables only through `lib/env.ts`; server failures that lose
  data through `reportError()` (`lib/monitoring.ts`), never personal data in it.
- Home page texts live in `content/` ([content.md](content.md)), not in JSX.
- **Formatting is automatic** (Prettier + Tailwind class sorting): run
  `npm run format`; CI fails on unformatted files (`npm run format:check`).
- `npm run lint` must pass with **zero warnings**.

## Tests

**Every change ships with unit tests** for the behaviour it adds or changes
(new feature, bug fix → regression test). Tests live next to the code
(`foo.ts` → `foo.test.ts`). See [testing.md](testing.md).

## Documentation

**Every change updates `docs/` in the same PR**: new feature → new page in
`docs/features/` + row in `docs/README.md`; changed behaviour → update its
page; structural decision → entry in `decisions.md`; new env variable →
`.env.example` + `deployment.md`.

## Git workflow

- `staging` is the default branch; `main` is production.
- Branch from `staging`: `feat/…`, `fix/…`, `chore/…`, `docs/…`.
- Conventional commits: `feat(scope): …`, `fix(scope): …`, `chore: …`.
- PR into `staging` (squash). Release = PR `staging` → `main` with a
  **merge commit** (never squash), so both branches share history.
- Before pushing: `npm run check` (format + lint + typecheck + tests) and
  `npm run build`. CI runs the same steps.
- Every PR uses a template and fills it in: what & why, type, changes, how
  to test, screenshots (UI), definition of done, deploy notes. Tick what was
  checked, strike through what doesn't apply.
  - **Feature / fix PRs** → default template
    (`.github/pull_request_template.md`), loaded automatically.
  - **Release PRs** (`staging` → `main`) → release template
    (`.github/PULL_REQUEST_TEMPLATE/release.md`): add `?template=release.md`
    to the "new PR" URL, or run
    `gh pr create --base main --head staging --template release.md`.
- PR titles follow conventional commits (they become the squash commit).
- `staging` and `main` are protected: a PR with green CI is required
  (settings: [deployment.md](deployment.md#github--repo-settings)).

## Dependencies

- **Dependabot** opens a grouped PR every Monday for minor/patch updates
  (npm) and monthly for GitHub Actions, targeting `staging`. Merge it once CI
  is green.
- Major upgrades are deliberate: read the changelog, upgrade in a dedicated
  PR, record it in `decisions.md`. Deferred majors are ignored in
  `.github/dependabot.yml` (TypeScript, ESLint, `@types/node` above the
  runtime major).
- Check `npm audit --omit=dev` (production dependencies) stays clean.

## Definition of done

- [ ] Works on mobile (375 px) and desktop
- [ ] Unit tests added/updated, `npm run check` green
- [ ] `npm run build` green
- [ ] Docs updated (`docs/`, `.env.example` if needed)
- [ ] Texts in French, code/docs in English
- [ ] Accessible (labels, contrast, keyboard) — Lighthouse a11y 100 for UI changes
