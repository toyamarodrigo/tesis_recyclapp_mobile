import { subscriptionKeys } from "@api/query/subscription.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { SubscriptionPost, SubscriptionPut } from "@models/subscription.type";
import { subscriptionApi } from "@api/api.subscription";

const useSubscriptionList = () => {
  const { data, error, isError, isLoading } = useQuery(
    subscriptionKeys.subscription.list()
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useSubscriptionById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    subscriptionKeys.subscription.detail(id)
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useCreateSubscription = (subscription: SubscriptionPost) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: subscriptionApi.createSubscription,
    mutationKey: [subscription],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useUpdateSubscription = (subscription: SubscriptionPut) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: subscriptionApi.updateSubscription,
    mutationKey: [subscription],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useDeleteSubscription = (id: string) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: subscriptionApi.deleteSubscription,
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
  useSubscriptionList,
  useSubscriptionById,
  useCreateSubscription,
  useUpdateSubscription,
  useDeleteSubscription,
};
