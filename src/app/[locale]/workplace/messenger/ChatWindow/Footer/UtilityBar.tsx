import { Button, Tooltip } from "@heroui/react";
import { ArrowsOutSimple, Smiley, TextAa } from "@phosphor-icons/react";
import React from "react";

import ListBoxMore from "./ListBoxMore";

interface IProps {
  setOpenEmojis: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UtilityBar({ setOpenEmojis }: IProps) {
  const listUtilityBar = [
    {
      id: "1",
      name: "Formatting",
      icon: <TextAa size={18} />,
    },
    {
      id: "2",
      name: "Emoji",
      icon: <Smiley size={18} />,
      action: () => setOpenEmojis(true),
    },
    {
      id: "1",
      name: "More",
      icon: <ListBoxMore />,
    },
    {
      id: "4",
      name: "Expend",
      icon: <ArrowsOutSimple size={18} />,
    },
  ];

  return (
    <div className="flex items-center gap-1">
      {listUtilityBar.map((item) => {
        return (
          <Tooltip showArrow content={item.name} key={item.id}>
            <Button
              size="sm"
              className="bg-transparent hover:bg-zinc-200"
              isIconOnly
              onClick={item.action}
            >
              <div className="text-base">{item.icon}</div>
            </Button>
          </Tooltip>
        );
      })}
    </div>
  );
}
