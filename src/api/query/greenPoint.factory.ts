import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { greenPointApi } from "@api/api.greenPoint";

export const greenPointKeys = createQueryKeyStore({
  greenPoint: {
    list: () => ({
      queryKey: ["greenPointList"],
      queryFn: () => greenPointApi.getGreenPoint(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => greenPointApi.getGreenPointById(id),
    }),
  },
});
