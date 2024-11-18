import { z } from "zod";

export const MaterialProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string().optional(),
  isArchived: z.boolean(),
});

const MaterialProductPostSchema = z.object({
  name: z.string(),
  color: z.string().optional(),
  isArchived: z.boolean(),
});

const MaterialProductPutSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  color: z.string().optional(),
  isArchived: z.boolean().optional(),
});

export type MaterialProduct = z.infer<typeof MaterialProductSchema>;
export type MaterialProductPost = z.infer<typeof MaterialProductPostSchema>;
export type MaterialProductPut = z.infer<typeof MaterialProductPutSchema>;
