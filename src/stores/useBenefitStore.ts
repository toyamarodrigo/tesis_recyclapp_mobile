import { create } from "zustand";
import { Benefit } from "@models/benefit.type";
import { BenefitAssignment } from "@models/benefitAssignment.type";

type BenefitState = {
  currentBenefit: Benefit | null;
  setCurrentBenefit: (benefit: Benefit) => void;
  clearCurrentBenefit: () => void;
  currentBenefitCustomer: BenefitAssignment | null;
  setCurrentBenefitCustomer: (benefit: BenefitAssignment) => void;
  clearCurrentBenefitCustomer: () => void;
};

export const useBenefitStore = create<BenefitState>((set) => ({
  currentBenefit: null,
  setCurrentBenefit: (benefit) => set({ currentBenefit: benefit }),
  clearCurrentBenefit: () => set({ currentBenefit: null }),
  currentBenefitCustomer: null,
  setCurrentBenefitCustomer: (benefit) =>
    set({ currentBenefitCustomer: benefit }),
  clearCurrentBenefitCustomer: () => set({ currentBenefitCustomer: null }),
}));
