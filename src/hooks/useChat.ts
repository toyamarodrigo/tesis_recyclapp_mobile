import { chatKeys } from "@api/query/chat.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ChatPost, ChatPut } from "@models/chat.type";
import { chatApi } from "@api/api.chat";

const useChatList = () => {
  const { data, error, isError, isLoading } = useQuery(chatKeys.chat.list());

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useChatById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    chatKeys.chat.detail(id)
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useCreateChat = (chat: ChatPost) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: chatApi.createChat,
    mutationKey: [chat],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useUpdateChat = (chat: ChatPut) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: chatApi.updateChat,
    mutationKey: [chat],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useDeleteChat = (id: string) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: chatApi.deleteChat,
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
  useChatList,
  useChatById,
  useCreateChat,
  useDeleteChat,
  useUpdateChat,
};
