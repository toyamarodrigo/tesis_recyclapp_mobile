import { z } from "zod";
import { ChatSchema } from "./chat.type";
import { UserSchema } from "./user.type";

export const ChatMessageSchema = z.object({
  id: z.string(),
  timestamp: z.coerce.date(), //datetime
  message: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  chatId: z.string(),
  isArchived: z.boolean(),
  chat: z.object({ id: z.boolean() }),
  receiver: z.object({ id: z.boolean() }),
  sender: z.object({ id: z.boolean() }),
});

const ChatMessagePostSchema = z.object({
  timestamp: z.coerce.date(), //datetime
  message: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  chatId: z.string(),
  isArchived: z.boolean(),
  chat: z.object({ id: z.boolean() }),
  receiver: z.object({ id: z.boolean() }),
  sender: z.object({ id: z.boolean() }),
});

const ChatMessagePutSchema = z.object({
  id: z.string(),
  timestamp: z.coerce.date().optional(), //datetime
  message: z.string().optional(),
  senderId: z.string().optional(),
  receiverId: z.string().optional(),
  chatId: z.string().optional(),
  isArchived: z.boolean().optional(),
  chat: ChatSchema.pick({ id: true }).optional(),
  receiver: z.object({ id: z.boolean() }).optional(),
  sender: z.object({ id: z.boolean() }).optional(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type ChatMessagePost = z.infer<typeof ChatMessagePostSchema>;
export type ChatMessagePut = z.infer<typeof ChatMessagePutSchema>;

// model ChatMessage {
//   id         String   @id @default(cuid())
//   timestamp  DateTime @default(now())
//   message    String   @db.VarChar(255)
//   senderId   String
//   receiverId String
//   chatId     String
//   isArchived Boolean  @default(false)
//   chat       Chat     @relation(fields: [chatId], references: [id])
//   receiver   User     @relation("chatReceiver", fields: [receiverId], references: [id])
//   sender     User     @relation("chatSender", fields: [senderId], references: [id])
// }
