import { z } from "zod";
import { AddressSchema } from "./address.type";
import { MaterialComponentSchema } from "./materialComponent.type";

export const GreenPointSchema = z.object({
  id: z.string(),
  idpv: z.string(),
  name: z.string(),
  availability: z.string(),
  type: z.string(),
  cooperative: z.string(),
  hasOrganic: z.boolean(),
  isArchived: z.boolean(),
  Address: AddressSchema.optional(),
  materialComponent: z.array(MaterialComponentSchema),
});

const GreenPointPostSchema = z.object({
  idpv: z.string(),
  name: z.string(),
  availability: z.string(),
  type: z.string(),
  cooperative: z.string(),
  hasOrganic: z.boolean(),
  isArchived: z.boolean(),
  Address: AddressSchema.optional(),
  materialComponent: z.array(MaterialComponentSchema),
});

const GreenPointPutSchema = z.object({
  id: z.string(),
  idpv: z.string().optional(),
  name: z.string().optional(),
  availability: z.string().optional(),
  type: z.string().optional(),
  cooperative: z.string().optional(),
  hasOrganic: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  Address: AddressSchema.optional(),
  materialComponent: z.array(MaterialComponentSchema).optional(),
});

export type GreenPoint = z.infer<typeof GreenPointSchema>;
export type GreenPointPost = z.infer<typeof GreenPointPostSchema>;
export type GreenPointPut = z.infer<typeof GreenPointPutSchema>;

// model GreenPoint {
//   id                String              @id @default(cuid())
//   idpv              String              @unique @db.Citext
//   name              String              @db.VarChar(50)
//   availability      Json                @db.Json
//   type              String              @db.VarChar(50)
//   cooperative       String              @db.VarChar(200)
//   hasOrganic        Boolean             @default(false)
//   isArchived        Boolean             @default(false)
//   Address           Address?
//   materialComponent MaterialComponent[] @relation("GreenPointToMaterialComponent")
// }
