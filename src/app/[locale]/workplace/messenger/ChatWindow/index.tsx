import React from "react";

import Card from "@/components/common/Card";
import { MessageInit } from "@/enums/chat";

import { chatService } from "../../../../../services/chat";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

export default function ChatWindow({ params }: { params: { id: string } }) {
  const enabled =
    !!params.id && params.id[0] !== String(MessageInit.MESSAGE_ID_DEFAULT);
  const { data: chatDetail } = chatService.useGetDetailMessage(params.id, {
    enabled,
  });

  const { data: listMessage } = chatService.useGetAllMessage(
    {
      filterRelational: {
        field: "chat",
        value: params.id,
      },
    },
    {
      enabled,
    },
  );

  return (
    <Card
      footer={<Footer />}
      isDecorative={false}
      classNames={{
        header: "p-0",
        footer: "overflow-visible",
      }}
      header={<Header chatDetail={chatDetail} />}
    >
      <Body listMessage={listMessage} />
    </Card>
  );
}
