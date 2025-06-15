// Store is just for code execution

import { create } from "zustand";

const codeStore = { code: "", lang: "", inputs: "" };

export const useCodeStore = create((set) => ({
  codeData: codeStore,
  setCodeData: (data) => set(() => ({ codeData: data })),
  clearCodeData: () => set(() => ({ codeData: codeStore })),
}));
