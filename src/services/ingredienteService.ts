import { Ingrediente } from "../models/Ingrediente";
import { dynamoDBService } from "./dynamoDBService";

export const fetchIngredientes = async (): Promise<Ingrediente[]> => {
  const items = await dynamoDBService.scanTable("Ingrediente");
  return items as Ingrediente[];
};

export const saveIngrediente = async (ingrediente: Ingrediente): Promise<Ingrediente> => {
  if (!ingrediente.ingredienteId) {
    ingrediente.ingredienteId = ingrediente.nombre
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "");
  }
  await dynamoDBService.putItem("Ingrediente", ingrediente);
  return ingrediente;
};

export const deleteIngrediente = async (ingredienteId: string): Promise<void> => {
  await dynamoDBService.deleteItem("Ingrediente", { ingredienteId });
};
