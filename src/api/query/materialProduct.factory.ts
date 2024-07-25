import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { materialProductApi } from "@api/api.materialProduct";

export const materialProductKeys = createQueryKeyStore({
  materialProduct: {
    list: () => ({
      queryKey: ["materialProductsList"],
      queryFn: () => materialProductApi.getMaterialProduct(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => materialProductApi.getMaterialProductById(id),
    }),
  },
});
