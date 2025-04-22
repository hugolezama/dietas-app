import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Ingrediente } from "../../models/Ingrediente";
import { Menu } from "../../models/Menu";
import { MenuDieta } from "../../models/MenuDieta";
import { fetchIngredientes } from "../../services/ingredienteService";
import { getMenuDietaById, saveMenuDieta } from "../../services/menuDietaService";
import { getMenuById } from "../../services/menuService";

type MealType = "DESAYUNO" | "COMIDA" | "CENA";

const MenuDietaForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const menuDietaIdParam = searchParams.get("menuDietaId");
  const menuIdParam = searchParams.get("menuId");
  const [menu, setMenu] = useState<Menu>();
  const [menuDieta, setMenuDieta] = useState<MenuDieta>({
    menuDietaId: "",
    menuId: menuIdParam ?? "",
    tipoDieta: "",
    comidas: {
      DESAYUNO: { L: [] },
      COMIDA: { L: [] },
      CENA: { L: [] },
    },
  });
  const [availableIngredientes, setAvailableIngredientes] = useState<Ingrediente[]>([]);

  const navigate = useNavigate();

  // Cargar la lista de ingredientes disponibles
  useEffect(() => {
    fetchIngredientes().then(setAvailableIngredientes);
  }, []);

  // Si está en modo edición, cargar el menú usando el ID
  useEffect(() => {
    getMenuById(menuIdParam!).then((foundMenu) => {
      setMenu(foundMenu);
    });
    if (menuDietaIdParam) {
      getMenuDietaById(menuDietaIdParam).then((found) => {
        if (found) {
          setMenuDieta(found);
        }
      });
    }
  }, [menuDietaIdParam, menuIdParam]);

  // Manejo de cambios en campos simples (menuId y tipoDieta)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMenuDieta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Actualiza el array de ingredientes para un tipo de comida
  const handleMealIngredientChange = (mealType: MealType, index: number, value: string) => {
    setMenuDieta((prev) => {
      const updatedList = [...prev.comidas[mealType].L];
      updatedList[index] = value;
      return {
        ...prev,
        comidas: {
          ...prev.comidas,
          [mealType]: { L: updatedList },
        },
      };
    });
  };

  // Agrega un nuevo dropdown para un tipo de comida
  const handleAddMealIngredient = (mealType: MealType) => {
    setMenuDieta((prev) => ({
      ...prev,
      comidas: {
        ...prev.comidas,
        [mealType]: { L: [...prev.comidas[mealType].L, ""] },
      },
    }));
  };

  // Elimina un dropdown de ingredientes para un tipo de comida
  const handleRemoveMealIngredient = (mealType: MealType, index: number) => {
    setMenuDieta((prev) => {
      const updatedList = prev.comidas[mealType].L.filter((_, i) => i !== index);
      return {
        ...prev,
        comidas: {
          ...prev.comidas,
          [mealType]: { L: updatedList },
        },
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveMenuDieta(menuDieta);
    navigate("/menu-dieta?menuId=" + menuIdParam);
  };

  // Renderiza la sección para un tipo de comida (DESAYUNO, COMIDA, CENA) con dropdowns
  const renderMealSection = (mealType: MealType) => (
    <div className="mb-3">
      <div className="accordion" id={`accordionExample${mealType}`}>
        <div className="accordion-item">
          <h2 className="accordion-header" id={`headingOne${mealType}`}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${mealType}`}
              aria-expanded="true"
              aria-controls={`collapse${mealType}`}
            >
              {mealType}
            </button>
          </h2>
          <div
            id={`collapse${mealType}`}
            className="accordion-collapse collapse show"
            aria-labelledby={`collapse${mealType}`}
            data-bs-parent={`#accordionExample${mealType}`}
          >
            <div className="accordion-body">
              <label className="form-label">{mealType.charAt(0) + mealType.slice(1).toLowerCase()}</label>

              <span className="badge badge-success">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={() => handleAddMealIngredient(mealType)}
                >
                  +
                </button>
              </span>

              {menuDieta.comidas[mealType].L.map((ingredientId, index) => (
                <div key={`${ingredientId}-${index}`} className="input-group mb-2">
                  <select
                    className="form-select"
                    value={ingredientId} // Muestra el valor precargado
                    onChange={(e) => handleMealIngredientChange(mealType, index, e.target.value)}
                  >
                    <option value="">Seleccione un ingrediente</option>
                    {availableIngredientes.map((ing) => (
                      <option key={ing.ingredienteId} value={ing.ingredienteId}>
                        {ing.nombre}
                      </option>
                    ))}
                  </select>
                  <span className="badge badge-danger">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveMealIngredient(mealType, index)}
                    >
                      Borrar
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{menuDietaIdParam ? "Modificar Dieta" : "Crear Dieta"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="menuDietaId" value={menuDieta.menuDietaId} />
        <div className="mb-3">
          <input
            type="hidden"
            id="menuId"
            name="menuId"
            className="form-control"
            value={menuDieta.menuId}
            onChange={handleChange}
          />
          <label htmlFor="menuId" className="form-label">
            Menu
          </label>
          <input
            type="text"
            id="menuName"
            name="menuName"
            className="form-control"
            value={menu?.nombre}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tipoDieta" className="form-label">
            Tipo de Dieta
          </label>
          <input
            type="text"
            id="tipoDieta"
            name="tipoDieta"
            className="form-control"
            value={menuDieta.tipoDieta}
            onChange={handleChange}
          />
        </div>
        <h4>Ingredientes por Comida</h4>
        {renderMealSection("DESAYUNO")}
        {renderMealSection("COMIDA")}
        {renderMealSection("CENA")}
        <button type="submit" className="btn btn-primary me-2">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default MenuDietaForm;
