import { materialComponentKeys } from "@api/query/materialComponent.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  MaterialComponentPost,
  MaterialComponentPut,
} from "@models/materialComponent.type";
import { materialComponentApi } from "@api/api.materialComponent";

const useMaterialComponentList = () => {
  return useQuery(materialComponentKeys.materialComponent.list());
};

const useMaterialComponentById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    materialComponentKeys.materialComponent.detail(id)
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useCreateMaterialComponent = (
  materialComponent: MaterialComponentPost
) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: materialComponentApi.createMaterialComponent,
    mutationKey: [materialComponent],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useUpdateMaterialComponent = (
  materialComponent: MaterialComponentPut
) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: materialComponentApi.updateMaterialComponent,
    mutationKey: [materialComponent],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useDeleteMaterialComponent = (id: string) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: materialComponentApi.deleteMaterialComponent,
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
  useMaterialComponentList,
  useMaterialComponentById,
  useCreateMaterialComponent,
  useUpdateMaterialComponent,
  useDeleteMaterialComponent,
};
