import { Tooltip } from "@heroui/react";
import React from "react";

import User from "@/components/common/User";
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

  return (
    <div className="flex items-start gap-2">
      <div className="w-[40px]">
        {showAvatarAndName && (
          <User onlyAvatar info={{ avatar: user.avatar ?? "" }} />
        )}
      </div>
      <div>
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
            className="rounded-md bg-zinc-200/70 p-2 text-sm"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Tooltip>
      </div>
    </div>
  );
}
