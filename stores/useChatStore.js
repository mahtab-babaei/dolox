import { create } from "zustand";
import { WSURL } from "@/utils/URL";

export const useChatStore = create((set) => ({
  chatSocket: null,
  notificationsSocket: null,
  messages: [],
  notifications: [],
  membersList: [],
  connectToChatRoom: (roomName) => {
    set((state) => {
      if (state.chatSocket) {
        console.warn("WebSocket connection already exists");
        return state;
      }
      const socket = new WebSocket(`${WSURL}/chat/${roomName}/`);

      socket.onmessage = (e) => {
        const data = JSON.parse(e.data);

        if (data.command === "fetch_message") {
          set((state) => ({
            messages: [
              ...data.message
                .reverse()
                .filter(
                  (msg) =>
                    !state.messages.some(
                      (existingMsg) => existingMsg.timestamp === msg.timestamp
                    )
                ),
              ...state.messages,
            ],
          }));
        } else if (data.command === "new_message") {
          set((state) => ({
            messages: [...state.messages, data.message],
          }));
        }
      };

      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            command: "fetch_message",
            roomName: roomName,
          })
        );
        console.log("Chat socket connected");
      };

      socket.onclose = () => {
        console.error("Chat socket closed unexpectedly");
      };

      socket.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      return { ...state, chatSocket: socket };
    });
  },
  sendMessage: (messageData) => {
    set((state) => {
      if (!state.chatSocket) {
        console.error("Chat socket is not connected!");
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
