import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";

import Card from "@/components/common/Card";
import { keyRQ } from "@/constants/keyRQ";
import {
  EChatType,
  EMessageStatus,
  EMessageType,
  MessageInit,
} from "@/enums/chat";
import useWorkspace from "@/hooks/useWorkspace";
import { socket } from "@/libs/socket";
import { userService } from "@/services/user";
import type { IPaginationResponse } from "@/types";
import type { IMessage } from "@/types/chat";
import { getUserFriend } from "@/utils/helpers";

import { chatService } from "../../../../../services/chat";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

export default function ChatWindow({ params }: { params: { id: string } }) {
  const { workspaceId } = useWorkspace();
  const { user } = userService.useProfile();
  const queryClient = useQueryClient();

  const enabled =
    !!params.id && params.id[0] !== String(MessageInit.MESSAGE_ID_DEFAULT);
  const { data: chatDetail, isLoading } = chatService.useGetDetailMessage(
    params.id,
    {
      enabled,
    },
  );

  const { data: listMessage } = chatService.useGetAllMessage(
    {
      filterRelational: {
        field: "chat",
        value: params.id,
      },
    },
    {
      enabled,
      expendQueryKey: [params.id],
    },
  );

  const userFriend = getUserFriend({
    userChats: chatDetail?.userChats,
    currentUser: Number(user?.id),
  });

  const idUserFriend = userFriend?.user.id;

  const handleSendMessage = ({ content }: { content: string }) => {
    const newMessage = {
      id: `id-${dayjs().format()}`,
      content,
      sentAt: dayjs().format(),
      type: EMessageType.TEXT,
      status: EMessageStatus.PENDING,
      user,
    };

    queryClient.setQueryData<IPaginationResponse<IMessage>>(
      [keyRQ.message, params.id],
      (oldData) => {
        if (oldData) {
          return { ...oldData, data: [...oldData.data, newMessage] };
        }
        return { data: [newMessage], hasNextPage: false };
      },
    );

    socket.emit("send-message-private", {
      recipientId: Number(idUserFriend),
      chatId:
        params?.id === String(MessageInit.MESSAGE_ID_DEFAULT)
          ? undefined
          : params.id[0],
      content,
      type: 1,
      workspaceId,
    });
  };

  const isChatPrivate = chatDetail?.chatType === EChatType.PRIVATE;

  return (
    <Card
      footer={
        isLoading ? null : <Footer handleSendMessage={handleSendMessage} />
      }
      isDecorative={false}
      classNames={{
        header: "p-0",
        footer: "overflow-visible",
      }}
      header={<Header chatDetail={chatDetail} />}
    >
      <Body isChatPrivate={isChatPrivate} listMessage={listMessage} />
    </Card>
  );
}
