import { Donation, DonationPost, DonationPut } from "@models/donation.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const donationApi = {
  getDonation: async () => {
    const result = await axios.get<Donation[]>(
      `${backendApiConfig.baseURL}/donations`
    );

    return result.data;
  },
  getDonationById: async (id: string) => {
    const result = await axios.get<Donation>(
      `${backendApiConfig.baseURL}/donation/${id}`
    );

    return result.data;
  },
  createDonation: async (donation: DonationPost) => {
    try {
      const result = await axios.post<Donation>(
        `${backendApiConfig.baseURL}/donation`,
        {
          donation,
        }
      );

      console.log(result);
      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  updateDonation: async (donation: DonationPut) => {
    try {
      const result = await axios.put<Donation>(
        `${backendApiConfig.baseURL}/donation/${donation.id}`,
        {
          donation,
        }
      );

      console.log(result);
      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  deleteDonation: async (id: string) => {
    try {
      const result = await axios.delete<Donation>(
        `${backendApiConfig.baseURL}/donation/${id}`
      );

      console.log(result);
      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
};

// router.get("/donations", donationController.getDonations);
// router.get("/donation/:id", donationController.getDonation);
// router.post("/donation", donationController.createDonation);
// router.put("/donation/:id", donationController.updateDonation);
// router.put("/donation/", donationController.upsertDonation);
// router.delete("/donation/:id", donationController.deleteDonation);
