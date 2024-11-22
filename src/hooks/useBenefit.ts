import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { benefitKeys } from "@api/query/benefit.factory";
import { BenefitPost, BenefitPut } from "@models/benefit.type";
import { benefitApi } from "@api/api.benefit";
import { Alert } from "react-native";

const useBenefitList = () => {
  return useQuery({
    ...benefitKeys.benefit.list(),
  });
};

const useBenefitById = (id: string) => {
  return useQuery({
    ...benefitKeys.benefit.detail(id),
  });
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: benefitKeys.benefit.list().queryKey,
      });

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
  return useMutation({
    mutationFn: (benefit: BenefitPut) => benefitApi.updateBenefit(benefit),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: benefitKeys.benefit.list().queryKey,
      });
    },
    onError: () => {
      Alert.alert(
        "Error",
        "Ocurrió un problema al actualizar el beneficio. Intente nuevamente."
      );
    },
  });
};

const useDeleteBenefit = () => {
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: (id: string) => benefitApi.deleteBenefit(id),
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
