import { z } from "zod";

export const BenefitAssignmentSchema = z.object({
  id: z.string(),
  benefitId: z.string(),
  userCustomerId: z.string(),
  generatedCode: z.string(),
  isActive: z.boolean(),
  benefit: z.object({ id: z.string() }),
  userCustomer: z.object({ id: z.string() }),
});

const BenefitAssignmentPostSchema = z.object({
  benefitId: z.string(),
  userCustomerId: z.string(),
  isActive: z.boolean(),
});

const BenefitAssignmentPutSchema = z.object({
  id: z.string(),
  benefitId: z.string().optional(),
  userCustomerId: z.string().optional(),
  generatedCode: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type BenefitAssignment = z.infer<typeof BenefitAssignmentSchema>;
export type BenefitAssignmentPost = z.infer<typeof BenefitAssignmentPostSchema>;
export type BenefitAssignmentPut = z.infer<typeof BenefitAssignmentPutSchema>;

// model BenefitAssignment {
//   id             String       @id @default(cuid())
//   benefitId      String
//   userCustomerId String
//   generatedCode  String
//   isActive       Boolean      @default(true)
//   benefit        Benefit      @relation(fields: [benefitId], references: [id])
//   userCustomer   UserCustomer @relation(fields: [userCustomerId], references: [id])
// }
