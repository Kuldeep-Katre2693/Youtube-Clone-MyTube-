import { useEffect, useRef, useState } from "react";
import { socket } from "@/socket/socket";
import { useUser } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosinstance";
import axios from "axios";

interface ChatMessage {
  sender: string;
  text: string;
  time: string;
  type?: "chat" | "join" | "leave";
}

interface ChatPanelProps {
  partyCode: string;
  user?: {
    name?: string;
    email?: string;
    [key: string]: any;
  } | null;
}

export default function ChatPanel({ partyCode }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatMessage, setChatMessage] = useState("");
  const { user } = useUser();
  const senderName = user?.name || user?.email || "Anonymous";
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const loadMessages = async () => {
    try {
      const res = await axiosInstance.get(`/watch-party/${partyCode}/messages`);
      setMessages(res.data.messages || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  loadMessages();
}, [partyCode]);

  useEffect(() => {
  if (!partyCode) return;

  const fetchMessages = async () => {
    try {
      const res = await axiosInstance.get(
        `/watch-party/${partyCode}/messages`
      );

      setMessages(
        res.data.map((msg: any) => ({
          sender: msg.senderName,
          text: msg.text,
          type: msg.type,
          time: new Date(msg.createdAt).toLocaleTimeString(),
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  fetchMessages();
}, [partyCode]);


  useEffect(() => {
    const handleMessage = (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receive-message", handleMessage);

    return () => {
      socket.off("receive-message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const handleSystemMessage = (message: ChatMessage) => {
        setMessages(prev => [...prev, message]);
    };

    socket.on("system-message", handleSystemMessage);

    return () => {
        socket.off("system-message", handleSystemMessage);
    };
}, []);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

  const sendMessage = () => {
    if (!chatMessage.trim()) return;

    socket.emit("send-message", {
      partyCode,
      message: {
        sender: user?.name || "Guest",
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
  {messages.map((msg: any, index: number) => {
    if (msg.type === "join") {
      return (
        <div
          key={index}
          className="text-center text-green-600 text-xs my-2"
        >
          🎉 {msg.text}
        </div>
      );
    }

    if (msg.type === "leave") {
      return (
        <div
          key={index}
          className="text-center text-red-600 text-xs my-2"
        >
          👋 {msg.text}
        </div>
      );
    }

    return (
      <div key={index} className="mb-2">
        <strong>{msg.sender}</strong>
        <p>{msg.text}</p>
      </div>
    );
  })}

  <div ref={messagesEndRef} />
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