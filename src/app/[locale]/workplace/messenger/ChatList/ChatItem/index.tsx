"use client";

import { Avatar } from "@heroui/avatar";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { PATH } from "@/constants";
import { cn } from "@/libs/utils";
import { userService } from "@/services/user";
import type { IChat } from "@/types/chat";
import { formatTimeDisplay } from "@/utils/formatDate";
import { getUserFriend, renderFullName } from "@/utils/helpers";

interface Props {
  item: IChat;
}

export default function ChatItem({ item }: Props) {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const isActive = item.id.toString() === params.id?.[0];
  const { lastMessage, id, name, avatar, userChats } = item;
  const { user } = userService.useProfile();
  const idFriend = getUserFriend({
    userChats: item.userChats,
    currentUser: user.id,
  })?.user.id;

  const handleClick = () => {
    router.push(`${PATH.MESSENGER}/${id}?recipientId=${idFriend}`);
  };

  const userMessage = lastMessage?.user;

  const authorSend = renderFullName(
    userMessage.firstName,
    userMessage.lastName,
  );

  const currentUser = Number(user?.id);

  const userFriend = getUserFriend({ currentUser, userChats });

  const avatarRender = userFriend?.user.avatar || avatar;
  const nameRender =
    renderFullName(userFriend?.user.firstName, userFriend?.user.lastName) ||
    name;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn("flex items-center w-full gap-2 py-3 px-2 rounded-md", {
        "bg-primary-200/20": isActive,
      })}
    >
      <div className="relative ">
        <Avatar className="shrink-0" src={avatarRender} />
        <div className="absolute bottom-[6%] right-0 size-[9px] rounded-full border border-white bg-green-500" />
      </div>
      <div className="w-full space-y-1 text-xs">
        <div className="flex justify-between">
          <p className="text-[14px] font-medium">{nameRender}</p>
          <p className="color-contract-light text-[11px]">
            {formatTimeDisplay(lastMessage.sentAt)}
          </p>
        </div>

        <p className="line-clamp-1 text-start text-[11px] text-zinc-500">
          {authorSend}: {lastMessage?.content}
        </p>
      </div>
    </button>
  );
}
