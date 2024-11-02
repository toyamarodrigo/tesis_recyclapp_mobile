import { addressKeys } from "@api/query/address.factory";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AddressPost, AddressPut } from "@models/address.type";
import { addressApi } from "@api/api.address";

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
  const { data, error, isError, isLoading } = useQuery(
    addressKeys.address.detail(id)
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useCreateAddress = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (address: AddressPost) => addressApi.createAddress(address),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: addressKeys.address.list().queryKey,
      });
    },
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: (address: AddressPut) => addressApi.updateAddress(address),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: addressKeys.address.list().queryKey,
      });
    },
  });

  return {
    mutate,
    isPending,
    isSuccess,
    error,
  };
};

const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (id: string) => addressApi.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: addressKeys.address.list().queryKey,
      });
    },
  });

  return {
    mutate,
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
};
