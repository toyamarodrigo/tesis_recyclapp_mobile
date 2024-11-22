import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { benefitKeys } from "@api/query/benefit.factory";
import {
  Benefit,
  BenefitPost,
  BenefitPut,
  BenefitPutResponse,
  BenefitUser,
} from "@models/benefit.type";
import { benefitApi } from "@api/api.benefit";
import { Alert } from "react-native";

const useBenefitList = () => {
  const { data, isSuccess, error, isLoading } = useQuery({
    queryKey: benefitKeys.benefit.list().queryKey,
    queryFn: benefitKeys.benefit.list().queryFn,
  });

  return {
    data,
    error,
    isSuccess,
    isLoading,
  };
};

const useBenefitById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    benefitKeys.benefit.detail(id)
  );

  return { data, error, isError, isLoading };
};

const useBenefitListStore = (userId: string) => {
  return useQuery({
    ...benefitKeys.benefit.storeList(userId),
  });
};

const useCreateBenefit = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isSuccess, error } = useMutation({
    mutationFn: (benefit: BenefitPost) => benefitApi.createBenefit(benefit),
    onSuccess: (benefit: BenefitPost) => {
      queryClient.setQueryData(
        benefitKeys.benefit.storeList(benefit.userStoreId).queryKey,
        (data: Benefit[]) => {
          return [...data, benefit];
        }
      );

      Alert.alert("Éxito", "Se creó el nuevo beneficio con éxito.");
    },
    onError: () => {
      Alert.alert(
        "Error",
        "Ocurrió un problema al crear el beneficio. Intente nuevamente."
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

const useUpdateBenefit = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (benefit: BenefitPut) => benefitApi.updateBenefit(benefit),
    onSuccess: async (benefit: BenefitPutResponse) => {
      await queryClient.invalidateQueries({
        queryKey: benefitKeys.benefit.storeList(benefit.userStoreId).queryKey,
      });

      Alert.alert("Éxito", "Se actualizó el beneficio con éxito.");
    },
    onError: () => {
      Alert.alert(
        "Error",
        "Ocurrió un problema al actualizar el beneficio. Intente nuevamente."
      );
    },
  });

  return { mutate, mutateAsync, isPending, isError, error };
};

const useDeleteBenefit = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: (id: string) => benefitApi.deleteBenefit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: benefitKeys.benefit.list().queryKey,
      });
    },
  });

  return { mutate, isPending, isSuccess, error };
};

export {
  useBenefitById,
  useBenefitList,
  useBenefitListStore,
  useCreateBenefit,
  useDeleteBenefit,
  useUpdateBenefit,
};
