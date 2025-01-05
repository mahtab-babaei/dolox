import { useState, useEffect } from "react";
import { useChatStore } from "@/stores/useChatStore";

export default function ChatRoom({ roomName, username }) {
  const { chatSocket, messages, connectToChatRoom, sendMessage } =
    useChatStore();

  const [inputValue, setInputValue] = useState(""); // state برای مقدار ورودی

  useEffect(() => {
    connectToChatRoom(roomName);

    return () => {
      chatSocket?.close();
    };
  }, [roomName, connectToChatRoom]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return; // بررسی می‌کند که پیام خالی نباشد

    sendMessage({
      content: inputValue, // استفاده از inputValue برای ارسال پیام
      command: "new_message",
      username: username,
      roomName: roomName,
    });

    // پاک کردن ورودی پس از ارسال پیام
    setInputValue("");
  };

  return (
    <div>
      <h1>Chat Room: {roomName}</h1>
      <div>
        <h2>Messages:</h2>
        {messages?.map((msg, index) => (
          <p key={index}>
            <strong>{msg.__str__}</strong>: {msg.content}
          </p>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={inputValue} // مقدار ورودی برابر با state
          placeholder="Type your message..."
          onChange={(e) => setInputValue(e.target.value)} // تغییر مقدار ورودی
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage(); // ارسال پیام وقتی اینتر زده می‌شود
          }}
        />
      </div>
    </div>
  );
}
