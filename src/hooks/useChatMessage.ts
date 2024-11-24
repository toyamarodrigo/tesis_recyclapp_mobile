import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ChatMessage, ChatMessageCreate } from "@models/chatMessage.type";
import { chatMessageApi } from "@api/api.chatMessage";
import { chatMessageKeys } from "@api/query/chatMessage.factory";
import { chatKeys } from "@api/query/chat.factory";

const useChatMessageList = () => {
  return useQuery({ ...chatMessageKeys.chatMessage.list() });
};

const useChatMessageById = ({ id }: { id: string }) => {
  return useQuery({
    ...chatMessageKeys.chatMessage.detail(id),
    enabled: !!id,
  });
};

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

export { useChatMessageList, useChatMessageById, useCreateChatMessage };
