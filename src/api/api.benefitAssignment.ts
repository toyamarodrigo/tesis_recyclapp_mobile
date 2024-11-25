import type {
  BenefitAssignment,
  BenefitAssignmentPost,
  BenefitAssignmentPostResponse,
  BenefitAssignmentPut,
  BenefitAssignmentPutResponse,
} from "@models/benefitAssignment.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";
import { Alert } from "react-native";

export const benefitAssignmentApi = {
  getBenefitAssignments: async () => {
    try {
      const result = await axios.get<BenefitAssignment[]>(
        `${backendApiConfig.baseURL}/benefitassignments`
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  getBenefitAssignmentById: async (id: string) => {
    try {
      const result = await axios.get<BenefitAssignment>(
        `${backendApiConfig.baseURL}/benefitassignment/${id}`
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  getBenefitAssignmentByClerkId: async (id: string) => {
    try {
      const result = await axios.get<BenefitAssignment[]>(
        `${backendApiConfig.baseURL}/benefitassignment/user/${id}`
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  getBenefitAssignmentByStoreBenefits: async (benefitIds: string[]) => {
    try {
      const result = await axios.post<BenefitAssignment[]>(
        `${backendApiConfig.baseURL}/benefitassignment/storeBenefits`,
        { benefitIds: benefitIds }
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  createBenefitAssignment: async (benefitAssignment: BenefitAssignmentPost) => {
    try {
      const result = await axios.post<BenefitAssignmentPostResponse>(
        `${backendApiConfig.baseURL}/benefitassignment`,
        benefitAssignment
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        Alert.alert(
          "Error",
          "Ocurrió un problema al canjear el beneficio. Intente nuevamente."
        );
        throw new Error(e.message);
      }

      Alert.alert(
        "Error",
        "Ocurrió un problema al canjear el beneficio. Intente nuevamente."
      );
      throw new Error("Unknown error");
    }
  },
  updateBenefitAssignment: async (benefitAssignment: BenefitAssignmentPut) => {
    try {
      const result = await axios.put<BenefitAssignmentPutResponse>(
        `${backendApiConfig.baseURL}/benefitassignment/${benefitAssignment.id}`,
        benefitAssignment
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        Alert.alert(
          "Error",
          "Ocurrió un problema al canjear el beneficio. Intente nuevamente."
        );
        throw new Error(e.message);
      }

      Alert.alert(
        "Error",
        "Ocurrió un problema al canjear el beneficio. Intente nuevamente."
      );
      throw new Error("Unknown error");
    }
  },
};
