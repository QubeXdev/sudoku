# Solveur de Sudoku

**Un projet de Adrien Gault TG3 pour maths spé**

Application web de résolution automatique de Sudoku utilisant l'algorithme de backtracking récursif.

## Fonctionnalités

- 🎯 Grille interactive 9x9 pour saisir les chiffres du Sudoku
- 🧠 Résolution automatique avec algorithme de backtracking
- ✨ Interface moderne et élégante
- 📱 Responsive et adaptable à tous les écrans
- 🎨 Distinction visuelle entre les chiffres initiaux et calculés
- 🔄 Possibilité de réinitialiser la grille
- 📋 Exemple de Sudoku pré-chargé

## Technologies utilisées

- **React 19** - Framework frontend
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Composants UI
- **Lucide React** - Icônes

## Installation locale

```bash
# Installer les dépendances
yarn install

# Lancer le serveur de développement
yarn start

# Builder pour la production
yarn build
```

## Déploiement sur Vercel

### Option 1 : Déploiement via l'interface Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez votre dépôt Git
4. Vercel détectera automatiquement qu'il s'agit d'une application React
5. Cliquez sur "Deploy"

### Option 2 : Déploiement via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel
```

### Configuration pour Vercel

Le fichier `vercel.json` est déjà configuré avec les paramètres optimaux :
- Build automatique avec `yarn build`
- Routage SPA (Single Page Application)
- Dossier de sortie : `build/`

## Algorithme

L'application utilise un **algorithme de backtracking récursif** pour résoudre le Sudoku :

1. Trouve la première case vide
2. Essaie tous les chiffres de 1 à 9
3. Vérifie si le chiffre respecte les règles du Sudoku
4. Si valide, passe à la case suivante (récursion)
5. Si aucun chiffre ne fonctionne, revient en arrière (backtrack)
6. Continue jusqu'à résolution complète

### Validation des contraintes

- ✅ Pas de doublon dans chaque ligne
- ✅ Pas de doublon dans chaque colonne  
- ✅ Pas de doublon dans chaque bloc 3x3

## Structure du projet

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # Composants Shadcn
│   │   └── SudokuGrid.jsx   # Grille de Sudoku
│   ├── pages/
│   │   └── SudokuSolver.jsx # Page principale
│   ├── utils/
│   │   └── sudokuSolver.js  # Algorithme de résolution
│   ├── App.js
│   └── index.js
├── public/
├── package.json
└── vercel.json
```

## Auteur

**Adrien Gault** - TG3  
Projet réalisé pour le cours de mathématiques spé

---

© 2025 - Adrien Gault TG3
