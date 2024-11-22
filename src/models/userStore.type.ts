import { z } from "zod";
import { BenefitSchema } from "./benefit.type";

export const UserStoreSchema = z.object({
  id: z.string(),
  userId: z.string(),
  expiryDate: z.coerce.date(),
  hasBenefits: z.boolean(),
  paymentCompleted: z.boolean(),
  subscriptionId: z.string(),
  subscription: z.object({ id: z.string() }),
  Benefit: z.array(BenefitSchema),
});

const UserStorePostSchema = z.object({
  userId: z.string(),
  expiryDate: z.coerce.date(),
  hasBenefits: z.boolean(),
  paymentCompleted: z.boolean(),
  subscriptionId: z.string(),
  subscription: z.object({ id: z.string() }),
  Benefit: z.array(BenefitSchema),
});

const UserStorePutSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  expiryDate: z.coerce.date().optional(),
  hasBenefits: z.boolean().optional(),
  paymentCompleted: z.boolean().optional(),
  subscriptionId: z.string().optional(),
  subscription: z.object({ id: z.string() }).optional(),
  Benefit: z.array(BenefitSchema).optional(),
});

export type UserStore = z.infer<typeof UserStoreSchema>;
export type UserStorePost = z.infer<typeof UserStorePostSchema>;
export type UserStorePut = z.infer<typeof UserStorePutSchema>;
