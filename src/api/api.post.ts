import { Post, PostCreate, PostUpdate } from "@models/post.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const postApi = {
  getPosts: async () => {
    const result = await axios.get<Post[]>(`${backendApiConfig.baseURL}/posts`);

    return result.data;
  },
  getPostById: async (id: string) => {
    const result = await axios.get<Post>(
      `${backendApiConfig.baseURL}/post/${id}`
    );

    return result.data;
  },
  getPostByClerkId: async (userId: string) => {
    const result = await axios.get<Post[]>(
      `${backendApiConfig.baseURL}/posts/user/${userId}`
    );

    return result.data;
  },
  createPost: async (post: PostCreate) => {
    try {
      const result = await axios.post<Post>(
        `${backendApiConfig.baseURL}/post`,
        post
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  updatePost: async (post: PostUpdate) => {
    try {
      const result = await axios.put<Post>(
        `${backendApiConfig.baseURL}/post/${post.id}`,

        post
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
};
