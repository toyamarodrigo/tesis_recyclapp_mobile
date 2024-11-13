import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { benefitAssignmentApi } from "@api/api.benefitAssignment";

export const benefitAssignmentKeys = createQueryKeyStore({
  benefitAssignment: {
    list: () => ({
      queryKey: ["benefitAssignmentList"],
      queryFn: benefitAssignmentApi.getBenefitAssignments,
    }),
    detail: (id: string) => ({
      queryKey: ["benefitAssignment", "detail", id],
      queryFn: () => benefitAssignmentApi.getBenefitAssignmentById(id),
    }),
  },
});
