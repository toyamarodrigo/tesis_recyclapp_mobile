import * as z from "zod";
import { ImageSchema } from "./image.type";
import { SubscriptionSchema } from "./subscription.type";
import { UserSchema } from "./user.type";

export const AdvertisementSchema = z.object({
  id: z.string(),
  durationStart: z.coerce.date().optional(), //datetime
  durationEnd: z.coerce.date().optional(), //datetime
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  subscriptionId: z.string(),
  paymentCompleted: z.boolean(),
  isArchived: z.boolean(),
  subscription: z.object({ id: z.boolean() }).optional(),
  user: z.object({ id: z.boolean() }),
  // Image: ImageSchema.optional(),
});

const AdvertisementPostSchema = z.object({
  durationStart: z.coerce.date().optional(), //datetime
  durationEnd: z.coerce.date().optional(), //datetime
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  subscriptionId: z.string(),
  paymentCompleted: z.boolean(),
  isArchived: z.boolean(),
  subscription: SubscriptionSchema.pick({ id: true }),
  user: UserSchema.pick({ id: true }),
  Image: ImageSchema.optional(),
});

const AdvertisementPutSchema = z.object({
  id: z.string(),
  durationStart: z.coerce.date().optional(), //datetime
  durationEnd: z.coerce.date().optional(), //datetime
  title: z.string().optional(),
  text: z.string().optional(),
  userId: z.string().optional(),
  subscriptionId: z.string().optional(),
  paymentCompleted: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  subscription: SubscriptionSchema.pick({ id: true }).optional(),
  user: UserSchema.pick({ id: true }).optional(),
  Image: ImageSchema.optional(),
});

export type Advertisement = z.infer<typeof AdvertisementSchema>;
export type AdvertisementPost = z.infer<typeof AdvertisementPostSchema>;
export type AdvertisementPut = z.infer<typeof AdvertisementPutSchema>;

// model Advertisement {
//   id               String       @id @default(cuid())
//   durationStart    DateTime?    @db.Date
//   durationEnd      DateTime?    @db.Date
//   title            String       @db.VarChar(30)
//   text             String       @db.VarChar(255)
//   userId           String
//   subscriptionId   String
//   paymentCompleted Boolean      @default(false)
//   isArchived       Boolean      @default(false)
//   subscription     Subscription @relation(fields: [subscriptionId], references: [id])
//   user             User         @relation(fields: [userId], references: [id])
//   Image            Image?
// }
