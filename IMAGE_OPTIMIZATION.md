Optimisation des images

Le script compresse et convertit les images du dossier `src/assets` et de `src/assets/technologies` en variantes WebP redimensionnées à 800 px maximum. Les variantes des technologies sont générées dans `src/assets/optimized/technologies/` et utilisées par le CV. Le composant `Projets` utilise aussi les variantes optimisées à la racine de `src/assets/optimized/`.

Pour exécuter la conversion localement :

```bash
npm install
npm run images:convert
```

Les variantes sont générées dans `src/assets/optimized/`. Les images originales sont conservées. Relancer cette commande après l'ajout ou le remplacement d'une image.
