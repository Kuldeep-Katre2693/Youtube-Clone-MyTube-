import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosinstance";
import Videoplayer from "@/components/Videoplayer";
import { socket } from "@/socket/socket";
import ChatPanel from "@/components/ChatPanel";
import { useUser } from "@/lib/AuthContext";
import ParticipantsPanel from "@/components/ParticipantsPanel";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function WatchPartyPage() {
  const router = useRouter();
  const { partyCode } = router.query;
  const { user } = useUser();

  const [party, setParty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isHost = !!party && user?._id === party.host._id;
  const [messages, setMessages] = useState<any[]>([]);
  const [chatMessage, setChatMessage] = useState("");

  const copyPartyCode = async () => {
  try {
    await navigator.clipboard.writeText(party.partyCode);
    toast.success("Party code copied!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to copy party code");
  }
};

const copyInviteLink = async () => {
  try {
    const inviteLink = `${window.location.origin}/watch-party/${party.partyCode}`;

    await navigator.clipboard.writeText(inviteLink);

    toast.success("Invite link copied!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to copy invite link");
  }
};
 

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
      <div className="flex items-center justify-between mb-4">
  <h1 className="text-2xl font-bold">
    🎉 Watch Party
  </h1>

<div className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-4">
  <div>
    <span className="text-sm text-gray-500">
      Party Code
    </span>

    <p className="font-bold tracking-widest">
      {party.partyCode}
    </p>
  </div>

  <button
    onClick={copyPartyCode}
    className="p-2 rounded-md hover:bg-gray-200 transition"
    title="Copy Party Code"
  >
    <Copy className="w-5 h-5" />
  </button>
  <button
  onClick={copyInviteLink}
  className="p-2 rounded-md hover:bg-gray-200 transition"
  title="Copy Invite Link"
>
  🔗
</button>
</div>
</div>

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