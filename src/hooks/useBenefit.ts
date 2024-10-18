import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { benefitKeys } from "@api/query/benefit.factory";
import { useBenefitStore } from "@stores/useBenefitStore";
import { BenefitPost, BenefitPut } from "@models/benefit.type";
import { benefitApi } from "@api/api.benefit";
import { useEffect } from "react";

const useBenefitList = () => {
  const { initializeBenefitList } = useBenefitStore();
  const { data, isSuccess, error, isLoading } = useQuery({
    queryKey: benefitKeys.benefit.list().queryKey,
    queryFn: benefitKeys.benefit.list().queryFn,
  });

  useEffect(() => {
    if (isSuccess && data) {
      initializeBenefitList(data);
    }
  }, [isSuccess, data, initializeBenefitList]);

  return {
    data,
    error,
    isLoading,
  };
};

const useBenefitById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    benefitKeys.benefit.detail(id)
  );

  return { data, error, isError, isLoading };
};

const useCreateBenefit = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: (benefit: BenefitPost) => benefitApi.createBenefit(benefit),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: benefitKeys.benefit.list().queryKey,
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

const useUpdateBenefit = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (benefit: BenefitPut) => benefitApi.updateBenefit(benefit),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: benefitKeys.benefit.list().queryKey,
      });
    },
  });

  return { mutate, isPending, isError, error };
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
  useCreateBenefit,
  useDeleteBenefit,
  useUpdateBenefit,
};
