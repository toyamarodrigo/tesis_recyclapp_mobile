import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { userApi } from "../api.user";

export const userKeys = createQueryKeyStore({
  user: {
    customerDetailsClerk: (id: string) => ({
      queryKey: ["customerDetailsClerk", id],
      queryFn: () => userApi.getUserCustomerClerk(id),
    }),
    storeDetailsClerk: (id: string) => ({
      queryKey: ["storeDetailsClerk"],
      queryFn: () => userApi.getUserStoreClerk(id),
    }),
  },
});
