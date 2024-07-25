import { z } from "zod";

const DonationSchema = z.object({
  id: z.string(),
  name: z.string(),
  mail: z.string(),
  displayName: z.string(),
  durationStart: z.coerce.date().optional(), //datetime
  durationEnd: z.coerce.date().optional(), //datetime
  paymentCompleted: z.boolean(),
  subscriptionId: z.string(),
  isArchived: z.boolean(),
});

const DonationPostSchema = z.object({
  name: z.string(),
  mail: z.string(),
  displayName: z.string(),
  durationStart: z.coerce.date().optional(), //datetime
  durationEnd: z.coerce.date().optional(), //datetime
  paymentCompleted: z.boolean(),
  subscriptionId: z.string(),
  isArchived: z.boolean(),
});

const DonationPutSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  mail: z.string().optional(),
  displayName: z.string().optional(),
  durationStart: z.coerce.date().optional(), //datetime
  durationEnd: z.coerce.date().optional(), //datetime
  paymentCompleted: z.boolean().optional(),
  subscriptionId: z.string().optional(),
  isArchived: z.boolean().optional(),
});

export type Donation = z.infer<typeof DonationSchema>;
export type DonationPost = z.infer<typeof DonationPostSchema>;
export type DonationPut = z.infer<typeof DonationPutSchema>;

// model Donation {
//   id               String    @id @default(cuid())
//   name             String    @db.VarChar(30)
//   mail             String    @unique @db.Citext
//   displayName      String    @db.VarChar(30)
//   durationStart    DateTime? @db.Date
//   durationEnd      DateTime? @db.Date
//   paymentCompleted Boolean   @default(false)
//   subscriptionId   String
//   isArchived       Boolean   @default(false)
// }
