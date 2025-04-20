import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../SS.png";

const NavigationBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Bootstrap" width="100" height="45" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            {/* Menu */}
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="menuDropdown"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Menus
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="menuDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/menus">
                    Lista de Menus
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/menus/form">
                    Crear/Modificar Menu
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* Ingrediente */}
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="ingredienteDropdown"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Ingredientes
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="ingredienteDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/ingredientes">
                    Lista de Ingredientes
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/ingredientes/form">
                    Crear/Modificar Ingrediente
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* Alimento */}
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="alimentoDropdown"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Alimentos
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="alimentoDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/alimentos">
                    Lista de Alimentos
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/alimentos/form">
                    Crear/Modificar Alimento
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
