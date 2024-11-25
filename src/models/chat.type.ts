import * as z from "zod";
import { ChatMessageSchema } from "./chatMessage.type";

export const ChatSchema = z.object({
  id: z.string(),
  postId: z.string(),
  userPostId: z.string(),
  userCommentId: z.string(),
  generatedCode: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  isActive: z.boolean(),
  isArchived: z.boolean(),
  ChatMessage: z.array(ChatMessageSchema),
});

const ChatPostSchema = z.object({
  postId: z.string(),
  userPostId: z.string(),
  userCommentId: z.string(),
});

const ChatPutSchema = z.object({
  id: z.string(),
  endDate: z.coerce.date(),
  isActive: z.boolean(),
  isArchived: z.boolean(),
});

const ChatUniqueSchema = z.object({
  postId: z.string(),
  userPostId: z.string(),
  userCommentId: z.string(),
});

export type Chat = z.infer<typeof ChatSchema>;
export type ChatCreate = z.infer<typeof ChatPostSchema>;
export type ChatUpdate = z.infer<typeof ChatPutSchema>;
export type ChatUnique = z.infer<typeof ChatUniqueSchema>;
