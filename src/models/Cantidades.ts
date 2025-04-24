export interface Cantidad {
  alimento: string;
  unidad: string;
  cantidad: number;
}

export interface Cantidades {
  [key: string]: Cantidad;
}
