# FAQ

Frequently asked questions, in French, shown on the website **and** in the
mobile app.

## Routes

| Route        | For                | Chrome               | Indexed        |
| ------------ | ------------------ | -------------------- | -------------- |
| `/faq`       | Website visitors   | `PageShell` + footer | yes (sitemap)  |
| `/faq/embed` | Mobile app WebView | none (bare article)  | no (`noindex`) |

The footer links to `/faq`. The app should load `https://www.laboon-app.com/faq/embed`.

## Code

- `content/faq.ts` — the texts: groups of question/answer. A link in an
  answer is `[label](address)`. The contact address comes from `CONTACT_EMAIL`.
- `components/faq/Faq.tsx` — the article, shared by both routes.
- `components/faq/RichText.tsx` — turns `[label](address)` into `TextLink`.
- `components/ui/Disclosure.tsx` — the expandable row (native `<details>`).
- `app/faq/page.tsx`, `app/faq/embed/page.tsx` — thin routes.

## Tests

`components/faq/Faq.test.tsx`, `components/ui/ui.test.tsx`,
`app/sitemap.test.ts`, `lib/site.test.ts`.
