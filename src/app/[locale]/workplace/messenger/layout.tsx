"use client";

import React, { useEffect } from "react";

import Card from "@/components/common/Card";
import { socket } from "@/libs/socket";

import ChatList from "./ChatList";

type Props = {
  children: React.ReactNode;
};

export default function LayoutMessenger({ children }: Props) {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Card classNames={{ body: "h-full flex-1, p-0" }}>
      <div className="flex h-full overflow-hidden">
        <div className="h-full w-[23%] border-r">
          <ChatList />
        </div>
        <div className="h-full flex-1">{children}</div>
      </div>
    </Card>
  );
}
