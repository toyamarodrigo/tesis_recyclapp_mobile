import { create } from "zustand";
import { Address } from "@models/address.type";

type AddressState = {
  currentAddress: Address | null;
  setCurrentAddress: (address: Address) => void;
  clearCurrentAddress: () => void;
};

export const useAddressStore = create<AddressState>((set) => ({
  currentAddress: null,
  setCurrentAddress: (address) => set({ currentAddress: address }),
  clearCurrentAddress: () => set({ currentAddress: null }),
}));
