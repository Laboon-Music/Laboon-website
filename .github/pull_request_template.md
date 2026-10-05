<!--
  Title: conventional commit, e.g. `feat(contact): add a phone field`.
  Base branch: `staging`. Releasing staging → main? Use the release template:
  add `?template=release.md` to the PR URL, or `gh pr create --template release.md`.
-->

## 🎯 What & why

<!-- 1–3 sentences: the problem, then the change. Link the ticket if any. -->

## 🏷️ Type

- [ ] ✨ Feature
- [ ] 🐛 Bug fix
- [ ] ♻️ Refactor / cleanup
- [ ] 📝 Docs
- [ ] 🔧 Chore (deps, CI, tooling)

## 🔍 Changes

<!-- Key changes grouped by area — reviewers read this first. -->

-

## 🧪 How to test

<!-- Steps a reviewer can follow on the Vercel preview (link posted by Vercel below). -->

1.

## 📸 Screenshots

<!-- UI changes only — delete this section otherwise. -->

| 📱 Mobile (375 px) | 🖥️ Desktop |
| :----------------: | :--------: |
|                    |            |

## ✅ Definition of done

<!-- Tick what you checked; strike through (~~like this~~) what doesn't apply. -->

- [ ] 📱 Works on **mobile (375 px)** and **desktop**, no horizontal scroll
- [ ] 🧪 **Unit tests** added/updated — `npm run check` green
- [ ] 🏗️ `npm run build` green
- [ ] 📚 **Docs** updated (`docs/`; new env variable → `.env.example` + `deployment.md`)
- [ ] 🇫🇷 Site texts in **French** ("tu"), in `content/`; code & docs in **English**
- [ ] 🧩 UI built from the **design system** (`components/ui`, `components/layout`)
- [ ] ♿ **Accessible**: labels, colour tokens, keyboard, `aria-hidden` on decoration
- [ ] 🛡️ New public form: `useProtectedForm` + `Honeypot` + `Turnstile` + `checkAntibot()`
- [ ] 🔐 No secret committed, no personal data in logs or `reportError()`

## 🚚 Deploy notes

<!-- Anything to do outside the code before/after merging: Vercel env variables
     (prod + staging), Brevo / Supabase / Cloudflare settings… -->

None.
