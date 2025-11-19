// Vérifie si un chiffre peut être placé à une position donnée
const isValid = (grid, row, col, num) => {
  // Vérifier la ligne
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }

  // Vérifier la colonne
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false;
  }

  // Vérifier le bloc 3x3
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false;
    }
  }

  return true;
};

// Trouve la prochaine case vide
const findEmptyCell = (grid) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === '') return [row, col];
    }
  }
  return null;
};

// Algorithme de backtracking avec animation
let animationCounter = 0;
const solveWithAnimation = async (grid, onUpdate, delay = 0) => {
  const emptyCell = findEmptyCell(grid);
  
  if (!emptyCell) {
    // Mise à jour finale
    if (onUpdate) {
      onUpdate(grid);
    }
    return true; // Sudoku résolu
  }

  const [row, col] = emptyCell;

  for (let num = 1; num <= 9; num++) {
    const numStr = num.toString();
    
    if (isValid(grid, row, col, numStr)) {
      grid[row][col] = numStr;
      
      // Mise à jour visuelle avec animation toutes les 2 cases pour plus de fluidité
      animationCounter++;
      if (onUpdate && animationCounter % 2 === 0) {
        onUpdate(grid);
        if (delay > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }

      if (await solveWithAnimation(grid, onUpdate, delay)) {
        return true;
      }

      // Backtrack (pas d'animation pour le backtrack)
      grid[row][col] = '';
    }
  }

  return false;
};

// Fonction principale pour résoudre le Sudoku
export const solveSudoku = async (grid, onUpdate) => {
  animationCounter = 0; // Reset counter
  
  // Résoudre avec animation (délai de 1ms pour animation rapide et fluide)
  const solved = await solveWithAnimation(grid, onUpdate, 1);
  
  // Mise à jour finale pour s'assurer que tout est affiché
  if (solved && onUpdate) {
    onUpdate(grid);
  }
  
  return solved;
};

// Vérifie si la grille initiale est valide
export const isValidSudoku = (grid) => {
  // Vérifier chaque ligne
  for (let row = 0; row < 9; row++) {
    const seen = new Set();
    for (let col = 0; col < 9; col++) {
      const cell = grid[row][col];
      if (cell !== '') {
        if (seen.has(cell)) return false;
        seen.add(cell);
      }
    }
  }

  // Vérifier chaque colonne
  for (let col = 0; col < 9; col++) {
    const seen = new Set();
    for (let row = 0; row < 9; row++) {
      const cell = grid[row][col];
      if (cell !== '') {
        if (seen.has(cell)) return false;
        seen.add(cell);
      }
    }
  }

  // Vérifier chaque bloc 3x3
  for (let blockRow = 0; blockRow < 3; blockRow++) {
    for (let blockCol = 0; blockCol < 3; blockCol++) {
      const seen = new Set();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const cell = grid[blockRow * 3 + i][blockCol * 3 + j];
          if (cell !== '') {
            if (seen.has(cell)) return false;
            seen.add(cell);
          }
        }
      }
    }
  }

  return true;
};