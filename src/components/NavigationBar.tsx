import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../SS.png";

const NavigationBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Bootstrap" width="120" height="55" />
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
            <li className="nav-item">
              <NavLink className="nav-link" to="/menus">
                Menus
              </NavLink>
            </li>
            {/* Ingrediente */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/ingredientes">
                Ingredientes
              </NavLink>
            </li>
            {/* Alimento */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/alimentos">
                Alimentos
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
