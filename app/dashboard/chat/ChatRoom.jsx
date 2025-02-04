import { useState, useEffect } from "react";
import { useChatStore } from "@/stores/useChatStore";
import { formatTime } from "@/utils/Cal";
import { useUser } from "@/context/UserContext";
export default function ChatRoom({ roomName }) {
  const user = useUser();
  const { chatSocket, messages, connectToChatRoom, sendMessage } =
    useChatStore();

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!chatSocket) {
      connectToChatRoom(roomName);
    }

    return () => {
      chatSocket?.close();
    };
  }, [roomName, chatSocket, connectToChatRoom]);

  useEffect(() => {
    console.log("Messages in store:", messages);
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    sendMessage({
      content: inputValue,
      command: "new_message",
      username: user.username,
      roomName: roomName,
    });

    setInputValue("");
  };

  return (
    <div className="w-full h-full flex flex-col items-between justify-between p-8">
      {messages?.map((msg, index) => (
        <div
          key={index}
          className={`chat ${
            msg.__str__ === user.username ? "chat-start" : "chat-end"
          } font-vazir`}
        >
          <div className="chat-header">{msg.__str__}</div>
          <div
            className={`chat-bubble text-white ${
              msg.__str__ === user.username ? "bg-primary" : "bg-secondary"
            }`}
          >
            {msg.content}
          </div>
          <time className="chat-footer text-xs opacity-50 pt-1">
            {formatTime(msg.timestamp)}
          </time>
        </div>
      ))}
      <div className="flex w-full items-center py-6 gap-2">
        <label className="w-full border-none input flex items-center bg-neutral text-black">
          <input
            className="font-vazir"
            type="text"
            value={inputValue}
            placeholder="متن پیام خود را بنویسید"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button
          onClick={handleSendMessage}
          className="btn btn-circle bg-primary text-white"
        >
          <svg
            className="w-6 h-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
