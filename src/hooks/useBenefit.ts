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

const useBenefitListStore = (userId: string) => {
  return useQuery({
    ...benefitKeys.benefit.storeList(userId),
  });
};

const useCreateBenefit = () => {
  const queryClient = useQueryClient();
  return useMutation({
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
};

const useUpdateBenefit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (benefit: BenefitPut) => benefitApi.updateBenefit(benefit),
    onSuccess: (benefit) => {
      console.log("benefit", benefit);
      queryClient.invalidateQueries({
        queryKey: benefitKeys.benefit.list().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: benefitKeys.benefit.storeList(benefit.userStoreId).queryKey,
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

export {
  useBenefitList,
  useBenefitListStore,
  useCreateBenefit,
  useUpdateBenefit,
};
