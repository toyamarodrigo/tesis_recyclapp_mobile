import type { MaterialComponent } from "@models/materialComponent.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const materialComponentApi = {
  getMaterialComponent: async () => {
    const result = await axios.get<MaterialComponent[]>(
      `${backendApiConfig.baseURL}/materialComponents`
    );

    return result.data;
  },
};
