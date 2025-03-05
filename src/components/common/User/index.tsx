import { Avatar } from "@heroui/avatar";
import React from "react";

import { cn } from "@/libs/utils";

interface Props {
  info: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    avatar?: string;
  };
  onlyAvatar?: boolean;
  shape?: "circle" | "square";
  classNames?: {
    avatar?: string;
    name?: string;
    email?: string;
  };
}

export default function User({
  info,
  onlyAvatar,
  shape = "circle",
  classNames,
}: Props) {
  const isCircle = shape === "circle" ? "rounded-full" : "rounded-md";

  return (
    <div className="flex cursor-pointer items-center gap-2" aria-hidden="true">
      <Avatar
        className={cn("size-12 shrink-0", isCircle, classNames?.avatar)}
        src={info.avatar || "https://i.pravatar.cc/150?u=a04258a2462d826712d"}
        size="md"
      />
      {!onlyAvatar && (
        <div>
          <div
            className={cn(
              "overflow-hidden text-ellipsis text-base font-bold",
              classNames?.name,
            )}
          >
            {info.name}
          </div>
          <div
            className={cn(
              "color-contract-light overflow-hidden text-ellipsis text-tiny",
              classNames?.email,
            )}
          >
            {info.email}
          </div>
        </div>
      )}
    </div>
  );
}
