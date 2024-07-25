import { chatMessageKeys } from "@api/query/chatMessage.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ChatMessagePost, ChatMessagePut } from "@models/chatMessage.type";
import { chatMessageApi } from "@api/api.chatMessage";

const useChatMessageList = () => {
  const { data, error, isError, isLoading } = useQuery(
    chatMessageKeys.chatMessage.list()
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useChatMessageById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    chatMessageKeys.chatMessage.detail(id)
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useCreateChatMessage = (chatMessage: ChatMessagePost) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: chatMessageApi.createChatMessage,
    mutationKey: [chatMessage],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useUpdateChatMessage = (chatMessage: ChatMessagePut) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: chatMessageApi.updateChatMessage,
    mutationKey: [chatMessage],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useDeleteChatMessage = (id: string) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: chatMessageApi.deleteChatMessage,
    mutationKey: [id],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

export {
  useChatMessageList,
  useChatMessageById,
  useCreateChatMessage,
  useDeleteChatMessage,
  useUpdateChatMessage,
};
