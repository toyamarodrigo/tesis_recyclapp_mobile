import { backendApiConfig } from "./api.config";
import axios from "axios";
import { Alert } from "react-native";
import {
  UserCustomer,
  UserCustomerPost,
  UserCustomerPut,
  UserCustomerPutResponse,
} from "@models/userCustomer.type";
import { UserStore, UserStorePost, UserStorePut } from "@models/userStore.type";

export const userApi = {
  // UserCustomer
  getUserCustomers: async () => {
    try {
      const result = await axios.get<UserCustomer[]>(
        `${backendApiConfig.baseURL}/userCustomers`
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
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

      return result.data
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
  deleteUserCustomer: async (id: string) => {
    try {
      const result = await axios.delete<UserCustomer>(
        `${backendApiConfig.baseURL}/userCustomer/${id}`
      );

      Alert.alert(
        "Éxito",
        "Se eliminó su cuenta éxito. Gracias por utilizar nuestro servicio."
      );
      console.log(result);
      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        Alert.alert(
          "Error",
          "Ocurrió un problema al eliminar su cuenta. Intente nuevamente."
        );
        throw new Error(e.message);
      }

      Alert.alert(
        "Error",
        "Ocurrió un problema al eliminar su cuenta. Intente nuevamente."
      );
      throw new Error("Unknown error");
    }
  },

  // UserStore
  getUserStores: async () => {
    try {
      const result = await axios.get<UserStore[]>(
        `${backendApiConfig.baseURL}/userStores`
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
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
  createUserStore: async (user: UserStorePost) => {
    try {
      const result = await axios.post<UserStore>(
        `${backendApiConfig.baseURL}/userStore`,
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
  updateUserStore: async (user: any) => {
    try {
      const result = await axios.put<UserStorePut>(
        `${backendApiConfig.baseURL}/userStore/${user.id}`,
        user
      );

      Alert.alert("Éxito", "Se actualizaron sus datos con éxito.");
      console.log(result, "exito");
      return result;
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
  deleteUserStore: async (id: string) => {
    try {
      const result = await axios.delete<UserStore>(
        `${backendApiConfig.baseURL}/userStore/${id}`
      );

      Alert.alert(
        "Éxito",
        "Se eliminó su cuenta éxito. Gracias por utilizar nuestro servicio."
      );
      console.log(result);
      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        Alert.alert(
          "Error",
          "Ocurrió un problema al eliminar su cuenta. Intente nuevamente."
        );
        throw new Error(e.message);
      }

      Alert.alert(
        "Error",
        "Ocurrió un problema al eliminar su cuenta. Intente nuevamente."
      );
      throw new Error("Unknown error");
    }
  },
};
