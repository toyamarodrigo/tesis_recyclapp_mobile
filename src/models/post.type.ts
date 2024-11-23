import { z } from "zod";
import { PostCommitmentSchema } from "./postCommitment.type";
import { ChatSchema } from "./chat.type";

export const PostSchema = z.object({
  id: z.string(),
  postNumber: z.number(),
  quantity: z.number(),
  description: z.string(),
  purpouse: z.string(),
  pointsAwarded: z.number(),
  userId: z.string(),
  materialProductId: z.string(),
  isActive: z.boolean(),
  isReserved: z.boolean(),
  isArchived: z.boolean(),
});

const PostCreateSchema = z.object({
  postNumber: z.number(),
  quantity: z.number(),
  description: z.string(),
  purpouse: z.string(),
  pointsAwarded: z.number(),
  userId: z.string(),
  materialProductId: z.string(),
  username: z.string(),
});

// const PostPutSchema = z.object({
//   id: z.string(),
//   postNumber: z.number().optional(),
//   quantity: z.number().optional(),
//   description: z.string().optional(),
//   purpouse: z.string().optional(),
//   pointsAwared: z.number().optional(),
//   userId: z.string().optional(),
//   materialProductId: z.string().optional(),
//   isActive: z.boolean().optional(),
//   Chat: z.array(ChatSchema).optional(),
//   materialProduct: z.object({ id: z.boolean() }).optional(),
//   userPost: z.object({ id: z.boolean() }).optional(),
//   PostCommitment: z.array(PostCommitmentSchema).optional(),
//   image: z.string(),
// });

export type Post = z.infer<typeof PostSchema>;
export type PostCreate = z.infer<typeof PostCreateSchema>;
// export type PostPost = z.infer<typeof PostPostSchema>;
// export type PostPut = z.infer<typeof PostPutSchema>;
