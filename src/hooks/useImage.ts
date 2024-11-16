import { imageApi } from "@api/api.imagen";
import { ImageDelete, ImageUpload } from "@models/image.type";
import { useMutation } from "@tanstack/react-query";

const useCreateAddress = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (image: ImageUpload) => imageApi.uploadImage(image),
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useDeleteAddress = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (image: ImageDelete) => imageApi.deleteImage(image),
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

export { useCreateAddress, useDeleteAddress };
