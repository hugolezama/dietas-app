import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Menu } from "../../models/Menu";
import { fetchMenus, saveMenu } from "../../services/menuService";

const MenuForm: React.FC = () => {
  const [menu, setMenu] = useState<Menu>({
    menuId: "",
    nombre: "",
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const menuIdParam = searchParams.get("menuId");

  useEffect(() => {
    if (menuIdParam) {
      // Se carga el menu para editar
      fetchMenus().then((menus) => {
        const found = menus.find((a) => a.menuId === menuIdParam);
        if (found) {
          setMenu(found);
        }
      });
    }
  }, [menuIdParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMenu((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveMenu(menu);
    alert("Menu guardado");
    navigate("/menus");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{menuIdParam ? "Modificar Menu" : "Crear Menu"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="hidden"
            id="menuId"
            name="menuId"
            className="form-control"
            value={menu.menuId}
            onChange={handleChange}
            // En edición, normalmente se evita modificar el ID; se puede bloquear con 'readOnly'
            readOnly={!!menuIdParam}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            value={menu.nombre}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default MenuForm;
