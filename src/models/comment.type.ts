import { z } from "zod";

export const CommentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  userId: z.string(),
  message: z.string(),
  timestamp: z.coerce.date(),
});

const CommentCreateSchema = z.object({
  postId: z.string(),
  userId: z.string(),
  message: z.string(),
});

export type Comment = z.infer<typeof CommentSchema>;
export type CommentCreate = z.infer<typeof CommentCreateSchema>;
