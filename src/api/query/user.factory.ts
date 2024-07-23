import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { userApi } from "../api.user";

export const userKeys = createQueryKeyStore({
  user: {
    list: () => ({
      queryKey: ["userList"],
      queryFn: () => userApi.getUsers(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => userApi.getUser(id),
    }),
  },
});
