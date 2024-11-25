import { postKeys } from "@api/query/post.factory";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postApi } from "@api/api.post";
import { Post, PostCreate, PostUpdate } from "@models/post.type";

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
    },
  });
};

export {
  usePostList,
  usePostListByClerkId,
  usePostById,
  useCreatePost,
  useUpdatePost,
};
