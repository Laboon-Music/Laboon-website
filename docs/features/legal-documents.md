# Legal documents

Five documents, in French: CGU, CGV, Charte de bonne conduite, Politique de
confidentialité, Mentions légales.

## Two ways to display the same content

| Route                                                              | For                | Chrome                           | Indexed        |
| ------------------------------------------------------------------ | ------------------ | -------------------------------- | -------------- |
| `/cgu`, `/cgv`, `/charte`, `/confidentialite`, `/mentions-legales` | Website visitors   | `PageShell` + back link + footer | yes            |
| `/legal/<slug>?lang=<locale>`                                      | Mobile app WebView | none (bare article)              | no (`noindex`) |

## Code

- `components/legal/registry.ts` — single source of truth: slug → title +
  component, per locale. Slugs must match `legal_document.slug` in the app's
  Supabase database.
- `components/legal/content/fr/*.tsx` — document bodies, built from
  `components/legal/_shared.tsx` blocks (`DocHeader`, `Section`, `List`, `TodoNote`…).
- `components/legal/LegalPage.tsx` — `LegalPage` + `legalMetadata(slug)` used
  by each public route (2-line page files).
- `app/legal/[slug]/page.tsx` — embed route, statically generated for every slug.

## Contact address

All documents show the official contact address `CONTACT_EMAIL`
(`lib/site.ts`, currently `laboon.app@gmail.com`) — never a hard-coded
address. Changing it there updates every document; a test fails if another
address appears in a legal document.

## Languages

Only French exists. Add a language: create `content/<locale>/*.tsx` and
register it in `LEGAL_CONTENT`. Unknown/missing locales fall back to French.

## Content status

The V1 texts still contain `[à compléter]` placeholders (flagged with
`TodoNote`) — they must be filled before the public launch. See
[roadmap.md](../roadmap.md).

## Add a document

1. Add `content/fr/<Name>.tsx`, register it in `registry.ts` (slug type + `FR`).
2. Create `app/<slug>/page.tsx` (copy an existing 2-line page).
3. Sitemap picks it up automatically (`LEGAL_SLUGS`).

## Tests

`components/legal/registry.test.ts`, `app/sitemap.test.ts`.
