# Design system

All UI is built from a small set of shared pieces. **Never re-style a button,
input, card or page frame by hand** — use (or extend) the components below so
the whole site stays consistent.

## Tokens (`app/globals.css`)

Tailwind v4 `@theme` variables, usable as utilities (`bg-surface`, `text-muted`…):

| Token     | Value              | Use                                                             |
| --------- | ------------------ | --------------------------------------------------------------- |
| `bg`      | `#0a0a0f`          | Page background                                                 |
| `bg-soft` | `#11111b`          | Highlighted sections (final CTA)                                |
| `surface` | `#16161f`          | Cards, inputs on the page background                            |
| `border`  | `#262633`          | Borders                                                         |
| `text`    | `#f4f4f8`          | Main text                                                       |
| `muted`   | `#a6a6ba`          | Secondary text — ≥ 4.5:1 contrast even over the glows (WCAG AA) |
| `brand`   | `#7c5cff` (violet) | Primary accent, focus ring                                      |
| `brand-2` | `#ff5ca8` (pink)   | Gradient end, error text                                        |
| `accent`  | `#2dd4bf` (teal)   | Success states                                                  |

Utilities: `.text-gradient` (violet → pink text), `.glow` (blurred light blob,
use the `Glow` component).

## UI primitives — `@/components/ui`

| Component                     | Purpose                           | Notes                                                                                                                                         |
| ----------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                      | Actions                           | `variant="primary"` (gradient, default) or `"outline"`; `fullWidth`; defaults to `type="button"`                                              |
| `ButtonLink`                  | Navigation styled as a button     | Wraps `next/link`                                                                                                                             |
| `buttonClass()`               | Button classes for other elements | e.g. an `<a href="#anchor">`                                                                                                                  |
| `Card`                        | Surface container                 | `tone="success"` for confirmations                                                                                                            |
| `Field`                       | Visible label wrapping a control  | Gives the control its accessible name                                                                                                         |
| `Input`, `Textarea`, `Select` | Form controls                     | `tone="card"` (default, inside a Card) or `"page"` (on the page background)                                                                   |
| `Checkbox`                    | Checkbox with label               | `accent="brand" \| "brand-2"`                                                                                                                 |
| `FormError`                   | Error line (`role="alert"`)       | Renders nothing when empty                                                                                                                    |
| `Honeypot`                    | Anti-bot trap field               | Mandatory in every public form — see [antibot](features/antibot.md)                                                                           |
| `TextLink`                    | Link inside running text          | Always underlined (not colour-only); `tone="brand"` (default) or `"inherit"`; internal paths use `next/link`, external URLs open in a new tab |

## Layout — `@/components/layout`

| Component                | Purpose                                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PageShell`              | Standard page frame: "Aller au contenu" skip link + glow background + header + `<main id="contenu">` (+ `footer`). **Every page uses it.** Props: `headerActions`, `logoAsLink`, `footer`. |
| `SiteHeader`             | Logo + optional actions                                                                                                                                                                    |
| `SiteFooter`             | Brand, social links, copyright, legal links                                                                                                                                                |
| `Logo`                   | 🐳 Laboon wordmark (links home by default)                                                                                                                                                 |
| `Glow`, `GlowBackground` | Decorative light blobs                                                                                                                                                                     |

## Forms

Every public form uses `useProtectedForm(endpoint)` (`hooks/`), which handles
the submit lifecycle (`idle → loading → success | error`), French error
messages from the API, and the anti-bot fields. A form only declares its own
fields and calls `form.submit({...})`. Forms use `noValidate` so that errors
come from our French API messages, not the browser's language.

## Responsive rules

The site **must work on mobile and desktop** (see [conventions.md](conventions.md#responsive)):

- **Mobile-first**: base classes target phones (~360–430 px); add `sm:` /
  `md:` / `lg:` for larger screens.
- Horizontal page padding: `px-4 sm:px-6`. Content width: `max-w-6xl`
  (pages), `max-w-2xl`/`max-w-3xl` (text), `max-w-md` (single card).
- Stack on mobile, go side by side from `sm:`/`md:` (`flex-col sm:flex-row`,
  `grid sm:grid-cols-2 lg:grid-cols-4`).
- Font size of inputs ≥ 16 px (`text-base`) to avoid iOS zoom on focus.
- Tap targets ≥ 40 px; no hover-only interactions.
- **No horizontal scroll** at 375 px: long words/emails use `break-words`.
- Check every UI change at **375 px** and **≥ 1280 px** before merging.
- Glows are automatically smaller and less blurred under 640 px (cheaper to
  paint on low-end phones) — see `.glow` in `globals.css`.

## Accessibility rules

Target: **Lighthouse accessibility 100** on every page (mobile).

- One `<h1>` per page; headings in order. Decorative emojis/icons get
  `aria-hidden="true"`; icon-only links get an `aria-label`.
- Every control has an accessible name (`Field` label or `aria-label`).
- Text contrast ≥ 4.5:1 — use the tokens (`text`, `muted`), never a darker grey.
- Links inside text use `TextLink` (underlined).
- Errors use `FormError` (`role="alert"`, announced by screen readers).
- Animations / smooth scroll are disabled when the OS asks for reduced
  motion (`prefers-reduced-motion` in `globals.css`); don't add motion that
  bypasses it.
- Audit: `npx lighthouse <url> --only-categories=accessibility` against
  `npm run build && npm start` (preview config `laboon-prod`, port 3001).

## Adding a component

1. Generic and reusable → `components/ui/` (export it from `index.ts`).
   Page chrome → `components/layout/`. Feature-specific → `components/<feature>/`.
2. Accept `className` and spread native props so it composes.
3. Add a test (`*.test.tsx` next to it) and a row in this page.
