# Architecture du code

Projet **Next.js (App Router)** en TypeScript. Structure des fichiers :

```
Laboon-website/
├── app/
│   ├── layout.tsx              # Layout global + métadonnées SEO (lang fr)
│   ├── page.tsx                # Landing page (hero, features, étapes, CTA, footer)
│   ├── globals.css             # Thème Tailwind v4 (couleurs, dégradés, glow)
│   ├── mentions-legales/page.tsx
│   ├── confidentialite/page.tsx
│   ├── contact/page.tsx        # Page Contact (formulaire)
│   └── api/
│       ├── subscribe/route.ts  # API POST : enregistre l'email dans Brevo
│       └── contact/route.ts    # API POST : envoie le message de contact par email (Brevo)
├── components/
│   ├── SignupForm.tsx          # Formulaire (email + cases lancement/beta)
│   ├── ContactForm.tsx         # Formulaire de contact (nom, email, sujet, message)
│   └── Turnstile.tsx           # Widget anti-robots Cloudflare Turnstile
├── lib/
│   └── antibot.ts              # Contrôles anti-robots côté serveur (délai, Turnstile)
├── .env.example                # Modèle des variables d'environnement
├── .env.local                  # Variables locales (NON committé)
├── next.config.ts
├── tailwind via postcss.config.mjs (@tailwindcss/postcss)
└── tsconfig.json
```

## Flux d'inscription
1. L'internaute remplit `SignupForm` (email + au moins une case cochée).
2. Le formulaire envoie un POST JSON à `/api/subscribe`.
3. `route.ts` valide l'email, puis déclenche le **double opt-in** Brevo
   (`/v3/contacts/doubleOptinConfirmation`) : Brevo envoie l'email de
   confirmation (template `BREVO_DOI_TEMPLATE_ID`). Le contact n'est ajouté aux
   listes (lancement / beta) qu'après le clic, puis redirigé vers
   `/inscription-confirmee` (page `app/inscription-confirmee/page.tsx`).
4. Si `BREVO_API_KEY` est absente **en local** (`npm run dev`) → mode "dry run" :
   l'inscription est juste loggée dans le terminal. **En ligne**, une clé ou un
   ID de liste manquant renvoie une erreur (jamais de fausse confirmation).
5. Anti-robots : le formulaire contient un champ caché `website`. S'il est
   rempli, l'API répond "ok" sans rien enregistrer.

## Flux de contact
1. L'internaute remplit `ContactForm` sur `/contact` (lien dans le header et le footer).
2. POST JSON à `/api/contact` : validation (nom, email, message 10–5000 caractères).
3. Envoi d'un email transactionnel Brevo (`/v3/smtp/email`) depuis
   `noreply@laboon-app.com` vers `CONTACT_TO_EMAIL`, avec `replyTo` = l'internaute :
   il suffit de cliquer « Répondre » dans sa messagerie.
4. Même logique que l'inscription : dry run (log terminal) en local sans config,
   erreur visible en ligne si `BREVO_API_KEY` ou `CONTACT_TO_EMAIL` manque.
   Même champ piège anti-robots `website`.

## Protection anti-robots (inscription + contact)
Trois couches, toutes invisibles pour un humain :
1. **Champ piège** `website` : rempli → l'API répond "ok" sans rien faire.
2. **Délai minimum** : formulaire envoyé < 3 s après affichage → erreur
   « un peu rapide, réessaie » (visible, pour ne jamais perdre un vrai humain).
3. **Cloudflare Turnstile** (mode `interaction-only` : invisible sauf doute) :
   le jeton est vérifié côté serveur (`lib/antibot.ts`). Désactivé tant que
   `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` ne sont pas définies.

## Thème
Couleurs définies en variables CSS dans `globals.css` (`@theme`) :
- fond très sombre (`--color-bg`), surfaces (`--color-surface`)
- accents : violet `--color-brand`, rose `--color-brand-2`, turquoise `--color-accent`
- dégradés sur les titres (`.text-gradient`) et halos lumineux (`.glow`)

Pour changer les couleurs/textes, tout est centralisé : `globals.css` (couleurs),
`app/page.tsx` (textes et sections), `components/SignupForm.tsx` (formulaire).
