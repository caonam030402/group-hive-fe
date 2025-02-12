import { Tooltip } from "@heroui/react";
import React from "react";

import User from "@/components/common/User";
import { cn } from "@/libs/utils";
import { userService } from "@/services/user";
import type { IMessage } from "@/types/chat";
import { formatTimeDisplay } from "@/utils/formatDate";
import { renderFullName } from "@/utils/helpers";

interface IProps {
  message: IMessage;
  showAvatarAndName: boolean;
  isChatPrivate?: boolean;
}

export default function MessageItem({
  message,
  showAvatarAndName,
  isChatPrivate,
}: IProps) {
  const { content, user } = message;
  const fullName = renderFullName(user.firstName, user.lastName);
  const { user: me } = userService.useProfile();

  const itsMe = me.id === user.id;

  return (
    <div
      className={cn("flex items-start gap-2 w-full", {
        "mt-4": showAvatarAndName,
        "justify-end": itsMe,
      })}
    >
      <div className="w-[40px]">
        {showAvatarAndName && !itsMe && (
          <User onlyAvatar info={{ avatar: user.avatar ?? "" }} />
        )}
      </div>
      <div className="max-w-[calc(100vw-700px)]">
        {showAvatarAndName && (
          <p className="text-[13px]">{!isChatPrivate && fullName}</p>
        )}
        <Tooltip
          showArrow
          color="foreground"
          placement={showAvatarAndName ? "top" : "left"}
          content={
            <div className="text-xss">{formatTimeDisplay(message.sentAt)}</div>
          }
        >
          <p
            className={cn("rounded-md bg-zinc-200/70 p-2 text-sm", {
              "bg-primary-50": itsMe,
            })}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Tooltip>
      </div>
    </div>
  );
}
