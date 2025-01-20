"use client";

import React, { useEffect } from "react";

import Card from "@/components/common/Card";
import { ENameLocalS } from "@/constants";
import useApi from "@/hooks/useApi";
import { chatGet } from "@/services";
import type { IChat } from "@/types/chat";
import { getLocalStorage } from "@/utils/clientStorage";

import ChatItem from "./ChatItem";
import SearchChat from "./SearchChat";

export default function ChatList() {
  const [listChat, setListChat] = React.useState<IChat[]>();
  const { fetch } = useApi();
  const chatId = getLocalStorage({ key: ENameLocalS.WORKSPACE_ID });

  const handleFetch = () => {
    fetch({
      fn: chatGet({
        filterRelational: {
          field: "workspace",
          value: chatId,
        },
      }),
      onSuccess: (data) => {
        setListChat(data.payload?.data);
      },
    });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <Card
      isDecorative={false}
      classNames={{ body: "pt-0 bg-transparent" }}
      header={<SearchChat />}
    >
      {listChat?.map((item) => <ChatItem item={item} key={item.id} />)}
    </Card>
  );
}
