# Site du mariage — Alexia & Julien (7-8 août 2027)

Site statique (HTML/CSS/JS) hébergé sur GitHub Pages.

- `main` -> **prod** : https://alexia-julien.github.io/mariage/accueil/
- `test` -> **test** : https://alexia-julien.github.io/mariage/test/accueil/

Workflow : modification -> commit sur `test` -> validation -> merge `test` dans `main`.
Le déploiement est géré par `.github/workflows/pages.yml`.

Pages : `/accueil/` (faire-part) et `/hebergement/` (où dormir). La racine `/` redirige vers `/accueil/`.
