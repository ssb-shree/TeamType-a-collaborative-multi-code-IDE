import { create } from "zustand";

export const useProjectStore = create((set) => ({
  projectData: {},
  setProjectData: (data) => set(() => ({ projectData: data })),
}));
