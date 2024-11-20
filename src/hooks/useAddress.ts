import { addressKeys } from "@api/query/address.factory";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AddressPost, AddressPut } from "@models/address.type";
import { addressApi } from "@api/api.address";
import { useUser } from "@clerk/clerk-expo";

const useAddressList = () => {
  const { data, error, isSuccess, isLoading } = useQuery({
    queryKey: addressKeys.address.list().queryKey,
    queryFn: addressKeys.address.list().queryFn,
  });

  return {
    data,
    error,
    isSuccess,
    isLoading,
  };
};

const useAddressById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery({
    ...addressKeys.address.detail(id),
    enabled: !!id,
  });

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useAddressClerkId = (userId: string) => {
  const { data, error, isError, isLoading } = useQuery({
    ...addressKeys.address.addressesClerk(userId),
    enabled: !!userId,
  });

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useCreateAddress = () => {
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (address: AddressPost) => addressApi.createAddress(address),
  });

  return {
    mutate,
    mutateAsync,
    isPending,
    isError,
    error,
  };
};

const useUpdateAddress = () => {
  const { mutate, mutateAsync, isPending, isSuccess, error } = useMutation({
    mutationFn: (address: AddressPut) => addressApi.updateAddress(address),
  });

  return {
    mutate,
    mutateAsync,
    isPending,
    isSuccess,
    error,
  };
};

const useDeleteAddress = () => {
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (id: string) => addressApi.deleteAddress(id),
  });

  return {
    mutate,
    mutateAsync,
    isPending,
    isError,
    error,
  };
};

export {
  useAddressList,
  useAddressById,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
  useAddressClerkId,
};
