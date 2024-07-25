import { ratingKeys } from "@api/query/rating.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { RatingPost, RatingPut } from "@models/rating.type";
import { ratingApi } from "@api/api.rating";

const useRatingList = () => {
  const { data, error, isError, isLoading } = useQuery(
    ratingKeys.rating.list()
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useRatingById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    ratingKeys.rating.detail(id)
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useCreateRating = (rating: RatingPost) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ratingApi.createRating,
    mutationKey: [rating],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useUpdateRating = (rating: RatingPut) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ratingApi.updateRating,
    mutationKey: [rating],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useDeleteRating = (id: string) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ratingApi.deleteRating,
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
  useRatingList,
  useRatingById,
  useCreateRating,
  useUpdateRating,
  useDeleteRating,
};
