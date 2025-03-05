import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonLoader() {
  return (
    <div className="flex items-center space-x-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-max" />
        <Skeleton className="h-4 w-max" />
      </div>
    </div>
  );
}
