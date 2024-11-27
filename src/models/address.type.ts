import * as z from "zod";

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
  userId: z.string(),
  isArchived: z.boolean(),
  displayName: z.string().nullable(),
});

const AddressPostSchema = z.object({
  street: z.string(),
  flat: z.string().optional(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  greenPointId: z.string().optional(),
  userId: z.string(),
  isArchived: z.boolean().optional(),
  displayName: z.string().nullable(),
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
  isArchived: z.boolean().optional(),
  displayName: z.string().nullable(),
});

export type Address = z.infer<typeof AddressSchema>;
export type AddressPost = z.infer<typeof AddressPostSchema>;
export type AddressPut = z.infer<typeof AddressPutSchema>;
