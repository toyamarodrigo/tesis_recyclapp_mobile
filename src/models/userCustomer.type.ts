import { z } from "zod";

export const UserCustomerSchema = z.object({
  id: z.string(),
  pointsCurrent: z.string(),
  pointsTotal: z.string(),
  userId: z.string(),
});

const UserCustomerPostSchema = z.object({
  userId: z.string(),
});

const UserCustomerPutSchema = z.object({
  id: z.string(),
  pointsCurrent: z.string().optional(),
  pointsTotal: z.string().optional(),
  userId: z.string().optional(),
});

export type UserCustomer = z.infer<typeof UserCustomerSchema>;
export type UserCustomerPost = z.infer<typeof UserCustomerPostSchema>;
export type UserCustomerPut = z.infer<typeof UserCustomerPutSchema>;
