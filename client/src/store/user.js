import { create } from "zustand";

const initialAuthState = { name: "", userID: "", token: "", auth: false };

export const useAuthStore = create((set) => ({
  authData: initialAuthState,
  setAuthData: (data) => set(() => ({ authData: data })),
  clearAuthData: () => set(() => ({ authData: initialAuthState })),
}));
