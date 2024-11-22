import { userKeys } from "@api/query/user.factory";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@api/api.user";
import { UserCustomerPost, UserCustomerPut } from "@models/userCustomer.type";

const useUserCustomerByClerk = ({ userId }: { userId: string }) => {
  return useQuery({
    ...userKeys.user.customerDetailsClerk(userId),
    enabled: !!userId,
  });
};

const useCreateUserCustomer = () => {
  return useMutation({
    mutationFn: (user: UserCustomerPost) => userApi.createUserCustomer(user),
  });
};

const useUpdateUserCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateUserCustomer"],
    mutationFn: (data: UserCustomerPut) => userApi.updateUserCustomer(data),
    onSuccess: (userCustomer) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.user.customerDetailsClerk(userCustomer.userId)
          .queryKey,
      });
    },
  });
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
    ...userKeys.user.storeDetailsClerk(userId),
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
