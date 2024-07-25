import * as z from "zod";
import { PostSchema } from "./post.type";
import { ChatMessageSchema } from "./chatMessage.type";

export const ChatSchema = z.object({
  id: z.string(),
  postId: z.string(),
  startDate: z.coerce.date(), //datetime
  endDate: z.coerce.date().optional(), //datetime
  isActive: z.boolean(),
  isArchived: z.boolean(),
  post: PostSchema.pick({ id: true }),
  ChatMessage: z.array(ChatMessageSchema),
});

const ChatPostSchema = z.object({
  postId: z.string(),
  startDate: z.coerce.date(), //datetime
  endDate: z.coerce.date().optional(), //datetime
  isActive: z.boolean(),
  isArchived: z.boolean(),
  post: PostSchema.pick({ id: true }),
  ChatMessage: z.array(ChatMessageSchema),
});

const ChatPutSchema = z.object({
  id: z.string(),
  postId: z.string().optional(),
  startDate: z.coerce.date().optional(), //datetime
  endDate: z.coerce.date().optional(), //datetime
  isActive: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  post: PostSchema.pick({ id: true }).optional(),
  ChatMessage: z.array(ChatMessageSchema).optional(),
});

export type Chat = z.infer<typeof ChatSchema>;
export type ChatPost = z.infer<typeof ChatPostSchema>;
export type ChatPut = z.infer<typeof ChatPutSchema>;

// model Chat {
//   id          String        @id @default(cuid())
//   postId      String
//   startDate   DateTime      @db.Date
//   endDate     DateTime?     @db.Date
//   isActive    Boolean       @default(true)
//   isArchived  Boolean       @default(false)
//   post        Post          @relation(fields: [postId], references: [id])
//   ChatMessage ChatMessage[]
// }
