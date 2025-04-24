import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "../../models/Menu";
import { deleteMenu, fetchMenus } from "../../services/menuService";

const MenuList: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  const loadMenus = async () => {
    const data = await fetchMenus();
    setMenus(data);
  };

  const handleDelete = async (menuId: string) => {
    if (window.confirm("¿Estás seguro de eliminar este Menu?")) {
      await deleteMenu(menuId);
      setMenus((prev) => prev.filter((m) => m.menuId !== menuId));
    }
  };

  useEffect(() => {
    loadMenus();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        Lista de Menus{" "}
        <span className="badge badge-success">
          <Link to={`/menus/form`} className="btn btn-sm btn-success">
            + Agregar
          </Link>
        </span>
      </h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Menu</th>
            <th>Dietas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.menuId}>
              <td style={{ minWidth: "175px" }}>{menu.nombre}</td>
              <td>
                <Link to={`/menu-dieta?menuId=${menu.menuId}`} className="btn btn-sm btn-primary me-2">
                  Dietas
                </Link>
              </td>
              <td style={{ minWidth: "250px" }}>
                <Link to={`/menus/calculate?menuId=${menu.menuId}`} className="btn btn-sm btn-success me-2">
                  Calcular
                </Link>
                <Link to={`/menus/form?menuId=${menu.menuId}`} className="btn btn-sm btn-primary me-2">
                  Editar
                </Link>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(menu.menuId)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuList;
