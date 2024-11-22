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
  const { data, error, isError, isLoading } = useQuery(
    benefitAssignmentKeys.benefitAssignment.detail(id)
  );

  return { data, error, isError, isLoading };
};

const useBenefitAssignmentByUserCustomerId = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    benefitAssignmentKeys.benefitAssignment.listClerk(id)
  );

  return { data, error, isError, isLoading };
};

const useBenefitAssignmentByStoreBenefits = (benefitIds: string[]) => {
  const { data, error, isError, isLoading } = useQuery(
    benefitAssignmentKeys.benefitAssignment.listStore(benefitIds)
  );

  return { data, error, isError, isLoading };
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
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (benefitAssignment: BenefitAssignmentPut) =>
      benefitAssignmentApi.updateBenefitAssignment(benefitAssignment),
  });

  return { mutate, mutateAsync, isPending, isError, error };
};

const useDeleteBenefitAssignment = () => {
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: (id: string) =>
      benefitAssignmentApi.deleteBenefitAssignment(id),
  });

  return { mutate, isPending, isSuccess, error };
};

export {
  useBenefitAssignmentById,
  useBenefitAssignmentList,
  useBenefitAssignmentByUserCustomerId,
  useBenefitAssignmentByStoreBenefits,
  useCreateBenefitAssignment,
  useDeleteBenefitAssignment,
  useUpdateBenefitAssignment,
};
