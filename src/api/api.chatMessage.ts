import {
  ChatMessage,
  ChatMessagePost,
  ChatMessagePut,
} from "@models/chatMessage.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const chatMessageApi = {
  getChatMessages: async () => {
    const result = await axios.get<ChatMessage[]>(
      `${backendApiConfig.baseURL}/chatMessages`
    );

    return result.data;
  },
  getChatMessageById: async (id: string) => {
    const result = await axios.get<ChatMessage>(
      `${backendApiConfig.baseURL}/chatMessage/${id}`
    );

    return result.data;
  },
  createChatMessage: async (chatMessage: ChatMessagePost) => {
    try {
      const result = await axios.post<ChatMessage>(
        `${backendApiConfig.baseURL}/chatMessage`,

        chatMessage
      );

      console.log(result);
      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  updateChatMessage: async (chatMessage: ChatMessagePut) => {
    try {
      const result = await axios.put<ChatMessage>(
        `${backendApiConfig.baseURL}/chatMessage/${chatMessage.id}`,

        chatMessage
      );

      console.log(result);
      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  deleteChatMessage: async (id: string) => {
    try {
      const result = await axios.delete<ChatMessage>(
        `${backendApiConfig.baseURL}/chatMessage/${id}`
      );

      console.log(result);
      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
};

// router.get("/chatMessages", chatMessageController.getChatMessages);
// router.get("/chatMessage/:id", chatMessageController.getChatMessage);
// router.post("/chatMessage", chatMessageController.createChatMessage);
// router.put("/chatMessage/:id", chatMessageController.updateChatMessage);
// router.delete("/chatMessage/:id", chatMessageController.deleteChatMessage);
