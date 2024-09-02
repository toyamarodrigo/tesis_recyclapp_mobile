import { z } from "zod";
import { UserSchema } from "./user.type";

export const RatingSchema = z.object({
  id: z.string(),
  text: z.string(),
  value: z.number(),
  userId: z.string(),
  isArchived: z.boolean(),
  user: z.object({ id: z.boolean() }),
});

const RatingPostSchema = z.object({
  text: z.string(),
  value: z.number(),
  userId: z.string(),
  isArchived: z.boolean(),
  user: z.object({ id: z.boolean() }),
});

const RatingPutSchema = z.object({
  id: z.string(),
  text: z.string().optional(),
  value: z.number().optional(),
  userId: z.string().optional(),
  isArchived: z.boolean().optional(),
  user: z.object({ id: z.boolean() }),
});

export type Rating = z.infer<typeof RatingSchema>;
export type RatingPost = z.infer<typeof RatingPostSchema>;
export type RatingPut = z.infer<typeof RatingPutSchema>;

// model Rating {
//   id         String  @id @default(cuid())
//   text       String  @db.VarChar(255)
//   value      Int
//   userId     String  @unique
//   isArchived Boolean @default(false)
//   user       User    @relation(fields: [userId], references: [id])
// }
