import { z } from "zod";
import { GreenPointSchema } from "./greenPoint.type";
import { MaterialProductSchema } from "./materialProduct.type";
import { ImageSchema } from "./image.type";

export const MaterialComponentSchema = z.object({
  id: z.string(),
  name: z.string(),
  recyclableType: z.string(),
  description: z.string(),
  isArchived: z.boolean(),
  GreenPoint: z.array(GreenPointSchema),
  MaterialProduct: z.array(MaterialProductSchema),
  Image: ImageSchema.optional(),
});

const MaterialComponentPostSchema = z.object({
  name: z.string(),
  recyclableType: z.string(),
  description: z.string(),
  isArchived: z.boolean(),
  GreenPoint: z.array(GreenPointSchema),
  MaterialProduct: z.array(MaterialProductSchema),
  Image: ImageSchema.optional(),
});

const MaterialComponentPutSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  recyclableType: z.string().optional(),
  description: z.string().optional(),
  isArchived: z.boolean().optional(),
  GreenPoint: z.array(GreenPointSchema).optional(),
  MaterialProduct: z.array(MaterialProductSchema).optional(),
  Image: ImageSchema.optional(),
});

export type MaterialComponent = z.infer<typeof MaterialComponentSchema>;
export type MaterialComponentPost = z.infer<typeof MaterialComponentPostSchema>;
export type MaterialComponentPut = z.infer<typeof MaterialComponentPutSchema>;

// model MaterialComponent {
//   id              String            @id @default(cuid())
//   name            String            @unique @db.Citext
//   recyclableType  RecyclableType
//   description     String            @db.VarChar(1024)
//   isArchived      Boolean           @default(false)
//   GreenPoint      GreenPoint[]      @relation("GreenPointToMaterialComponent")
//   MaterialProduct MaterialProduct[] @relation("MaterialProductToMaterialComponent")
//   Image           Image?
// }
