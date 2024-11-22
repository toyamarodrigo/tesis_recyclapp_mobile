import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { benefitAssignmentKeys } from "@api/query/benefitAssignment.factory";
import {
  BenefitAssignmentPost,
  BenefitAssignmentPut,
} from "@models/benefitAssignment.type";
import { benefitAssignmentApi } from "@api/api.benefitAssignment";
import { benefitKeys } from "@api/query/benefit.factory";

const useBenefitAssignmentList = () => {
  return useQuery({ ...benefitAssignmentKeys.benefitAssignment.list() });
};

const useBenefitAssignmentById = (id: string) => {
  return useQuery({ ...benefitAssignmentKeys.benefitAssignment.detail(id) });
};

const useBenefitAssignmentByUserCustomerId = (id: string) => {
  return useQuery({
    ...benefitAssignmentKeys.benefitAssignment.listClerk(id),
  });
};

const useBenefitAssignmentByStoreBenefits = (benefitIds: string[]) => {
  return useQuery({
    ...benefitAssignmentKeys.benefitAssignment.listStore(benefitIds),
  });
};

const useCreateBenefitAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (benefitAssignment: BenefitAssignmentPost) =>
      benefitAssignmentApi.createBenefitAssignment(benefitAssignment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: benefitKeys.benefit.list().queryKey,
      });
    },
  });
};

const useUpdateBenefitAssignment = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (benefitAssignment: BenefitAssignmentPut) =>
      benefitAssignmentApi.updateBenefitAssignment(benefitAssignment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: benefitKeys.benefit.list().queryKey,
      });
    },
  });

  return { mutate, mutateAsync, isPending, isError, error };
};

export {
  useBenefitAssignmentById,
  useBenefitAssignmentList,
  useBenefitAssignmentByUserCustomerId,
  useBenefitAssignmentByStoreBenefits,
  useCreateBenefitAssignment,
  useUpdateBenefitAssignment,
};
