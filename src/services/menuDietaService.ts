import { MenuDieta } from "../models/MenuDieta";
import { dynamoDBService } from "./dynamoDBService";

export const fetchMenuDietas = async (menuId: string): Promise<MenuDieta[]> => {
  const params = {
    indexName: "menuId-index",
    keyConditionExpression: "menuId = :menuId",
    expressionAttributeValues: { ":menuId": menuId },
  };
  const items = await dynamoDBService.query("MenuDieta", params);
  return items as MenuDieta[];
};

export const saveMenuDieta = async (menuDieta: MenuDieta): Promise<MenuDieta> => {
  if (!menuDieta.menuDietaId) {
    menuDieta.menuDietaId =
      menuDieta.menuId +
      "_" +
      menuDieta.tipoDieta
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_]/g, "");
  }
  await dynamoDBService.putItem("MenuDieta", menuDieta);
  return menuDieta;
};

export const deleteMenuDieta = async (menuDietaId: string): Promise<void> => {
  await dynamoDBService.deleteItem("MenuDieta", { menuDietaId });
};

export const getMenuDietaById = async (menuDietaId: string): Promise<MenuDieta | undefined> => {
  const item = await dynamoDBService.getItem("MenuDieta", { menuDietaId });
  return item as MenuDieta;
};
