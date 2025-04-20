import { Menu } from "../models/Menu";

// Datos dummy iniciales para Menus
let menus: Menu[] = [
  {
    menuId: "MENU-13-SABADO",
    nombre: "Menu 13 Sabado",
  },
];

export const fetchMenus = (): Promise<Menu[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(menus), 500);
  });
};

/** Guarda (crea o actualiza) un menú de  */
export const saveMenu = (menu: Menu): Promise<Menu> => {
  return new Promise((resolve) => {
    const index = menus.findIndex((m) => m.menuId === menu.menuId);
    if (index > -1) {
      menus[index] = menu;
    } else {
      menus.push(menu);
    }
    setTimeout(() => resolve(menu), 500);
  });
};

/** Elimina un menú */
export const deleteMenu = (menuId: string): Promise<void> => {
  return new Promise((resolve) => {
    menus = menus.filter((m) => m.menuId !== menuId);
    setTimeout(() => resolve(), 500);
  });
};

/** Obtiene un menú de  específico por su ID */
export const getMenuById = (menuId: string): Promise<Menu | undefined> => {
  return new Promise((resolve) => {
    const menu = menus.find((m) => m.menuId === menuId);
    setTimeout(() => resolve(menu), 500);
  });
};
