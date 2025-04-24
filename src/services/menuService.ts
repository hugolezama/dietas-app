import { DIETAS } from "../dietas";
import { Cantidades } from "../models/Cantidades";
import { DietCount } from "../models/DietCount";
import { Menu } from "../models/Menu";
import { fetchAlimentos } from "./alimentoService";
import { dynamoDBService } from "./dynamoDBService";
import { fetchIngredientes } from "./ingredienteService";
import { fetchMenuDietas } from "./menuDietaService";

export const fetchMenus = async (): Promise<Menu[]> => {
  const items = await dynamoDBService.scanTable("Menu");
  return items as Menu[];
};

export const saveMenu = async (menu: Menu): Promise<Menu> => {
  if (!menu.menuId) {
    menu.menuId = menu.nombre
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "");
  }
  await dynamoDBService.putItem("Menu", menu);
  return menu;
};

export const deleteMenu = async (menuId: string): Promise<void> => {
  await dynamoDBService.deleteItem("Menu", { menuId });
};

/** Obtiene un menú de  específico por su ID */
export const getMenuById = async (menuId: string): Promise<Menu> => {
  const item = await dynamoDBService.getItem("Menu", { menuId });
  return item as Menu;
};

export const calcuateQuantities = async (dietCount: DietCount): Promise<Cantidades> => {
  console.log("Calculando cantidades para el menú", dietCount);
  const menuDietas = await fetchMenuDietas(dietCount.menuId);
  const alimentos = await fetchAlimentos();
  const ingredientes = await fetchIngredientes();
  const dietas = DIETAS;

  let cantidades: Cantidades = {};
  Object.keys(dietCount).forEach((key) => {
    const value = dietCount[key as keyof DietCount];

    if (key !== "menuId" && key !== "pabellon" && typeof value === "number" && value > 0) {
      const dieta = menuDietas.find((d) => d.tipoDieta === dietas.find((d) => d.field === key)?.name);
      if (dieta) {
        const comidas = dieta.comidas;
        Object.keys(comidas).forEach((comidaKey) => {
          const comida = comidas[comidaKey];
          comida.L.forEach((ingredienteId) => {
            const ingrediente = ingredientes.find((i) => i.ingredienteId === ingredienteId);
            const alimento = alimentos.find((a) => a.alimentoId === ingrediente?.alimentoId);
            if (alimento) {
              console.log(
                `Cantidad de ${alimento.nombre} para ${key} (${comidaKey}): ${ingrediente?.cantidad} * ${value}`
              );
              cantidades[alimento.alimentoId] = {
                alimento: alimento.nombre,
                unidad: alimento.unidad,
                cantidad:
                  (cantidades[alimento.alimentoId]?.cantidad || 0) +
                  (ingrediente?.cantidad ? ingrediente.cantidad * value : 0),
              };
            }
          });
        });
      }
    }
  });

  console.log("Cantidades calculadas:", cantidades);
  return cantidades;
};
