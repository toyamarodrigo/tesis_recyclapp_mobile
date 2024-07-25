import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { donationApi } from "@api/api.donation";

export const donationKeys = createQueryKeyStore({
  donation: {
    list: () => ({
      queryKey: ["donationList"],
      queryFn: () => donationApi.getDonation(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => donationApi.getDonationById(id),
    }),
  },
});
