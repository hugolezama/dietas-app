import { Alimento } from "../models/Alimento";
import { dynamoDBService } from "./dynamoDBService";

export const fetchAlimentos = async (): Promise<Alimento[]> => {
  const items = await dynamoDBService.scanTable("Alimento");
  return items as Alimento[];
};

export const saveAlimento = async (alimento: Alimento): Promise<Alimento> => {
  if (!alimento.alimentoId) {
    alimento.alimentoId = alimento.nombre
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "");
  }
  await dynamoDBService.putItem("Alimento", alimento);
  return alimento;
};

export const deleteAlimento = async (alimentoId: string): Promise<void> => {
  await dynamoDBService.deleteItem("Alimento", { alimentoId });
};
