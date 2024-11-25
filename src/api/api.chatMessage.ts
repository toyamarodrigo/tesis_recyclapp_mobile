import { ChatMessage, ChatMessageCreate } from "@models/chatMessage.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const chatMessageApi = {
  getChatMessagess: async () => {
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
  createChatMessage: async (chatMessage: ChatMessageCreate) => {
    try {
      const result = await axios.post<ChatMessage>(
        `${backendApiConfig.baseURL}/chatMessage`,
        chatMessage
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
};
