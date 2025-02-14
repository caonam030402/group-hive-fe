import { Skeleton } from "@heroui/react";
import React from "react";

export default function SkeletonUser() {
  return (
    <div className="flex w-full items-center gap-3 px-3">
      <div>
        <Skeleton className="flex size-10 rounded-full" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 rounded-lg" />
      </div>
    </div>
  );
}
