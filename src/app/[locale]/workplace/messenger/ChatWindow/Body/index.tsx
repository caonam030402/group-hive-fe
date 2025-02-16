import dayjs from "dayjs";
import React from "react";

import Divider from "@/components/common/Divider";
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
    <div className="flex w-full flex-col gap-2">
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
              <div className="flex items-center">
                <Divider />
                <p className="color-contract-light my-5 min-w-[100px] text-center text-[11px]">
                  {formatTimeDisplay(message.sentAt)}
                </p>
                <Divider />
              </div>
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
