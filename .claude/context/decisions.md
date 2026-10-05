# Journal des décisions

Décisions structurantes prises avec la propriétaire (non-développeuse).

## 2026-06-14 — Initialisation

- **Framework : Next.js (App Router, TypeScript).** Standard sur Vercel, basé
  Node.js comme demandé. Donne un site rapide et facile à déployer.
- **Style : Tailwind CSS, thème sombre & moderne.** Choisi par la propriétaire
  parmi (sombre / clair / coloré).
- **Collecte emails : Brevo (ex-Sendinblue).** Choisi parmi (Supabase / service
  email / Resend). Outil d'emailing européen (RGPD), plan gratuit, permet
  d'envoyer ensuite les campagnes directement depuis le même outil.
- **Deux listes : « lancement » et « beta testeurs ».** L'inscrit choisit via
  des cases à cocher (au moins une requise).
- **Environnements : prod (`main`) + staging (`staging`) sur Vercel.**
- **Outils installés : Node.js LTS v24 via winget** (la machine n'avait pas Node).

## 2026-09-27 — Brevo branché

- **Listes séparées par environnement** : prod = 5 (lancement) / 6 (beta),
  staging = 7 / 8. Les tests sur staging ne polluent pas les vraies listes.
- **Double opt-in activé.** Chaque inscrit reçoit un email de
  confirmation (expéditeur `Laboon <noreply@laboon-app.com>`, template Brevo n°1,
  tag `optin`) ; il n'entre dans les listes qu'après avoir cliqué. RGPD +
  empêche d'inscrire quelqu'un à son insu.

## À décider / en attente
- Nom de domaine : **laboon-app.com** → à brancher sur Vercel (étape domaine).
- Mentions légales / politique de confidentialité (RGPD) — recommandé avant
  collecte réelle d'emails.
