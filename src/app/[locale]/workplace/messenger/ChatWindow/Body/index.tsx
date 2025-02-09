import dayjs from "dayjs";
import React from "react";

import type { IMessage } from "@/types/chat";
import { formatTimeDisplay } from "@/utils/formatDate";

import MessageItem from "./MessageItem";

const TIME_THRESHOLD = 5 * 60 * 1000;

interface IProps {
  listMessage: IMessage[] | null | undefined;
  isChatPrivate?: boolean;
}

export default function Body({ listMessage, isChatPrivate }: IProps) {
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
              <p className="color-contract-light text-center text-[11px]">
                {formatTimeDisplay(message.sentAt)}
              </p>
            )}
            <MessageItem
              message={message}
              isChatPrivate={isChatPrivate}
              showAvatarAndName={shouldShowAvatar}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}
