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

export interface TransformedGreenPoint {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  materialComponent: string;
  availability: string;
  type: string;
  cooperative: string;
  commune: string;
}