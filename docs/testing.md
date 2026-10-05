# Testing

Unit tests use **Vitest** with **Testing Library** in a **jsdom** environment.

## Commands

```bash
npm test               # run all tests once (CI)
npm run test:watch     # re-run on file change while developing
npm run test:coverage  # coverage report in ./coverage
npm run check          # format + lint + typecheck + tests (run before pushing)
```

## Where tests live

Next to the code they test: `lib/antibot.ts` → `lib/antibot.test.ts`,
`components/contact/ContactForm.tsx` → `ContactForm.test.tsx`,
`app/api/subscribe/route.ts` → `route.test.ts`.

Shared setup and helpers are in `tests/`:

- `tests/setup.ts` — jest-dom matchers, DOM cleanup.
- `tests/helpers.ts` — `jsonRequest()`, `mockFetch()`, `sentJson()`,
  `silenceConsole()`, `HUMAN` (anti-bot fields of a legit submission).

## What to test

| Layer               | How                                                                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lib/*`             | Pure functions: inputs → outputs, edge cases                                                                                                                     |
| API routes          | Call the exported `POST` with a `Request`; stub env with `vi.stubEnv` and network with `mockFetch`; assert status, JSON and the payload sent to Brevo/Cloudflare |
| Components          | Render, interact with `userEvent`, assert what the user sees (roles, labels, text) and what is sent                                                              |
| SEO / static routes | Call `sitemap()`, `robotsFor()`, `GET()` and assert their output                                                                                                 |

Rules:

- **No real network calls.** Always `mockFetch()` or `vi.stubGlobal("fetch", …)`.
- Env and globals are restored automatically after each test
  (`unstubEnvs`, `unstubGlobals`, `restoreMocks` in `vitest.config.mts`).
- `NODE_ENV` is `test` → API routes behave like local dev (dry run). Use
  `vi.stubEnv("NODE_ENV", "production")` to test production behaviour.
- Query the DOM like a user: `getByRole`, `getByLabelText`, `getByText`.
- Legal document _content_ is not unit-tested (text), the registry is.

## Not covered (yet)

End-to-end tests in a real browser (Playwright) — see [roadmap.md](roadmap.md).
Responsive checks are done manually (375 px / desktop) per the
[definition of done](conventions.md#definition-of-done).
