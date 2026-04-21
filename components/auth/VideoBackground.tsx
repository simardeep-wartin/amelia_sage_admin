"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

type VideoBackgroundProps = {
  animationPath: string;
  className?: string;
};

export default function VideoBackground({ animationPath, className }: VideoBackgroundProps) {
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(animationPath)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Record<string, unknown> | null) => setAnimationData(data))
      .catch(() => setAnimationData(null));
  }, [animationPath]);

  return (
    <div className={`absolute inset-0 z-0 h-full w-full overflow-hidden${className ? ` ${className}` : ""}`}>
      {animationData ? (
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      ) : (
        <div className="h-full w-full bg-black/10" aria-hidden="true" />
      )}
    </div>
  );
}
