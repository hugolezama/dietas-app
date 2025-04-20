import { alimentosBase } from "../Alimentos";
import { Alimento } from "../models/Alimento";
import { DynamoDBService } from "./dynamoDBService";

let alimentos: Alimento[] = alimentosBase;

export const fetchAlimentos = async (): Promise<Alimento[]> => {
  const dynamoDBService: DynamoDBService = new DynamoDBService();
  const atole_con_leche = await dynamoDBService.getItem("Alimento", { alimentoId: "atole_con_leche" });
  console.log(atole_con_leche);
  return new Promise((resolve) => {
    setTimeout(() => resolve(alimentos), 500);
  });
};

export const saveAlimento = (alimento: Alimento): Promise<Alimento> => {
  return new Promise((resolve) => {
    // Si existe, actualizar; en caso contrario, agregar
    const index = alimentos.findIndex((a) => a.alimentoId === alimento.alimentoId);
    if (index > -1) {
      alimentos[index] = alimento;
    } else {
      alimentos.push(alimento);
    }
    setTimeout(() => resolve(alimento), 500);
  });
};

export const deleteAlimento = (alimentoId: string): Promise<void> => {
  return new Promise((resolve) => {
    alimentos = alimentos.filter((a) => a.alimentoId !== alimentoId);
    setTimeout(() => resolve(), 500);
  });
};
