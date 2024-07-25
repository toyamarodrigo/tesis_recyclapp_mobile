import {
  GreenPoint,
  GreenPointPost,
  GreenPointPut,
} from "@models/greenPoint.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const greenPointApi = {
  getGreenPoint: async () => {
    const result = await axios.get<GreenPoint[]>(
      `${backendApiConfig.baseURL}/greenPoints`
    );

    return result.data;
  },
  getGreenPointById: async (id: string) => {
    const result = await axios.get<GreenPoint>(
      `${backendApiConfig.baseURL}/greenPoint/${id}`
    );

    return result.data;
  },
  createGreenPoint: async (greenPoint: GreenPointPost) => {
    try {
      const result = await axios.post<GreenPoint>(
        `${backendApiConfig.baseURL}/greenPoint`,
        {
          greenPoint,
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
  updateGreenPoint: async (greenPoint: GreenPointPut) => {
    try {
      const result = await axios.put<GreenPoint>(
        `${backendApiConfig.baseURL}/greenPoint/${greenPoint.id}`,
        {
          greenPoint,
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
  deleteGreenPoint: async (id: string) => {
    try {
      const result = await axios.delete<GreenPoint>(
        `${backendApiConfig.baseURL}/greenPoint/${id}`
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

// router.get("/greenPoints", greenPointController.getGreenPoints);
// router.get("/greenPoint/:id", greenPointController.getGreenPoint);
// router.post("/greenPoint", greenPointController.createGreenPoint);
// router.put("/greenPoint/:id", greenPointController.updateGreenPoint);
// router.delete("/greenPoint/:id", greenPointController.deleteGreenPoint);
