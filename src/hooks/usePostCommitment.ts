import { postCommitmentKeys } from "@api/query/postCommitment.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  PostCommitmentPost,
  PostCommitmentPut,
} from "@models/postCommitment.type";
import { postCommitmentApi } from "@api/api.postCommitment";

const usePostCommitmentList = () => {
  const { data, error, isError, isLoading } = useQuery(
    postCommitmentKeys.postCommitment.list()
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const usePostCommitmentById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    postCommitmentKeys.postCommitment.detail(id)
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useCreatePostCommitment = (postCommitment: PostCommitmentPost) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postCommitmentApi.createPostCommitment,
    mutationKey: [postCommitment],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useUpdatePostCommitment = (postCommitment: PostCommitmentPut) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postCommitmentApi.updatePostCommitment,
    mutationKey: [postCommitment],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useDeletePostCommitment = (id: string) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postCommitmentApi.deletePostCommitment,
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
  usePostCommitmentList,
  usePostCommitmentById,
  useCreatePostCommitment,
  useUpdatePostCommitment,
  useDeletePostCommitment,
};
