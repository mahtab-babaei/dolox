"use client";
import React, { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import { useChatDataStore } from "@/stores/useChatDataStore";
import { useSearchParams } from "next/navigation";
import { joinChatRoom } from "@/utils/Requests";
import ChatList from "./ChatList";

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

  return (
    <div className="bg-base-200 w-full">
      <div className="flex justify-start pt-40 pb-10 px-4 gap-4 max-w-screen-lg">
        <ChatList />
        <div className="bg-white  h-screen overflow-y-auto rounded-[34px] w-full">
          {loading ? (
            <div className="p-8 text-center font-vazir text-base-content">
              در حال بارگذاری...
            </div>
          ) : !chatData ? (
            <div className="p-4 text-center text-black">
              برای شروع مکالمه یکی از مخاطب‌های خود را انتخاب کنید
            </div>
          ) : (
            <ChatRoom
              roomName={chatData.roomName[0]}
              username={chatData.username}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
