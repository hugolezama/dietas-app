export interface MenuDieta {
  menuDietaId: string; // Ej: "MENU-13-SABADO-BLANDA"
  comidas: {
    // Se modela como un objeto dinámico con claves (ej: DESAYUNO, COMIDA, CENA) y un array de IDs de alimento
    [key: string]: {
      L: string[];
    };
  };
  menuId: string; // Ej: "MENU-13-SABADO"
  tipoDieta: string; // Ej: "BLANDA"
}
