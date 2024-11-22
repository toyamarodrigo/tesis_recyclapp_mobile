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
});

const BenefitAssignmentPostResponseSchema = z.object({
  benefitId: z.string(),
  generatedCode: z.string(),
  id: z.string(),
  isActive: z.boolean(),
  userCustomerId: z.string(),
});

const BenefitAssignmentPutSchema = z.object({
  id: z.string(),
  benefitId: z.string().optional(),
  userCustomerId: z.string().optional(),
  generatedCode: z.string().optional(),
  isActive: z.boolean().optional(),
});

const BenefitAssignmentPutResponseSchema = z.object({
  benefitId: z.string(),
  generatedCode: z.string(),
  id: z.string(),
  isActive: z.boolean(),
  userCustomerId: z.string(),
});

export type BenefitAssignment = z.infer<typeof BenefitAssignmentSchema>;
export type BenefitAssignmentPost = z.infer<typeof BenefitAssignmentPostSchema>;
export type BenefitAssignmentPostResponse = z.infer<
  typeof BenefitAssignmentPostResponseSchema
>;
export type BenefitAssignmentPut = z.infer<typeof BenefitAssignmentPutSchema>;
export type BenefitAssignmentPutResponse = z.infer<
  typeof BenefitAssignmentPutResponseSchema
>;
