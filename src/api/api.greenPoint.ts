import type {
  GreenPoint,
  GreenPointPost,
  GreenPointPut,
  TransformedGreenPoint,
} from "@models/greenPoint.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const greenPointApi = {
  getGreenPoint: async (): Promise<TransformedGreenPoint[]> => {
    try {
      const response = await axios.get(
        "https://cdn.buenosaires.gob.ar/datosabiertos/datasets/agencia-de-proteccion-ambiental/puntos-verdes/puntos-verdes.geojson"
      );

      const greenPoints: TransformedGreenPoint[] = response.data.features.map(
        (feature) => ({
          id: feature.properties.id,
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0],
          title: feature.properties.nombre,
          description: feature.properties.direccion,
          materialComponent: feature.properties.materiales,
          availability: feature.properties.dia_hora,
          type: feature.properties.tipo,
          cooperative: feature.properties.cooperativ,
          commune: feature.properties.comuna,
        })
      );

      return greenPoints;
    } catch (error) {
      console.error("Error fetching green points:", error);
      throw new Error("Failed to fetch green points");
    }
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
