import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import { AiOutlineUserAdd } from "@react-icons/all-files/ai/AiOutlineUserAdd";
import { BiVideo } from "@react-icons/all-files/bi/BiVideo";
import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots";
import { GoSearch } from "@react-icons/all-files/go/GoSearch";
import React from "react";

export default function ListAction() {
  const listAction = [
    {
      id: "1",
      name: "Search in chat",
      icon: <GoSearch size={18} />,
    },
    {
      id: "2",
      name: "Start a video call",
      icon: <BiVideo size={20} />,
    },
    {
      id: "3",
      name: "Add member",
      icon: <AiOutlineUserAdd size={20} />,
    },
    {
      id: "4",
      name: "Settings",
      icon: <BsThreeDots size={20} />,
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
