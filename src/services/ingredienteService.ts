import { ingredientesBase } from "../Ingrediente";
import { Ingrediente } from "../models/Ingrediente";

// Datos dummy iniciales para Ingredientes
let ingredientes: Ingrediente[] = ingredientesBase;

/**
 * Simula la obtención de la lista de Ingredientes.
 */
export const fetchIngredientes = (): Promise<Ingrediente[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ingredientes), 500);
  });
};

/**
 * Simula el guardado (crear o actualizar) de un Ingrediente.
 * Si el ingrediente ya existe (basado en ingredienteId), se actualiza; de lo contrario se agrega.
 */
export const saveIngrediente = (ingrediente: Ingrediente): Promise<Ingrediente> => {
  return new Promise((resolve) => {
    const index = ingredientes.findIndex((i) => i.ingredienteId === ingrediente.ingredienteId);
    if (index > -1) {
      // Actualiza el ingrediente existente.
      ingredientes[index] = ingrediente;
    } else {
      // Agrega un nuevo ingrediente.
      ingredientes.push(ingrediente);
    }
    setTimeout(() => resolve(ingrediente), 500);
  });
};

export const deleteIngrediente = (ingredienteId: string): Promise<void> => {
  return new Promise((resolve) => {
    ingredientes = ingredientes.filter((a) => a.ingredienteId !== ingredienteId);
    setTimeout(() => resolve(), 500);
  });
};
