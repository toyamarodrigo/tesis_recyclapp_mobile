import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { postApi } from "@api/api.post";

export const postKeys = createQueryKeyStore({
  post: {
    list: () => ({
      queryKey: ["postList"],
      queryFn: () => postApi.getPost(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => postApi.getPostById(id),
    }),
  },
});
