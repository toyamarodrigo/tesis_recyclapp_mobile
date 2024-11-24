import { chatMessageApi } from "@api/api.chatMessage";
import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const chatMessageKeys = createQueryKeyStore({
  chatMessage: {
    list: () => ({
      queryKey: ["chatMessageList"],
      queryFn: () => chatMessageApi.getChatMessages(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => chatMessageApi.getChatMessageById(id),
    }),
  },
});
