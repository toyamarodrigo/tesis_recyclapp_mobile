import { z } from "zod";
import { UserSchema } from "./user.type";
import { AdvertisementSchema } from "./advertisement.type";
import { OrganicSchema } from "./organic.type";
import { MaterialProductSchema } from "./materialProduct.type";
import { MaterialComponentSchema } from "./materialComponent.type";
import { PostSchema } from "./post.type";

export const ImageSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  userId: z.string().optional(),
  advertisementId: z.string(),
  organicId: z.string().optional(),
  materialProductId: z.string().optional(),
  materialComponentId: z.string().optional(),
  postId: z.string().optional(),
  User: UserSchema.pick({ id: true }).optional(),
  Advertisement: z.object({ id: z.boolean() }).optional(),
  Organic: OrganicSchema.pick({ id: true }).optional(),
  MaterialProduct: MaterialProductSchema.pick({ id: true }).optional(),
  MaterialComponent: MaterialComponentSchema.pick({ id: true }).optional(),
  Post: PostSchema.pick({ id: true }).optional(),
});

const ImagePutSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  text: z.string().optional(),
  userId: z.string().optional(),
  advertisementId: z.string().optional(),
  organicId: z.string().optional(),
  materialProductId: z.string().optional(),
  materialComponentId: z.string().optional(),
  postId: z.string().optional(),
  User: UserSchema.pick({ id: true }).optional(),
  Advertisement: AdvertisementSchema.pick({ id: true }).optional(),
  Organic: OrganicSchema.pick({ id: true }).optional(),
  MaterialProduct: MaterialProductSchema.pick({ id: true }).optional(),
  MaterialComponent: MaterialComponentSchema.pick({ id: true }).optional(),
  Post: PostSchema.pick({ id: true }).optional(),
});

export type Image = z.infer<typeof ImageSchema>;
export type ImagePut = z.infer<typeof ImagePutSchema>;

// model Image {
//   id                  String             @id @default(cuid())
//   publicId            String             @unique
//   format              String
//   version             String
//   url                 String
//   userId              String?            @unique
//   advertisementId     String?            @unique
//   organicId           String?            @unique
//   materialProductId   String?            @unique
//   materialComponentId String?            @unique
//   postId              String?            @unique
//   User                User?              @relation(fields: [userId], references: [id], onDelete: Cascade)
//   Advertisement       Advertisement?     @relation(fields: [advertisementId], references: [id], onDelete: Cascade)
//   Organic             Organic?           @relation(fields: [organicId], references: [id], onDelete: Cascade)
//   MaterialProduct     MaterialProduct?   @relation(fields: [materialProductId], references: [id], onDelete: Cascade)
//   MaterialComponent   MaterialComponent? @relation(fields: [materialComponentId], references: [id], onDelete: Cascade)
//   Post                Post?              @relation(fields: [postId], references: [id], onDelete: Cascade)
// }
