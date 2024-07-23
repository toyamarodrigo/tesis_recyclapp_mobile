import { User, UserPost, UserPut } from "@models/user.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const userApi = {
  getUsers: async () => {
    const result = await axios.get<User[]>(`${backendApiConfig.baseURL}/users`);

    return result.data;
  },
  getUser: async (id: string) => {
    const result = await axios.get<User>(
      `${backendApiConfig.baseURL}/user/${id}`
    );

    return result.data;
  },
  createUser: async (user: UserPost) => {
    try {
      const result = await axios.post<User>(
        `${backendApiConfig.baseURL}/user`,
        {
          user,
        }
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
  updateUser: async (user: UserPut) => {
    try {
      const result = await axios.put<User>(
        `${backendApiConfig.baseURL}/user/${user.id}`,
        {
          user,
        }
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
  deleteUser: async (id: string) => {
    try {
      const result = await axios.delete<User>(
        `${backendApiConfig.baseURL}/user/${id}`
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
