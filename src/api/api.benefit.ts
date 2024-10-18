import type { Benefit, BenefitPost, BenefitPut } from "@models/benefit.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const benefitApi = {
  getBenefits: async () => {
    const result = await axios.get<Benefit[]>(
      `${backendApiConfig.baseURL}/benefits`
    );

    return result.data;
  },
  getBenefitById: async (id: string) => {
    const result = await axios.get<Benefit>(
      `${backendApiConfig.baseURL}/benefit/${id}`
    );

    return result.data;
  },
  createBenefit: async (benefit: BenefitPost) => {
    try {
      const result = await axios.post<BenefitPost>(
        `${backendApiConfig.baseURL}/benefit`,
        benefit
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
  updateBenefit: async (benefit: BenefitPut) => {
    try {
      const result = await axios.put<BenefitPut>(
        `${backendApiConfig.baseURL}/benefit/${benefit.id}`,
        benefit
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
  deleteBenefit: async (id: string) => {
    try {
      const result = await axios.delete<Benefit>(
        `${backendApiConfig.baseURL}/benefit/${id}`
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
