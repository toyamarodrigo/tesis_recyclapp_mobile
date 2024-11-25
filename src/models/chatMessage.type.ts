import { z } from "zod";

export const ChatMessageSchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  message: z.string(),
  senderId: z.string(),
  senderUsername: z.string(),
  chatId: z.string(),
  isArchived: z.boolean(),
});

const ChatMessagePostSchema = z.object({
  message: z.string(),
  senderId: z.string(),
  senderUsername: z.string(),
  chatId: z.string(),
});

const ChatMessagePutSchema = z.object({
  id: z.string(),
  message: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  isArchived: z.boolean().optional(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type ChatMessageCreate = z.infer<typeof ChatMessagePostSchema>;
export type ChatMessagePut = z.infer<typeof ChatMessagePutSchema>;
