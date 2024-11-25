import { z } from "zod";
import { UserCustomerSchema } from "./userCustomer.type";

export const BenefitSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  endDate: z.coerce.date(),
  quantity: z.number(),
  pointsCost: z.number(),
  userStoreId: z.string(),
  isActive: z.boolean(),
  isArchived: z.boolean(),
  userStore: z.object({ id: z.string() }),
  userCustomerActive: z.array(UserCustomerSchema),
  userCustomerHistory: z.array(UserCustomerSchema),
});

const BenefitPostSchema = z.object({
  name: z.string(),
  type: z.string(),
  endDate: z.coerce.date(),
  quantity: z.number(),
  pointsCost: z.number(),
  userStoreId: z.string(),
  isActive: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  userStore: z.object({ id: z.string() }).optional(),
  userCustomerActive: z.array(UserCustomerSchema).optional(),
  userCustomerHistory: z.array(UserCustomerSchema).optional(),
});

const BenefitPutSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  type: z.string().optional(),
  endDate: z.coerce.date().optional(),
  quantity: z.number().optional(),
  pointsCost: z.number().optional(),
  isActive: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  userStore: z.object({ id: z.string() }).optional(),
  userCustomerActive: z.array(UserCustomerSchema).optional(),
  userCustomerHistory: z.array(UserCustomerSchema).optional(),
});

const BenefitUserSchema = z.object({
  idBenefit: z.string(),
  idUser: z.string(),
});

const BenefitPutResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  pointsCost: z.number(),
  quantity: z.number(),
  type: z.string(),
  userStoreId: z.string(),
  endDate: z.coerce.date(),
  isActive: z.boolean(),
  isArchived: z.boolean(),
});

export type Benefit = z.infer<typeof BenefitSchema>;
export type BenefitPost = z.infer<typeof BenefitPostSchema>;
export type BenefitPut = z.infer<typeof BenefitPutSchema>;
export type BenefitPutResponse = z.infer<typeof BenefitPutResponseSchema>;
export type BenefitUser = z.infer<typeof BenefitUserSchema>;
