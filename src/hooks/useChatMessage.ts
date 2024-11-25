import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ChatMessage, ChatMessageCreate } from "@models/chatMessage.type";
import { chatMessageApi } from "@api/api.chatMessage";
import { chatKeys } from "@api/query/chat.factory";

const useCreateChatMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createChatMessage"],
    mutationFn: (chatMessage: ChatMessageCreate) =>
      chatMessageApi.createChatMessage(chatMessage),
    onSuccess: (chatMessage: ChatMessage) => {
      queryClient.invalidateQueries({
        queryKey: chatKeys.chat.detail(chatMessage.chatId).queryKey,
      });
    },
  });
};

export { useCreateChatMessage };
