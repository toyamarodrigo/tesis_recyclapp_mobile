import { addressKeys } from "@api/query/address.factory";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Address, AddressPost, AddressPut } from "@models/address.type";
import { addressApi } from "@api/api.address";
import { Alert } from "react-native";

const useAddressClerkId = (userId: string) => {
  return useQuery({
    ...addressKeys.address.addressesClerk(userId),
    enabled: !!userId,
  });
};

const useCreateAddress = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: ["createAddress"],
    mutationFn: (address: AddressPost) => addressApi.createAddress(address),
    onSuccess: (data) => {
      queryClient.setQueryData(
        addressKeys.address.addressesClerk(data.userId).queryKey,
        (old: Address[]) => {
          return [...old, data];
        }
      );

      Alert.alert("Éxito", "Se creó la nueva dirección con éxito.");
    },
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
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isSuccess, error } = useMutation({
    mutationKey: ["updateAddress"],
    mutationFn: (address: AddressPut) => addressApi.updateAddress(address),
    onSuccess: (data: Address) => {
      queryClient.setQueryData(
        addressKeys.address.addressesClerk(data.userId).queryKey,
        (old: Address[]) => {
          return old.map((address: Address) =>
            address.id === data.id ? data : address
          );
        }
      );
    },
  });

  return {
    mutate,
    mutateAsync,
    isPending,
    isSuccess,
    error,
  };
};

export { useCreateAddress, useUpdateAddress, useAddressClerkId };
