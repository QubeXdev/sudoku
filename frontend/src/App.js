import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SudokuSolver from './pages/SudokuSolver';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SudokuSolver />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;