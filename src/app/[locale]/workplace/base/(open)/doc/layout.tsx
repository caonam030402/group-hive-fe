import React from "react";

import Card from "@/components/common/Card";
import Folder from "@/components/layouts/Folder";
import HeaderDocsHub from "@/components/layouts/HeaderDocsHub";
import { Room } from "@/providers/roomProvider";

export default function BaseMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card classNames={{ body: "w-full h-full p-0" }}>
      <div className="flex h-full">
        <div className="flex-1  border-r py-5">
          <Folder />
        </div>
        <div className="flex w-[82%] flex-col">
          <Room>
            <HeaderDocsHub />
            <Card isNoStyle>{children}</Card>
          </Room>
        </div>
      </div>
    </Card>
  );
}
