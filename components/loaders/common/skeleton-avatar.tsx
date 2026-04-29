import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";

interface SkeletonAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-[88px] w-[88px]", // Matches the Sage AI avatar size
};

export function SkeletonAvatar({ size = "md", className }: SkeletonAvatarProps) {
  return (
    <Skeleton className={cn("rounded-full", sizeClasses[size], className)} />
  );
}
