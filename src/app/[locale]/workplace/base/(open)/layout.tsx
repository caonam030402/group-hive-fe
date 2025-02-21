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
        <div className="w-[18%] border-r">
          <Folder />
        </div>
        {children}
      </div>
    </Card>
  );
}
