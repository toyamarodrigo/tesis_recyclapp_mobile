import { imageKeys } from "@api/query/image.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ImagePut } from "@models/image.type";
import { imageApi } from "@api/api.image";

const useImageList = () => {
  const { data, error, isError, isLoading } = useQuery(imageKeys.image.list());

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useImageById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    imageKeys.image.detail(id)
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useUpdateImage = (image: ImagePut) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: imageApi.updateImage,
    mutationKey: [image],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useDeleteImage = (id: string) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: imageApi.deleteImage,
    mutationKey: [id],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

export { useImageList, useImageById, useDeleteImage, useUpdateImage };
