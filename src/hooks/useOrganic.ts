import { organicKeys } from "@api/query/organic.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { OrganicPost, OrganicPut } from "@models/organic.type";
import { organicApi } from "@api/api.organic";

const useOrganicList = () => {
  const { data, error, isError, isLoading } = useQuery(
    organicKeys.organic.list()
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useOrganicById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    organicKeys.organic.detail(id)
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useCreateOrganic = (organic: OrganicPost) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: organicApi.createOrganic,
    mutationKey: [organic],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useUpdateOrganic = (organic: OrganicPut) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: organicApi.updateOrganic,
    mutationKey: [organic],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useDeleteOrganic = (id: string) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: organicApi.deleteOrganic,
    mutationKey: [id],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

export {
  useOrganicList,
  useOrganicById,
  useCreateOrganic,
  useUpdateOrganic,
  useDeleteOrganic,
};
