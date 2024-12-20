import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Chat, ChatCreate, ChatUnique, ChatUpdate } from "@models/chat.type";
import { chatApi } from "@api/api.chat";
import { chatKeys } from "@api/query/chat.factory";

const useChatList = () => {
  return useQuery({ ...chatKeys.chat.list() });
};

const useChatListByUnique = ({ unique }: { unique: ChatUnique }) => {
  return useQuery({
    ...chatKeys.chat.listByUnique(unique),
    enabled: !!unique.postId && !!unique.userCommentId && !!unique.userPostId,
    refetchInterval: 5000,
  });
};

const useChatById = ({ id }: { id: string }) => {
  return useQuery({
    ...chatKeys.chat.detail(id),
    enabled: !!id,
    refetchInterval: 5000,
  });
};

const useCreateChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createChat"],
    mutationFn: (chat: ChatCreate) => chatApi.createChat(chat),
    onSuccess: (chat: Chat) => {
      queryClient.invalidateQueries({
        queryKey: chatKeys.chat.listByUnique({
          postId: chat.postId,
          userCommentId: chat.userCommentId,
          userPostId: chat.userPostId,
        }).queryKey,
      });
    },
  });
};

const useUpdateChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chat: ChatUpdate) => chatApi.updateChat(chat),
    onSuccess: (chat: Chat) => {
      queryClient.invalidateQueries({
        queryKey: chatKeys.chat.detail(chat.id).queryKey,
      });
    },
  });
};

export {
  useChatList,
  useChatListByUnique,
  useChatById,
  useCreateChat,
  useUpdateChat,
};
