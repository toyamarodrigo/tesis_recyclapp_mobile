import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { benefitAssignmentKeys } from "@api/query/benefitAssignment.factory";
import {
  BenefitAssignmentPost,
  BenefitAssignmentPut,
} from "@models/benefitAssignment.type";
import { benefitAssignmentApi } from "@api/api.benefitAssignment";

const useBenefitAssignmentList = () => {
  const { data, isSuccess, error, isLoading } = useQuery({
    queryKey: benefitAssignmentKeys.benefitAssignment.list().queryKey,
    queryFn: benefitAssignmentKeys.benefitAssignment.list().queryFn,
  });

  return {
    data,
    error,
    isSuccess,
    isLoading,
  };
};

const useBenefitAssignmentById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    benefitAssignmentKeys.benefitAssignment.detail(id)
  );

  return { data, error, isError, isLoading };
};

const useCreateBenefitAssignment = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: (benefitAssignment: BenefitAssignmentPost) =>
      benefitAssignmentApi.createBenefitAssignment(benefitAssignment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: benefitAssignmentKeys.benefitAssignment.list().queryKey,
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

const useUpdateBenefitAssignment = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (benefitAssignment: BenefitAssignmentPut) =>
      benefitAssignmentApi.updateBenefitAssignment(benefitAssignment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: benefitAssignmentKeys.benefitAssignment.list().queryKey,
      });
    },
  });

  return { mutate, isPending, isError, error };
};

const useDeleteBenefitAssignment = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: (id: string) =>
      benefitAssignmentApi.deleteBenefitAssignment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: benefitAssignmentKeys.benefitAssignment.list().queryKey,
      });
    },
  });

  return { mutate, isPending, isSuccess, error };
};

export {
  useBenefitAssignmentById,
  useBenefitAssignmentList,
  useCreateBenefitAssignment,
  useDeleteBenefitAssignment,
  useUpdateBenefitAssignment,
};
