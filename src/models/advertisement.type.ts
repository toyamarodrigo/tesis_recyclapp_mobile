import * as z from "zod";

const AdvertisementSchema = z.object({
  id: z.string(),
  durationStart: z.coerce.date(), //datetime
  durationEnd: z.coerce.date(), //datetime
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  subscriptionId: z.string(),
  paymentCompleted: z.boolean(),
  isArchived: z.boolean(),
  //   Image            Image?
});

const AdvertisementPostSchema = z.object({
  durationStart: z.coerce.date(), //datetime
  durationEnd: z.coerce.date(), //datetime
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  subscriptionId: z.string(),
  paymentCompleted: z.boolean(),
  isArchived: z.boolean(),
  //   Image            Image?
});

const AdvertisementPutSchema = z.object({
  id: z.string(),
  durationStart: z.coerce.date(), //datetime
  durationEnd: z.coerce.date(), //datetime
  title: z.string().optional(),
  text: z.string().optional(),
  userId: z.string().optional(),
  subscriptionId: z.string().optional(),
  paymentCompleted: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  //   Image            Image?
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
