import { User, UserPost, UserPut } from "@models/user.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";
import { Alert } from "react-native";

export const userApi = {
  getUsers: async () => {
    try {
      const result = await axios.get<User[]>(
        `${backendApiConfig.baseURL}/users`
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  getUser: async (id: string) => {
    try {
      const result = await axios.get<User>(
        `${backendApiConfig.baseURL}/user/${id}`
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  createUser: async (user: UserPost) => {
    try {
      const result = await axios.post<User>(
        `${backendApiConfig.baseURL}/user`,
        user
      );

      Alert.alert(
        "Éxito",
        "Se creó el nuevo usuario con éxito. Inicie sesión para continuar."
      );
      console.log(result);
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
  updateUser: async (user: UserPut) => {
    try {
      const result = await axios.put<User>(
        `${backendApiConfig.baseURL}/user/${user.id}`,
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
  deleteUser: async (id: string) => {
    try {
      const result = await axios.delete<User>(
        `${backendApiConfig.baseURL}/user/${id}`
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
