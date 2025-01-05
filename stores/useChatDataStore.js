import { create } from "zustand";

export const useChatDataStore = create((set) => ({
  chatData: null, 
  setChatData: (data) => set({ chatData: data }), 
}));