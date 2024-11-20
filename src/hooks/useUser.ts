import { userKeys } from "@api/query/user.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { userApi } from "@api/api.user";
import { UserCustomerPost } from "@models/userCustomer.type";

const useUserCustomerByClerk = ({ userId }: { userId: string }) => {
  const { data, isLoading, isError, error } = useQuery({
    ...userKeys.user.customerDetailsClerk(userId),
    enabled: !!userId,
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

const useUserStoreByClerk = ({ userId }: { userId: string }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: userKeys.user.storeDetailsClerk(userId).queryKey,
    queryFn: userKeys.user.storeDetailsClerk(userId).queryFn,
    enabled: !!userId,
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
