import { create } from 'zustand';
import { materials } from '../models/materials';

interface SelectedMaterialState {
  selectedMaterial: string;
  setSelectedMaterial: (material: string) => void;
}

export const useSelectedMaterialStore = create<SelectedMaterialState>((set) => ({
  selectedMaterial: materials[0].name,
  setSelectedMaterial: (material) => set({ selectedMaterial: material }),
}));
