import { create } from "zustand";

const initialAuthState = { name: "", userID: "", token: "", auth: false };

export const useAuthStore = create((set) => ({
  authData: initialAuthState,
  clientListDisplay: [],
  setAuthData: (data) => set(() => ({ authData: data })),
  clearAuthData: () => set(() => ({ authData: initialAuthState })),
  clientListSet: (listArray) => set(() => ({ clientListDisplay: listArray })),
}));
