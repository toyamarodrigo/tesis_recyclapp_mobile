import { postKeys } from "@api/query/post.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { postApi } from "@api/api.post";
import { PostCreate } from "@models/post.type";

const usePostList = () => {
  return useQuery({ ...postKeys.post.list() });
};

const usePostListByClerkId = ({ userId }: { userId: string }) => {
  return useQuery({
    ...postKeys.post.listByClerkId(userId),
    enabled: !!userId,
  });
};

const useCreatePost = () => {
  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: (post: PostCreate) => postApi.createPost(post),
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
  useCreatePost,
  useUpdatePost,
  useDeletePost,
};
