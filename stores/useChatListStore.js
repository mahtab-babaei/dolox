import { create } from "zustand";

export const useChatListStore = create((set) => ({
  chatList: [], 
  setChatList: (list) => set({ chatList: list }), 
}));
