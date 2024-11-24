import { chatApi } from "@api/api.chat";
import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { ChatUnique } from "@models/chat.type";

export const chatKeys = createQueryKeyStore({
  chat: {
    list: () => ({
      queryKey: ["chatList"],
      queryFn: () => chatApi.getChats(),
    }),
    listByUnique: (unique: ChatUnique) => ({
      queryKey: ["chatListByUnique", unique],
      queryFn: () => chatApi.getChatByUnique(unique),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => chatApi.getChatById(id),
    }),
  },
});
