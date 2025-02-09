import React from "react";

import User from "@/components/common/User";
import { cn } from "@/libs/utils";
import type { IMessage } from "@/types/chat";
import { renderFullName } from "@/utils/helpers";

interface IProps {
  message: IMessage;
  showAvatarAndName: boolean;
}

export default function MessageItem({ message, showAvatarAndName }: IProps) {
  const { content, user } = message;
  const fullName = renderFullName(user.firstName, user.lastName);

  return (
    <div className="flex items-start gap-2">
      {/* {showAvatarAndName && (
        <User onlyAvatar info={{ avatar: user.avatar ?? "" }} />
      )} */}
      <div className={cn(!showAvatarAndName && "opacity-0")}>
        <User onlyAvatar info={{ avatar: user.avatar ?? "" }} />
      </div>

      <div>
        {showAvatarAndName && <p className="text-[13px]">{fullName}</p>}
        <p className="rounded-md bg-zinc-200/70 p-2 text-sm">{content}</p>
      </div>
    </div>
  );
}
