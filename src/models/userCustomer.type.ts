import { z } from "zod";

const UserPointsHistorySchema = z.object({
  id: z.number(),
  userCustomerId: z.string(),
  userId: z.string(),
  pointsChange: z.number(),
  previousPointsCurrent: z.number(),
  newPointsCurrent: z.number(),
  previousPointsTotal: z.number(),
  newPointsTotal: z.number(),
  description: z.string().optional(),
  createdAt: z.string(),
});

export const UserCustomerSchema = z.object({
  id: z.string(),
  pointsCurrent: z.number(),
  pointsTotal: z.number(),
  userId: z.string(),
  pointsHistory: z.array(UserPointsHistorySchema).optional(),
});

const UserCustomerPostSchema = z.object({
  userId: z.string(),
});

const UserCustomerPutSchema = z.object({
  id: z.string(),
  pointsCurrent: z.number().optional(),
  pointsTotal: z.number().optional(),
  userId: z.string().optional(),
});

export type UserCustomer = z.infer<typeof UserCustomerSchema>;
export type UserCustomerPost = z.infer<typeof UserCustomerPostSchema>;
export type UserCustomerPut = z.infer<typeof UserCustomerPutSchema>;
export type UserPointsHistory = z.infer<typeof UserPointsHistorySchema>;
