import type {
  MaterialComponent,
  MaterialComponentPost,
  MaterialComponentPut,
} from "@models/materialComponent.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const materialComponentApi = {
  getMaterialComponent: async () => {
    const result = await axios.get<MaterialComponent[]>(
      `${backendApiConfig.baseURL}/materialComponents`
    );

    return result.data;
  },
  getMaterialComponentById: async (id: string) => {
    const result = await axios.get<MaterialComponent>(
      `${backendApiConfig.baseURL}/materialComponent/${id}`
    );

    return result.data;
  },
  createMaterialComponent: async (materialComponent: MaterialComponentPost) => {
    try {
      const result = await axios.post<MaterialComponent>(
        `${backendApiConfig.baseURL}/materialComponent`,
        {
          materialComponent,
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
  updateMaterialComponent: async (materialComponent: MaterialComponentPut) => {
    try {
      const result = await axios.put<MaterialComponent>(
        `${backendApiConfig.baseURL}/materialComponent/${materialComponent.id}`,
        {
          materialComponent,
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
  deleteMaterialComponent: async (id: string) => {
    try {
      const result = await axios.delete<MaterialComponent>(
        `${backendApiConfig.baseURL}/materialComponent/${id}`
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

// router.get(
//   "/materialComponents",
//   materialComponentController.getMaterialComponents
// );
// router.get(
//   "/materialComponent/:id",
//   materialComponentController.getMaterialComponent
// );
// router.post(
//   "/materialComponent",
//   materialComponentController.createMaterialComponent
// );
// router.put(
//   "/materialComponent/:id",
//   materialComponentController.updateMaterialComponent
// );
// router.delete(
//   "/materialComponent/:id",
//   materialComponentController.deleteMaterialComponent
// );
