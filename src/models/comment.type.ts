import { z } from "zod";

export const CommentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  userId: z.string(),
  username: z.string(),
  message: z.string(),
  timestamp: z.string(),
});

const CommentCreateSchema = z.object({
  postId: z.string(),
  userId: z.string(),
  username: z.string(),
  message: z.string(),
});

export type Comment = z.infer<typeof CommentSchema>;
export type CommentCreate = z.infer<typeof CommentCreateSchema>;
