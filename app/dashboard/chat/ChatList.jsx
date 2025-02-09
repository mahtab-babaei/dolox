"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getChatList } from "@/utils/Requests";
import Spinner from "@/app/components/global/Spinner";
import { useChatListStore } from "@/stores/useChatListStore";

const ChatList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomName = searchParams?.get("room"); // دریافت مقدار `roomName` از `URL`

  // دریافت لیست چت‌ها از store
  const chatList = useChatListStore((state) => state.chatList);
  const setChatList = useChatListStore((state) => state.setChatList);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const data = await getChatList();
        if (data && JSON.stringify(data) !== JSON.stringify(chatList)) {
          setChatList(data);
        }
      } catch (err) {
        setError("خطایی رخ داد. لطفا دوباره تلاش کنید.");
      } finally {
        setLoading(false);
      }
    };

    fetchChatList();
  }, [setChatList]); // جلوگیری از رندر بی‌نهایت

  const handleChatClick = (chat) => {
    router.push(`/dashboard/chat?room=${chat.roomName}`); // فقط مقدار `roomName` را در URL تغییر بده
  };

  return (
    <div className="w-[30%] h-screen bg-white rounded-3xl p-4">
      <h2 className="text-center font-bold mb-4 text-black">مخاطبین</h2>

      {loading && <Spinner />}
      {error && (
        <p className="text-center text-gray-500 font-vazir text-sm">{error}</p>
      )}

      {!loading && !error && chatList.length > 0 && (
        <ul>
          {chatList.map((chat) => (
            <li
              key={chat.id}
              className={`flex items-center p-2 text-vazir border-b border-gray-400 cursor-pointer transition duration-200 rounded-xl ${
                chat.roomName === roomName ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() => handleChatClick(chat)}
            >
              <img
                src={chat.profile.picture}
                alt={chat.profile.first_name || "بدون نام"}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ms-3">
                <p className="font-bold font-vazir text-black">
                  {chat.profile.first_name
                    ? `${chat.profile.first_name} ${chat.profile.last_name}`
                    : "کاربر"}
                </p>
                {chat.profile.city && (
                  <p className="text-sm text-gray-500 font-vazir">
                    {chat.profile.city}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && chatList.length === 0 && (
        <p className="text-center text-gray-500 font-vazir text-sm">
          لیست چت‌ها خالی است
        </p>
      )}
    </div>
  );
};

export default ChatList;
