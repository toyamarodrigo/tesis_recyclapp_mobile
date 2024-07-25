import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { chatMessageApi } from "@api/api.chatMessage";

export const chatMessageKeys = createQueryKeyStore({
  chatMessage: {
    list: () => ({
      queryKey: ["chatMessageList"],
      queryFn: () => chatMessageApi.getChatMessage(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => chatMessageApi.getChatMessageById(id),
    }),
  },
});
