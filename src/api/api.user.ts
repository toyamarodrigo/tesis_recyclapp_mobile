import { User } from "@models/user.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const userApi = {
  getUser: async () => {
    const result = await axios.get<User[]>(`${backendApiConfig.baseURL}/users`);

    return result.data;
  },
};
