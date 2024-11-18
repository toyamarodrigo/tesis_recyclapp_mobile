import { User } from "@models/user.type";
import { UserCustomer } from "@models/userCustomer.type";
import { UserStore } from "@models/userStore.type";
import { create } from "zustand";

type UserState = {
  user: User | undefined;
  userStore: UserStore | undefined;
  userCustomer: UserCustomer | undefined;
  profileImage: string | undefined;
  initializeUser: (
    user: User,
    userStore?: UserStore,
    userCustomer?: UserCustomer
  ) => void;
  removeUsers: () => void;
  setProfileImage: (url: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
  // user: undefined,
  user: {
    id: "cleum9yc50002v8f8gnwv5rz9",
    name: "Jike",
    surname: "Dakun",
    mail: "nat@gmail.com",
    phone: "1232312312",
    password: "1aA@123123123123",
    username: "nate",
    isArchived: false,
    userType: "CUSTOMER",
    createDate: new Date("2023-03-04T23:49:59.933Z"),
  },
  userStore: undefined,
  // userCustomer: undefined,
  userCustomer: {
    id: "cleum9yc50002v8f8gnwv5rz0",
    pointsCurrent: 200,
    pointsTotal: 200,
    userId: "cleum9yc50002v8f8gnwv5rz9",
  },
  profileImage: undefined,
  initializeUser: (
    user: User,
    userStore?: UserStore,
    userCustomer?: UserCustomer
  ) =>
    set({
      user: user,
      userStore: userStore || undefined,
      userCustomer: userCustomer || undefined,
    }),
  removeUsers: () =>
    set({
      user: undefined,
      userStore: undefined,
      userCustomer: undefined,
      profileImage: undefined,
    }),
  setProfileImage: (url: string) => set({ profileImage: url }),
}));
