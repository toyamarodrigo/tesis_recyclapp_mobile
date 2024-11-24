import { Chat, ChatCreate, ChatUpdate, ChatUnique } from "@models/chat.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const chatApi = {
  getChats: async () => {
    const result = await axios.get<Chat[]>(`${backendApiConfig.baseURL}/chats`);

    return result.data;
  },
  getChatById: async (id: string) => {
    const result = await axios.get<Chat>(
      `${backendApiConfig.baseURL}/chat/${id}`
    );

    return result.data;
  },
  getChatByUnique: async (unique: ChatUnique) => {
    const result = await axios.post<Chat>(
      `${backendApiConfig.baseURL}/chat/unique`,
      unique
    );
    console.log(result);
    return result.data;
  },
  createChat: async (chat: ChatCreate) => {
    try {
      const result = await axios.post<Chat>(
        `${backendApiConfig.baseURL}/chat`,
        chat
      );

      console.log(result);
      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  updateChat: async (chat: ChatUpdate) => {
    try {
      console.log(chat);
      const result = await axios.put<Chat>(
        `${backendApiConfig.baseURL}/chat/${chat.id}`,
        chat
      );

      console.log(result);
      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  deleteChat: async (id: string) => {
    try {
      const result = await axios.delete<Chat>(
        `${backendApiConfig.baseURL}/chat/${id}`
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

// router.get("/chats", chatController.getChats);
// router.get("/chat/:id", chatController.getChat);
// router.post("/chat", chatController.createChat);
// router.put("/chat/:id", chatController.updateChat);
// router.delete("/chat/:id", chatController.deleteChat);
