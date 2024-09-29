import { UserStore } from "@models/userStore.type";
import { Benefit } from "@models/benefit.type";

export const benefits: Benefit[] = [
  {
    id: "benefitto1",
    name: "benefitto1",
    type: "DISCOUNT",
    endDate: new Date("24-12-2024"),
    quantity: 2,
    pointsCost: 10,
    userStoreId: "aksjdkasjkasd",
    isActive: true,
    isArchived: false,
    userStore: { id: "aksjdkasjkasd" },
    userCustomerActive: [],
    userCustomerHistory: [],
  },
];

export const userStore: UserStore[] = [
  {
    id: "aksjdkasjkasd",
    displayName: "TremendaTienditta",
    userId: "cleuipzo60002v8fcwfmyp9xk",
    expiryDate: new Date("24-12-2024"),
    hasBenefits: true,
    paymentCompleted: true,
    subscriptionId: "29349238429384294",
    subscription: { id: "29349238429384294" },
    User: {
      id: "cleuipzo60002v8fcwfmyp9xk",
    },
    Benefit: benefits,
  },
];
