import { z } from "zod";
import { UserCustomerSchema } from "./userCustomer.type";

export const BenefitSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  endDate: z.coerce.date(), //datetime
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
  endDate: z.coerce.date(), //datetime
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
  endDate: z.coerce.date().optional(), //datetime
  quantity: z.number().optional(),
  pointsCost: z.number().optional(),
  // userStoreId: z.string(),
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

// model Benefit {
//   id                  String         @id @default(cuid())
//   name                String         @db.VarChar(20)
//   type                BenefitType
//   endDate             DateTime       @db.Date
//   quantity            Int
//   pointsCost          Int
//   userStoreId         String
//   isActive            Boolean        @default(true)
//   isArchived          Boolean        @default(false)
//   userStore           UserStore      @relation(fields: [userStoreId], references: [id])
//   userCustomerActive  UserCustomer[] @relation("benefitsActive")
//   userCustomerHistory UserCustomer[] @relation("benefitsHistory")
// }
