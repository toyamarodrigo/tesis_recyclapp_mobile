import { create } from "zustand";
import { Benefit } from "@models/benefit.type";

type BenefitState = {
  benefitList: Benefit[] | undefined;
  currentBenefit: Benefit | null;
  setCurrentBenefit: (benefit: Benefit) => void;
  clearCurrentBenefit: () => void;
  initializeBenefitList: (benefits: Benefit[]) => void;
};

export const useBenefitStore = create<BenefitState>((set) => ({
  benefitList: undefined,
  currentBenefit: null,
  setCurrentBenefit: (benefit) => set({ currentBenefit: benefit }),
  clearCurrentBenefit: () => set({ currentBenefit: null }),
  initializeBenefitList: (benefits) =>
    set({ benefitList: benefits, currentBenefit: null }),
}));
