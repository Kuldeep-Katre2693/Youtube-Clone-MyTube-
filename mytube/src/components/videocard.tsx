"use client";
import{useState}from"react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function VideoCard({ video }: any) {
  const videoUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${video.filepath.replace(/\\/g, "/")}`;
  const [duration, setDuration] = useState("0:00");

const formatDuration = (seconds: number) => {
  if (!isFinite(seconds)) return "0:00";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

  return (
    <Link href={`/watch/${video._id}`} className="group">
      <div className="space-y-3">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted transition-colors duration-300">
          <video
  src={videoUrl}
  preload="metadata"
  className="w-full h-full object-cover"
  onLoadedMetadata={(e) => {
    setDuration(formatDuration(e.currentTarget.duration));
  }}
/>

          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
  {duration}
</div>
        </div>

        <div className="flex gap-3">
          <Avatar className="w-9 h-9">
            <AvatarFallback>
              {video?.videochanel?.[0] || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="font-medium text-sm line-clamp-2">
              {video.videotitle}
            </h3>

            <p className="text-sm text-muted-foreground">
              {video.videochanel}
            </p>

            <p className="text-sm text-muted-foreground">
              {(video.views ?? 0).toLocaleString()} views •{" "}
              {formatDistanceToNow(new Date(video.createdAt))} ago
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}