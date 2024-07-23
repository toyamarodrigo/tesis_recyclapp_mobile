import { addressKeys } from "@api/query/address.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AddressPost, AddressPut } from "@models/address.type";
import { addressApi } from "@api/api.address";

const useAddressList = () => {
  const { data, error, isError, isLoading } = useQuery(
    addressKeys.address.list()
  );

  return {
    data,
    error,
    isError,
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

const useCreateAddress = (address: AddressPost) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addressApi.createAddress,
    mutationKey: [address],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useUpdateAddress = (address: AddressPut) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addressApi.updateAddress,
    mutationKey: [address],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useDeleteAddress = (id: string) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addressApi.deleteAddress,
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
  useAddressList,
  useAddressById,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
};
