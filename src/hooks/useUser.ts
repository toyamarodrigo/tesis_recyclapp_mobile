import { userKeys } from "@api/query/user.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { userApi } from "@api/api.user";
import { useUser } from "@clerk/clerk-expo";
import { UserCustomerPost } from "@models/userCustomer.type";

const useUserCustomerByClerk = () => {
  const { user } = useUser();

  if (!user) {
    return { isLoading: true, isError: false, data: null, error: null };
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: userKeys.user.customerDetailsClerk(user.id).queryKey,
    queryFn: userKeys.user.customerDetailsClerk(user.id).queryFn,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

const useCreateUserCustomer = () => {
  const { mutateAsync, isPending, isSuccess, error } = useMutation({
    mutationFn: (user: UserCustomerPost) => userApi.createUserCustomer(user),
  });

  return {
    mutateAsync,
    isPending,
    isSuccess,
    error,
  };
};

const useUpdateUserCustomer = () => {
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: (data: any) => userApi.updateUserCustomer(data),
  });

  return {
    mutate,
    isPending,
    isSuccess,
    error,
  };
};

const useDeleteUserCustomer = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (id: string) => userApi.deleteUserCustomer(id),
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useUserStoreByClerk = () => {
  const { user } = useUser();

  if (!user) {
    return { isLoading: true, isError: false, data: null, error: null };
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: userKeys.user.storeDetailsClerk(user.id).queryKey,
    queryFn: userKeys.user.storeDetailsClerk(user.id).queryFn,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export {
  useUserCustomerByClerk,
  useCreateUserCustomer,
  useUpdateUserCustomer,
  useDeleteUserCustomer,
  useUserStoreByClerk,
};
