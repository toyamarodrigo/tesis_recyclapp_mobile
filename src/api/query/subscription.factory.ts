import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { subscriptionApi } from "@api/api.subscription";

export const subscriptionKeys = createQueryKeyStore({
  subscription: {
    list: () => ({
      queryKey: ["subscriptionList"],
      queryFn: () => subscriptionApi.getSubscription(),
    }),
    detail: (id: string) => ({
      queryKey: [id],
      queryFn: () => subscriptionApi.getSubscriptionById(id),
    }),
  },
});
