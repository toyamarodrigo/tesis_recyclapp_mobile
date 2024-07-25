import { z } from "zod";
import { PostSchema } from "./post.type";

export const PostCommitmentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  tokenCode: z.string(),
  isActive: z.boolean(),
  isArchived: z.boolean(),
  post: PostSchema.pick({ id: true }),
});

const PostCommitmentPostSchema = z.object({
  postId: z.string(),
  tokenCode: z.string(),
  isActive: z.boolean(),
  isArchived: z.boolean(),
  post: PostSchema.pick({ id: true }),
});

const PostCommitmentPutSchema = z.object({
  id: z.string(),
  postId: z.string().optional(),
  tokenCode: z.string().optional(),
  isActive: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  post: PostSchema.pick({ id: true }).optional(),
});

export type PostCommitment = z.infer<typeof PostCommitmentSchema>;
export type PostCommitmentPost = z.infer<typeof PostCommitmentPostSchema>;
export type PostCommitmentPut = z.infer<typeof PostCommitmentPutSchema>;

// model PostCommitment {
//   id         String  @id @default(cuid())
//   postId     String
//   tokenCode  String  @db.VarChar(25)
//   isActive   Boolean @default(true)
//   isArchived Boolean @default(false)
//   post       Post    @relation(fields: [postId], references: [id])
// }
