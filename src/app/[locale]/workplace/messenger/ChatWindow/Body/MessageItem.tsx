import React from "react";

import User from "@/components/common/User";
import type { IMessage } from "@/types/chat";
import { renderFullName } from "@/utils/helpers";

interface IProps {
  message: IMessage;
}

export default function MessageItem({ message }: IProps) {
  const { content, user } = message;
  const fullName = renderFullName(user.firstName, user.lastName);
  return (
    <div>
      <div className="flex gap-2">
        <User onlyAvatar info={{ avatar: user.avatar ?? "" }} />
        <div>
          <p className="text-[13px]">{fullName}</p>
          <p className="rounded-md bg-zinc-200/70 p-2 text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
}
