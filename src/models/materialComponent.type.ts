import { z } from "zod";

export const MaterialComponentSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  description: z.string(),
  isArchived: z.boolean(),
  isRecyclable: z.boolean(),
  materialProductId: z.string(),
});

const MaterialComponentPostSchema = z.object({
  name: z.string(),
  icon: z.string(),
  description: z.string(),
  isArchived: z.boolean(),
  isRecyclable: z.boolean(),
  materialProductId: z.string(),
});

const MaterialComponentPutSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  icon: z.string().optional(),
  description: z.string().optional(),
  isArchived: z.boolean().optional(),
  isRecyclable: z.boolean().optional(),
  materialProductId: z.string().optional(),
});

export type MaterialComponent = z.infer<typeof MaterialComponentSchema>;
export type MaterialComponentPost = z.infer<typeof MaterialComponentPostSchema>;
export type MaterialComponentPut = z.infer<typeof MaterialComponentPutSchema>;

