import * as z from "zod";

export const AdvertisementSchema = z.object({
  id: z.string(),
  durationStart: z.coerce.date().optional(),
  durationEnd: z.coerce.date().optional(),
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  subscriptionId: z.string(),
  paymentCompleted: z.boolean(),
  isArchived: z.boolean(),
  subscription: z.object({ id: z.boolean() }).optional(),
  image: z.string().optional(),
  displayName: z.string(),
});

export type Advertisement = z.infer<typeof AdvertisementSchema>;
