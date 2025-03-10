import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoaderProps {
  className?: string;
  itemCount?: number;
  itemClassName?: string;
}

export function SkeletonLoader({
  className,
  itemCount = 2,
  itemClassName,
}: SkeletonLoaderProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {[...Array(itemCount)].map((_, index) => (
        <div
          key={index}
          className={`flex items-center space-x-4 ${itemClassName}`}
        >
          <div className="space-y-4 w-full">
            <Skeleton className="h-4 w-3/4" /> {/* Title */}
            <Skeleton className="h-4 w-1/2" /> {/* Subtitle */}
          </div>
        </div>
      ))}
    </div>
  );
}
