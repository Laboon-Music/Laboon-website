# Déploiement — Vercel, Brevo, domaine

État : **site prêt en local, pas encore déployé.** Ce guide liste les étapes
manuelles (compte Vercel, Brevo, DNS) + ce qui est automatisé.

## Stratégie d'environnements
- **Production** = branche `main` → domaine principal (ex. laboon.app)
- **Staging** = branche `staging` → URL Vercel de préprod (ex. laboon-website-staging.vercel.app)

Sur Vercel, chaque branche se déploie automatiquement. `main` = Production,
les autres branches = Preview. On configure `staging` comme préprod stable.

## Étapes (à faire avec la propriétaire)

### 1. Brevo (collecte des emails)
- [x] Compte Brevo créé (compte « Laboon », laboon.app@gmail.com).
- [x] Domaine d'envoi `laboon-app.com` authentifié dans Brevo.
- [x] Listes créées (2026-09-27), une paire par environnement :
      - **Prod** : « Laboon - Lancement » = **5**, « Laboon - Beta » = **6**
      - **Staging** : « Laboon - Lancement (staging) » = **7**,
        « Laboon - Beta (staging) » = **8**
      → les tests sur staging ne polluent jamais les listes de prod.
- [x] Clé API « laboon-website » créée (2026-09-27).
- [x] Expéditeur `Laboon <noreply@laboon-app.com>` (domaine authentifié, DKIM + DMARC OK).
- [x] Template double opt-in « Laboon - Double opt-in (confirmation inscription) »
      = **ID 1**, tag `optin`, lien `{{ doubleoptin }}` (Marketing > Templates).
- [ ] (Optionnel) Créer l'attribut contact texte `SOURCE` (le site envoie
      `SOURCE=landing`).
- ⚠️ Ne PAS activer « blocage des IP non autorisées » pour les clés API :
  les serveurs Vercel n'ont pas d'IP fixe, toutes les inscriptions échoueraient.

### 2. GitHub — ✅ FAIT (2026-06-14)
- [x] Code committé et poussé sur Algodrill/Laboon-website (branche `main`).
- [x] Branche `staging` créée et poussée.
- Auth GitHub via Git Credential Manager (identifiants mémorisés sur la machine).

### 3. Vercel — ✅ EN PARTIE FAIT (2026-06-14)
- [x] Compte Vercel créé (via GitHub), projet importé.
- [x] Root Directory = `Laboon-website`. Framework Next.js détecté.
- [x] **Production en ligne : https://laboon-website-black.vercel.app/**
- [ ] Variables d'environnement (Production ET Preview) — À AJOUTER après Brevo :
      - `BREVO_API_KEY`
      - `BREVO_LIST_ID_LAUNCH` = `5` (prod) / `7` (staging)
      - `BREVO_LIST_ID_BETA` = `6` (prod) / `8` (staging)
      - `BREVO_DOI_TEMPLATE_ID` = `1` (prod et staging)
      ⚠️ Constat du 2026-09-27 : ces variables étaient absentes sur les 2 projets,
      donc le site affichait « Merci » sans rien enregistrer. Depuis, une config
      manquante renvoie une erreur visible au lieu d'une fausse confirmation.
- ⚠️ Sur le plan gratuit (Hobby), attacher un domaine perso à une branche
      *Preview* est payant. **Contournement gratuit : un 2ᵉ projet Vercel** dont
      la *Production Branch* = `staging`.

### Staging = 2ᵉ projet Vercel (approche retenue, gratuite)
- [ ] Vercel > Add New > Project > réimporter le MÊME repo `Laboon-website`.
- [ ] Project Name : `laboon-website-staging`. Root Directory : `Laboon-website`.
- [ ] Settings > Git > **Production Branch = `staging`** puis Redeploy.
- [ ] Donne une URL publique gratuite `laboon-website-staging-xxx.vercel.app`.
- [ ] (Optionnel) Domaine : add `staging.laboon-app.com` sur ce projet +
      Cloudflare CNAME `staging` → `cname.vercel-dns.com` (DNS only).
