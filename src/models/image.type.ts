import * as z from "zod";

const ImageUploadSchema = z.object({
  imageUploaded: z.string(),
  publicid: z.string(),
  subfolder: z.string(),
});

const ImageDeleteSchema = z.object({
  publicid: z.string(),
});

export type ImageUpload = z.infer<typeof ImageUploadSchema>;
export type ImageDelete = z.infer<typeof ImageDeleteSchema>;
