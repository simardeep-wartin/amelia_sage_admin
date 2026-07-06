"use client";
import { useCallback } from "react";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react/webgl";

type LottieBackgroundProps = {
  animationPath: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
};

export default function LottieBackground({
  animationPath,
  className,
  onLoad,
  onError,
}: LottieBackgroundProps) {
  const handleRef = useCallback(
    (dotLottie: DotLottie | null) => {
      if (!dotLottie) return;
      dotLottie.addEventListener("load", () => onLoad?.());
      dotLottie.addEventListener("loadError", () => onError?.());
    },
    [onLoad, onError],
  );

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden${className ? ` ${className}` : ""}`}>
      <DotLottieReact
        src={animationPath}
        loop
        autoplay
        useFrameInterpolation
        layout={{ fit: "cover", align: [0.5, 0.5] }}
        renderConfig={{ quality: 100 }}
        dotLottieRefCallback={handleRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
