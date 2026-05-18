type AvatarCircleProps = {
  src: string;
  alt: string;
  innerWidth?: string;
  innerHeight?: string;
  objectFit?: "cover" | "contain";
  rounded?: boolean;
};

const GRADIENT =
  "bg-[linear-gradient(135deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]";

export default function AvatarCircle({
  src,
  alt,
  innerWidth = "w-[88px]",
  innerHeight = "h-[88px]",
  objectFit = "cover",
  rounded = true,
}: AvatarCircleProps) {
  return (
    <div
      className={`flex h-[88px] w-[89px] items-center justify-center rounded-full ${GRADIENT}`}
    >
      <div
        className={`relative ${innerWidth} ${innerHeight} overflow-hidden ${rounded ? "rounded-lg" : ""}`}
      >
        <img
          src={src}
          alt={alt}
          className={`h-full w-full ${objectFit === "cover" ? "object-cover" : "object-contain"}`}
        />
      </div>
    </div>
  );
}
