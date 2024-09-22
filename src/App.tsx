// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Prueba from './pages/Prueba'; // O la ruta donde esté tu componente de Login
import Home from './pages/Home';  // Ejemplo de otra página

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Prueba/>} />
        <Route path="/home" element={<Home />} />
        {/* Añade otras rutas según las páginas que tengas */}
      </Routes>
    </Router>
  );
};

export default App;
