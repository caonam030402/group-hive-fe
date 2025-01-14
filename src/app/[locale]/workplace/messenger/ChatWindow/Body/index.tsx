import React from "react";

import type { IMessage } from "@/types/chat";

import MessageItem from "./MessageItem";

interface IProps {
  listMessage: IMessage[] | null | undefined;
}
export default function Body({ listMessage }: IProps) {
  return (
    <div className="flex flex-col gap-3">
      {listMessage?.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}
