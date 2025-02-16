import { Tooltip } from "@heroui/react";
import React from "react";

import DeliveryStatusMessage from "@/components/business/DeliveryStatusMessage";
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
  const { content, user, sentAt } = message;
  const fullName = renderFullName(user.firstName, user.lastName);
  const { user: me } = userService.useProfile();
  const itsMe = me.id === user.id;

  const radiusMessage = showAvatarAndName
    ? cn(
        "rounded-bl-md rounded-tl-md rounded-tr-md rounded-br-md",
        itsMe
          ? "rounded-ll-md rounded-lr-none"
          : "rounded-ll-none rounded-lr-md",
      )
    : "rounded-md";

  return (
    <div
      className={cn("flex items-center gap-2 w-full", {
        "mt-4": showAvatarAndName,
        "justify-end": itsMe,
      })}
    >
      <div className="w-[40px]">
        {showAvatarAndName && !itsMe && (
          <User onlyAvatar info={{ avatar: user.avatar ?? "" }} />
        )}
      </div>
      <div className="flex items-center gap-2">
        {itsMe && <DeliveryStatusMessage status={message.status} />}

        <div className="max-w-[calc(100vw-700px)]">
          {showAvatarAndName && (
            <p className="text-[13px]">{!isChatPrivate && fullName}</p>
          )}
          <Tooltip
            showArrow
            color="foreground"
            placement={showAvatarAndName ? "top" : "left"}
            content={
              <div className="text-xss">{formatTimeDisplay(sentAt)}</div>
            }
          >
            <p
              className={cn(" bg-zinc-200/70 p-2 text-sm ", radiusMessage, {
                "bg-primary-50": itsMe,
              })}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
