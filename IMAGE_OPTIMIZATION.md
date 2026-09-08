Optimisation des images

Le script compresse et convertit les images du dossier `src/assets` en variantes WebP redimensionnées à 800 px maximum. Le composant `Projets` utilise directement ces variantes légères.

Pour exécuter la conversion localement :

```bash
npm install
npm run images:convert
```

Les variantes sont générées dans `src/assets/optimized/`. Relancer cette commande après l'ajout ou le remplacement d'une image.
