import { commentApi } from "@api/api.comment";
import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const commentKeys = createQueryKeyStore({
  comment: {
    list: () => ({
      queryKey: ["commentList"],
      queryFn: () => commentApi.getComments(),
    }),
    listByPostId: (postId: string) => ({
      queryKey: ["commentListByPostId", postId],
      queryFn: () => commentApi.getCommentByPostId(postId),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => commentApi.getCommentById(id),
    }),
  },
});
