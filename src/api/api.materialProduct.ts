import type { MaterialProduct } from "@models/materialProduct.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const materialProductApi = {
  getMaterialProducts: async () => {
    const result = await axios.get<MaterialProduct[]>(
      `${backendApiConfig.baseURL}/materialProducts`
    );

    return result.data;
  },
};
