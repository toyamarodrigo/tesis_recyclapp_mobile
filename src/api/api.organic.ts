import { Organic, OrganicPost, OrganicPut } from "@models/organic.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const organicApi = {
  getOrganic: async () => {
    const result = await axios.get<Organic[]>(
      `${backendApiConfig.baseURL}/organics`
    );

    return result.data;
  },
  getOrganicById: async (id: string) => {
    const result = await axios.get<Organic>(
      `${backendApiConfig.baseURL}/organic/${id}`
    );

    return result.data;
  },
  createOrganic: async (organic: OrganicPost) => {
    try {
      const result = await axios.post<Organic>(
        `${backendApiConfig.baseURL}/organic`,
        {
          organic,
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
  updateOrganic: async (organic: OrganicPut) => {
    try {
      const result = await axios.put<Organic>(
        `${backendApiConfig.baseURL}/organic/${organic.id}`,
        {
          organic,
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
  deleteOrganic: async (id: string) => {
    try {
      const result = await axios.delete<Organic>(
        `${backendApiConfig.baseURL}/organic/${id}`
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

// router.get("/organics", organicController.getOrganics);
// router.get("/organic/:id", organicController.getOrganic);
// router.post("/organic", organicController.createOrganic);
// router.put("/organic/:id", organicController.updateOrganic);
// router.delete("/organic/:id", organicController.deleteOrganic);
