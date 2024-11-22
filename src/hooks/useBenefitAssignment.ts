import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { benefitAssignmentKeys } from "@api/query/benefitAssignment.factory";
import {
  BenefitAssignmentPost,
  BenefitAssignmentPostResponse,
  BenefitAssignmentPut,
} from "@models/benefitAssignment.type";
import { benefitAssignmentApi } from "@api/api.benefitAssignment";
import { Alert } from "react-native";

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
    onSuccess: (data: BenefitAssignmentPostResponse) => {
      queryClient.invalidateQueries({
        queryKey: benefitAssignmentKeys.benefitAssignment.listClerk(
          data.userCustomerId
        ).queryKey,
      });

      Alert.alert("Beneficio canjeado correctamente");
    },
  });
};

const useUpdateBenefitAssignment = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (benefitAssignment: BenefitAssignmentPut) =>
      benefitAssignmentApi.updateBenefitAssignment(benefitAssignment),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: benefitAssignmentKeys.benefitAssignment.listClerk(
          data.userCustomerId
        ).queryKey,
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
