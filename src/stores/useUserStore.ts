import { User } from "@models/user.type";
import { UserCustomer } from "@models/userCustomer.type";
import { UserStore } from "@models/userStore.type";
import { create } from "zustand";

type UserState = {
  user: User | null;
  userStore: UserStore | null;
  userCustomer: UserCustomer | null;
  profileImage: string | null;
  initializeUser: (user: User) => void;
  removeUsers: () => void;
  setProfileImage: (url: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  userStore: null,
  userCustomer: null,
  profileImage: null,
  initializeUser: (user: User) =>
    set({
      user: user,
      userStore: user.UserStore || null,
      userCustomer: user.UserCustomer || null,
    }),
  removeUsers: () =>
    set({
      user: null,
      userStore: null,
      userCustomer: null,
      profileImage: null,
    }),
  setProfileImage: (url: string) => set({ profileImage: url }),
}));
