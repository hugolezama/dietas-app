import { Menu } from "../models/Menu";
import { dynamoDBService } from "./dynamoDBService";

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
