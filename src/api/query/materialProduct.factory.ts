import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { materialProductApi } from "@api/api.materialProduct";

export const materialColors = {
  paper: "#4CAF50",
  plastic: "#2196F3",
  metal: "#FF9800",
  glass: "#9C27B0",
};

export const materialProductKeys = createQueryKeyStore({
  materialProduct: {
    list: () => ({
      queryKey: ["materialProductsList"],
      queryFn: () => materialProductApi.getMaterialProducts(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => materialProductApi.getMaterialProductById(id),
    }),
  },
});
