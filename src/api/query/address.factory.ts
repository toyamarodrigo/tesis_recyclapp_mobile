import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { addressApi } from "../api.address";

export const addressKeys = createQueryKeyStore({
  address: {
    list: () => ({
      queryKey: ["addressList"],
      queryFn: addressApi.getAddress,
    }),
    detail: (id: string) => ({
      queryKey: ["address", "detail", id],
      queryFn: () => addressApi.getAddressById(id),
    }),
    addressesClerk: (id: string) => ({
      queryKey: ["addressClerk", id],
      queryFn: () => addressApi.getAddressClerkId(id),
    }),
  },
});
