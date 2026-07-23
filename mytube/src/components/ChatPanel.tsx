import { useEffect, useState } from "react";
import { socket } from "@/socket/socket";

interface ChatMessage {
  sender: string;
  text: string;
  time: string;
}

interface ChatPanelProps {
  partyCode: string;
  user?: {
    name?: string;
    email?: string;
    [key: string]: any;
  } | null;
}

export default function ChatPanel({ partyCode, user }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatMessage, setChatMessage] = useState("");
  const senderName = user?.name || user?.email || "Anonymous";

  useEffect(() => {
    const handleMessage = (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receive-message", handleMessage);

    return () => {
      socket.off("receive-message", handleMessage);
    };
  }, []);

  const sendMessage = () => {
    if (!chatMessage.trim()) return;

    socket.emit("send-message", {
      partyCode,
      message: {
        sender: senderName,
        text: chatMessage,
        time: new Date().toLocaleTimeString(),
      },
    });

    setChatMessage("");
  };

  return (
    <div className="border rounded-lg p-4">
      <h2 className="font-bold mb-3">Live Chat</h2>

      <div className="h-64 overflow-y-auto border rounded p-2 mb-3">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.sender}</strong>{" "}
            <span className="text-gray-500 text-sm">
              {msg.time}
            </span>

            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          placeholder="Type a message..."
        />

        <button
          onClick={sendMessage}
          className="bg-red-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}