import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { userApi } from "../api.user";

export const userKeys = createQueryKeyStore({
  user: {
    customerDetails: (id: string) => ({
      queryKey: ["customerDetails"],
      queryFn: () => userApi.getUserCustomer(id),
    }),
    customerDetailsClerk: (id: string) => ({
      queryKey: ["customerDetailsClerk"],
      queryFn: () => userApi.getUserCustomerClerk(id),
    }),
    storeDetails: (id: string) => ({
      queryKey: ["storeDetails"],
      queryFn: () => userApi.getUserStore(id),
    }),
    storeDetailsClerk: (id: string) => ({
      queryKey: ["storeDetailsClerk"],
      queryFn: () => userApi.getUserStoreClerk(id),
    }),
  },
});
