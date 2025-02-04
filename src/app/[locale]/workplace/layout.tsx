import React from "react";

import SideBarGlobal from "@/components/layouts/SideBarGlobal";
import { ChatStoreProvider } from "@/providers/chatStoreProvider";

interface Props {
  children: React.ReactNode;
}
export default function layoutWorkplace({ children }: Props) {
  return (
    <ChatStoreProvider>
      <div className="flex">
        <SideBarGlobal />
        <div className="ml-[0.5px] size-full h-screen py-1 pr-1">
          <div className=" size-full rounded-md ">{children}</div>
        </div>
      </div>
    </ChatStoreProvider>
  );
}
