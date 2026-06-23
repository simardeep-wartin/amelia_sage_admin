"use client";

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
  return (
    <div className={`absolute inset-0 z-0 overflow-hidden${className ? ` ${className}` : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={animationPath}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        onLoad={onLoad}
        onError={onError}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
