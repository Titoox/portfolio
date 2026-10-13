# Portfolio de Titouan Gaucher

Mon portfolio de dev web, en ligne sur [titouan-gaucher.fr](https://titouan-gaucher.fr).

HTML, CSS et JS vanilla, sans framework ni build. Les polices sont hébergées sur le site et les images sont en WebP quand c'est possible, pour garder un score EcoIndex correct.

## Mise en ligne

Le site est servi par GitHub Pages depuis la branche `main`. Le domaine est chez OVH et pointe vers GitHub, via le fichier `CNAME`.

Pour mettre à jour : je modifie en local, je commit sur `main` puis je push. Le site se met à jour en une minute environ.

## Organisation

- `index.html` : la page d'accueil (présentation, projets, contact)
- `projet-*.html` : une page par projet
- `css/` : les styles, avec les couleurs et les polices définies en variables dans `main.css`, et les polices auto-hébergées dans `css/fonts/`
- `scroll.js` : les animations au scroll
- `images/` : photos, icônes, favicons et CV
- `CNAME`, `robots.txt`, `sitemap.xml`, `site.webmanifest` : domaine, référencement, PWA

## Ajouter un projet

1. Créer `projet-<nom>.html` en partant d'une page existante, par exemple `projet-pfc.html`.
2. Ajouter sa carte dans la section projets de `index.html`.
3. Ajouter l'URL dans `sitemap.xml`.
