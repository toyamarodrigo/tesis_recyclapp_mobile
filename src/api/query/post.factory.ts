import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { postApi } from "@api/api.post";
import { PostCreate } from "@models/post.type";

export const postKeys = createQueryKeyStore({
  post: {
    list: () => ({
      queryKey: ["postList"],
      queryFn: () => postApi.getPosts(),
    }),
    listByClerkId: (userId: string) => ({
      queryKey: ["postListByClerkId", userId],
      queryFn: () => postApi.getPostByClerkId(userId),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => postApi.getPostById(id),
    }),
  },
});
