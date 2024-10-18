export interface Material {
  id: string;
  name: string;
  description: string;
  howToRecycle: string;
}

export const materials: Material[] = [
  {
    id: "paper",
    name: "Papel y cartón",
    description: "Incluye periódicos, revistas, cajas, y envases de cartón.",
    howToRecycle: "Separa el papel y cartón limpio y seco. Aplasta las cajas para ahorrar espacio. Evita papel con restos de comida o aceite."
  },
  {
    id: "plastic",
    name: "Plásticos",
    description: "Incluye botellas, envases, bolsas y otros productos plásticos.",
    howToRecycle: "Enjuaga los envases para eliminar residuos. Aplasta las botellas para ahorrar espacio. Verifica los códigos de reciclaje en la base."
  },
  {
    id: "glass",
    name: "Vidrio",
    description: "Incluye botellas, frascos y otros envases de vidrio.",
    howToRecycle: "Enjuaga los envases de vidrio. Retira tapas y etiquetas si es posible. No es necesario quitar etiquetas adheridas. Evita vidrios rotos."
  },
  {
    id: "metal",
    name: "Metales",
    description: "Incluye latas de aluminio, acero y otros metales reciclables.",
    howToRecycle: "Enjuaga las latas para eliminar residuos. Aplasta las latas de aluminio para ahorrar espacio. Separa tapas metálicas de otros envases."
  },
];

export const materialColors = {
  paper: "#4CAF50",
  plastic: "#2196F3",
  metal: "#FF9800",
  glass: "#9C27B0",
};
