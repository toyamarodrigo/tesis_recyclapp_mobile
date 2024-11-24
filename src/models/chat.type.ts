import * as z from "zod";
import { ChatMessageSchema } from "./chatMessage.type";

export const ChatSchema = z.object({
  id: z.string(),
  postId: z.string(),
  userPostId: z.string(),
  userCommentId: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
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
  endDate: z.string().optional(),
  isActive: z.boolean().optional(),
  isArchived: z.boolean().optional(),
});

const ChatUniqueSchema = z.object({
  postId: z.string(),
  userPostId: z.string(),
  userCommentId: z.string(),
});

export type Chat = z.infer<typeof ChatSchema>;
export type ChatCreate = z.infer<typeof ChatPostSchema>;
export type ChatPut = z.infer<typeof ChatPutSchema>;
export type ChatUnique = z.infer<typeof ChatUniqueSchema>;
