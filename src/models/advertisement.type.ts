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
});

export type Advertisement = z.infer<typeof AdvertisementSchema>;

export interface Ad {
  id: string;
  title: string;
  image: string;
  text: string;
}

export interface News {
  id: string;
  title: string;
  image: string;
  description: string;
  source: string;
  extraDescription: {
    type: string;
    content: string;
  }[];
}
