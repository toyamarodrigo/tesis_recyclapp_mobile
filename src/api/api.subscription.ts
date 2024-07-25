import {
  Subscription,
  SubscriptionPost,
  SubscriptionPut,
} from "@models/subscription.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";

export const subscriptionApi = {
  getSubscription: async () => {
    const result = await axios.get<Subscription[]>(
      `${backendApiConfig.baseURL}/subscriptions`
    );

    return result.data;
  },
  getSubscriptionById: async (id: string) => {
    const result = await axios.get<Subscription>(
      `${backendApiConfig.baseURL}/subscription/${id}`
    );

    return result.data;
  },
  createSubscription: async (subscription: SubscriptionPost) => {
    try {
      const result = await axios.post<Subscription>(
        `${backendApiConfig.baseURL}/subscription`,
        {
          subscription,
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
  updateSubscription: async (subscription: SubscriptionPut) => {
    try {
      const result = await axios.put<Subscription>(
        `${backendApiConfig.baseURL}/subscription/${subscription.id}`,
        {
          subscription,
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
  deleteSubscription: async (id: string) => {
    try {
      const result = await axios.delete<Subscription>(
        `${backendApiConfig.baseURL}/subscription/${id}`
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

// router.get("/subscriptions", subscriptionController.getSubscriptions);
// router.get("/subscription/:id", subscriptionController.getSubscription);
// router.post("/subscription", subscriptionController.createSubscription);
// router.put("/subscription/:id", subscriptionController.updateSubscription);
// router.delete("/subscription/:id", subscriptionController.deleteSubscription);
