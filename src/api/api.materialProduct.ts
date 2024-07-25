import {
  MaterialProduct,
  MaterialProductPost,
  MaterialProductPut,
} from "@models/materialProduct.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const materialProductApi = {
  getMaterialProduct: async () => {
    const result = await axios.get<MaterialProduct[]>(
      `${backendApiConfig.baseURL}/materialProducts`
    );

    return result.data;
  },
  getMaterialProductById: async (id: string) => {
    const result = await axios.get<MaterialProduct>(
      `${backendApiConfig.baseURL}/materialProduct/${id}`
    );

    return result.data;
  },
  createMaterialProduct: async (materialProduct: MaterialProductPost) => {
    try {
      const result = await axios.post<MaterialProduct>(
        `${backendApiConfig.baseURL}/materialProduct`,
        {
          materialProduct,
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
  updateMaterialProduct: async (materialProduct: MaterialProductPut) => {
    try {
      const result = await axios.put<MaterialProduct>(
        `${backendApiConfig.baseURL}/materialProduct/${materialProduct.id}`,
        {
          materialProduct,
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
  deleteMaterialProduct: async (id: string) => {
    try {
      const result = await axios.delete<MaterialProduct>(
        `${backendApiConfig.baseURL}/materialProduct/${id}`
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

// router.get("/materialProducts", materialProductController.getMaterialProducts);
// router.get(
//   "/materialProduct/:id",
//   materialProductController.getMaterialProduct
// );
// router.post(
//   "/materialProduct",
//   materialProductController.createMaterialProduct
// );
// router.put(
//   "/materialProduct/:id",
//   materialProductController.updateMaterialProduct
// );
// router.delete(
//   "/materialProduct/:id",
//   materialProductController.deleteMaterialProduct
// );
