import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

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

import { chatService } from "../../../../../services/chat";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

export default function ChatWindow({ params }: { params: { id: string } }) {
  const { workspaceId } = useWorkspace();
  const { user } = userService.useProfile();
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("recipientId");
  const queryClient = useQueryClient();
  const idSendRef = useRef<string | null>(null);

  const enabled =
    !!params.id && params.id[0] !== String(MessageInit.MESSAGE_ID_DEFAULT);

  const { data: chatDetail } = chatService.useGetDetailMessage(params.id, {
    enabled,
  });

  const { data: recipientUser, isLoading } = userService.useGetOneUser(
    Number(recipientId),
    {
      enabled: !!recipientId,
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

  const handleSendMessage = ({ content }: { content: string }) => {
    const isDefault = params.id[0] === String(MessageInit.MESSAGE_ID_DEFAULT);
    idSendRef.current = `id-${dayjs().format("[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]")}`;

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
      recipientId: recipientUser?.id,
      chatId: isDefault ? undefined : params.id[0],
      content,
      type: 1,
      workspaceId,
    });
  };

  useEffect(() => {
    const handleReceiveMessage = (newMessage: IMessage) => {
      queryClient.setQueryData<IPaginationResponse<IMessage>>(
        [keyRQ.message, params.id],
        (oldData) => {
          if (oldData) {
            return { ...oldData, data: [...oldData.data, newMessage] };
          }
          return { data: [newMessage], hasNextPage: false };
        },
      );
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [params.id, queryClient]);

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
      autoScroll={{
        position: "bottom",
        valueChange: idSendRef.current ?? "",
      }}
      header={<Header recipientUser={recipientUser} />}
    >
      <Body isChatPrivate={isChatPrivate} listMessage={listMessage} />
    </Card>
  );
}
