import { useEffect, useRef } from "react";

type LocalVideoProps = {
  onStreamReady: (stream: MediaStream) => void;
};

export default function LocalVideo({
  onStreamReady,
}: LocalVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

 useEffect(() => {
  let stream: MediaStream | null = null;

  const startCamera = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      onStreamReady(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        console.log("Audio-only stream started");

        onStreamReady(stream);
      } catch (e) {
        console.error("Audio also failed:", e);
      }
    }
  };

  startCamera();

  return () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (videoRef.current) {
    videoRef.current.srcObject = null;
  }
  };
}, [onStreamReady]);



  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
className="w-full rounded-xl border border-zinc-700 bg-black shadow-lg aspect-video object-cover"    />
  );
}