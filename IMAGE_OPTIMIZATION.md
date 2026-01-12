Optimisation des images

Un script a été ajouté pour compresser et convertir les images du dossier `src/assets` en variantes WebP et PNG redimensionnées, ainsi qu'un manifeste JSON utilisé par le composant `Projets` pour servir des `srcset`.

Pour exécuter la conversion localement :

```bash
npm install
npm run images:convert
```

Le manifeste est écrit dans `src/assets/optimized/manifest.json` et le script génère les variantes WebP et PNG dans `src/assets/optimized/`.
