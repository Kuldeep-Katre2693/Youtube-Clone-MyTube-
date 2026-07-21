import { useEffect } from "react";
import { socket } from "@/socket/socket";

export default function WatchParty() {
  useEffect(() => {
    socket.connect();
      socket.emit("join-party", "TEST123");


    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Watch Party</h1>
      <p>Connecting...</p>
    </div>
  );
}