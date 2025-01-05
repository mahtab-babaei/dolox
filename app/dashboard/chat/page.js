"use client";
import React from "react";
import ChatRoom from "./ChatRoom";
import { useChatDataStore } from "@/stores/useChatDataStore";

const ChatPage = () => {
  const chatData = useChatDataStore((state) => state.chatData);

  if (!chatData) {
    return <div>داده‌ای برای چت یافت نشد!</div>;
  }

  return (
    <div className="flex justify-start h-fit bg-base-200 w-full pt-40 pb-10 px-4 gap-8">
      <div className="w-1/4 h-screen bg-white rounded-3xl p-4">list</div>
      <ChatRoom roomName={chatData.roomName[0]} username={chatData.username} />
    </div>
  );
};

export default ChatPage;
