import { materialProductKeys } from "@api/query/materialProduct.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { MaterialProduct } from "@models/materialProduct.type";
import { materialProductApi } from "@api/api.materialProduct";

const useMaterialProductList = () => {
  const { data, error, isError, isLoading } = useQuery(
    materialProductKeys.materialProduct.list()
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useMaterialProductById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    materialProductKeys.materialProduct.detail(id)
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
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
