import { z } from "zod";
import { AdvertisementSchema } from "./advertisement.type";
import { UserStoreSchema } from "./userStore.type";

export const SubscriptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number(),
  duration: z.number(),
  isArchived: z.boolean(),
  advertisements: z.array(AdvertisementSchema),
  userStores: z.array(UserStoreSchema),
});

const SubscriptionPostSchema = z.object({
  name: z.string(),
  amount: z.number(),
  duration: z.number(),
  isArchived: z.boolean(),
  advertisements: z.array(AdvertisementSchema),
  userStores: z.array(UserStoreSchema),
});

const SubscriptionPutSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  amount: z.number().optional(),
  duration: z.number().optional(),
  isArchived: z.boolean().optional(),
  advertisements: z.array(AdvertisementSchema).optional(),
  userStores: z.array(UserStoreSchema).optional(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;
export type SubscriptionPost = z.infer<typeof SubscriptionPostSchema>;
export type SubscriptionPut = z.infer<typeof SubscriptionPutSchema>;

// model Subscription {
//   id             String          @id @default(cuid())
//   name           String          @unique @db.Citext
//   amount         Float
//   duration       Int
//   isArchived     Boolean         @default(false)
//   advertisements Advertisement[]
//   userStores     UserStore[]
// }
