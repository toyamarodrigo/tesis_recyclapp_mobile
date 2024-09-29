import { useUser } from "@hooks/useUser";
import { User } from "@models/user.type";
import { UserStore } from "@models/userStore.type";
import { create } from "zustand";
import { userStore } from "./eliminarEsto";

type UserState = {
  user: User;
  userStore: UserStore | null;
};

export const useUserStore = create<UserState>(() => ({
  user: {
    id: "cleuipzo60002v8fcwfmyp9xk",
    name: "Aaa",
    surname: "aa",
    mail: "aaaaa",
    phone: "123123",
    password: "1231231",
    username: "asd123",
    isArchived: false,
    createDate: new Date("2023-03-04T22:10:29.678Z"),
    userType: "STORE",
    address: [],
    Post: [],
    Advertisement: [],
    ChatMessageReceived: [],
    ChatMessageSent: [],
  },
  userStore: userStore[0],
}));
