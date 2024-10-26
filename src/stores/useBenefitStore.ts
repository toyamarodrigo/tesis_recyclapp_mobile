import { create } from "zustand";
import { Benefit } from "@models/benefit.type";

type BenefitState = {
  currentBenefit: Benefit | null;
  setCurrentBenefit: (benefit: Benefit) => void;
  clearCurrentBenefit: () => void;
};

export const useBenefitStore = create<BenefitState>((set) => ({
  currentBenefit: null,
  setCurrentBenefit: (benefit) => set({ currentBenefit: benefit }),
  clearCurrentBenefit: () => set({ currentBenefit: null }),
}));
