import dayjs from "dayjs";
import React from "react";

import type { IMessage } from "@/types/chat";
import { formatTimeDisplay } from "@/utils/formatDate";

import MessageItem from "./MessageItem";

const TIME_THRESHOLD = 5 * 60 * 1000;

interface IProps {
  listMessage: IMessage[] | null | undefined;
}

export default function Body({ listMessage }: IProps) {
  return (
    <div className="flex flex-col gap-3">
      {listMessage?.map((message, index) => {
        const prevMessage = listMessage[index - 1];

        const shouldShowAvatar =
          !prevMessage ||
          prevMessage.user.id !== message.user.id ||
          dayjs(message.sentAt).diff(dayjs(prevMessage.sentAt)) >
            TIME_THRESHOLD;

        const shouldShowTime =
          !prevMessage ||
          dayjs(message.sentAt).diff(dayjs(prevMessage.sentAt)) >
            TIME_THRESHOLD;

        return (
          <React.Fragment key={message.id}>
            {shouldShowTime && (
              <p className="text-center text-xs text-gray-500">
                {formatTimeDisplay(message.sentAt)}
              </p>
            )}
            <MessageItem
              message={message}
              showAvatarAndName={shouldShowAvatar}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}
