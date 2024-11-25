import { postKeys } from "@api/query/post.factory";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postApi } from "@api/api.post";
import { Post, PostCreate, PostUpdate } from "@models/post.type";
import { Alert } from "react-native";

const usePostList = () => {
  return useQuery({ ...postKeys.post.list() });
};

const usePostListByClerkId = ({ userId }: { userId: string }) => {
  return useQuery({
    ...postKeys.post.listByClerkId(userId),
    enabled: !!userId,
  });
};

const usePostById = ({ id }: { id: string }) => {
  return useQuery({
    ...postKeys.post.detail(id),
    enabled: !!id,
  });
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: (post: PostCreate) => postApi.createPost(post),
    onSuccess: (post: Post) => {
      queryClient.invalidateQueries({
        queryKey: postKeys.post.listByClerkId(post.userId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: postKeys.post.list().queryKey,
      });
    },
  });
};

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updatePost"],
    mutationFn: (post: PostUpdate) => postApi.updatePost(post),
    onSuccess: (post: Post) => {
      queryClient.invalidateQueries({
        queryKey: postKeys.post.listByClerkId(post.userId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: postKeys.post.list().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: postKeys.post.detail(post.id).queryKey,
      });

      Alert.alert(
        "¡Cambio exitoso!",
        `Se realizó la recepción del código correctamente. Verás +${post?.pointsAwarded} puntos sumados en tu perfil. No olvides avisarle a quien te dio el código que ya puede confirmar el cambio en su pantalla.`
      );
    },
  });
};

const useDeletePost = (id: string) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postApi.deletePost,
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
  usePostList,
  usePostListByClerkId,
  usePostById,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
};
