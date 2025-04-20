import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

// Vistas para Alimento
import AlimentoForm from "./views/alimento/AlimentoForm";
import AlimentoList from "./views/alimento/AlimentoList";

// Vistas para Ingrediente
import IngredienteForm from "./views/ingrediente/IngredienteForm";
import IngredienteList from "./views/ingrediente/IngredienteList";

// Vistas para MenuDieta
import MenuDietaForm from "./views/menuDieta/MenuDietaForm";
import MenuDietaList from "./views/menuDieta/MenuDietaList";

import MenuForm from "./views/menu/MenuForm";
import MenuList from "./views/menu/MenuList";

// Vistas para Menu

const App: React.FC = () => {
  return (
    <Router>
      <NavigationBar />
      <div className="main-content">
        <Routes>
          {/* Rutas para Alimento */}
          <Route path="/alimentos" element={<AlimentoList />} />
          <Route path="/alimentos/form" element={<AlimentoForm />} />

          {/* Rutas para Ingrediente */}
          <Route path="/ingredientes" element={<IngredienteList />} />
          <Route path="/ingredientes/form" element={<IngredienteForm />} />

          {/* Rutas para MenuDieta */}
          <Route path="/menu-dieta" element={<MenuDietaList />} />
          <Route path="/menu-dieta/form" element={<MenuDietaForm />} />

          <Route path="/menus" element={<MenuList />} />
          <Route path="/menus/form" element={<MenuForm />} />

          {/* Ruta por defecto */}
          <Route path="/" element={<Navigate to="/alimentos" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
