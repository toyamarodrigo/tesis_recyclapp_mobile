import type { TransformedGreenPoint } from "@models/greenPoint.type";
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
};
