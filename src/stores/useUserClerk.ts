import { User } from "@models/user.type";
import { UserCustomer } from "@models/userCustomer.type";
import { UserStore } from "@models/userStore.type";
import { create } from "zustand";

type UserClerk = {
  user: User | undefined;
  userStore: UserStore | undefined;
  userCustomer: UserCustomer | undefined;
  profileImage: string | undefined;
  initializeUser: (user: User) => void;
  removeUsers: () => void;
  setProfileImage: (url: string) => void;
};

export const useUserClerk = create<UserClerk>((set) => ({
  user: undefined,
  userStore: undefined,
  userCustomer: undefined,
  profileImage: undefined,
  initializeUser: (user: User) =>
    set({
      user: user,
      userStore: user.UserStore || undefined,
      userCustomer: user.UserCustomer || undefined,
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
