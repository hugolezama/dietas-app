import { MenuDieta } from "../models/MenuDieta";

// Datos dummy iniciales para MenuDietas
let menuDietas: MenuDieta[] = [
  {
    menuDietaId: "MENU-13-SABADO-BLANDA",
    menuId: "MENU-13-SABADO",
    tipoDieta: "BLANDA",
    comidas: {
      DESAYUNO: { L: ["atole_con_leche"] },
      COMIDA: { L: [] },
      CENA: { L: ["atole_sin_leche"] },
    },
  },
];

export const fetchMenuDietas = (menuId: string): Promise<MenuDieta[]> => {
  console.log(`Loading: ${menuId}`);
  return new Promise((resolve) => {
    setTimeout(() => resolve(menuDietas.filter((md) => md.menuId === menuId)), 500);
  });
};

/** Guarda (crea o actualiza) un menú de dieta */
export const saveMenuDieta = (menuDieta: MenuDieta): Promise<MenuDieta> => {
  return new Promise((resolve) => {
    const index = menuDietas.findIndex((m) => m.menuDietaId === menuDieta.menuDietaId);
    if (index > -1) {
      menuDietas[index] = menuDieta;
    } else {
      menuDietas.push(menuDieta);
    }
    setTimeout(() => resolve(menuDieta), 500);
  });
};

/** Elimina un menú de dieta */
export const deleteMenuDieta = (menuDietaId: string): Promise<void> => {
  return new Promise((resolve) => {
    menuDietas = menuDietas.filter((m) => m.menuDietaId !== menuDietaId);
    setTimeout(() => resolve(), 500);
  });
};

/** Obtiene un menú de dieta específico por su ID */
export const getMenuDietaById = (menuDietaId: string): Promise<MenuDieta | undefined> => {
  return new Promise((resolve) => {
    const menu = menuDietas.find((m) => m.menuDietaId === menuDietaId);
    setTimeout(() => resolve(menu), 500);
  });
};
