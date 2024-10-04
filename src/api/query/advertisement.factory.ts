import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { advertisementApi } from "@api/api.advertisement";

export const advertisementKeys = createQueryKeyStore({
  advertisement: {
    list: () => ({
      queryKey: ["advertisementList"],
      queryFn: () => advertisementApi.getAdvertisements(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => advertisementApi.getAdvertisementById(id),
    }),
  },
});
