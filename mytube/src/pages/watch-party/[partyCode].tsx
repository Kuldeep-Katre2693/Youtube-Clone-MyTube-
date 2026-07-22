import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosinstance";
import Videopplayer from "@/components/Videopplayer";
import { socket } from "@/socket/socket";

export default function WatchPartyPage() {
  const router = useRouter();
  const { partyCode } = router.query;

  const [party, setParty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
  if (!party) return;

  if (!socket.connected) {
    socket.connect();
  }

  socket.emit("join-party", party.partyCode);

  console.log("Joined room:", party.partyCode);

  return () => {
    socket.emit("leave-party", party.partyCode);
    socket.disconnect();
  };
}, [party]);

  if (loading) return <div>Loading...</div>;

  if (!party) return <div>Party not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Watch Party
      </h1>

      <Videopplayer
        video={party.video}
        nextVideo={null}
        isWatchParty={true}
        partyCode={party.partyCode}
      />
    </div>
  );
}