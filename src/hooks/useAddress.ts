import { addressKeys } from "@api/query/address.factory";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Address, AddressPost, AddressPut } from "@models/address.type";
import { addressApi } from "@api/api.address";
import { Alert } from "react-native";

const useAddressListStores = () => {
  return useQuery({
    ...addressKeys.address.list(),
    select: (data) =>
      data.filter((address) => {
        return (
          address.displayName &&
          typeof address.longitude === "number" &&
          typeof address.latitude === "number"
        );
      }),
  });
};

const useAddressClerkId = (userId: string) => {
  return useQuery({
    ...addressKeys.address.addressesClerk(userId),
    enabled: !!userId,
  });
};

const useCreateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createAddress"],
    mutationFn: (address: AddressPost) => addressApi.createAddress(address),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: addressKeys.address.addressesClerk(data.userId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: addressKeys.address.list().queryKey,
      });

      Alert.alert("Éxito", "Se creó la nueva dirección con éxito.");
    },
  });
};

const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
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

      queryClient.invalidateQueries({
        queryKey: addressKeys.address.list().queryKey,
      });

      if (data.isArchived) {
        Alert.alert("Éxito", "Se eliminó la dirección con éxito.");
      } else {
        Alert.alert("Éxito", "Se actualizó la dirección con éxito.");
      }
    },
  });
};

export {
  useCreateAddress,
  useUpdateAddress,
  useAddressClerkId,
  useAddressListStores,
};
