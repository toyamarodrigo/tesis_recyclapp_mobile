import { postKeys } from "@api/query/post.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PostPost, PostPut } from "@models/post.type";
import { postApi } from "@api/api.post";

const usePostList = () => {
  const { data, error, isError, isLoading } = useQuery(postKeys.post.list());

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const usePostById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    postKeys.post.detail(id)
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useCreatePost = (post: PostPost) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postApi.createPost,
    mutationKey: [post],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useUpdatePost = (post: PostPut) => {
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
  usePostById,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
};
