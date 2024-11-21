import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { benefitApi } from "@api/api.benefit";

export const benefitKeys = createQueryKeyStore({
  benefit: {
    list: () => ({
      queryKey: ["benefitList"],
      queryFn: benefitApi.getBenefits,
    }),
    detail: (id: string) => ({
      queryKey: ["benefit", "detail", id],
      queryFn: () => benefitApi.getBenefitById(id),
    }),
    storeList: (id: string) => ({
      queryKey: ["storeList", id],
      queryFn: () => benefitApi.getBenefitByStore(id),
    }),
  },
});
