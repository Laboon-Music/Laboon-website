---
name: open-pr
description: Open a GitHub pull request for the current branch on Laboon-Music/Laboon-website — conventional-commit title in English, description filled from the project's PR template (release template for staging → main), assigned to the requesting user. Use whenever the user asks to open/create a PR, submit a pull request, or push their branch for review.
---

# Open a pull request

Opens a real PR with `gh pr create` on `Laboon-Music/Laboon-website`. It is a
visible, shared action: **always show the title and description and get an
explicit yes before pushing or creating anything**, even if the user said
"just open it".

## Step 0 — Branch and base

- Current branch: `git branch --show-current`.
- `staging` → it's a **release**: base `main`, head `staging`, release
  template (Step 4b). Ask the user to confirm that's what they want.
- `main` → stop: never open a PR from `main`.
- Any other branch → base `staging`, default template (Step 4a).
- Uncommitted changes (`git status --short`): tell the user and ask whether
  to commit them first (conventional commit) or leave them out.
- `gh auth status` must show the **Algodrill** account active. Otherwise stop
  and tell the user (`gh auth switch`) — never use the work account.
- An open PR already exists for the branch (`gh pr view --json url`)? Show
  its URL and offer to update its description instead.

## Step 1 — Diff analysis

```bash
git fetch origin <base>
git log --oneline origin/<base>..HEAD
git diff --stat origin/<base>...HEAD
git diff origin/<base>...HEAD
```

Identify the area touched (see scopes below), the nature of the change and
whether it touches UI, env variables, docs or tests.

## Step 2 — Title (conventional commit, English)

Format: `type(scope): short description` — it becomes the squash commit on
`staging`, so make it count.

- `type`: from the branch prefix and the diff — `feat/…`→`feat`,
  `fix/…`→`fix`, `chore/…`→`chore`, `docs/…`→`docs`; otherwise
  `feat|fix|refactor|perf|test|docs|style|chore|ci`.
- `scope`: the feature or area, matching the repo's history — `contact`,
  `subscribe`, `forms`, `legal`, `reset-password`, `deeplinks`, `social`,
  `analytics`, `seo`, `security`, `ui`, `docs`, `deployment`, `ci`, `github`,
  `deps`. Omit it if the change is truly cross-cutting.
- Description: imperative, lowercase, concise, no trailing period.
- Release PR title: `release: YYYY-MM-DD` (today's date).

## Step 3 — Ticket

If the branch name or commits carry a ticket key (e.g. `LAB-24`), mention it
in **What & why**. Never invent one.

## Step 4a — Description from `.github/pull_request_template.md`

Read the template and fill it in **as-is** — same sections, same order:

- **What & why**: 1–3 sentences, the problem then the change, from the
  user's / visitor's point of view.
- **Changes**: short bullets grouped by area — not a file-by-file paraphrase.
- **How to test**: concrete steps on the Vercel preview (pages to open,
  forms to submit, what to expect).
- **Screenshots**: keep the table only if the UI changed and tell the user to
  add mobile + desktop captures; delete the section otherwise.
- **Definition of done**: leave every box **unchecked** — the author ticks
  them. Strike through (`~~…~~`) items that clearly don't apply (e.g. no UI
  change → mobile/desktop). Warn the user about any box that looks like it
  will fail (behaviour change without tests, new env variable without
  `.env.example` / `docs/deployment.md`, feature without `docs/` update).
- **Deploy notes**: env variables to set on Vercel (prod + staging), Brevo /
  Supabase / Cloudflare steps — from the diff (`.env.example`, `lib/env.ts`,
  docs). `None.` if nothing.
- Strip the template's HTML comments.

## Step 4b — Release description from `.github/PULL_REQUEST_TEMPLATE/release.md`

- Keep the merge-commit warning.
- **What ships**: one line per PR merged into `staging` since `main`
  (`git log --oneline --first-parent origin/main..origin/staging`, PR numbers
  from the `(#N)` suffixes), as `- #N title`.
- Leave the checklists unchecked; list in them any production env variable
  or outside step found in the shipped PRs' deploy notes.
- Strip the HTML comments.

## Step 5 — Confirm, push, open

1. Show the exact title and the full description; ask for an explicit yes.
2. Push if needed: `git push -u origin <branch>` (never push to `staging` or
   `main` — they are protected anyway).
3. Write the description to a file in the scratchpad, then:

```bash
gh pr create \
  --repo Laboon-Music/Laboon-website \
  --base <staging|main> \
  --head <branch> \
  --title "<title>" \
  --body-file <file> \
  --assignee @me
```

4. Give the PR URL back, and remind the merge method: **Squash and merge**
   for feature PRs, **Create a merge commit** for releases.

## Rules

- No Claude attribution anywhere (no "Generated with Claude Code", no
  Co-Authored-By line).
- Never tick a checklist box, never invent test results or a ticket.
- Title and description in English, whatever language the conversation is in.
