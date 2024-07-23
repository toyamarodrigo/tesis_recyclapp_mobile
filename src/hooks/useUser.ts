import { userKeys } from "@api/query/user.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { userApi } from "@api/api.user";
import { UserPost, UserPut } from "@models/user.type";

const useUserList = () => {
  const { data, isLoading, isError, error } = useQuery(userKeys.user.list());

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const useUser = (id: string) => {
  const { data, isLoading, isError, error } = useQuery(
    userKeys.user.detail(id)
  );

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const useCreateUser = (user: UserPost) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [user],
    mutationFn: () => userApi.createUser(user),
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useUpdateUser = (user: UserPut) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [user],
    mutationFn: () => userApi.updateUser(user),
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useDeleteUser = (id: string) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [id],
    mutationFn: () => userApi.deleteUser(id),
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

export { useUserList, useUser, useCreateUser, useUpdateUser, useDeleteUser };
