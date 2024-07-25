import { advertisementKeys } from "@api/query/advertisement.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  AdvertisementPost,
  AdvertisementPut,
} from "@models/advertisement.type";
import { advertisementApi } from "@api/api.advertisement";

const useAdvertisementList = () => {
  const { data, error, isError, isLoading } = useQuery(
    advertisementKeys.advertisement.list()
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useAdvertisementById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    advertisementKeys.advertisement.detail(id)
  );

  return { data, error, isError, isLoading };
};

const useCreateAdvertisement = (advertisement: AdvertisementPost) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: advertisementApi.createAdvertisement,
    mutationKey: [advertisement],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useUpdateAdvertisement = (advertisement: AdvertisementPut) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: advertisementApi.updateAdvertisement,
    mutationKey: [advertisement],
  });

  return { mutate, isPending, isError, error };
};

const useDeleteAdvertisement = (id: string) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: advertisementApi.deleteAdvertisement,
    mutationKey: [id],
  });

  return { mutate, isPending, isError, error };
};
