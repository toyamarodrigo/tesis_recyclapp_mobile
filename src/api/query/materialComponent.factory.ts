import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { materialComponentApi } from "@api/api.materialComponent";

export const materialComponentKeys = createQueryKeyStore({
  materialComponent: {
    list: () => ({
      queryKey: ["materialComponentList"],
      queryFn: () => materialComponentApi.getMaterialComponent(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => materialComponentApi.getMaterialComponentById(id),
    }),
  },
});
