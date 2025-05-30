import { create } from "zustand";

const initialAuthState = { name: "", userID: "", token: "", auth: false };

export const useAuthStore = create((set) => ({
  authData: initialAuthState,
  setAuthdata: (data) => set(() => ({ authData: data })),
  clearAuthdata: () => set(() => ({ authData: initialAuthState })),
}));
