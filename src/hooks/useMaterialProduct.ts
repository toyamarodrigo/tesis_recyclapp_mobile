import {
  materialColors,
  materialProductKeys,
} from "@api/query/materialProduct.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { MaterialProduct } from "@models/materialProduct.type";
import { materialProductApi } from "@api/api.materialProduct";

const useMaterialProductList = () => {
  return useQuery({
    ...materialProductKeys.materialProduct.list(),
    select: (data) =>
      data.slice(0, 4).map((material) => ({
        ...material,
        color: materialColors[material.id],
      })),
  });
};

const useMaterialProductById = (id: string) => {
  return useQuery({
    ...materialProductKeys.materialProduct.detail(id),
  });
};

const useCreateMaterialProduct = (materialProduct: MaterialProduct) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: materialProductApi.createMaterialProduct,
    mutationKey: [materialProduct],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useUpdateMaterialProduct = (materialProduct: MaterialProduct) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: materialProductApi.updateMaterialProduct,
    mutationKey: [materialProduct],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useDeleteMaterialProduct = (id: string) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: materialProductApi.deleteMaterialProduct,
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
  useMaterialProductList,
  useMaterialProductById,
  useCreateMaterialProduct,
  useUpdateMaterialProduct,
  useDeleteMaterialProduct,
};
