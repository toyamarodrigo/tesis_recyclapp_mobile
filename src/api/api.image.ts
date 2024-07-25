import { Image, ImagePut } from "@models/image.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const imageApi = {
  getImage: async () => {
    const result = await axios.get<Image[]>(
      `${backendApiConfig.baseURL}/images`
    );

    return result.data;
  },
  getImageById: async (id: string) => {
    const result = await axios.get<Image>(
      `${backendApiConfig.baseURL}/image/${id}`
    );

    return result.data;
  },
  updateImage: async (image: ImagePut) => {
    try {
      const result = await axios.put<Image>(
        `${backendApiConfig.baseURL}/image/${image.id}`,
        {
          image,
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
  deleteImage: async (id: string) => {
    try {
      const result = await axios.delete<Image>(
        `${backendApiConfig.baseURL}/image/${id}`
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

// router.get("/images", imagesController.getImages);
// router.get("/image/:id", imagesController.getImage);
// router.put("/image", upload.single("image_file"), imagesController.upsertImage);
// router.delete("/image/:id", imagesController.deleteImage);
// TODO revisar que Image no tiene POST
