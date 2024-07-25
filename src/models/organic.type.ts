import { z } from "zod";
import { ImageSchema } from "./image.type";

export const OrganicSchema = z.object({
  id: z.string(),
  name: z.string(),
  isCompostable: z.boolean(),
  isArchived: z.boolean(),
  Image: ImageSchema.optional(),
});

const OrganicPostSchema = z.object({
  name: z.string(),
  isCompostable: z.boolean(),
  isArchived: z.boolean(),
  Image: ImageSchema.optional(),
});

const OrganicPutSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  isCompostable: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  Image: ImageSchema.optional(),
});

export type Organic = z.infer<typeof OrganicSchema>;
export type OrganicPost = z.infer<typeof OrganicPostSchema>;
export type OrganicPut = z.infer<typeof OrganicPutSchema>;

// model Organic {
//   id            String  @id @default(cuid())
//   name          String  @unique @db.Citext
//   isCompostable Boolean
//   isArchived    Boolean @default(false)
//   Image         Image?
// }
