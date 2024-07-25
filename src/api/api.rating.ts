import { Rating, RatingPost, RatingPut } from "@models/rating.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const ratingApi = {
  getRating: async () => {
    const result = await axios.get<Rating[]>(
      `${backendApiConfig.baseURL}/ratings`
    );

    return result.data;
  },
  getRatingById: async (id: string) => {
    const result = await axios.get<Rating>(
      `${backendApiConfig.baseURL}/rating/${id}`
    );

    return result.data;
  },
  createRating: async (rating: RatingPost) => {
    try {
      const result = await axios.post<Rating>(
        `${backendApiConfig.baseURL}/rating`,
        {
          rating,
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
  updateRating: async (rating: RatingPut) => {
    try {
      const result = await axios.put<Rating>(
        `${backendApiConfig.baseURL}/rating/${rating.id}`,
        {
          rating,
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
  deleteRating: async (id: string) => {
    try {
      const result = await axios.delete<Rating>(
        `${backendApiConfig.baseURL}/rating/${id}`
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

// router.get("/ratings", ratingController.getRatings);
// router.get("/rating/:id", ratingController.getRating);
// router.post("/rating", ratingController.createRating);
// router.put("/rating/:id", ratingController.updateRating);
// router.delete("/rating/:id", ratingController.deleteRating);
