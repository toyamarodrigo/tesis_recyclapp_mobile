import { z } from "zod";
import { UserSchema } from "./user.type";
import { BenefitSchema } from "./benefit.type";

export const UserCustomerSchema = z.object({
  id: z.string(),
  pointsCurrent: z.number(),
  pointsTotal: z.number(),
  userId: z.string(),
  User: z.object({ id: z.boolean() }),
  benefitsActive: z.array(BenefitSchema),
  benefitsHistory: z.array(BenefitSchema),
});

const UserCustomerPostSchema = z.object({
  pointsCurrent: z.number(),
  pointsTotal: z.number(),
  userId: z.string(),
  User: z.object({ id: z.boolean() }),
  benefitsActive: z.array(BenefitSchema),
  benefitsHistory: z.array(BenefitSchema),
});

const UserCustomerPutSchema = z.object({
  id: z.string(),
  pointsCurrent: z.number().optional(),
  pointsTotal: z.number().optional(),
  userId: z.string().optional(),
  User: z.object({ id: z.boolean() }),
  benefitsActive: z.array(BenefitSchema),
  benefitsHistory: z.array(BenefitSchema),
});

export type UserCustomer = z.infer<typeof UserCustomerSchema>;
export type UserCustomerPost = z.infer<typeof UserCustomerPostSchema>;
export type UserCustomerPut = z.infer<typeof UserCustomerPutSchema>;

// model UserCustomer {
//   id              String    @id @default(cuid())
//   pointsCurrent   Int       @default(0)
//   pointsTotal     Int       @default(0)
//   userId          String    @unique
//   User            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
//   benefitsActive  Benefit[] @relation("benefitsActive")
//   benefitsHistory Benefit[] @relation("benefitsHistory")
// }
