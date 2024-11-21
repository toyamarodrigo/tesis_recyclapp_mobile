import type { Advertisement } from "@models/advertisement.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const advertisementApi = {
  getAdvertisements: async () => {
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
};
