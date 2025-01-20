import React, { useEffect } from "react";

import Card from "@/components/common/Card";
import useApi from "@/hooks/useApi";
import { chatGetDetail, messageGet } from "@/services";
import type { IChat, IMessage } from "@/types/chat";

import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

export default function ChatWindow({ params }: { params: { id: string } }) {
  const [chatDetail, setChatDetail] = React.useState<IChat | null>();
  const [listMessage, setListMessage] = React.useState<IMessage[] | null>();
  const { fetch } = useApi();

  useEffect(() => {
    fetch({
      fn: chatGetDetail(params.id),
      onSuccess: (data) => {
        setChatDetail(data.payload);
      },
    });
    fetch({
      fn: messageGet({
        filterRelational: {
          field: "chat",
          value: params.id,
        },
      }),
      onSuccess: (data) => {
        setListMessage(data.payload?.data);
      },
    });
  }, [params.id]);
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
