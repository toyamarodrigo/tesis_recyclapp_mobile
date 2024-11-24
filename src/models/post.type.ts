import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  description: z.string(),
  purpouse: z.string(),
  pointsAwarded: z.number(),
  userId: z.string(),
  materialProductId: z.string(),
  username: z.string(),
  isActive: z.boolean(),
  isArchived: z.boolean(),
});

const PostCreateSchema = z.object({
  quantity: z.number(),
  description: z.string(),
  purpouse: z.string(),
  pointsAwarded: z.number(),
  userId: z.string(),
  materialProductId: z.string(),
  username: z.string(),
});

const PostPutSchema = z.object({
  id: z.string(),
  quantity: z.number().optional(),
  description: z.string().optional(),
  purpouse: z.string().optional(),
  pointsAwarded: z.number().optional(),
  userId: z.string().optional(),
  materialProductId: z.string().optional(),
  username: z.string().optional(),
  isActive: z.boolean().optional(),
  isArchived: z.boolean().optional(),
});

export type Post = z.infer<typeof PostSchema>;
export type PostCreate = z.infer<typeof PostCreateSchema>;
export type PostUpdate = z.infer<typeof PostPutSchema>;
