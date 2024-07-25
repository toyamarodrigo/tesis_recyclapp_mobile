import { z } from "zod";
import { MaterialComponentSchema } from "./materialComponent.type";
import { PostSchema } from "./post.type";
import { ImageSchema } from "./image.type";

export const MaterialProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  isArchived: z.boolean(),
  materialComponent: z.array(MaterialComponentSchema),
  Post: z.array(PostSchema),
  Image: ImageSchema.optional(),
});

const MaterialProductPostSchema = z.object({
  name: z.string(),
  isArchived: z.boolean(),
  materialComponent: z.array(MaterialComponentSchema),
  Post: z.array(PostSchema),
  Image: ImageSchema.optional(),
});

const MaterialProductPutSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  isArchived: z.boolean().optional(),
  materialComponent: z.array(MaterialComponentSchema).optional(),
  Post: z.array(PostSchema).optional(),
  Image: ImageSchema.optional(),
});

export type MaterialProduct = z.infer<typeof MaterialProductSchema>;
export type MaterialProductPost = z.infer<typeof MaterialProductPostSchema>;
export type MaterialProductPut = z.infer<typeof MaterialProductPutSchema>;

// model MaterialProduct {
//   id                String              @id @default(cuid())
//   name              String              @unique @db.Citext
//   isArchived        Boolean             @default(false)
//   materialComponent MaterialComponent[] @relation("MaterialProductToMaterialComponent")
//   Post              Post[]
//   Image             Image?
// }
