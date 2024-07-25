import * as z from "zod";
import { GreenPointSchema } from "./greenPoint.type";
import { UserSchema } from "./user.type";

export const AddressSchema = z.object({
  id: z.string(),
  street: z.string(),
  flat: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  greenPointId: z.string().optional(),
  userId: z.string().optional(),
  isArchived: z.string(),
  GreenPoint: GreenPointSchema.pick({ id: true }).optional(),
  User: UserSchema.pick({ id: true }).optional(),
});

const AddressPostSchema = z.object({
  street: z.string(),
  flat: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  greenPointId: z.string().optional(),
  userId: z.string().optional(),
  isArchived: z.string(),
  GreenPoint: GreenPointSchema.pick({ id: true }).optional(),
  User: UserSchema.pick({ id: true }).optional(),
});

const AddressPutSchema = z.object({
  id: z.string(),
  street: z.string().optional(),
  flat: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  greenPointId: z.string().optional(),
  userId: z.string().optional(),
  isArchived: z.string().optional(),
  GreenPoint: GreenPointSchema.pick({ id: true }).optional(),
  User: UserSchema.pick({ id: true }).optional(),
});

export type Address = z.infer<typeof AddressSchema>;
export type AddressPost = z.infer<typeof AddressPostSchema>;
export type AddressPut = z.infer<typeof AddressPutSchema>;

// model Address {
//   id           String      @id @default(cuid())
//   street       String      @db.VarChar(50) //calle y numero
//   flat         String      @db.VarChar(10) //dpto?
//   city         String      @db.VarChar(50) //barrio/localidad
//   state        String      @db.VarChar(50) //provincia/CABA
//   latitude     Float
//   longitude    Float
//   greenPointId String?     @unique
//   userId       String?
//   isArchived   Boolean     @default(false)
//   GreenPoint   GreenPoint? @relation(fields: [greenPointId], references: [id])
//   User         User?       @relation(fields: [userId], references: [id])
// }
