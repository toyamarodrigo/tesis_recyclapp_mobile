import { z } from "zod";
import { BenefitSchema } from "./benefit.type";
import { SubscriptionSchema } from "./subscription.type";
import { UserSchema } from "./user.type";

export const UserStoreSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  userId: z.string(),
  expiryDate: z.coerce.date(), //datetime
  hasBenefits: z.boolean(),
  paymentCompleted: z.boolean(),
  subscriptionId: z.string(),
  subscription: z.object({ id: z.boolean() }),
  User: z.object({ id: z.boolean() }),
  Benefit: z.array(BenefitSchema),
});

const UserStorePostSchema = z.object({
  displayName: z.string(),
  userId: z.string(),
  expiryDate: z.coerce.date(), //datetime
  hasBenefits: z.boolean(),
  paymentCompleted: z.boolean(),
  subscriptionId: z.string(),
  subscription: z.object({ id: z.boolean() }),
  User: z.object({ id: z.boolean() }),
  Benefit: z.array(BenefitSchema),
});

const UserStorePutSchema = z.object({
  id: z.string(),
  displayName: z.string().optional(),
  userId: z.string().optional(),
  expiryDate: z.coerce.date().optional(), //datetime
  hasBenefits: z.boolean().optional(),
  paymentCompleted: z.boolean().optional(),
  subscriptionId: z.string().optional(),
  subscription: z.object({ id: z.boolean() }).optional(),
  User: z.object({ id: z.boolean() }).optional(),
  Benefit: z.array(BenefitSchema).optional(),
});

export type UserStore = z.infer<typeof UserStoreSchema>;
export type UserStorePost = z.infer<typeof UserStorePostSchema>;
export type UserStorePut = z.infer<typeof UserStorePutSchema>;

// model UserStore {
//   id               String       @id @default(cuid())
//   displayName      String       @unique @db.Citext
//   userId           String       @unique
//   expiryDate       DateTime     @db.Date
//   hasBenefits      Boolean      @default(false)
//   paymentCompleted Boolean      @default(false)
//   subscriptionId   String
//   subscription     Subscription @relation(fields: [subscriptionId], references: [id])
//   User             User         @relation(fields: [userId], references: [id], onDelete: Cascade)
//   Benefit          Benefit[]
// }
