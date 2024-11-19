import type {
  Benefit,
  BenefitPost,
  BenefitPut,
  BenefitUser,
} from "@models/benefit.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";
import { Alert } from "react-native";

export const benefitApi = {
  getBenefits: async () => {
    try {
      const result = await axios.get<Benefit[]>(
        `${backendApiConfig.baseURL}/benefits`
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  getBenefitById: async (id: string) => {
    try {
      const result = await axios.get<Benefit>(
        `${backendApiConfig.baseURL}/benefit/${id}`
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  createBenefit: async (benefit: BenefitPost) => {
    try {
      const result = await axios.post<BenefitPost>(
        `${backendApiConfig.baseURL}/benefit`,
        benefit
      );

      Alert.alert("Éxito", "Se creó el nuevo beneficio con éxito.");
      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        Alert.alert(
          "Error",
          "Ocurrió un problema al crear el beneficio. Intente nuevamente."
        );
        throw new Error(e.message);
      }

      Alert.alert(
        "Error",
        "Ocurrió un problema al crear el beneficio. Intente nuevamente."
      );
      throw new Error("Unknown error");
    }
  },
  updateBenefit: async (benefit: BenefitPut) => {
    try {
      const result = await axios.put<BenefitPut>(
        `${backendApiConfig.baseURL}/benefit/${benefit.id}`,
        benefit
      );

      console.log("benefit", result);
      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        Alert.alert(
          "Error",
          "Ocurrió un problema al actualizar el beneficio. Intente nuevamente."
        );
        throw new Error(e.message);
      }

      Alert.alert(
        "Error",
        "Ocurrió un problema al actualizar el beneficio. Intente nuevamente."
      );
      throw new Error("Unknown error");
    }
  },
  deleteBenefit: async (id: string) => {
    try {
      const result = await axios.delete<Benefit>(
        `${backendApiConfig.baseURL}/benefit/${id}`
      );

      Alert.alert("Éxito", "Se eliminó el beneficio con éxito.");
      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        Alert.alert(
          "Error",
          "Ocurrió un problema al eliminar el beneficio. Intente nuevamente."
        );
        throw new Error(e.message);
      }

      Alert.alert(
        "Error",
        "Ocurrió un problema al eliminar el beneficio. Intente nuevamente."
      );
      throw new Error("Unknown error");
    }
  },
};
