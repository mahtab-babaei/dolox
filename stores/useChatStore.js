import { create } from "zustand";
import { WSURL } from "@/utils/URL";

export const useChatStore = create((set) => ({
  chatSocket: null,
  notificationsSocket: null,
  messages: [],
  notifications: [],
  membersList: [],

  clearMessages: () => set({ messages: [] }),

  connectToChatRoom: (roomName) => {
    set((state) => {
      if (!roomName) {
        console.error("Room name is null!");
        return state;
      }

      if (state.chatSocket) {
        state.chatSocket.close(); // بستن سوکت قبلی اگر باز باشد
      }

      const socket = new WebSocket(`${WSURL}/chat/${roomName}/`);

      socket.onmessage = (e) => {
        const data = JSON.parse(e.data);

        if (data.command === "fetch_message") {
          set((state) => ({
            messages: data.message.reverse(), // پیام‌های قدیمی را مستقیم جایگزین کنید
          }));
        } else if (data.command === "new_message") {
          set((state) => ({
            messages: [...state.messages, data.message],
          }));
        }
      };

      socket.onopen = () => {
        console.log("Chat socket connected");
        socket.send(
          JSON.stringify({
            command: "fetch_message",
            roomName: roomName,
          })
        );
      };

      socket.onclose = (e) => {
        console.error("Chat socket closed unexpectedly", e);
      };

      socket.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      return { ...state, chatSocket: socket };
    });
  },

  sendMessage: (messageData) => {
    set((state) => {
      if (!state.chatSocket || state.chatSocket.readyState !== WebSocket.OPEN) {
        console.error("Chat socket is not connected!");
        return state;
      }
      state.chatSocket.send(JSON.stringify(messageData));
      return state;
    });
  },

  connectToNotifications: () => {
    const socket = new WebSocket(`${WSURL}/chat/listener/`);

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);

      set((state) => ({
        notifications: [...state.notifications, data],
        membersList: data.members_list,
      }));
    };

    socket.onclose = () => {
      console.error("Notifications socket closed unexpectedly");
    };

    set({ notificationsSocket: socket });
  },
}));
