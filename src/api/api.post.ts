import { Post, PostPost, PostPut } from "@models/post.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const postApi = {
  getPost: async () => {
    const result = await axios.get<Post[]>(`${backendApiConfig.baseURL}/posts`);

    return result.data;
  },
  getPostById: async (id: string) => {
    const result = await axios.get<Post>(
      `${backendApiConfig.baseURL}/post/${id}`
    );

    return result.data;
  },
  createPost: async (post: PostPost) => {
    try {
      const result = await axios.post<Post>(
        `${backendApiConfig.baseURL}/post`,
        {
          post,
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
  updatePost: async (post: PostPut) => {
    try {
      const result = await axios.put<Post>(
        `${backendApiConfig.baseURL}/post/${post.id}`,
        {
          post,
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
  deletePost: async (id: string) => {
    try {
      const result = await axios.delete<Post>(
        `${backendApiConfig.baseURL}/post/${id}`
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

// router.get("/posts", postController.getPosts);
// router.get("/post/:id", postController.getPost);
// router.post("/post", postController.createPost);
// router.put("/post/:id", postController.updatePost);
// router.delete("/post/:id", postController.deletePost);
