import { useEffect, useState } from "react";
import { socket } from "@/socket/socket";
import { useUser } from "@/lib/AuthContext";

interface Participant {
  socketId: string;
  userId: string;
  name: string;
  image: string;
}

interface Props {
  partyCode: string;
  hostId: string;
}

export default function ParticipantsPanel({
  partyCode,
  hostId,
}: Props) {
  const { user } = useUser();

  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const handleParticipants = (users: Participant[]) => {
          console.log("Participants update:", users);

      setParticipants(users);
    };

    socket.on("participants-update", handleParticipants);

    return () => {
      socket.off("participants-update", handleParticipants);
    };
  }, []);

  return (
    <div className="border rounded-lg p-4">
      <h2 className="font-bold mb-4">
        Participants ({participants.length})
      </h2>

      {participants.map((participant) => (
        <div
          key={participant.socketId}
          className="flex items-center gap-3 mb-3"
        >
          <img
            src={participant.image}
            className="w-10 h-10 rounded-full"
          />

          <div className="flex flex-col">
            <span className="font-medium">
              {participant.name}

              {participant.userId === hostId && (
                <span className="ml-2 text-yellow-500">
                  👑 Host
                </span>
              )}

              {participant.userId === user?._id && (
                <span className="ml-2 text-green-600">
                  (You)
                </span>
              )}
            </span>

            <span className="text-green-600 text-sm">
              🟢 Online
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}