import {
  Advertisement,
  AdvertisementPost,
  AdvertisementPut,
} from "@models/advertisement.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const advertisementApi = {
  getAdvertisement: async () => {
    const result = await axios.get<Advertisement[]>(
      `${backendApiConfig.baseURL}/advertisements`
    );

    return result.data;
  },
  getAdvertisementById: async (id: string) => {
    const result = await axios.get<Advertisement>(
      `${backendApiConfig.baseURL}/advertisement/${id}`
    );

    return result.data;
  },
  createAdvertisement: async (advertisement: AdvertisementPost) => {
    try {
      const result = await axios.post<Advertisement>(
        `${backendApiConfig.baseURL}/advertisement`,
        {
          advertisement,
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
  updateAdvertisement: async (advertisement: AdvertisementPut) => {
    try {
      const result = await axios.put<Advertisement>(
        `${backendApiConfig.baseURL}/advertisement/${advertisement.id}`,
        {
          advertisement,
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
  deleteAdvertisement: async (id: string) => {
    try {
      const result = await axios.delete<Advertisement>(
        `${backendApiConfig.baseURL}/advertisement/${id}`
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

// router.get("/advertisements", advertisementController.getAdvertisements);
// router.get("/advertisement/:id", advertisementController.getAdvertisement);
// router.post("/advertisement", advertisementController.createAdvertisement);
// router.put("/advertisement/:id", advertisementController.updateAdvertisement);
// router.put("/advertisement/", advertisementController.upsertAdvertisement);
// router.delete(
//   "/advertisement/:id",
//   advertisementController.deleteAdvertisement
// );
