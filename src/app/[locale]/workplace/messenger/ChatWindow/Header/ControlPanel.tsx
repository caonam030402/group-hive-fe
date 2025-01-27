"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { Chat, FileText, Folder, PushPin } from "@phosphor-icons/react";
import React from "react";

export default function ControlPanel() {
  const listControlPanel = [
    {
      id: "1",
      name: "Chat",
      icon: <Chat size={12} />,
    },
    {
      id: "2",
      name: "Pinned",
      icon: <PushPin size={12} />,
    },
    {
      id: "3",
      name: "Docs",
      icon: <FileText size={12} />,
    },
    {
      id: "4",
      name: "Files",
      icon: <Folder size={12} />,
    },
  ];
  return (
    <Tabs
      classNames={{
        tabList: "bg-transparent gap-1",
        tab: "h-[20px] px-2",
      }}
      className="bg-transparent"
      aria-label="Options"
      color="primary"
    >
      {listControlPanel.map((item) => (
        <Tab
          key={item.id}
          title={
            <div className="flex items-center space-x-1">
              {item.icon}
              <span className="text-[12px]">{item.name}</span>
            </div>
          }
        />
      ))}
    </Tabs>
  );
}
