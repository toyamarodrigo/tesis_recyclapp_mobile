import { greenPointKeys } from "@api/query/greenPoint.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { GreenPointPost, GreenPointPut } from "@models/greenPoint.type";
import { greenPointApi } from "@api/api.greenPoint";

const useGreenPointList = () => {
  const { data, error, isError, isLoading } = useQuery(
    greenPointKeys.greenPoint.list()
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useGreenPointById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    greenPointKeys.greenPoint.detail(id)
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useCreateGreenPoint = (greenPoint: GreenPointPost) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: greenPointApi.createGreenPoint,
    mutationKey: [greenPoint],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useUpdateGreenPoint = (greenPoint: GreenPointPut) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: greenPointApi.updateGreenPoint,
    mutationKey: [greenPoint],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useDeleteGreenPoint = (id: string) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: greenPointApi.deleteGreenPoint,
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
  useGreenPointList,
  useGreenPointById,
  useCreateGreenPoint,
  useDeleteGreenPoint,
  useUpdateGreenPoint,
};
