import type {
  BenefitAssignment,
  BenefitAssignmentPost,
  BenefitAssignmentPut,
} from "@models/benefitAssignment.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";
import { Alert } from "react-native";

export const benefitAssignmentApi = {
  getBenefitAssignments: async () => {
    try {
      const result = await axios.get<BenefitAssignment[]>(
        `${backendApiConfig.baseURL}/benefitAssignments`
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
        `${backendApiConfig.baseURL}/benefitAssignment/${id}`
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
      const result = await axios.post<BenefitAssignmentPost>(
        `${backendApiConfig.baseURL}/benefitAssignment`,
        benefitAssignment
      );

      Alert.alert("Éxito", "Se canjeó el beneficio con éxito.");
      return result;
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
      const result = await axios.put<BenefitAssignmentPut>(
        `${backendApiConfig.baseURL}/benefitAssignment/${benefitAssignment.id}`,
        benefitAssignment
      );

      Alert.alert("Éxito", "Se canjeó el beneficio con éxito.");
      return result;
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
  deleteBenefitAssignment: async (id: string) => {
    try {
      const result = await axios.delete<BenefitAssignment>(
        `${backendApiConfig.baseURL}/benefitAssignment/${id}`
      );

      Alert.alert("Éxito", "Se desasignó el beneficio con éxito.");
      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        Alert.alert(
          "Error",
          "Ocurrió un problema al desasignar el beneficio. Intente nuevamente."
        );
        throw new Error(e.message);
      }

      Alert.alert(
        "Error",
        "Ocurrió un problema al desasignar el beneficio. Intente nuevamente."
      );
      throw new Error("Unknown error");
    }
  },
};
