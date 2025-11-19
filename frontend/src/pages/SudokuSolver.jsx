import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Brain, RotateCcw, Sparkles, Grid3x3 } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import SudokuGrid from '../components/SudokuGrid';
import { solveSudoku, isValidSudoku } from '../utils/sudokuSolver';

const SudokuSolver = () => {
  const [grid, setGrid] = useState(Array(9).fill(null).map(() => Array(9).fill('')));
  const [initialGrid, setInitialGrid] = useState(Array(9).fill(null).map(() => Array(9).fill('')));
  const [solving, setSolving] = useState(false);

  const handleCellChange = (row, col, value) => {
    if (value === '' || (/^[1-9]$/.test(value) && value.length === 1)) {
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = value;
      setGrid(newGrid);
      
      const newInitialGrid = initialGrid.map(r => [...r]);
      newInitialGrid[row][col] = value;
      setInitialGrid(newInitialGrid);
    }
  };

  const handleSolve = async () => {
    if (!isValidSudoku(grid)) {
      toast({
        title: "Grille invalide",
        description: "La grille contient des erreurs. Vérifiez les chiffres.",
        variant: "destructive"
      });
      return;
    }

    setSolving(true);
    
    // Clone the grid
    const gridCopy = grid.map(row => [...row]);
    
    // Solve with animation
    const solved = await solveSudoku(gridCopy, (updatedGrid) => {
      setGrid(updatedGrid.map(row => [...row]));
    });

    if (solved) {
      toast({
        title: "✓ Sudoku résolu !",
        description: "La solution a été trouvée avec succès."
      });
    } else {
      toast({
        title: "Impossible à résoudre",
        description: "Aucune solution n'existe pour cette grille.",
        variant: "destructive"
      });
    }
    
    setSolving(false);
  };

  const handleReset = () => {
    setGrid(Array(9).fill(null).map(() => Array(9).fill('')));
    setInitialGrid(Array(9).fill(null).map(() => Array(9).fill('')));
    toast({
      title: "Grille réinitialisée",
      description: "Vous pouvez saisir une nouvelle grille."
    });
  };

  const loadExample = () => {
    // Collection de plusieurs exemples de Sudoku
    const examples = [
      [
        ['5', '3', '', '', '7', '', '', '', ''],
        ['6', '', '', '1', '9', '5', '', '', ''],
        ['', '9', '8', '', '', '', '', '6', ''],
        ['8', '', '', '', '6', '', '', '', '3'],
        ['4', '', '', '8', '', '3', '', '', '1'],
        ['7', '', '', '', '2', '', '', '', '6'],
        ['', '6', '', '', '', '', '2', '8', ''],
        ['', '', '', '4', '1', '9', '', '', '5'],
        ['', '', '', '', '8', '', '', '7', '9']
      ],
      [
        ['', '', '9', '7', '4', '8', '', '', ''],
        ['7', '', '', '', '', '', '', '', ''],
        ['', '2', '', '1', '', '9', '', '', ''],
        ['', '', '7', '', '', '', '2', '4', ''],
        ['', '6', '4', '', '1', '', '5', '9', ''],
        ['', '9', '8', '', '', '', '3', '', ''],
        ['', '', '', '8', '', '3', '', '2', ''],
        ['', '', '', '', '', '', '', '', '6'],
        ['', '', '', '2', '7', '5', '9', '', '']
      ],
      [
        ['', '', '', '2', '6', '', '7', '', '1'],
        ['6', '8', '', '', '7', '', '', '9', ''],
        ['1', '9', '', '', '', '4', '5', '', ''],
        ['8', '2', '', '1', '', '', '', '4', ''],
        ['', '', '4', '6', '', '2', '9', '', ''],
        ['', '5', '', '', '', '3', '', '2', '8'],
        ['', '', '9', '3', '', '', '', '7', '4'],
        ['', '4', '', '', '5', '', '', '3', '6'],
        ['7', '', '3', '', '1', '8', '', '', '']
      ],
      [
        ['', '2', '', '', '', '', '', '', ''],
        ['', '', '', '6', '', '', '', '', '3'],
        ['', '7', '4', '', '8', '', '', '', ''],
        ['', '', '', '', '', '3', '', '', '2'],
        ['', '8', '', '', '4', '', '', '1', ''],
        ['6', '', '', '5', '', '', '', '', ''],
        ['', '', '', '', '1', '', '7', '8', ''],
        ['5', '', '', '', '', '9', '', '', ''],
        ['', '', '', '', '', '', '', '4', '']
      ],
      [
        ['', '', '', '6', '', '', '4', '', ''],
        ['7', '', '', '', '', '3', '6', '', ''],
        ['', '', '', '', '9', '1', '', '8', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '5', '', '1', '8', '', '', '', '3'],
        ['', '', '', '3', '', '6', '', '4', '5'],
        ['', '4', '', '2', '', '', '', '6', ''],
        ['9', '', '3', '', '', '', '', '', ''],
        ['', '2', '', '', '', '', '1', '', '']
      ]
    ];
    
    // Choisir un exemple aléatoire
    const randomIndex = Math.floor(Math.random() * examples.length);
    const example = examples[randomIndex];
    
    setGrid(example.map(row => [...row]));
    setInitialGrid(example.map(row => [...row]));
    toast({
      title: "Exemple chargé",
      description: `Sudoku aléatoire #${randomIndex + 1} chargé !`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-slideDown">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Grid3x3 className="w-12 h-12 text-blue-600" strokeWidth={2.5} />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent">
              Solveur de Sudoku
            </h1>
          </div>
          <p className="text-lg text-slate-600 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-500" />
            Résolution automatique avec algorithme de backtracking
          </p>
          <p className="text-sm text-slate-500 italic">
            Un projet de Adrien Gault TG3 pour maths spé
          </p>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 p-8 md:p-12 animate-fadeIn">
            {/* Instructions */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
              <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-600" />
                Comment utiliser ?
              </h2>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">1.</span>
                  <span>Entrez les chiffres connus du Sudoku dans les cases (1-9)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">2.</span>
                  <span>Cliquez sur "Résoudre" pour obtenir la solution automatiquement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">3.</span>
                  <span>Ou résolvez-le manuellement en remplissant les cases vous-même</span>
                </li>
              </ul>
            </div>

            {/* Sudoku Grid */}
            <SudokuGrid 
              grid={grid} 
              initialGrid={initialGrid}
              onChange={handleCellChange}
              disabled={solving}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                onClick={handleSolve}
                disabled={solving}
                className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {solving ? (
                  <>
                    <Brain className="w-5 h-5 mr-2 animate-pulse" />
                    Résolution en cours...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Résoudre automatiquement
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleReset}
                variant="outline"
                disabled={solving}
                className="flex-1 h-14 text-lg font-semibold border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 hover:scale-105"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Réinitialiser
              </Button>

              <Button
                onClick={loadExample}
                variant="outline"
                disabled={solving}
                className="flex-1 h-14 text-lg font-semibold border-2 border-indigo-300 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-700 transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Charger exemple
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-slate-500">
            <p className="mb-2">Algorithme: Backtracking récursif avec validation des contraintes</p>
            <p className="font-medium text-slate-700">© 2025 - Adrien Gault TG3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SudokuSolver;