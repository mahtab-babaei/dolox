"use client";
import ChatRoom from "./ChatRoom";
import { useSearchParams } from "next/navigation";
import ChatList from "./ChatList";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ChatPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roomName = searchParams?.get("room");
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    if (roomName) {
      setCurrentRoom(roomName);
    }
  }, [roomName]);

  const handleBackToList = () => {
    router.push("/dashboard/chat"); // حذف `room` از URL
  };

  return (
    <div className="bg-base-200 w-full">
      <div className="flex justify-start pt-40 pb-10 px-4 gap-4 max-w-screen-lg">
        {/* نمایش لیست چت در موبایل فقط در صورتی که room انتخاب نشده باشد */}
        <div
          className={`${
            roomName ? "hidden" : "block"
          } sm:block w-full sm:w-[30%]`}
        >
          <ChatList />
        </div>

        {/* نمایش چت روم فقط در صورتی که room انتخاب شده باشد */}
        <div
          className={`${
            roomName ? "block" : "hidden"
          } sm:block w-full sm:w-[70%] bg-white h-screen overflow-y-auto rounded-[34px]`}
        >
          {roomName ? (
            <ChatRoom roomName={currentRoom} onBackToList={handleBackToList} />
          ) : (
            <div className="p-4 text-center text-black">
              برای شروع مکالمه یکی از مخاطب‌های خود را انتخاب کنید
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
