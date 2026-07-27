import { useEffect, useRef } from "react";

type LocalVideoProps = {
  onStreamReady: (stream: MediaStream) => void;
};

export default function LocalVideo({
  onStreamReady,
}: LocalVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

 useEffect(() => {
  const startCamera = async () => {
    try {
      console.log("Requesting camera...");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      console.log("Camera acquired");

      onStreamReady(stream);

      console.log("onStreamReady called");

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  startCamera();
}, [onStreamReady]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="w-full rounded-lg bg-black"
    />
  );
}