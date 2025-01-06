import { Avatar } from "@nextui-org/avatar";
import React from "react";

import { cn } from "@/libs/utils";

interface Props {
  info: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    avatar: string;
  };
  onlyAvatar?: boolean;
  shape?: "circle" | "square";
}

export default function User({ info, onlyAvatar, shape = "circle" }: Props) {
  const isCircle = shape === "circle" ? "rounded-full" : "rounded-md";

  return (
    <div className="flex cursor-pointer items-center gap-2" aria-hidden="true">
      <Avatar
        className={cn("size-12 shrink-0", isCircle)}
        src={info.avatar || "https://i.pravatar.cc/150?u=a04258a2462d826712d"}
        size="md"
      />
      {!onlyAvatar && (
        <div>
          <div className="overflow-hidden text-ellipsis text-base font-bold">
            {info.name}
          </div>
          <div className="overflow-hidden text-ellipsis text-tiny">
            {info.email}
          </div>
        </div>
      )}
    </div>
  );
}
