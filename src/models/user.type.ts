import * as z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  mail: z.string(),
  phone: z.string(),
  password: z.string(),
  username: z.string(),
  isArchived: z.boolean(),
  createDate: z.coerce.date(),
  userType: z.string(),
});

export type User = z.infer<typeof UserSchema>;
