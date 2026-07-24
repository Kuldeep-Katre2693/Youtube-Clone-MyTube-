import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosinstance";
import Videoplayer from "@/components/Videoplayer";
import { socket } from "@/socket/socket";
import ChatPanel from "@/components/ChatPanel";
import { useUser } from "@/lib/AuthContext";
import ParticipantsPanel from "@/components/ParticipantsPanel";

export default function WatchPartyPage() {
  const router = useRouter();
  const { partyCode } = router.query;
  const { user } = useUser();

  const [party, setParty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isHost = !!party && user?._id === party.host._id;
  const [messages, setMessages] = useState<any[]>([]);
  const [chatMessage, setChatMessage] = useState("");
 

  useEffect(() => {
    if (!partyCode) return;

    const fetchParty = async () => {
      try {
        const res = await axiosInstance.get(
          `/watch-party/${partyCode}`
        );

        setParty(res.data.party);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParty();
  }, [partyCode]);
  
  useEffect(() => {
  if (!party || !user) return;

  if (!socket.connected) {
    socket.connect();
  }

  console.log("Joining as:", user);

  socket.emit("join-party", {
    partyCode: party.partyCode,
    user: {
      _id: user._id,
      name: user.name,
      image: user.image,
    },
  });

  console.log("Joined room:", party.partyCode);

  return () => {
    socket.emit("leave-party", party.partyCode);

  };
}, [party, user]);

useEffect(() => {
  return () => {
    socket.disconnect();
  };
}, []);

  if (loading) return <div>Loading...</div>;

  if (!party) return <div>Party not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Watch Party
      </h1>

      <div className="grid grid-cols-3 gap-6">
  <div className="col-span-2">
   
    <Videoplayer
      video={party.video}
      nextVideo={null}
      isWatchParty
      partyCode={party.partyCode}
      isHost={isHost}
    />
  </div>

  <div className="space-y-6">

    <ParticipantsPanel
        partyCode={party.partyCode}
        hostId={party.host._id}
    />

    <ChatPanel
        partyCode={party.partyCode}
    />

</div>
</div>
    </div>
  );
}