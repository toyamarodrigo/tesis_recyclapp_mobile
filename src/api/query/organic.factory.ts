import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { organicApi } from "@api/api.organic";

export const organicKeys = createQueryKeyStore({
  organic: {
    list: () => ({
      queryKey: ["organicList"],
      queryFn: () => organicApi.getOrganic(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => organicApi.getOrganicById(id),
    }),
  },
});
