import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { addressApi } from "../api.address";

export const addressKeys = createQueryKeyStore({
  address: {
    list: () => ({
      queryKey: ["addressList"],
      queryFn: () => addressApi.getAddress(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => addressApi.getAddressById(id),
    }),
  },
});
