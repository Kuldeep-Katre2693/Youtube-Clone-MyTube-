import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "@/lib/axiosinstance";
import Videoplayer from "@/components/Videoplayer";
import { socket } from "@/socket/socket";
import ChatPanel from "@/components/ChatPanel";
import { useUser } from "@/lib/AuthContext";
import ParticipantsPanel from "@/components/ParticipantsPanel";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import LocalVideo from "@/components/LocalVideo";

export default function WatchPartyPage() {
  const router = useRouter();
  const { partyCode } = router.query;
  const { user } = useUser();

  const [party, setParty] = useState<any>(null);
  const isHost = !!party && user?._id === party.host._id;
  const [messages, setMessages] = useState<any[]>([]);
  const [chatMessage, setChatMessage] = useState("");
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const remoteSocketId = useRef<string | null>(null);
  const [remoteSocket, setRemoteSocket] = useState<string | null>(null);


  const copyPartyCode = async () => {
  try {
    await navigator.clipboard.writeText(party.partyCode);
    toast.success("Party code copied!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to copy party code");
  }
};

const handleEndParty = async () => {
  try {
    await axiosInstance.post(
      `/watch-party/${partyCode}/end`,
      {
        hostId: user?._id,
      }
    );

    socket.emit("end-party", {
      partyCode,
    });
  } catch (err) {
    console.error(err);
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
    const res = await axiosInstance.get(`/watch-party/${partyCode}`);

    setParty(res.data.party);
  } catch (err: any) {
    if (err.response?.status === 410) {
      toast.error("This watch party has ended.");
      router.push("/");
      return;
    }

    console.error(err);
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
console.log("HOST emitting join-party");
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
  if (!localStream || peerConnection.current) return;

  const pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  });

  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  peerConnection.current = pc;
  if (remoteSocketId.current) {
  console.log("Remote already exists:", remoteSocketId.current);
}
    console.log("RTCPeerConnection created on host");
  console.log("Remote socket:", remoteSocketId.current);

  console.log("RTCPeerConnection created");
}, [localStream]);

useEffect(() => {
  if (localStream) {
    console.log("Local stream ready", localStream);
      console.log("localStream changed:", localStream);

  }
}, [localStream]);

useEffect(() => {
  const handleUserJoined = (user: any) => {
    console.log("User joined:", user);
     remoteSocketId.current = user.socketId;
    setRemoteSocket(user.socketId);
  };

  socket.on("user-joined-call", handleUserJoined);

  return () => {
    socket.off("user-joined-call", handleUserJoined);
  };
}, []);

useEffect(() => {
  const startOffer = async () => {
    if (!peerConnection.current) return;
    if (!remoteSocket) return;

    console.log("Creating offer...");

    const offer = await peerConnection.current.createOffer();

    await peerConnection.current.setLocalDescription(offer);

    socket.emit("webrtc-offer", {
      offer,
      target: remoteSocket,
    });

    console.log("Offer sent");
  };

  startOffer();
}, [remoteSocket]);

useEffect(() => {
  const handleOffer = async ({
    offer,
    sender,
  }: {
    offer: RTCSessionDescriptionInit;
    sender: string;
  }) => {
    console.log("Offer received");

    remoteSocketId.current = sender;

    if (!peerConnection.current) return;

    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(offer)
    );

    console.log("Remote description set");

    const answer =
      await peerConnection.current.createAnswer();

    console.log("Answer created");

    await peerConnection.current.setLocalDescription(
      answer
    );

    console.log("Local description set");

    socket.emit("webrtc-answer", {
      answer,
      target: sender,
    });

    console.log("Answer sent");
  };

  socket.on("webrtc-offer", handleOffer);

  return () => {
    socket.off("webrtc-offer", handleOffer);
  };
}, []);

useEffect(() => {
  const handlePartyEnded = () => {
    toast.success("The host has ended the watch party.");

    router.push("/");
  };

  socket.on("party-ended", handlePartyEnded);

  return () => {
    socket.off("party-ended", handlePartyEnded);
  };
}, [router]);

useEffect(() => {
  return () => {
    socket.disconnect();
  };
}, []);


  if (!party) return <div>Party not found</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
  <h1 className="text-2xl font-bold">
    🎉 Watch Party
  </h1>
    <LocalVideo
        onStreamReady={setLocalStream}
 />

<div className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-4">
  <div>
    <span className="text-sm text-gray-500">
      Party Code
    </span>

    <p className="font-bold tracking-widest">
      {party.partyCode}
    </p>
  </div>

  {isHost && (
  <button
  onClick={handleEndParty}
    className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
  >
    End Watch Party
  </button>
)}

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