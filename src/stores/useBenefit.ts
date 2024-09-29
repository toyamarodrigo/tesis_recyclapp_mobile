import { useUser } from "@hooks/useUser";
import { User } from "@models/user.type";
import { UserStore } from "@models/userStore.type";
import { create } from "zustand";
import { benefits, userStore } from "./eliminarEsto";
import { Benefit } from "@models/benefit.type";

type BenefitState = {
  currentBenefit: Benefit | null;
};

export const useBenefitStore = create<BenefitState>(() => ({
  currentBenefit: benefits[0],
}));
