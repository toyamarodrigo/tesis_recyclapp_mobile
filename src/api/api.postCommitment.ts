import {
  PostCommitment,
  PostCommitmentPost,
  PostCommitmentPut,
} from "@models/postCommitment.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const postCommitmentApi = {
  getPostCommitment: async () => {
    const result = await axios.get<PostCommitment[]>(
      `${backendApiConfig.baseURL}/postCommitments`
    );

    return result.data;
  },
  getPostCommitmentById: async (id: string) => {
    const result = await axios.get<PostCommitment>(
      `${backendApiConfig.baseURL}/postCommitment/${id}`
    );

    return result.data;
  },
  createPostCommitment: async (postCommitment: PostCommitmentPost) => {
    try {
      const result = await axios.post<PostCommitment>(
        `${backendApiConfig.baseURL}/postCommitment`,
        {
          postCommitment,
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
  updatePostCommitment: async (postCommitment: PostCommitmentPut) => {
    try {
      const result = await axios.put<PostCommitment>(
        `${backendApiConfig.baseURL}/postCommitment/${postCommitment.id}`,
        {
          postCommitment,
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
  deletePostCommitment: async (id: string) => {
    try {
      const result = await axios.delete<PostCommitment>(
        `${backendApiConfig.baseURL}/postCommitment/${id}`
      );

      console.log(result);
      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      } else {
        throw new Error("Unknown error");
      }
    }
  },
};

// router.get("/postCommitments", postCommitmentController.getPostCommitments);
// router.get("/postCommitment/:id", postCommitmentController.getPostCommitment);
// router.post("/postCommitment", postCommitmentController.createPostCommitment);
// router.put(
//   "/postCommitment/:id",
//   postCommitmentController.updatePostCommitment
// );
// router.delete(
//   "/postCommitment/:id",
//   postCommitmentController.deletePostCommitment
// );
