import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import {
  DotsThreeOutline,
  MagnifyingGlass,
  UserPlus,
  VideoCamera,
} from "@phosphor-icons/react";
import React from "react";

export default function ListAction() {
  const listAction = [
    {
      id: "1",
      name: "Search in chat",
      icon: <MagnifyingGlass size={20} />,
    },
    {
      id: "2",
      name: "Start a video call",
      icon: <VideoCamera size={20} />,
    },
    {
      id: "3",
      name: "Add member",
      icon: <UserPlus size={20} />,
    },
    {
      id: "4",
      name: "Settings",
      icon: <DotsThreeOutline size={20} />,
    },
  ];
  return (
    <div className="flex items-center gap-1 text-zinc-500">
      {listAction.map((item) => (
        <Tooltip
          showArrow
          content={<p className="text-xs">{item.name}</p>}
          key={item.id}
        >
          <Button
            size="sm"
            className="bg-transparent hover:bg-zinc-200"
            isIconOnly
          >
            {item.icon}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
