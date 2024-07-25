import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { ratingApi } from "@api/api.rating";

export const ratingKeys = createQueryKeyStore({
  rating: {
    list: () => ({
      queryKey: ["ratingList"],
      queryFn: () => ratingApi.getRating(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => ratingApi.getRatingById(id),
    }),
  },
});
