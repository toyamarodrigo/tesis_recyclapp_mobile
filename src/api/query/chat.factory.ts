import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { chatApi } from "@api/api.chat";

export const chatKeys = createQueryKeyStore({
  chat: {
    list: () => ({
      queryKey: ["chatList"],
      queryFn: () => chatApi.getChat(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => chatApi.getChatById(id),
    }),
  },
});
