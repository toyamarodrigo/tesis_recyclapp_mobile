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

const useUserStoreByClerk = ({ userId }: { userId: string }) => {
  return useQuery({
    ...userKeys.user.storeDetailsClerk(userId),
    enabled: !!userId,
  });
};

export {
  useUserCustomerByClerk,
  useCreateUserCustomer,
  useUpdateUserCustomer,
  useUserStoreByClerk,
};
