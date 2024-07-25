import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { imageApi } from "@api/api.image";

export const imageKeys = createQueryKeyStore({
  image: {
    list: () => ({
      queryKey: ["imageList"],
      queryFn: () => imageApi.getImage(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => imageApi.getImageById(id),
    }),
  },
});
