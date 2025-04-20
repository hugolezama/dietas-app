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
      alert("Menu eliminado");
    }
  };

  useEffect(() => {
    loadMenus();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Menus</h2>
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
              <td>{menu.nombre}</td>
              <td>
                <Link to={`/menu-dieta?menuId=${menu.menuId}`} className="btn btn-sm btn-primary me-2">
                  Dietas
                </Link>
              </td>
              <td>
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
