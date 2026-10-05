# Laboon — Landing page

Landing page pour **Laboon**, une application de mise en relation entre musiciens.
Objectif principal : **collecter des adresses emails** avant le lancement (liste de
lancement + liste beta testeurs).

La propriétaire du projet n'est **pas développeuse** : privilégier la simplicité,
expliquer les étapes manuelles clairement, automatiser tout ce qui peut l'être.

## Stack
- **Next.js** (App Router, TypeScript) — site Node.js
- **Tailwind CSS** — style (thème sombre & moderne)
- **Brevo** (ex-Sendinblue) — stockage/gestion des emails via API
- **Vercel** — hébergement (prod + staging)

## Environnements
- **Production** : branche `main` → domaine principal
- **Staging** : branche `staging` → URL de préprod Vercel

## Commandes
```bash
npm install      # installer les dépendances
npm run dev      # lancer le site en local (http://localhost:3000)
npm run build    # build de production
npm run start    # lancer le build de prod en local
```

## Variables d'environnement (voir .env.example)
- `BREVO_API_KEY` — clé API Brevo
- `BREVO_LIST_ID_LAUNCH` — id de la liste « lancement »
- `BREVO_LIST_ID_BETA` — id de la liste « beta testeurs »
- `BREVO_DOI_TEMPLATE_ID` — id du template d'email de confirmation (double opt-in)

## Contexte détaillé
Voir le dossier [.claude/context/](.claude/context/) :
- `project-overview.md` — vision produit & objectifs
- `decisions.md` — décisions structurantes (journal)
- `architecture.md` — comment le code est organisé
- `deployment.md` — guide Vercel / domaine / env (rempli au fil des étapes)
