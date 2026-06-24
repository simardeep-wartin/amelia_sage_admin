"use client";
import { useEffect, useRef } from "react";

type VideoBackgroundProps = {
  animationPath: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
};

export default function VideoBackground({
  animationPath,
  className,
  onLoad,
  onError,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Cached video fires canplay before React attaches handlers — check readyState directly
    if (video.readyState >= 3) {
      onLoad?.();
      return;
    }

    const handleCanPlay = () => onLoad?.();
    const handleError = () => onError?.();
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);
    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, [onLoad, onError]);

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden${className ? ` ${className}` : ""}`}>
      <video
        ref={videoRef}
        src={animationPath}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
