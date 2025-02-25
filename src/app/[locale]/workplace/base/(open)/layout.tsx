import React from "react";

import Card from "@/components/common/Card";
import Folder from "@/components/layouts/Folder";

export default function BaseMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card classNames={{ body: "w-full h-full px-0" }}>
      <div className="flex h-full">
        <div className="flex-1  border-r">
          <Folder />
        </div>
        <div className="w-[82%]">{children}</div>
      </div>
    </Card>
  );
}