- [x] Variables Brevo ajoutées sur ce projet (listes 7 et 8) + redéployé
      (2026-09-27). Test OK : inscription staging → listes 7 et 8.

## Workflow de déploiement (rappel)
- Pousser sur `staging` → déploie la préprod (projet `…-staging`).
- Une fois validé, fusionner `staging` dans `main` et pousser → déploie la prod.

### 4. Domaine — domaine = **laboon-app.com**
- Domaine acheté sur **OVH**, mais **DNS gérés par Cloudflare** (nameservers → Cloudflare).
  Donc les enregistrements DNS se créent **dans Cloudflare**, pas OVH.
- [ ] Vercel > Project > Settings > Domains : ajouter `laboon-app.com` + `www`.
- [ ] Dans Cloudflare (dash.cloudflare.com > laboon-app.com > DNS > Records) :
      - A    `@`   → `76.76.21.21`           (ou la valeur affichée par Vercel)
      - CNAME `www` → `cname.vercel-dns.com`  (ou la valeur affichée par Vercel)
      - ⚠️ **Proxy status = DNS only (nuage GRIS)** pour les deux, sinon le
        certificat HTTPS Vercel échoue / boucle de redirection.
      - Supprimer les anciens A/CNAME en conflit sur `@` et `www`.
- [ ] Attendre que Vercel affiche « Valid » + HTTPS auto.
- [ ] Optionnel : sous-domaine `staging.laboon-app.com` → branche staging.

### Formulaire de contact (/contact)
- [ ] Choisir l'adresse qui reçoit les messages (ex. `contact@laboon-app.com`).
- [ ] Vercel > chaque projet (prod ET staging) > Settings > Environment Variables :
      ajouter `CONTACT_TO_EMAIL` = cette adresse, puis **Redeploy**.
      (Réutilise la même `BREVO_API_KEY` ; expéditeur `noreply@laboon-app.com`.)
- [ ] Tester sur staging : envoyer un message → il doit arriver dans la boîte,
      et « Répondre » doit répondre à l'adresse saisie dans le formulaire.

### Anti-robots — Cloudflare Turnstile
- [ ] dash.cloudflare.com > **Turnstile** (menu de gauche, au niveau du compte) >
      **Add widget** : nom `Laboon website`, hostname `laboon-app.com`
      (couvre aussi `www.` et `staging.`) ; mode **Managed** ; pre-clearance non.
- [ ] Copier la **Site Key** et la **Secret Key**.
- [ ] Vercel, projets prod ET staging > Environment Variables :
      `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = Site Key, `TURNSTILE_SECRET_KEY` = Secret Key,
      environnement **Production uniquement** (les URLs de preview `*.vercel.app`
      ne sont pas autorisées par le widget : les formulaires y échoueraient),
      puis **Redeploy** (la Site Key est intégrée au build : redeploy obligatoire).
- [ ] Tester inscription + contact sur staging.

### Google Search Console (référencement)
- Le site publie `/robots.txt` et `/sitemap.xml` (app/robots.ts, app/sitemap.ts).
  Seul `www.laboon-app.com` est indexable ; staging et `*.vercel.app` renvoient
  `Disallow: /` pour ne pas être indexés.
- [ ] search.google.com/search-console > Ajouter une propriété > type **Domaine** :
      `laboon-app.com` (couvre www + staging).
- [ ] Copier l'enregistrement TXT `google-site-verification=…` proposé.
- [ ] Cloudflare > laboon-app.com > DNS > Records > Add record : Type **TXT**,
      Name `@`, Content = la valeur copiée > Save. Puis « Valider » dans Search Console.
- [ ] Une fois la MEP faite : Search Console > Sitemaps > ajouter `sitemap.xml`.

### 5. RGPD / légal
- [ ] Compléter `app/mentions-legales/page.tsx` et `app/confidentialite/page.tsx`
      avec les vraies infos avant la mise en ligne publique.

## Notes techniques
- Node.js LTS v24 installé localement via winget. Le PATH n'est visible que dans
  les terminaux ouverts APRÈS l'installation (redémarrer l'app si "node introuvable").
- `npm run dev` pour le local, `npm run build` pour vérifier avant de pousser.
