"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { GiPin } from "@react-icons/all-files/gi/GiPin";
import { GoFileDirectory } from "@react-icons/all-files/go/GoFileDirectory";
import { IoMdChatboxes } from "@react-icons/all-files/io/IoMdChatboxes";
import { IoMdDocument } from "@react-icons/all-files/io/IoMdDocument";
import React from "react";

export default function ControlPanel() {
  const listControlPanel = [
    {
      id: "1",
      name: "Chat",
      icon: <IoMdChatboxes size={12} />,
    },
    {
      id: "2",
      name: "Pinned",
      icon: <GiPin size={12} />,
    },
    {
      id: "3",
      name: "Docs",
      icon: <IoMdDocument size={12} />,
    },
    {
      id: "4",
      name: "Files",
      icon: <GoFileDirectory size={12} />,
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
