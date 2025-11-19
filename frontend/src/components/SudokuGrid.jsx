import React from 'react';

const SudokuGrid = ({ grid, initialGrid, onChange, disabled }) => {
  const handleInputChange = (row, col, e) => {
    const value = e.target.value;
    if (value === '' || (/^[1-9]$/.test(value) && value.length === 1)) {
      onChange(row, col, value);
    }
  };

  const getCellClassName = (row, col) => {
    const baseClasses = "w-full h-full text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 transition-all duration-300";
    
    // Different styling for initial vs solved cells
    const isInitial = initialGrid[row][col] !== '';
    const isFilled = grid[row][col] !== '';
    
    let bgClasses = "bg-white";
    let textClasses = "text-slate-700";
    let animationClasses = "";
    
    if (isInitial) {
      bgClasses = "bg-blue-50";
      textClasses = "text-blue-900 font-bold";
    } else if (isFilled) {
      // Animation stylée pour les cellules remplies par l'algo
      bgClasses = "bg-gradient-to-br from-cyan-50 to-blue-50";
      textClasses = "text-cyan-700 font-semibold";
      animationClasses = "animate-pulse-once";
    }
    
    const hoverClasses = disabled ? "" : "hover:bg-blue-100 hover:scale-105";
    
    return `${baseClasses} ${bgClasses} ${textClasses} ${animationClasses} ${hoverClasses}`;
  };

  const getBorderClasses = (row, col) => {
    let classes = "border border-slate-300";
    
    // Thicker borders for 3x3 blocks
    if (row % 3 === 0) classes += " border-t-2 border-t-slate-600";
    if (col % 3 === 0) classes += " border-l-2 border-l-slate-600";
    if (row === 8) classes += " border-b-2 border-b-slate-600";
    if (col === 8) classes += " border-r-2 border-r-slate-600";
    
    return classes;
  };

  return (
    <div className="inline-block mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-4 border-4 border-slate-700">
        <div className="grid grid-cols-9 gap-0" style={{ width: 'min(500px, 90vw)', height: 'min(500px, 90vw)' }}>
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`relative ${getBorderClasses(rowIndex, colIndex)}`}
              >
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={cell}
                  onChange={(e) => handleInputChange(rowIndex, colIndex, e)}
                  disabled={disabled}
                  className={getCellClassName(rowIndex, colIndex)}
                  style={{ fontSize: 'clamp(16px, 3vw, 24px)' }}
                />
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default SudokuGrid;