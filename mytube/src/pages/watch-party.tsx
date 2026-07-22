import { useEffect } from "react";
import { useRouter } from "next/router";
import { socket } from "@/socket/socket";

export default function WatchParty() {
 const router = useRouter();
 const partyCode = typeof router.query.partyCode === "string"
  ? router.query.partyCode
  : undefined;

 useEffect(() => {
  if (!partyCode) return;

  socket.connect();

  socket.emit("join-party", partyCode);

  return () => {
    socket.disconnect();
  };
}, [partyCode]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Watch Party</h1>
      <p>Connecting...</p>

       <button
  onClick={() => {
    if (!partyCode) return;

    socket.emit("play-video", {
      partyCode,
      currentTime: 15,
      
    });
  }}
>
  Test Play
</button>   

    </div>
    
    
    
  );
}

