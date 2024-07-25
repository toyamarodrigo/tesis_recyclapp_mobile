import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { postCommitmentApi } from "@api/api.postCommitment";

export const postCommitmentKeys = createQueryKeyStore({
  postCommitment: {
    list: () => ({
      queryKey: ["postCommitmentList"],
      queryFn: () => postCommitmentApi.getPostCommitment(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => postCommitmentApi.getPostCommitmentById(id),
    }),
  },
});
