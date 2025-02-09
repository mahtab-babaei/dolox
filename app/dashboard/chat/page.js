"use client";
import ChatRoom from "./ChatRoom";
import { useSearchParams } from "next/navigation";
import ChatList from "./ChatList";
import { useState, useEffect } from "react";

const ChatPage = () => {
  const searchParams = useSearchParams();
  const roomName = searchParams?.get("room");
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    if (roomName) {
      setCurrentRoom(roomName);
    }
  }, [roomName]);

  return (
    <div className="bg-base-200 w-full">
      <div className="flex justify-start pt-40 pb-10 px-4 gap-4 max-w-screen-lg">
        <ChatList />
        <div className="bg-white h-screen overflow-y-auto rounded-[34px] w-full">
          {!roomName ? (
            <div className="p-4 text-center text-black">
              برای شروع مکالمه یکی از مخاطب‌های خود را انتخاب کنید
            </div>
          ) : (
            <ChatRoom roomName={currentRoom} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
