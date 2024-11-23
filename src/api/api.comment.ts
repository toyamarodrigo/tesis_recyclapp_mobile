import { Comment, CommentCreate } from "@models/comment.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const commentApi = {
  getComments: async () => {
    const result = await axios.get<Comment[]>(
      `${backendApiConfig.baseURL}/comments`
    );

    return result.data;
  },
  getCommentById: async (id: string) => {
    const result = await axios.get<Comment>(
      `${backendApiConfig.baseURL}/comment/${id}`
    );

    return result.data;
  },
  getCommentByPostId: async (postId: string) => {
    const result = await axios.get<Comment[]>(
      `${backendApiConfig.baseURL}/comments/post/${postId}`
    );

    return result.data;
  },
  // TODO: type
  createComment: async (comment: CommentCreate) => {
    try {
      const result = await axios.post<Comment>(
        `${backendApiConfig.baseURL}/comment`,
        comment
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

// router.get("/comments", commentController.getComments);
// router.get("/comment/:id", commentController.getComment);
// router.get("/comments/post/:id", commentController.getCommentsByPostId);
// router.comment("/comment", commentController.createComment);
