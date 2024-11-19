import { create } from "zustand";

type UserState = {
  profileImage: string | undefined;
  setProfileImage: (url: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
  profileImage: undefined,
  setProfileImage: (url: string) => set({ profileImage: url }),
}));
