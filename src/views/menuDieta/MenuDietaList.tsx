import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Ingrediente } from "../../models/Ingrediente";
import { Menu } from "../../models/Menu";
import { MenuDieta } from "../../models/MenuDieta";
import { fetchIngredientes } from "../../services/ingredienteService";
import { deleteMenuDieta, fetchMenuDietas } from "../../services/menuDietaService";
import { fetchMenus } from "../../services/menuService";

const MenuDietaList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const menuIdParam = searchParams.get("menuId");
  const [menuDietas, setMenuDietas] = useState<MenuDieta[]>([]);
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);

  const loadIngredientes = async () => {
    const data = await fetchIngredientes();
    setIngredientes(data);
  };

  const loadMenus = async () => {
    const data = await fetchMenus();
    setMenus(data);
  };

  const loadMenuDietas = React.useCallback(async () => {
    const data = await fetchMenuDietas(menuIdParam ?? "");
    setMenuDietas(data);
  }, [menuIdParam]);

  useEffect(() => {
    loadMenuDietas();
    loadIngredientes();
    loadMenus();
  }, [loadMenuDietas]);

  const handleDelete = async (menuDietaId: string) => {
    if (window.confirm("¿Estás seguro de eliminar este MenuDieta?")) {
      await deleteMenuDieta(menuDietaId);
      setMenuDietas((prev) => prev.filter((m) => m.menuDietaId !== menuDietaId));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        Lista de Dietas - {menus.find((menu) => menu.menuId === menuIdParam)?.nombre ?? "Menu"}
        <span className="badge badge-success">
          <Link to={`/menu-dieta/form?menuId=${menuIdParam}`} className="btn btn-sm btn-success">
            + Agregar
          </Link>
        </span>
      </h2>

      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>Tipo de Dieta</th>
            <th>Desayuno</th>
            <th>Comida</th>
            <th>Cena</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {menuDietas.map((menu) => {
            return (
              <tr key={menu.menuDietaId}>
                <td>{menu.tipoDieta}</td>
                <td>
                  {menu.comidas.DESAYUNO?.L?.length > 0 ? (
                    <ul style={{ paddingLeft: 0 }}>
                      {menu.comidas.DESAYUNO.L.map((item) => (
                        <li key={item}>
                          {ingredientes.find((ingrediente) => ingrediente.ingredienteId === item)?.nombre ??
                            item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>(Vacio)</div>
                  )}
                </td>
                <td>
                  {menu.comidas.COMIDA?.L?.length > 0 ? (
                    <ul style={{ paddingLeft: 0 }}>
                      {menu.comidas.COMIDA.L.map((item) => (
                        <li key={item}>
                          {ingredientes.find((ingrediente) => ingrediente.ingredienteId === item)?.nombre ??
                            item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>(Vacio)</div>
                  )}
                </td>
                <td>
                  {menu.comidas.CENA?.L?.length > 0 ? (
                    <ul style={{ paddingLeft: 0 }}>
                      {menu.comidas.CENA.L.map((item) => (
                        <li key={item}>
                          {ingredientes.find((ingrediente) => ingrediente.ingredienteId === item)?.nombre ??
                            item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>(Vacio)</div>
                  )}
                </td>
                <td>
                  <Link
                    to={`/menu-dieta/form?menuDietaId=${menu.menuDietaId}&&menuId=${menu.menuId}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Editar
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(menu.menuDietaId)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MenuDietaList;
