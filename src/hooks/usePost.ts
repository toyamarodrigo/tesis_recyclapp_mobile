import { postKeys } from "@api/query/post.factory";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postApi } from "@api/api.post";
import { Post, PostCreate } from "@models/post.type";

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
    },
  });
};

// TODO: type
const useUpdatePost = (post) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postApi.updatePost,
    mutationKey: [post],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
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
