import { backendApiConfig } from "./api.config";
import axios from "axios";
import { Alert } from "react-native";
import {
  UserCustomer,
  UserCustomerPost,
  UserCustomerPut,
  UserCustomerPutResponse,
} from "@models/userCustomer.type";
import { UserStore } from "@models/userStore.type";

export const userApi = {
  // UserCustomer
  getUserCustomer: async (id: string) => {
    try {
      const result = await axios.get<UserCustomer>(
        `${backendApiConfig.baseURL}/userCustomer/${id}`
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  getUserCustomerClerk: async (id: string) => {
    try {
      const result = await axios.get<UserCustomer>(
        `${backendApiConfig.baseURL}/userCustomerClerk/${id}`
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  createUserCustomer: async (user: UserCustomerPost) => {
    try {
      const result = await axios.post<UserCustomer>(
        `${backendApiConfig.baseURL}/userCustomer`,
        user
      );

      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        Alert.alert(
          "Error",
          "Ocurrió un problema al crear el usuario. Intente nuevamente."
        );
        throw new Error(e.message);
      }

      Alert.alert(
        "Error",
        "Ocurrió un problema al crear el usuario. Intente nuevamente."
      );
      throw new Error("Unknown error");
    }
  },
  updateUserCustomer: async (user: UserCustomerPut) => {
    try {
      const result = await axios.put<UserCustomerPutResponse>(
        `${backendApiConfig.baseURL}/userCustomer/${user.id}`,
        user
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        Alert.alert(
          "Error",
          "Ocurrió un problema al actualizar sus datos. Intente nuevamente."
        );
        throw new Error(e.message);
      }

      Alert.alert(
        "Error",
        "Ocurrió un problema al actualizar sus datos. Intente nuevamente."
      );
      throw new Error("Unknown error");
    }
  },

  // UserStore
  getUserStore: async (id: string) => {
    try {
      const result = await axios.get<UserStore>(
        `${backendApiConfig.baseURL}/userStore/${id}`
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  getUserStoreClerk: async (id: string) => {
    try {
      const result = await axios.get<UserStore>(
        `${backendApiConfig.baseURL}/userStoreClerk/${id}`
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
