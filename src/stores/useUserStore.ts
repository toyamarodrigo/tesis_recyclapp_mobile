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
  user: undefined,
  userStore: undefined,
  userCustomer: undefined,
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
