# Password reset (app web fallback)

`/reset-password` is the **web fallback** of the password recovery link sent
by the Laboon app (Supabase Auth).

## Flow

1. User asks for a reset in the app → Supabase emails a link to
   `https://www.laboon-app.com/reset-password#access_token=…&refresh_token=…&type=recovery`.
2. If the app is installed, iOS Universal Links / Android App Links open the
   app directly ([deep-links.md](deep-links.md)).
3. Otherwise this page opens: it reads the tokens from the URL hash
   (`parseRecoveryHash`), opens a Supabase session, and shows a form.
4. Password rules (`validateNewPassword`): ≥ 12 chars, confirmation must match.
5. `supabase.auth.updateUser({ password })` → success message.

## Error handling

- Any failure while opening the session (expired link, network down,
  Supabase not configured) ends on **"Lien invalide ou expiré"** — never an
  endless "Chargement…".
- Supabase returns English messages: they are **never shown as-is**.
  `supabaseErrorMessage()` maps known codes (`same_password`,
  `weak_password`, expired session codes, `over_request_rate_limit`) to French
  and falls back to a generic French message.

## Code

`app/reset-password/page.tsx`, `lib/password.ts`, `lib/supabase.ts` (lazy
client — creating it at import time would break `next build` when env vars
are absent; it throws a clear error if they are missing).

## Configuration

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — must point to
the **same Supabase instance as the app** for that environment
(prod: `https://prod.sp.laboon-app.com`, staging: `https://staging.sp.laboon-app.com`).
The anon key is public.

## Tests

`lib/password.test.ts`, `app/reset-password/page.test.tsx` (Supabase mocked).
