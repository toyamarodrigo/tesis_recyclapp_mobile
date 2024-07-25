import { donationKeys } from "@api/query/donation.factory";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DonationPost, DonationPut } from "@models/donation.type";
import { donationApi } from "@api/api.donation";

const useDonationList = () => {
  const { data, error, isError, isLoading } = useQuery(
    donationKeys.donation.list()
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useDonationById = (id: string) => {
  const { data, error, isError, isLoading } = useQuery(
    donationKeys.donation.detail(id)
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

const useCreateDonation = (donation: DonationPost) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: donationApi.createDonation,
    mutationKey: [donation],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useUpdateDonation = (donation: DonationPut) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: donationApi.updateDonation,
    mutationKey: [donation],
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

const useDeleteDonation = (id: string) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: donationApi.deleteDonation,
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
  useDonationList,
  useDonationById,
  useCreateDonation,
  useDeleteDonation,
  useUpdateDonation,
};
