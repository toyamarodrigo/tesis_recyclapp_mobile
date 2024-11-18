import { create } from "zustand";

interface SelectedMaterialState {
  selectedMaterial: string;
  setSelectedMaterial: (material: string) => void;
}

export const useSelectedMaterialStore = create<SelectedMaterialState>(
  (set) => ({
    selectedMaterial: "paper",
    setSelectedMaterial: (material) => set({ selectedMaterial: material }),
  })
);
