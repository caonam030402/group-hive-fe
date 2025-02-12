"use client";

import React from "react";

import Card from "@/components/common/Card";
import { ENameLocalS } from "@/constants";
import { chatService } from "@/services";
import { getLocalStorage } from "@/utils/clientStorage";

import ChatItem from "./ChatItem";
import SearchChat from "./SearchChat";

export default function ChatList() {
  const chatId = getLocalStorage({ key: ENameLocalS.WORKSPACE_ID });
  const { data: listChat } = chatService.useGetAllChat({
    filterRelational: {
      field: "workspace",
      value: chatId,
    },
  });

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
