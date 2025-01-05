"use client";
import React, { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import { useChatDataStore } from "@/stores/useChatDataStore";
import { useSearchParams } from "next/navigation";
import { joinChatRoom } from "@/utils/Requests";

const ChatPage = () => {
  const chatData = useChatDataStore((state) => state.chatData);
  const setChatData = useChatDataStore((state) => state.setChatData);
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChatData = async () => {
      if (!chatData && id) {
        setLoading(true);
        try {
          const result = await joinChatRoom(id);
          if (result.success) {
            setChatData(result);
          } else {
            console.error(result.message);
          }
        } catch (error) {
          console.error("Error fetching chat data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchChatData();
  }, [id, chatData, setChatData]);

  if (loading) {
    return <div className="p-40">در حال بارگذاری...</div>;
  }

  if (!chatData) {
    return <div className="p-40">داده‌ای برای چت یافت نشد!</div>;
  }

  return (
    <div className="flex justify-start h-fit bg-base-200 w-full pt-40 pb-10 px-4 gap-8">
      <div className="w-1/4 h-screen bg-white rounded-3xl p-4">list</div>
      <ChatRoom roomName={chatData.roomName[0]} username={chatData.username} />
    </div>
  );
};

export default ChatPage;
