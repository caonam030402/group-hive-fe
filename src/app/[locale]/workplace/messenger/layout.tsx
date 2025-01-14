import React from "react";

import Card from "@/components/common/Card";

import ChatList from "./ChatList";

type Props = {
  children: React.ReactNode;
};

export default function layoutMessenger({ children }: Props) {
  return (
    <Card classNames={{ body: "h-full flex-1, p-0" }}>
      <div className="flex h-full overflow-hidden">
        <div className="h-full w-[18%] border-r">
          <ChatList />
        </div>
        <div className="h-full flex-1">{children}</div>
      </div>
    </Card>
  );
}
