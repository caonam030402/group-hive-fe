import React from "react";

import Card from "@/components/common/Card";
import Folder from "@/components/layouts/Folder";
import HeaderDocsHub from "@/components/layouts/HeaderDocsHub";

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
        <div className="w-[82%]">
          <HeaderDocsHub />
          {children}
        </div>
      </div>
    </Card>
  );
}
