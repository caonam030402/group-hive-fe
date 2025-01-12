"use client";

import { Avatar } from "@nextui-org/avatar";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { cn } from "@/libs/utils";
import type { IChat } from "@/types/chat";
import { formatDateText } from "@/utils/formatDate";

interface Props {
  item: IChat;
}

export default function ChatItem({ item }: Props) {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const isActive = item.id.toString() === params.id?.[0];

  const handleClick = () => {
    router.push(`/workplace/messenger/${item.id}`);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn("flex items-center w-full gap-2 py-3 px-2 rounded-md", {
        "bg-primary-200/20": isActive,
      })}
    >
      <div className="relative ">
        <Avatar className="shrink-0" src={item?.avatar} />
        <div className="absolute bottom-[6%] right-0 size-[9px] rounded-full border border-white bg-green-500" />
      </div>
      <div className="w-full space-y-1 text-xs">
        <div className="flex justify-between">
          <p className="text-[14px] font-medium">{item.name}</p>
          <p className="text-zinc-500"> {formatDateText(item.updatedAt)}</p>
        </div>
        <p className="line-clamp-1 text-start text-[11px] text-zinc-500">
          {item.lastMessage?.content}
        </p>
      </div>
    </button>
  );
}
