import { Address, AddressPost, AddressPut } from "@models/address.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const addressApi = {
  getAddress: async () => {
    const result = await axios.get<Address[]>(
      `${backendApiConfig.baseURL}/addresses`
    );

    return result.data;
  },
  getAddressById: async (id: string) => {
    const result = await axios.get<Address>(
      `${backendApiConfig.baseURL}/address/${id}`
    );

    return result.data;
  },
  createAddress: async (address: AddressPost) => {
    try {
      const result = await axios.post<Address>(
        `${backendApiConfig.baseURL}/address`,
        {
          address,
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
  updateAddress: async (address: AddressPut) => {
    try {
      const result = await axios.put<Address>(
        `${backendApiConfig.baseURL}/address/${address.id}`,
        {
          address,
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
  deleteAddress: async (id: string) => {
    try {
      const result = await axios.delete<Address>(
        `${backendApiConfig.baseURL}/address/${id}`
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
