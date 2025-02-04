"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getChatList } from "@/utils/Requests";
import Spinner from "@/app/components/global/Spinner";
import { useChatDataStore } from "@/stores/useChatDataStore";

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const setChatData = useChatDataStore((state) => state.setChatData);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const data = await getChatList();
        if (data && Array.isArray(data)) {
          setChatList(data);
        } else {
          setError("خطا در دریافت لیست مخاطبین");
        }
      } catch (err) {
        setError("خطایی رخ داد. لطفا دوباره تلاش کنید.");
      } finally {
        setLoading(false);
      }
    };

    fetchChatList();
  }, []);

  const handleChatClick = (chat) => {
    setChatData(chat);
    router.push(`/dashboard/chat?room=${chat.roomName}`);
  };

  return (
    <div className="w-[30%] h-screen bg-white rounded-3xl p-4">
      <h2 className="text-center font-bold mb-4">مخاطبین</h2>

      {loading && <Spinner />}
      {error && (
        <p className="text-center text-gray-500 font-vazir text-sm">{error}</p>
      )}

      {!loading && !error && (
        <ul>
          {chatList.map((chat) => (
            <li
              key={chat.id}
              className="flex items-center p-2 text-vazir border-b border-gray-400 cursor-pointer transition duration-200"
              onClick={() => handleChatClick(chat)}
            >
              <img
                src={chat.profile.picture}
                alt={chat.profile.first_name || "بدون نام"}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ms-3">
                <p className="font-bold font-vazir">
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
    </div>
  );
};

export default ChatList;
